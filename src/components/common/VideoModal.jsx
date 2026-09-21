import spotVideo from "@/assets/video/cap_video-spot.mp4";
import { useCookieConsent } from "@/context/CookieConsent.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import "./VideoModal.scss";

export default function VideoModal({
  isOpen,
  onClose,
  youtubeId,
  title,
  videoSrc = spotVideo,
}) {
  const { analyticsAllowed, acceptAll } = useCookieConsent();

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
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="video-modal__panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="video-modal__close"
              onClick={onClose}
              aria-label="Zavřít video"
            >
              &times;
            </button>

            {youtubeId && !analyticsAllowed ? (
              <div className="video-modal__placeholder">
                <p>
                  Přehrání videa načte externí obsah z YouTube, který
                  používá cookies.
                </p>
                <button type="button" onClick={acceptAll}>
                  Povolit a přehrát
                </button>
              </div>
            ) : youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : videoSrc ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="video-modal__placeholder">
                <p>Video bude brzy k dispozici.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
