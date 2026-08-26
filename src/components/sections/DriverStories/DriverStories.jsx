import glass_1 from "@/assets/glass/glass_cards_right-1.png";
import glass_2 from "@/assets/glass/glass_cards_right-2.png";
import glass_3 from "@/assets/glass/glass_cards_right-3.png";

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
  tablet: {
    x: [50, 0],
    y: [-24, 42],
    scale: [1, 1.5],
    rotate: [-8, 40],
  },
  mobile: {
    x: [50, 0],
    y: [-24, 42],
    scale: [1, 1.5],
    rotate: [-8, 40],
  },
};

const GLASS_MOTION_2 = {
  desktop: {
    x: [-120, -160],
    y: [-120, -220],
    scale: [0.2, 0.4],
    rotate: [0, 70],
  },
  tablet: {
    x: [-10, -60],
    y: [-80, -120],
    scale: [0.2, 0.4],
    rotate: [0, 70],
  },
  mobile: {
    x: [-10, -60],
    y: [-80, -120],
    scale: [0.2, 0.4],
    rotate: [0, 70],
  },
};

const GLASS_MOTION_3 = {
  desktop: {
    x: [-250, -350],
    y: [50, -100],
    scale: [0.2, 0.4],
    rotate: [0, 70],
  },
  tablet: {
    x: [-80, -150],
    y: [20, -60],
    scale: [0.2, 0.3],
    rotate: [0, 70],
  },
  mobile: {
    x: [-80, -150],
    y: [20, -60],
    scale: [0.2, 0.3],
    rotate: [0, 70],
  },
};

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
