import heroVideo from "@/assets/video/openart-video.mp4";
import { useScrollScrub } from "@/hooks/useScrollScrub.js";
import { useEffect, useRef } from "react";
import "./Hero.scss";

const SHRINK_END = 1;
const STAT_START = 0.35;
const STAT_END = 0.65;
// Skip re-seeking for sub-frame differences — avoids redundant decode work.
const SEEK_EPSILON = 1 / 60;

export default function Hero() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const textboxRef = useRef(null);
  const statRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    videoRef.current?.pause();
  }, []);

  const applyProgress = (progress) => {
    progressRef.current = progress;

    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const targetTime = progress * video.duration;
      if (Math.abs(video.currentTime - targetTime) > SEEK_EPSILON) {
        video.currentTime = targetTime;
      }
    }

    const shrink = Math.min(progress / SHRINK_END, 1);
    if (textboxRef.current) {
      const contentWidth = contentRef.current?.clientWidth ?? 0;
      console.log("===shrink: ", shrink);
      const textboxWidth = textboxRef.current.offsetWidth;
      const centeredOffset = Math.max((contentWidth - textboxWidth) / 2, 0);
      // const endOffset = textboxWidth * 0;
      const endOffset = 0;
      // const translateX = centeredOffset * (1 - shrink) + endOffset * shrink;
      const translateX = centeredOffset * (1 - shrink) + endOffset * shrink;

      console.log("===translateX: ", translateX);

      textboxRef.current.style.transform = `translateX(${translateX * 0.92}px) scale(${1 - shrink * 0.42})`;
    }

    const statReveal = Math.min(
      Math.max((progress - STAT_START) / (STAT_END - STAT_START), 0),
      1,
    );
    if (statRef.current) {
      statRef.current.style.opacity = String(statReveal);
      statRef.current.style.transform = `translateY(${(1 - statReveal) * 24}px)`;
    }
  };

  const wrapperRef = useScrollScrub(applyProgress);

  return (
    <section id="hero" className="hero" ref={wrapperRef}>
      <div className="hero__stage">
        <video
          ref={videoRef}
          className="hero__video"
          src={heroVideo}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime =
              progressRef.current * event.currentTarget.duration;
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
