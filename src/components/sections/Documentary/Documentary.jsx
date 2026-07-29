import phoneMockup from "@/assets/images/documentary-phone.png";
import PlayButton from "@/components/common/PlayButton.jsx";
import VideoModal from "@/components/common/VideoModal.jsx";
import { useState } from "react";
import "./Documentary.scss";

export default function Documentary() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="dokument"
      className="documentary section"
      style={{ backgroundImage: `url(${phoneMockup})` }}
    >
      <div className="container documentary__layout">
        <button
          type="button"
          className="documentary__thumb"
          onClick={() => setOpen(true)}
          aria-label="Přehrát dokument Jediná vteřina"
        >
          <PlayButton size="md" />
        </button>

        <div className="documentary__copy">
          <p className="section-eyebrow">
            Dokumentární film
            <br />
            Jediná vteřina
          </p>
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
        </div>
      </div>

      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Jediná vteřina"
      />
    </section>
  );
}
