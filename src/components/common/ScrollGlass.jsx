import { useLayoutEffect, useRef } from "react";

const LERP_FACTOR = 0.14;
const EPSILON = 0.005;

// Keep in sync with $bp-mobile / $bp-tablet in src/styles/_variables.scss
const BP_MOBILE = 480;
const BP_TABLET = 768;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const interpolate = ([start, end], progress) =>
  start + (end - start) * progress;

const getViewport = (width) => {
  if (width <= BP_MOBILE) return "mobile";
  if (width <= BP_TABLET) return "tablet";
  return "desktop";
};

// motion accepts either a single { x, y, scale, rotate } object, or a
// { desktop, tablet, mobile } map of such objects. Desktop is always the
// fallback when tablet/mobile entries are missing.
const isBreakpointMotion = (motion) =>
  motion != null &&
  ("desktop" in motion || "tablet" in motion || "mobile" in motion);

const resolveMotionForViewport = (motion, viewport) => {
  const { desktop: desktopMotion, tablet: tabletMotion, mobile: mobileMotion } =
    isBreakpointMotion(motion) ? motion : { desktop: motion };

  if (viewport === "mobile") return mobileMotion ?? desktopMotion;
  if (viewport === "tablet") return tabletMotion ?? desktopMotion;
  return desktopMotion;
};

export default function ScrollGlass({
  className,
  src,
  alt = "",
  motion,
  baseScale = 1,
  offsetX = "0px",
  offsetY = "0px",
  flipX = false,
}) {
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const node = imageRef.current;
    if (!node) return undefined;

    let xRange = [0, 0];
    let yRange = [0, 0];
    let scaleRange = [1, 1];
    let rotateRange = [0, 0];

    const updateRanges = () => {
      const viewportMotion = resolveMotionForViewport(
        motion,
        getViewport(window.innerWidth),
      );

      xRange = viewportMotion?.x ?? [0, 0];
      yRange = viewportMotion?.y ?? [0, 0];
      scaleRange = viewportMotion?.scale ?? [1, 1];
      rotateRange = viewportMotion?.rotate ?? [0, 0];
    };

    let target = 0;
    let current = 0;
    let frame = null;

    const applyTransform = (progress) => {
      const x = interpolate(xRange, progress);
      const y = interpolate(yRange, progress);
      const scale = interpolate(scaleRange, progress) * baseScale;
      const rotate = interpolate(rotateRange, progress);
      const flipScale = flipX ? -1 : 1;

      node.style.transform = [
        `translate3d(calc(${offsetX} + ${x}px), calc(${offsetY} + ${y}px), 0)`,
        `rotate(${rotate}deg)`,
        `scale(${scale * flipScale}, ${scale})`,
      ].join(" ");
    };

    const computeTarget = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      target = clamp(raw, 0, 1);
    };

    const tick = () => {
      const delta = target - current;
      current =
        Math.abs(delta) < EPSILON ? target : current + delta * LERP_FACTOR;
      applyTransform(current);
      frame =
        Math.abs(target - current) > EPSILON
          ? requestAnimationFrame(tick)
          : null;
    };

    const requestTick = () => {
      computeTarget();
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      updateRanges();
      requestTick();
    };

    updateRanges();
    computeTarget();
    current = target;
    applyTransform(current);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", handleResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [baseScale, flipX, motion, offsetX, offsetY]);

  return (
    <img
      ref={imageRef}
      className={className}
      src={src}
      alt={alt}
      aria-hidden="true"
      loading="lazy"
    />
  );
}
