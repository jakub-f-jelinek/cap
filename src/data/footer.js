import privacyPolicy from "@/assets/docs/cookies/cookies_stopnormalnimurizeni.cz.pdf";

export const footerContact = {
  name: "Stanislava Vyhlídalová",
  role: "Kontaktní osoba",
  email: "stana.vyhlidalova@cap.cz",
  phone: "+420 773 511 265",
  addressLines: ["Main Point Pankrác", "Milevská 2095/5 140 00 Praha 4"],
};

export const footerColumns = [
  {
    title: "Sociální sítě",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/normalnirizeni/" },
      { label: "Facebook", href: "https://www.facebook.com/normalnirizeni" },
      {
        label: "YouTube",
        href: "https://www.youtube.com/@ceskaasociacepojistoven",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@normalnirizeni?_r=1&_t=ZN-99QAdPi7kHO",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Zásady ochrany osobních údajů",
        href: privacyPolicy,
      },
      { label: "Změna nastavení cookies", modal: "cookies" },
    ],
  },
  {
    title: "Pro média",
    links: [
      {
        label: "Napište nám",
        href: "https://www.cap.cz/tiskove-centrum/kontakty-pro-media",
      },
      { label: "Tiskové zprávy", href: "#dokumenty" },
    ],
  },
];
