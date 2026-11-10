// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import ContactForm from "./ContactForm.vue";
import { contactDraft } from "@/composables/contactDraft";

const send = vi.fn();
vi.mock("@/services/contact", async (orig) => ({
  ...(await orig<typeof import("@/services/contact")>()),
  sendContactRequest: (...args: unknown[]) => send(...args),
}));

const factory = () => mount(ContactForm, { global: { stubs: { RouterLink: { template: "<a><slot /></a>" } } } });

async function fill(w: ReturnType<typeof factory>) {
  await w.find("input[name=name]").setValue("Jeanne Exemple");
  await w.find("input[name=email]").setValue("jeanne@example.ch");
  await w.find("textarea[name=message]").setValue("Villa de 180 m², stores et chauffage.");
}

describe("ContactForm", () => {
  beforeEach(() => {
    send.mockReset();
    contactDraft.context = "";
    contactDraft.profile = "residence";
  });

  it("bloque l'envoi et signale les champs manquants", async () => {
    const w = factory();
    await w.find("form").trigger("submit");
    expect(send).not.toHaveBeenCalled();
    expect(w.findAll("[aria-invalid='true']")).toHaveLength(3);
    expect(w.text()).toContain("Indiquez une adresse e-mail valide.");
  });

  it("envoie la demande avec le libellé du profil puis confirme", async () => {
    send.mockResolvedValue(undefined);
    const w = factory();
    await fill(w);
    await w.find("form").trigger("submit");
    await flushPromises();
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Jeanne Exemple", email: "jeanne@example.ch", profile: "Résidences" }),
    );
    expect(w.find("[role=status]").text()).toContain("Merci");
  });

  it("ignore silencieusement les robots (champ piège rempli)", async () => {
    const w = factory();
    await fill(w);
    await w.find("input[name=website]").setValue("spam");
    await w.find("form").trigger("submit");
    await flushPromises();
    expect(send).not.toHaveBeenCalled();
    expect(w.find("[role=status]").exists()).toBe(true);
  });

  it("affiche l'erreur et le lien e-mail de secours en cas d'échec", async () => {
    const { ContactError } = await import("@/services/contact");
    send.mockRejectedValue(new ContactError("Le serveur a refusé la demande (500)."));
    const w = factory();
    await fill(w);
    await w.find("form").trigger("submit");
    await flushPromises();
    const alert = w.find("[role=alert]");
    expect(alert.text()).toContain("(500)");
    expect(alert.find("a").attributes("href")).toMatch(/^mailto:contact@avf-domotique\.ch/);
  });

  it("reprend le profil et le contexte venant des autres sections", async () => {
    const w = factory();
    contactDraft.profile = "commerce";
    contactDraft.context = "Estimation en ligne (CHF 1’080 par an).";
    await flushPromises();
    expect((w.find("select[name=profile]").element as HTMLSelectElement).value).toBe("commerce");
    expect((w.find("textarea[name=message]").element as HTMLTextAreaElement).value).toContain("CHF 1’080");
  });
});
