import { useEffect, useRef } from "react";
import { useScrollScrub } from "./useScrollScrub.js";

// 24 fps → nemá smysl seekovat o méně než jeden frame.
const SEEK_EPSILON = 1 / 24;
const IOS_FRAME_EPSILON = 0.001;

/**
 * Binds a <video> to scroll progress (0 -> 1) the same way as the Hero
 * section: primes the video on iOS (play + pause on the first frame so it
 * actually renders), then seeks currentTime to match scroll position on
 * every scroll tick. `onProgress`, if given, is called with the same raw
 * progress value for callers that need to drive extra effects off it.
 *
 * `minProgress` skips a leading slice of the video (e.g. a black opening
 * frame) by remapping scroll progress 0->1 onto video-time minProgress->1,
 * so motion still starts immediately at the first bit of scroll instead of
 * sitting dead until progress passes minProgress.
 */
export function useVideoScrub(onProgress, { minProgress = 0 } = {}) {
  const videoRef = useRef(null);
  const progressRef = useRef(0);

  const seekToProgress = (video, progress, force = false) => {
    if (!video) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const remappedProgress = minProgress + clampedProgress * (1 - minProgress);
    const duration = video.duration;
    const maxTime = Math.max(duration - IOS_FRAME_EPSILON, 0);
    const baseTargetTime = remappedProgress * duration;

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
        console.warn("Video could not be primed:", error);
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
      console.warn("Video error:", video.error);
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
    seekToProgress(videoRef.current, progress);
    onProgress?.(progress);
  };

  const wrapperRef = useScrollScrub(applyProgress);

  return { videoRef, wrapperRef, progressRef, seekToProgress };
}
