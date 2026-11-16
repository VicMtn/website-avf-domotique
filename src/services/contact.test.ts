import { afterEach, describe, expect, it, vi } from "vitest";

const request = {
  name: "Jeanne Exemple",
  company: "",
  email: "jeanne@example.ch",
  phone: "",
  profile: "Résidences",
  project: "Rénovation",
  message: "Villa de 180 m².",
};

/** Le service lit la configuration à l'import : on le recharge après chaque changement d'environnement */
async function loadService(endpoint = "https://api.web3forms.com/submit") {
  vi.resetModules();
  vi.stubEnv("VITE_CONTACT_ENDPOINT", endpoint);
  vi.stubEnv("VITE_CONTACT_ACCESS_KEY", "cle-test");
  return import("./contact");
}

const reply = (status: number, body: unknown) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("sendContactRequest (Web3Forms)", () => {
  it("envoie du JSON avec la clé et les champs réservés", async () => {
    const fetchMock = reply(200, { success: true, body: { message: "Email sent successfully!" } });
    vi.stubGlobal("fetch", fetchMock);
    const { sendContactRequest } = await loadService();

    await sendContactRequest(request);

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(init.body)).toMatchObject({
      access_key: "cle-test",
      email: "jeanne@example.ch",
      subject: "Demande de contact : Résidences, Rénovation",
      from_name: "Site avf-domotique.ch",
    });
  });

  it("signale un refus avec le message du service", async () => {
    vi.stubGlobal("fetch", reply(400, { success: false, body: { message: "Invalid access key" } }));
    const { sendContactRequest } = await loadService();
    await expect(sendContactRequest(request)).rejects.toThrow("(400 : Invalid access key)");
  });

  it("traite success:false comme un échec même en HTTP 200", async () => {
    vi.stubGlobal("fetch", reply(200, { success: false, message: "Refusé" }));
    const { sendContactRequest } = await loadService();
    await expect(sendContactRequest(request)).rejects.toThrow("Refusé");
  });

  it("explique la limite de débit (429)", async () => {
    vi.stubGlobal("fetch", reply(429, { success: false, message: "Too may requests. Please try later!" }));
    const { sendContactRequest } = await loadService();
    await expect(sendContactRequest(request)).rejects.toThrow("Réessayez dans une heure");
  });

  it("gère une erreur serveur sans corps JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("oops", { status: 500 })));
    const { sendContactRequest } = await loadService();
    await expect(sendContactRequest(request)).rejects.toThrow("(500)");
  });

  it("gère l'absence de réseau", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    const { sendContactRequest } = await loadService();
    await expect(sendContactRequest(request)).rejects.toThrow("Connexion impossible");
  });
});
