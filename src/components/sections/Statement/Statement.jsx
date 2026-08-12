import glassRight from "@/assets/glass/glass-40.png";
import glassLeft from "@/assets/glass/glass-44.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import "./Statement.scss";

const LEFT_GLASS_MOTION = {
  desktop: {
    x: [-36, 24],
    y: [-18, 28],
    scale: [0.88, 1.08],
    rotate: [-12, 6],
  },
};

const RIGHT_GLASS_MOTION = {
  desktop: {
    x: [32, -22],
    y: [18, -22],
    scale: [1.06, 0.9],
    rotate: [-6, 12],
  },
};

export default function Statement() {
  return (
    <section id="statement" className="statement section">
      <ScrollGlass
        className="statement__glass statement__glass--left"
        src={glassLeft}
        motion={LEFT_GLASS_MOTION}
        offsetY="-50%"
      />
      <ScrollGlass
        className="statement__glass statement__glass--right"
        src={glassRight}
        motion={RIGHT_GLASS_MOTION}
        offsetY="-50%"
        flipX
      />

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
    </section>
  );
}
