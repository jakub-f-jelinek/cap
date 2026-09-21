import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsent.jsx";
import { footerColumns } from "@/data/footer.js";
import "./CookieBanner.scss";

const privacyPolicyHref = footerColumns
  .flatMap((column) => column.links)
  .find((link) => link.label === "Zásady ochrany osobních údajů")?.href;

export default function CookieBanner() {
  const {
    consent,
    panel,
    acceptAll,
    rejectOptional,
    save,
    showSettings,
    closePanel,
  } = useCookieConsent();
  const [analytics, setAnalytics] = useState(consent?.analytics === true);
  const rootRef = useRef(null);
  const isSettings = panel === "settings";

  useEffect(() => {
    if (isSettings) setAnalytics(consent?.analytics === true);
  }, [isSettings, consent]);

  // Reopened from the footer: move focus to the bar. Esc dismisses it, but
  // only once a choice exists, so a first-time visitor is never opted in/out
  // by accident.
  useEffect(() => {
    if (!consent || !panel) return undefined;
    rootRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [consent, panel, closePanel]);

  return (
    <AnimatePresence>
      {panel && (
        <motion.div
          ref={rootRef}
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          tabIndex={-1}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container cookie-banner__inner">
            <div className="cookie-banner__text">
              <p className="cookie-banner__title" id="cookie-banner-title">
                Cookies
              </p>
              <p>
                Web používá nezbytné cookies pro svůj provoz. Analytické cookies
                a externí obsah (např. videa z YouTube) zapneme jen s vaším
                souhlasem. Více v{" "}
                <a href={privacyPolicyHref} target="_blank" rel="noreferrer">
                  Zásadách ochrany osobních údajů
                </a>
                .
              </p>

              {isSettings && (
                <ul className="cookie-banner__options">
                  <li>
                    <div>
                      <p className="cookie-banner__option-title">Nezbytné</p>
                      <p>
                        Zajišťují základní fungování webu a uložení této volby.
                        Nelze vypnout.
                      </p>
                    </div>
                    <span className="cookie-banner__always">Vždy zapnuto</span>
                  </li>
                  <li>
                    <div>
                      <p
                        className="cookie-banner__option-title"
                        id="cookie-analytics-label"
                      >
                        Analytické
                      </p>
                      <p>
                        Měření návštěvnosti a externí obsah třetích stran
                        (např. YouTube).
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={analytics}
                      aria-labelledby="cookie-analytics-label"
                      className="cookie-banner__switch"
                      onClick={() => setAnalytics((value) => !value)}
                    />
                  </li>
                </ul>
              )}
            </div>

            <div className="cookie-banner__actions">
              {isSettings ? (
                <>
                  <button type="button" onClick={() => save(analytics)}>
                    Uložit nastavení
                  </button>
                  <button type="button" onClick={acceptAll}>
                    Povolit vše
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={rejectOptional}>
                    Pouze nezbytné
                  </button>
                  <button type="button" onClick={acceptAll}>
                    Povolit vše
                  </button>
                  <button
                    type="button"
                    className="cookie-banner__link"
                    onClick={showSettings}
                  >
                    Nastavení
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
