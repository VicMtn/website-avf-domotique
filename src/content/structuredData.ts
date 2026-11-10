import { faq } from "./faq";
import { site } from "./site";

/** Une valeur entre crochets n'est pas encore renseignée : on ne la publie pas */
const filled = (v: string) => (v.includes("[") ? undefined : v);

/** Fiche entreprise (schema.org), affichée sur la page d'accueil */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${site.url}/#entreprise`,
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: filled(site.phone.display) && site.phone.href.replace("tel:", ""),
  image: `${site.url}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: filled(site.address.street),
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: site.address.canton,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: ["Vaud", "Valais", "Genève"].map((name) => ({ "@type": "AdministrativeArea", name })),
  knowsAbout: ["Domotique", "Loxone", "Gestion de l'énergie", "Éclairage", "Sécurité"],
};

export const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
