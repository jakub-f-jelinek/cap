import glass_1 from "@/assets/glass/glass_cards_right-1.png";
import glass_2 from "@/assets/glass/glass_cards_right-2.png";
import glass_3 from "@/assets/glass/glass_cards_right-3.png";

import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { drivers } from "@/data/drivers.js";
import DriverCard from "./DriverCard.jsx";
import "./DriverStories.scss";
import {
  GLASS_MOTION,
  GLASS_MOTION_2,
  GLASS_MOTION_3,
} from "./ImagesCoordinates.js";

export default function DriverStories() {
  return (
    <section id="pribehy" className="driver-stories section">
      <ScrollGlass
        className="driver-stories__glass"
        src={glass_1}
        motion={GLASS_MOTION}
      />

      <ScrollGlass
        className="driver-stories__glass_2"
        src={glass_2}
        motion={GLASS_MOTION_2}
      />

      <ScrollGlass
        className="driver-stories__glass_2"
        src={glass_3}
        motion={GLASS_MOTION_3}
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
