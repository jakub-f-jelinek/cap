import statementVideo from "@/assets/video/statement-glass.mp4";
import { useVideoScrub } from "@/hooks/useVideoScrub.js";
import "./Statement.scss";

export default function Statement() {
  const { videoRef, wrapperRef, progressRef, seekToProgress } =
    useVideoScrub();

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
          <div className="statement__box">
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
