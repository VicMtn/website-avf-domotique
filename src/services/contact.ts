/**
 * Envoi d'une demande de contact : seul fichier à modifier pour changer de service.
 *
 * Configuration (.env.local, voir .env.example) :
 * - VITE_CONTACT_ENDPOINT   URL qui reçoit un POST multipart/form-data
 *                           (script PHP chez l'hébergeur, Formspree, Web3Forms…)
 * - VITE_CONTACT_ACCESS_KEY facultatif, ajouté en champ `access_key` (Web3Forms)
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

  const body = new FormData();
  for (const [key, value] of Object.entries(request)) body.append(key, value);
  body.append("subject", `Demande de contact : ${request.profile}, ${request.project}`);
  if (accessKey) body.append("access_key", accessKey);

  let response: Response;
  try {
    response = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
  } catch {
    throw new ContactError("Connexion impossible. Vérifiez votre accès à internet.");
  }
  if (!response.ok) throw new ContactError(`Le serveur a refusé la demande (${response.status}).`);
}
