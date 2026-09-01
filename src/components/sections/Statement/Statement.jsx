import statementVideo from "@/assets/video/statement-glass.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import { useLayoutEffect, useRef } from "react";
import "./Statement.scss";

const BOX_SCALE_START = 0.2;
const BOX_SCALE_END = 1;
const BOX_BLUR_START = 5;
const BOX_BLUR_END = 0;
const BOX_OPACITY_START = 0;
const BOX_OPACITY_END = 1;

// Video má na startu skoro černý obraz, než praskne sklo - přeskočíme
// prvních pár % stopáže, ať scroll hned něco ukazuje místo černé.
const VIDEO_MIN_PROGRESS = 0.05;

// Opacity a blur mají doběhnout na finální hodnotu dřív než scale (ten běží
// až do konce scrollu), ale postupně - ne skoro okamžitě.
// const SHATTER_PROGRESS = 0.45;
const SHATTER_PROGRESS = 0.8;

// Stejný smoothing jako v useScrollScrub, ať boxová animace drží stejný
// "feel" jako video scrubbing.
const LERP_FACTOR = 0.2;
const EPSILON = 0.0005;

export default function Statement() {
  const boxRef = useRef(null);

  const applyBoxProgress = (progress) => {
    if (!boxRef.current) return;

    const scale =
      BOX_SCALE_START + (BOX_SCALE_END - BOX_SCALE_START) * progress;

    const shatterProgress = Math.min(progress / SHATTER_PROGRESS, 1);
    const blur =
      BOX_BLUR_START + (BOX_BLUR_END - BOX_BLUR_START) * shatterProgress;
    const opacity =
      BOX_OPACITY_START +
      (BOX_OPACITY_END - BOX_OPACITY_START) * shatterProgress;

    boxRef.current.style.transform = `scale(${scale})`;
    boxRef.current.style.filter = `blur(${blur}px)`;
    boxRef.current.style.opacity = String(opacity);
  };

  const { videoRef, wrapperRef, progressRef, seekToProgress } = useVideoScrub(
    undefined,
    { minProgress: VIDEO_MIN_PROGRESS },
  );

  // Video scrubbing (výše) běží jen po dobu, kdy je sekce sticky-pinned -
  // stejný "progress" proto stojí na 0, dokud se sekce celá nenajede na
  // výšku viewportu. Boxová animace ale má začít už během najíždění sekce
  // zezdola, takže si počítáme vlastní progress z celé výšky wrapperu (ne
  // jen ze "scrollable" části po připnutí): 0 když se sekce teprve objevuje
  // u spodní hrany obrazovky, 1 na konci scrollu sekcí.
  useLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;

    let target = 0;
    let current = 0;
    let frame = null;

    const computeTarget = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const wrapperHeight = node.offsetHeight || 1;
      const raw = (viewportHeight - rect.top) / wrapperHeight;
      target = Math.min(Math.max(raw, 0), 1);
    };

    const tick = () => {
      const delta = target - current;
      current =
        Math.abs(delta) < EPSILON ? target : current + delta * LERP_FACTOR;
      applyBoxProgress(current);
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
    applyBoxProgress(current);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="statement" className="statement" ref={wrapperRef}>
      <div className="statement__stage">
        <video
          ref={videoRef}
          className="statement__video"
          src={statementVideo}
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onLoadedMetadata={(event) => {
            seekToProgress(event.currentTarget, progressRef.current, true);
          }}
        />

        <div className="statement__scrim" />

        <div className="container">
          <div ref={boxRef} className="statement__box">
            <h2>
              Normální řízení zabíjí,
              <br />i když si to nepřipouštíme
            </h2>
            <p>
              Při řízení děláme často drobné prohřešky. Občas jedeme o něco
              rychleji. Podíváme se na telefon. Nedodržujeme bezpečný odstup.
              Projedeme na oranžovou… Připadá nám to normální.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
