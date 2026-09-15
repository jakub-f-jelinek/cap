import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import "./PrivacyPolicyModal.scss";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="privacy-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Zásady ochrany osobních údajů"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="privacy-modal__panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="privacy-modal__close"
              onClick={onClose}
              aria-label="Zavřít"
            >
              &times;
            </button>

            <div className="privacy-modal__content">
              <h2>Zásady ochrany osobních údajů</h2>

              <h3>1. Správce webových stránek</h3>
              <p>Správcem těchto webových stránek je:</p>
              <p>
                <strong>[Název společnosti]</strong>
                <br />
                IČO: <strong>[IČO]</strong>
                <br />
                Sídlo: <strong>[adresa]</strong>
                <br />
                E-mail: <strong>[kontaktní e-mail]</strong>
              </p>
              <p>(dále jen „správce&quot;).</p>

              <h3>2. Zpracování osobních údajů</h3>
              <p>
                Tyto webové stránky slouží především k poskytování informací o
                činnosti společnosti, jejích službách a aktivitách.
              </p>
              <p>
                Prostřednictvím těchto webových stránek správce standardně
                nevyžaduje po návštěvnících zadávání osobních údajů. Webové
                stránky neobsahují kontaktní formulář ani registrační či
                objednávkový systém.
              </p>
              <p>
                Pokud návštěvník kontaktuje správce prostřednictvím e-mailu
                nebo jiným způsobem mimo tyto webové stránky, mohou být
                zpracovány osobní údaje obsažené v příslušné komunikaci. Tyto
                údaje jsou zpracovávány pouze v rozsahu nezbytném pro
                vyřízení komunikace a případně pro splnění souvisejících
                právních povinností.
              </p>

              <h3>3. Cookies a obdobné technologie</h3>
              <p>
                Tyto webové stránky nepoužívají analytické ani marketingové
                cookies a nejsou prostřednictvím nich používány nástroje
                určené ke sledování návštěvníků za účelem profilování nebo
                cílené reklamy.
              </p>
              <p>
                Webové stránky mohou využívat pouze technické prostředky
                nezbytné pro jejich řádný a bezpečný provoz.
              </p>

              <h3>4. Odkazy na sociální sítě a jiné webové stránky</h3>
              <p>
                Webové stránky obsahují přímé odkazy na profily společnosti a
                na konkrétní obsah zveřejněný na sociálních sítích, například
                Instagram, YouTube a dalších platformách.
              </p>
              <p>
                Jedná se pouze o odkazy na externí webové stránky. Obsah
                těchto služeb není do těchto webových stránek přímo vložen.
              </p>
              <p>
                Po kliknutí na odkaz návštěvník opouští tyto webové stránky a
                další zpracování osobních údajů se řídí pravidly a zásadami
                ochrany osobních údajů příslušného provozovatele sociální
                sítě nebo jiné externí služby.
              </p>

              <h3>5. Soubory ke stažení</h3>
              <p>
                Webové stránky mohou obsahovat soubory ke stažení, zejména
                tiskové zprávy a dokumenty ve formátu PDF.
              </p>
              <p>
                Stažením těchto souborů nejsou ze strany správce
                prostřednictvím těchto webových stránek vyžadovány žádné
                osobní údaje.
              </p>

              <h3>6. Práva návštěvníků</h3>
              <p>
                Pokud správce zpracovává vaše osobní údaje, máte v rozsahu
                stanoveném platnými právními předpisy zejména právo
                požadovat přístup ke svým osobním údajům, jejich opravu nebo
                výmaz, případně omezení zpracování, a právo vznést námitku
                proti zpracování.
              </p>
              <p>
                Máte také právo podat stížnost u Úřadu pro ochranu osobních
                údajů, pokud se domníváte, že při zpracování vašich osobních
                údajů dochází k porušení právních předpisů.
              </p>

              <h3>7. Kontakt</h3>
              <p>
                V případě dotazů týkajících se zpracování osobních údajů
                můžete správce kontaktovat na:
              </p>
              <p>
                <strong>[kontaktní e-mail]</strong>
              </p>

              <h3>8. Aktualizace zásad</h3>
              <p>
                Tyto zásady mohou být v případě potřeby aktualizovány,
                zejména pokud dojde ke změně funkcí nebo způsobu provozu
                těchto webových stránek.
              </p>
              <p>
                <strong>Poslední aktualizace: [datum]</strong>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
