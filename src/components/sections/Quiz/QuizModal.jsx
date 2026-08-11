import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, XIcon } from "./Icons";
import "./QuizModal.scss";

const POPUP_FEATURES = "noopener,noreferrer,width=640,height=700";

const SHARE_NETWORKS = {
  facebook: { label: "Sdílet na Facebooku", Icon: FacebookIcon },
  instagram: { label: "Sdílet na Instagramu", Icon: InstagramIcon },
  whatsapp: { label: "Sdílet na WhatsAppu", Icon: WhatsAppIcon },
  x: { label: "Sdílet na X", Icon: XIcon },
};

export default function QuizModal({ isOpen, onClose, onRestart, result }) {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = result
    ? `Můj výsledek v kvízu: ${result.label}. ${result.description}`
    : "";

  const openShare = async (platform) => {
    if (!result) return;

    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(shareText);

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
        "_blank",
        POPUP_FEATURES,
      );
      return;
    }

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        "_blank",
        POPUP_FEATURES,
      );
      return;
    }

    if (platform === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        "_blank",
        POPUP_FEATURES,
      );
      return;
    }

    if (platform === "instagram") {
      const sharePayload = `${shareText} ${pageUrl}`.trim();
      try {
        if (navigator.share) {
          await navigator.share({
            title: result.label,
            text: shareText,
            url: pageUrl,
          });
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(sharePayload);
        }
      } catch {
        // Keep fallback behavior silent when user cancels the native share dialog.
      }
      window.open("https://www.instagram.com/", "_blank", POPUP_FEATURES);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !result) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="quiz-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Jaký jste typ řidiče"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="quiz-modal__panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="quiz-modal__close"
            onClick={onClose}
            aria-label="Zavřít test"
          >
            &times;
          </button>

          <motion.div
            key={result.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="quiz-modal__result"
          >
            <div
              className="quiz-modal__result-bg"
              style={{ backgroundImage: `url(${result.image})` }}
            />
            <div className="quiz-modal__result--content">
              <h3>{result.label}</h3>

              <p className="quiz-modal__description">{result.description}</p>

              <div className="quiz-modal__share">
                {Object.entries(SHARE_NETWORKS).map(
                  ([platform, { label, Icon }]) => (
                    <button
                      type="button"
                      key={platform}
                      className="quiz-modal__share-btn"
                      aria-label={label}
                      title={label}
                      onClick={() => {
                        void openShare(platform);
                      }}
                    >
                      <Icon />
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* <button
              type="button"
              className="quiz-modal__restart"
              onClick={onRestart}
            >
              Zkusit znovu
            </button> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
