import glassRight from "@/assets/glass/glass-18-1.png";
import glassLeft_1 from "@/assets/glass/glass-19-1.png";
import glassLeft_2 from "@/assets/glass/glass-19-2.png";
import glassLeft_3 from "@/assets/glass/glass-19-3.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { getQuizResult, quizQuestions } from "@/data/quiz.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import QuizModal from "./QuizModal.jsx";
import "./QuizSection.scss";

const LEFT_GLASS_MOTION_1 = {
  desktop: {
    x: [-28, 18],
    y: [-26, 34],
    scale: [0.9, 1.08],
    rotate: [-8, 9],
  },
};

const LEFT_GLASS_MOTION_2 = {
  desktop: {
    x: [100, 200],
    y: [100, 200],
    scale: [0.3, 0.5],
    rotate: [0, 90],
  },
};

const LEFT_GLASS_MOTION_3 = {
  desktop: {
    x: [-28, 18],
    y: [220, 340],
    scale: [0.6, 0.8],
    rotate: [-8, 9],
  },
};

const RIGHT_GLASS_MOTION = {
  desktop: {
    x: [24, -20],
    y: [24, -28],
    scale: [0.5, 0.8],
    rotate: [0, -40],
  },
};

export default function QuizSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState(() => quizQuestions.map(() => null));
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState(null);

  const question = quizQuestions[activeSlide];
  const selectedAnswer = answers[activeSlide];
  const isLastSlide = activeSlide === quizQuestions.length - 1;

  const handleAnswerChange = (score) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[activeSlide] = score;
      return next;
    });
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (isLastSlide) {
      const totalScore = answers.reduce((sum, value) => sum + (value ?? 0), 0);
      setResult(getQuizResult(totalScore));
      setResultOpen(true);
      return;
    }

    setActiveSlide((prev) => prev + 1);
  };

  const handleRestart = () => {
    setAnswers(quizQuestions.map(() => null));
    setActiveSlide(0);
    setResult(null);
    setResultOpen(false);
  };

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
          Otestujte se
          <br />
          Jaký jste typ řidiče?
        </h2>
        <p>
          Odpovězte na pár krátkých otázek a zjistěte, jak riskantní je váš styl
          jízdy.
        </p>

        <div
          className="quiz-section__slider"
          role="group"
          aria-label="Řidičský kvíz"
        >
          <div className="btn__container">
            <button
              type="button"
              className="quiz-section__nav-btn arrow arrow--left"
              onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
              disabled={activeSlide === 0}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="quiz-section__slide"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25 }}
            >
              <h3>
                {activeSlide + 1}. {question.question}
              </h3>

              <div
                className="quiz-section__options"
                role="radiogroup"
                aria-label={question.question}
              >
                {question.options.map((option, optionIndex) => {
                  const optionId = `quiz-${activeSlide}-${optionIndex}`;
                  return (
                    <label
                      key={optionId}
                      htmlFor={optionId}
                      className="quiz-section__option"
                    >
                      <input
                        id={optionId}
                        type="radio"
                        name={`quiz-question-${activeSlide}`}
                        checked={selectedAnswer === option.score}
                        onChange={() => handleAnswerChange(option.score)}
                      />
                      <span>{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="btn__container">
            <button
              type="button"
              className="quiz-section__nav-btn quiz-section__nav-btn--next arrow arrow--right"
              onClick={handleNext}
              disabled={selectedAnswer === null}
            />
          </div>
        </div>

        {isLastSlide && selectedAnswer !== null && (
          <button
            type="button"
            className="quiz-section__nav-btn quiz-section__btn--result"
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            Vyhodnotit
          </button>
        )}
      </div>

      <QuizModal
        isOpen={resultOpen}
        result={result}
        onClose={() => setResultOpen(false)}
        onRestart={handleRestart}
      />
    </section>
  );
}
