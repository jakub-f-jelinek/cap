import heroVideo from "@/assets/video/openart-video.mp4";
import { useScrollScrub } from "@/hooks/useScrollScrub.js";
import { useEffect, useRef } from "react";
import "./Hero.scss";

const SHRINK_END = 1;
const STAT_START = 0.35;
const STAT_END = 0.65;

// 24 fps → nemá smysl seekovat o méně než jeden frame.
const SEEK_EPSILON = 1 / 24;
const IOS_FRAME_EPSILON = 0.001;

export default function Hero() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const textboxRef = useRef(null);
  const statRef = useRef(null);
  const progressRef = useRef(0);

  const seekToProgress = (video, progress, force = false) => {
    if (!video) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const duration = video.duration;
    const maxTime = Math.max(duration - IOS_FRAME_EPSILON, 0);
    const baseTargetTime = clampedProgress * duration;

    // Některé iOS buildy nerady renderují frame přesně na t=0.
    const targetTime = Math.min(
      Math.max(baseTargetTime, IOS_FRAME_EPSILON),
      maxTime,
    );

    if (force || Math.abs(video.currentTime - targetTime) > SEEK_EPSILON) {
      video.currentTime = targetTime;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("autoplay", "");

    const primeVideo = async () => {
      if (cancelled) return;

      try {
        // Na iOS je důležité skutečně spustit video.
        // muted + playsInline umožní autoplay bez user gesture.
        await video.play();

        if (cancelled) return;

        // Nechat Safari vyrenderovat alespoň jeden frame.
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });

        if (cancelled) return;

        // Video nechceme nechat běžet.
        video.pause();

        // Teprve po skutečném přehrání prvního framu
        // nastavíme pozici podle aktuálního scroll progressu.
        seekToProgress(video, progressRef.current, true);
      } catch (error) {
        // Safari může play() odmítnout.
        // Není potřeba shodit celou komponentu.
        console.warn("Hero video could not be primed:", error);
        seekToProgress(video, progressRef.current, true);
      }
    };

    const handleLoadedData = () => {
      primeVideo();
    };

    const handleLoadedMetadata = () => {
      seekToProgress(video, progressRef.current, true);
    };

    const handleError = () => {
      console.warn("Hero video error:", video.error);
    };

    video.addEventListener("loadeddata", handleLoadedData, {
      once: true,
    });
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    video.addEventListener("error", handleError);

    // Pokud už je první frame načtený, nemusíme čekat na event.
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      primeVideo();
    }

    return () => {
      cancelled = true;

      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      video.removeEventListener("error", handleError);
    };
  }, []);

  const applyProgress = (progress) => {
    progressRef.current = progress;

    const video = videoRef.current;

    seekToProgress(video, progress);

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

  const wrapperRef = useScrollScrub(applyProgress);

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
