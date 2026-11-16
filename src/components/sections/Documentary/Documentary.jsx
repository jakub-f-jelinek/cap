import VideoModal from "@/components/common/VideoModal.jsx";
import { useState } from "react";
import "./Documentary.scss";

export default function Documentary() {
  const [open, setOpen] = useState(false);

  return (
    <section id="dokument" className="documentary section">
      <div className="documentary__bg"></div>
      <div className="container documentary__layout">
        {/* Empty div - parent element is grid */}
        <div></div>

        <div className="documentary__copy">
          <h2 className="section-eyebrow">
            Dokumentární film
            <br />
            Jediná vteřina
          </h2>
          <span className="section-rule" />
          <p className="documentary__lead">
            Stačí jediná vteřina a normální řízení může zabíjet
          </p>
          <p className="documentary__text">
            Co když za tragickými nehodami nestojí jen piráti silnic, ale často
            i úplně normální řidiči? Podívejte se na celovečerní dokument Víta
            Klusáka Jediná vteřina. Vypráví příběhy lidí, kterým chyba za
            volantem změnila v jediné vteřině život. Chyba, kterou většina z nás
            považuje za normální řízení.
          </p>

          <div className="documentary__actions">
            <a
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.oneplay.cz/film/446502-jedina-vterina?utm_source=google&utm_medium=cpc&utm_campaign=Oneplay_GAds_PMax_Film_446502_JedinaVterina_26-11&utm_id=24464103560&gad_source=1&gad_campaignid=24464107115&gbraid=0AAAAA-hzIN_oeJ6J1dCV3vuL272PtoQXy&gclid=Cj0KCQiAzeXXBhCGARIsADO5-zGi3llTcNZ9ohPA_uSpxGOszr5tZvF4xSl5EHoJMZfnYnhoE4ztN3kaAmicEALw_wcB"
            >
              Přehrát dokument
            </a>

            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setOpen(true)}
            >
              Přehrát trailer
            </button>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={open}
        youtubeId="DpfKp8ulORk"
        onClose={() => setOpen(false)}
        title="Jediná vteřina"
      />
    </section>
  );
}
