import logoCap from "@/assets/images/cap_logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Countdown.scss";

const TARGET_DATE = new Date(2026, 8, 23, 10, 0, 0);

function getTimeLeft() {
  const diff = Math.max(TARGET_DATE.getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1000 * 60 * 60)) % 24,
    minutes: Math.floor(diff / (1000 * 60)) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    isDone: diff <= 0,
  };
}

const pad = (value) => String(value).padStart(2, "0");

// Skrývá web za odpočtem do TARGET_DATE. Po doběhnutí (nebo po stisknutí
// testovacího tlačítka) se odpočet skryje a zobrazí se `children`.
export default function Countdown({ children }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [skipped, setSkipped] = useState(false);

  const isRevealed = timeLeft.isDone || skipped;

  useEffect(() => {
    if (timeLeft.isDone) return undefined;
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [timeLeft.isDone]);

  useEffect(() => {
    if (isRevealed) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRevealed]);

  return (
    <>
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="countdown"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="countdown__logo">
              <img src={logoCap} alt="čap" />
            </div>

            <p className="countdown__eyebrow">Připravujeme něco nového</p>

            <div className="countdown__timer" role="timer" aria-live="polite">
              <div className="countdown__unit">
                <span className="countdown__value">{pad(timeLeft.days)}</span>
                <span className="countdown__label">dní</span>
              </div>
              <div className="countdown__unit">
                <span className="countdown__value">{pad(timeLeft.hours)}</span>
                <span className="countdown__label">hodin</span>
              </div>
              <div className="countdown__unit">
                <span className="countdown__value">
                  {pad(timeLeft.minutes)}
                </span>
                <span className="countdown__label">minut</span>
              </div>
              <div className="countdown__unit">
                <span className="countdown__value">
                  {pad(timeLeft.seconds)}
                </span>
                <span className="countdown__label">vteřin</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isRevealed && children}
    </>
  );
}
