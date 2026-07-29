import placeholder from "@/assets/images/img-placeholder.png";
import PlayButton from "@/components/common/PlayButton.jsx";
import StatCounter from "@/components/common/StatCounter.jsx";
import VideoModal from "@/components/common/VideoModal.jsx";
import { useState } from "react";
import "./VideoStats.scss";

const stats = [
  { value: 32, label: "Smrtelných dopravních nehod způsobuje normální řízení" },
  { value: 67, label: "Řidičů běžně překračuje rychlost" },
  { value: 48, label: "Řidičů nedává blinkr při změně směru jízdy" },
];

export default function VideoStats() {
  const [open, setOpen] = useState(false);

  return (
    <section id="fakta" className="video-stats section">
      <div className="container">
        <button
          type="button"
          className="video-stats__thumb"
          onClick={() => setOpen(true)}
          aria-label="Přehrát video"
        >
          <img src={placeholder} />
          <span className="video-stats__thumb-scrim" />
          <PlayButton size="lg" />
        </button>

        <div className="video-stats__grid">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Normální řízení zabíjí"
      />
    </section>
  );
}
