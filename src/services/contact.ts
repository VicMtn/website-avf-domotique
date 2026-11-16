/**
 * Envoi d'une demande de contact via Web3Forms (https://docs.web3forms.com).
 * Seul fichier à modifier pour changer de service.
 *
 * Configuration (.env.local, voir .env.example) :
 * - VITE_CONTACT_ENDPOINT   https://api.web3forms.com/submit
 * - VITE_CONTACT_ACCESS_KEY clé Web3Forms ; publique par conception (elle ne permet que d'envoyer vers notre boîte)
 *
 * Sans adresse configurée : simulation en développement, erreur en production.
 */

export interface ContactRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  profile: string;
  project: string;
  message: string;
}

export class ContactError extends Error {}

/** Réponse Web3Forms ; `message` est documenté tantôt à la racine, tantôt sous `body` */
interface ServiceResponse {
  success?: boolean;
  message?: string;
  body?: { message?: string };
}

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;

export async function sendContactRequest(request: ContactRequest): Promise<void> {
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info("[contact] VITE_CONTACT_ENDPOINT absent, envoi simulé :", request);
      await new Promise((r) => setTimeout(r, 600));
      return;
    }
    throw new ContactError("Le formulaire n'est pas encore configuré.");
  }

  // Champs réservés Web3Forms : `email` sert d'adresse de réponse, `subject` et `from_name` habillent l'e-mail reçu
  const payload = {
    ...request,
    subject: `Demande de contact : ${request.profile}, ${request.project}`,
    from_name: "Site avf-domotique.ch",
    ...(accessKey ? { access_key: accessKey } : {}),
  };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ContactError("Connexion impossible. Vérifiez votre accès à internet.");
  }

  const data: ServiceResponse = await response.json().catch(() => ({}));
  if (response.ok && data.success !== false) return;

  if (response.status === 429) throw new ContactError("Trop de demandes envoyées. Réessayez dans une heure.");
  const detail = data.message ?? data.body?.message;
  throw new ContactError(`Le serveur a refusé la demande (${response.status}${detail ? ` : ${detail}` : ""}).`);
}
