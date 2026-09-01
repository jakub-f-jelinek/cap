// import heroVideo from "@/assets/video/open-video-hero.mp4";
import heroVideo from "@/assets/video/cap-openart-video.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import { useLayoutEffect, useRef } from "react";
import "./Hero.scss";

const SHRINK_END = 1;
const STAT_START = 0.35;
const STAT_END = 0.65;

// Video má na startu skoro černý obraz - přeskočíme prvních 10 % stopáže,
// ať scroll hned něco ukazuje místo černé.
const VIDEO_MIN_PROGRESS = 0.12;

export default function Hero() {
  const contentRef = useRef(null);
  const stageRef = useRef(null);
  const textboxRef = useRef(null);
  const statRef = useRef(null);
  // Přirozená (netransformovaná) pozice textboxu podle CSS flow, měřená
  // relativně vůči .hero__stage - měří se jen při mountu/resize, ať se z ní
  // dá dopočítat posun do středu obrazovky.
  //
  // Musí to být relativně vůči stage, ne vůči viewportu: stage je sticky, a
  // pokud se přeměření spustí (např. přes "resize", který na mobilu vyvolá
  // i schování/zobrazení adresního řádku při scrollu) ve chvíli, kdy je Hero
  // odscrollovaná mimo obrazovku, stage není "přilepená" nahoře a
  // getBoundingClientRect() by vrátil úplně jinou (posunutou) pozici.
  const naturalTextboxRef = useRef({ left: 0, top: 0, width: 0, height: 0 });

  const measureNaturalTextbox = () => {
    const textbox = textboxRef.current;
    const stage = stageRef.current;
    if (!textbox || !stage) return;

    const previousTransform = textbox.style.transform;
    textbox.style.transform = "none";
    const textboxRect = textbox.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    textbox.style.transform = previousTransform;

    naturalTextboxRef.current = {
      left: textboxRect.left - stageRect.left,
      top: textboxRect.top - stageRect.top,
      width: textboxRect.width,
      height: textboxRect.height,
    };
  };

  useLayoutEffect(() => {
    measureNaturalTextbox();
    window.addEventListener("resize", measureNaturalTextbox);
    return () => window.removeEventListener("resize", measureNaturalTextbox);
  }, []);

  const applyExtraProgress = (progress) => {
    // Textbox animation
    const shrink = Math.min(progress / SHRINK_END, 1);

    if (textboxRef.current) {
      const { left, top, width, height } = naturalTextboxRef.current;

      // Na startu (shrink 0) má být textbox přesně na středu obrazovky (X i Y),
      // na konci (shrink 1) v přirozené pozici dané CSS flow (offset 0).
      // Stage je vždy přilepená na (0, 0) viewportu, dokud se shrink počítá
      // (mimo tento rozsah je translate stejně vynulovaný přes (1 - shrink)),
      // takže offset vůči stage je totéž co offset vůči viewportu.
      const centeredOffsetX = window.innerWidth / 2 - (left + width / 2);
      const centeredOffsetY = window.innerHeight / 2 - (top + height / 2);

      const translateX = centeredOffsetX * (1 - shrink);
      const translateY = centeredOffsetY * (1 - shrink);

      textboxRef.current.style.transform = `
        translate(${translateX}px, ${translateY}px)
        scale(${1 - shrink * 0.42})
      `;
    }

    // Stats reveal
    const statReveal = Math.min(
      Math.max((progress - STAT_START) / (STAT_END - STAT_START), 0),
      1,
    );

    if (statRef.current) {
      statRef.current.style.opacity = String(statReveal);

      statRef.current.style.transform = `translateY(${(1 - statReveal) * 24}px)`;
    }
  };

  const { videoRef, wrapperRef, progressRef, seekToProgress } = useVideoScrub(
    applyExtraProgress,
    { minProgress: VIDEO_MIN_PROGRESS },
  );

  return (
    <section id="hero" className="hero" ref={wrapperRef}>
      <div className="hero__stage" ref={stageRef}>
        <video
          ref={videoRef}
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onLoadedMetadata={(event) => {
            seekToProgress(event.currentTarget, progressRef.current, true);
          }}
        />

        <div className="hero__scrim" />

        <div ref={contentRef} className="hero__content">
          <div ref={textboxRef} className="hero__textbox">
            <h1>
              Normální
              <br />
              řízení zabíjí
            </h1>
          </div>

          <div ref={statRef} className="hero__stat">
            <p className="hero__stat-number">420 ŽIVOTŮ</p>

            <span className="section-rule" />

            <p className="hero__stat-copy">
              Chování, které při řízení považujeme za normální, si od 1. ledna
              2026 vyžádalo 420 životů.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
