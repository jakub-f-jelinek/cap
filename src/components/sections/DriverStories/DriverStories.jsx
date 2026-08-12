import glassAccent from "@/assets/glass/glass-15.png";
import glassAccent24 from "@/assets/glass/glass-26.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { drivers } from "@/data/drivers.js";
import DriverCard from "./DriverCard.jsx";
import "./DriverStories.scss";

const GLASS_MOTION = {
  desktop: {
    x: [-50, -18],
    y: [-24, 42],
    scale: [1.5, 2.5],
    rotate: [-8, 40],
  },
};

const GLASS_MOTION_2 = {
  desktop: {
    x: [-220, -300],
    y: [60, 10],
    scale: [0.6, 1.2],
    rotate: [0, 70],
  },
};

export default function DriverStories() {
  return (
    <section id="pribehy" className="driver-stories section">
      <ScrollGlass
        className="driver-stories__glass"
        src={glassAccent}
        motion={GLASS_MOTION}
      />

      <ScrollGlass
        className="driver-stories__glass_2"
        src={glassAccent24}
        motion={GLASS_MOTION_2}
      />

      <div className="container">
        <p className="section-eyebrow">
          Reálné příběhy
          <br />
          normálních řidičů
        </p>
        <span className="section-rule" />

        <div className="driver-stories__grid">
          {drivers.map((driver, index) => (
            <DriverCard key={driver.name} driver={driver} tint={index * 18} />
          ))}
        </div>
      </div>
    </section>
  );
}
