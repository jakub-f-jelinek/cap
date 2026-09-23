import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsent.jsx";

const GTM_ID = "GTM-MQ4B6MWS";
const SCRIPT_ID = "gtm-script";

/**
 * Loads Google Tag Manager once the visitor has accepted analytics
 * cookies in the cookie banner, and never before. Injects the script
 * the same way GTM's own install snippet does, so no changes to
 * index.html are needed.
 */
export function useGoogleTagManager() {
  const { analyticsAllowed } = useCookieConsent();

  useEffect(() => {
    if (!analyticsAllowed || document.getElementById(SCRIPT_ID)) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, [analyticsAllowed]);
}
