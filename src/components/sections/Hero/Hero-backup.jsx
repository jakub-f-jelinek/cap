import heroVideo from "@/assets/video/openart-video.mp4";
import { useScrollScrub } from "@/hooks/useScrollScrub.js";
import { useEffect, useRef } from "react";
import "./Hero.scss";

export default function Hero() {
  const [wrapperRef, progress] = useScrollScrub();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration === 0)
      return;

    const test = progress * video.duration;
    console.log("==test: ", test);
    video.currentTime = progress * video.duration;
  }, [progress]);

  const shrink = Math.min(progress / 0.15, 1);
  const statReveal = Math.min(Math.max((progress - 0.35) / 0.3, 0), 1);

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
              progress * event.currentTarget.duration;
          }}
        />
        <div className="hero__scrim" />

        <div className="hero__content">
          <div
            className="hero__textbox"
            style={{
              transform: `translateX(${shrink * -18}%) scale(${1 - shrink * 0.42})`,
            }}
          >
            <h1>
              Normální
              <br />
              řízení zabíjí
            </h1>
          </div>

          <div
            className="hero__stat"
            style={{
              opacity: statReveal,
              transform: `translateY(${(1 - statReveal) * 24}px)`,
            }}
          >
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
