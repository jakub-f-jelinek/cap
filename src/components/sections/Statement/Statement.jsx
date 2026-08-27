import statementVideo from "@/assets/video/statement-glass.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import { useRef } from "react";
import "./Statement.scss";

const BOX_SCALE_START = 0.4;
const BOX_SCALE_END = 0.8;
const BOX_BLUR_START = 16;
const BOX_BLUR_END = 1;
// Blur má být hotový dřív než scale - doběhne na BOX_BLUR_END už ve 30 %
// scrollu místo až na konci.
const BLUR_END_PROGRESS = 0.1;

export default function Statement() {
  const boxRef = useRef(null);

  const applyExtraProgress = (progress) => {
    if (!boxRef.current) return;

    const scale =
      BOX_SCALE_START + (BOX_SCALE_END - BOX_SCALE_START) * progress;

    const blurProgress = Math.min(progress / BLUR_END_PROGRESS, 1);
    const blur =
      BOX_BLUR_START + (BOX_BLUR_END - BOX_BLUR_START) * blurProgress;

    boxRef.current.style.transform = `scale(${scale})`;
    boxRef.current.style.filter = `blur(${blur}px)`;
  };

  const { videoRef, wrapperRef, progressRef, seekToProgress } =
    useVideoScrub(applyExtraProgress);

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
