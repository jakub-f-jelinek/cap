import glassRight from "@/assets/glass/glass-18-1.png";
import glassLeft_1 from "@/assets/glass/glass-19-1.png";
import glassLeft_2 from "@/assets/glass/glass-19-2.png";
import glassLeft_3 from "@/assets/glass/glass-19-3.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { useState } from "react";
import QuizModal from "./QuizModal.jsx";
import "./QuizSection.scss";

const LEFT_GLASS_MOTION_1 = {
  x: [-28, 18],
  y: [-26, 34],
  scale: [0.9, 1.08],
  rotate: [-8, 9],
};

const LEFT_GLASS_MOTION_2 = {
  x: [100, 200],
  y: [100, 200],
  scale: [0.3, 0.5],
  rotate: [0, 90],
};

const LEFT_GLASS_MOTION_3 = {
  x: [-28, 18],
  y: [220, 340],
  scale: [0.6, 0.8],
  rotate: [-8, 9],
};

const RIGHT_GLASS_MOTION = {
  x: [24, -20],
  y: [24, -28],
  scale: [0.5, 0.8],
  rotate: [0, -40],
};

export default function QuizSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="test" className="quiz-section section">
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--left"
        src={glassLeft_1}
        motion={LEFT_GLASS_MOTION_1}
        offsetY="-50%"
      />
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--left"
        src={glassLeft_2}
        motion={LEFT_GLASS_MOTION_2}
        offsetY="-50%"
      />
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--left"
        src={glassLeft_3}
        motion={LEFT_GLASS_MOTION_3}
        offsetY="-50%"
      />
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--right"
        src={glassRight}
        motion={RIGHT_GLASS_MOTION}
        offsetY="-50%"
      />

      <div className="container quiz-section__inner">
        <h2>
          Otestujte se.
          <br />
          Jaký jste typ řidiče?
        </h2>
        <p>
          Odpovězte na pár krátkých otázek a zjistěte, jak riskantní je váš styl
          jízdy.
        </p>
        <button
          type="button"
          className="quiz-section__cta"
          onClick={() => setOpen(true)}
        >
          Spustit test
        </button>
      </div>

      <QuizModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}
