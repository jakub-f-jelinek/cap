import statementVideo from "@/assets/video/statement-glass.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import { useRef } from "react";
import "./Statement.scss";

const BOX_SCALE_START = 0.4;
const BOX_SCALE_END = 0.8;
const BOX_BLUR_START = 16;
const BOX_BLUR_END = 1;
const BOX_OPACITY_START = 0;
const BOX_OPACITY_END = 1;

// Video má na startu skoro černý obraz, než praskne sklo - přeskočíme
// prvních pár % stopáže, ať scroll hned něco ukazuje místo černé.
const VIDEO_MIN_PROGRESS = 0.05;

// Opacity a blur mají doběhnout na finální hodnotu dřív než scale (ten běží
// až do konce scrollu), ale postupně - ne skoro okamžitě.
const SHATTER_PROGRESS = 0.8;

export default function Statement() {
  const boxRef = useRef(null);

  const applyExtraProgress = (progress) => {
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
    applyExtraProgress,
    { minProgress: VIDEO_MIN_PROGRESS },
  );

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
