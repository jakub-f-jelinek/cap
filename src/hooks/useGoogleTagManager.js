import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsent.jsx";

const GTM_ID = "GTM-MQ4B6MWS";
const SCRIPT_ID = "gtm-script";

const toState = (allowed) => (allowed ? "granted" : "denied");

/**
 * Google Consent Mode v2. index.html sets every signal to "denied" before
 * anything else runs; here GTM is loaded and the visitor's cookie choice is
 * forwarded to it. The consent update is declared before the loader so a
 * returning visitor's stored choice reaches GTM before its tags fire.
 */
export function useGoogleTagManager() {
  const { analyticsAllowed, marketingAllowed } = useCookieConsent();

  useEffect(() => {
    window.gtag("consent", "update", {
      analytics_storage: toState(analyticsAllowed),
      ad_storage: toState(marketingAllowed),
      ad_user_data: toState(marketingAllowed),
      ad_personalization: toState(marketingAllowed),
    });
  }, [analyticsAllowed, marketingAllowed]);

  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, []);
}
