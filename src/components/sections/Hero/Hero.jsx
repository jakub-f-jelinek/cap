import heroVideo from "@/assets/video/open-video-hero.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import { useRef } from "react";
import "./Hero.scss";

const SHRINK_END = 1;
const STAT_START = 0.35;
const STAT_END = 0.65;

export default function Hero() {
  const contentRef = useRef(null);
  const textboxRef = useRef(null);
  const statRef = useRef(null);

  const applyExtraProgress = (progress) => {
    // Textbox animation
    const shrink = Math.min(progress / SHRINK_END, 1);

    if (textboxRef.current) {
      const contentWidth = contentRef.current?.clientWidth ?? 0;

      const textboxWidth = textboxRef.current.offsetWidth;

      const centeredOffset = Math.max((contentWidth - textboxWidth) / 2, 0);

      const endOffset = 0;

      const translateX = centeredOffset * (1 - shrink) + endOffset * shrink;

      textboxRef.current.style.transform = `
        translateX(${translateX * 0.92}px)
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

  const { videoRef, wrapperRef, progressRef, seekToProgress } =
    useVideoScrub(applyExtraProgress);

  return (
    <section id="hero" className="hero" ref={wrapperRef}>
      <div className="hero__stage">
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
