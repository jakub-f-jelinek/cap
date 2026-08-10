import { useLayoutEffect, useRef } from "react";

const LERP_FACTOR = 0.14;
const EPSILON = 0.005;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const interpolate = ([start, end], progress) =>
  start + (end - start) * progress;

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

    const xRange = motion?.x ?? [0, 0];
    const yRange = motion?.y ?? [0, 0];
    const scaleRange = motion?.scale ?? [1, 1];
    const rotateRange = motion?.rotate ?? [0, 0];

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

    computeTarget();
    current = target;
    applyTransform(current);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
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
