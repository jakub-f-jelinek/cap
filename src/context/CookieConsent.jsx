import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Bump when the purposes of the cookies change so visitors are asked again.
const CONSENT_VERSION = 1;
const STORAGE_KEY = "cookie-consent";

const CookieConsentContext = createContext(null);

function readConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.version === CONSENT_VERSION) return stored;
  } catch {
    // Storage unavailable or corrupted: treat as no decision yet.
  }
  return null;
}

function writeConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage unavailable: the choice only lasts for this page view.
  }
}

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(readConsent);
  // null = hidden, "banner" = compact bar, "settings" = bar with toggles
  const [panel, setPanel] = useState(() => (readConsent() ? null : "banner"));

  const save = useCallback((analytics) => {
    const next = {
      version: CONSENT_VERSION,
      analytics,
      timestamp: new Date().toISOString(),
    };
    writeConsent(next);
    setConsent(next);
    setPanel(null);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      analyticsAllowed: consent?.analytics === true,
      panel,
      acceptAll: () => save(true),
      rejectOptional: () => save(false),
      save,
      showSettings: () => setPanel("settings"),
      closePanel: () => setPanel(null),
    }),
    [consent, panel, save],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }
  return context;
}
