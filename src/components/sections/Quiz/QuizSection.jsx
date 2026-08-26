import glassRight_1 from "@/assets/glass/glass_quiz_right-1.png";
import glassRight_2 from "@/assets/glass/glass_quiz_right-2.png";
import glassRight_3 from "@/assets/glass/glass_quiz_right-3.png";

import glassLeft_1 from "@/assets/glass/glass_quiz_left-1.png";
import glassLeft_2 from "@/assets/glass/glass_quiz_left-2.png";
import glassLeft_3 from "@/assets/glass/glass_quiz_left-3.png";
import ScrollGlass from "@/components/common/ScrollGlass.jsx";
import { getQuizResult, quizQuestions } from "@/data/quiz.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import QuizModal from "./QuizModal.jsx";
import "./QuizSection.scss";

const LEFT_GLASS_MOTION_1 = {
  desktop: {
    x: [0, 100],
    y: [-26, 34],
    scale: [1.3, 1.8],
    rotate: [-8, 15],
  },
  tablet: {
    x: [0, 0],
    y: [-26, 34],
    scale: [1.3, 1.8],
    rotate: [-8, 15],
  },
  mobile: {
    x: [0, 0],
    y: [-26, 34],
    scale: [1.3, 1.8],
    rotate: [-8, 15],
  },
};

const LEFT_GLASS_MOTION_2 = {
  desktop: {
    x: [150, 170],
    y: [-100, -150],
    scale: [0.3, 0.4],
    rotate: [0, 50],
  },
  tablet: {
    x: [0, 10],
    y: [-100, -150],
    scale: [0.3, 0.4],
    rotate: [0, 50],
  },
  mobile: {
    x: [0, 10],
    y: [-100, -150],
    scale: [0.3, 0.4],
    rotate: [0, 50],
  },
};

const LEFT_GLASS_MOTION_3 = {
  desktop: {
    x: [220, 280],
    y: [-50, -80],
    scale: [0.2, 0.3],
    rotate: [0, 90],
  },
  tablet: {
    x: [60, 90],
    y: [-50, -80],
    scale: [0.2, 0.3],
    rotate: [0, 90],
  },
  mobile: {
    x: [60, 90],
    y: [-50, -80],
    scale: [0.2, 0.3],
    rotate: [0, 90],
  },
};

const RIGHT_GLASS_MOTION_1 = {
  desktop: {
    x: [24, -20],
    y: [80, 160],
    scale: [1.3, 1.8],
    rotate: [0, -40],
  },

  tablet: {
    x: [24, -20],
    y: [170, 220],
    scale: [1.3, 1.8],
    rotate: [0, -40],
  },
  mobile: {
    x: [0, 80],
    y: [170, 220],
    scale: [1.3, 1.8],
    rotate: [0, -40],
  },
};

const RIGHT_GLASS_MOTION_2 = {
  desktop: {
    x: [-80, -150],
    y: [-120, -140],
    scale: [0.4, 0.6],
    rotate: [0, 90],
  },
  tablet: {
    x: [0, 0],
    y: [-60, -100],
    scale: [0.2, 0.4],
    rotate: [0, 90],
  },
  mobile: {
    x: [0, 0],
    y: [-60, -100],
    scale: [0.2, 0.4],
    rotate: [0, 90],
  },
};

const RIGHT_GLASS_MOTION_3 = {
  desktop: {
    x: [0, 40],
    y: [-150, -180],
    scale: [0.1, 0.2],
    rotate: [0, 90],
  },
  tablet: {
    x: [0, 40],
    y: [-120, -170],
    scale: [0.1, 0.2],
    rotate: [0, 90],
  },
  mobile: {
    x: [0, 40],
    y: [-120, -170],
    scale: [0.1, 0.2],
    rotate: [0, 90],
  },
};

export default function QuizSection() {
  const [started, setStarted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [answers, setAnswers] = useState(() => quizQuestions.map(() => null));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const question = quizQuestions[activeSlide];
  const selectedAnswer = answers[activeSlide];
  const isLastSlide = activeSlide === quizQuestions.length - 1;
  const firstUnansweredSlide = answers.findIndex((answer) => answer === null);
  const maxReachableSlide =
    firstUnansweredSlide === -1
      ? quizQuestions.length - 1
      : firstUnansweredSlide;

  const handleStart = () => {
    setStarted(true);
  };

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
      setShowResult(true);
      return;
    }

    setActiveSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  };

  const handlePaginationClick = (index) => {
    if (index > maxReachableSlide) return;
    setActiveSlide(index);
  };

  const handleRestart = () => {
    setAnswers(quizQuestions.map(() => null));
    setActiveSlide(0);
    setResult(null);
    setShowResult(false);
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
        src={glassRight_1}
        motion={RIGHT_GLASS_MOTION_1}
        offsetY="-50%"
      />
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--right"
        src={glassRight_2}
        motion={RIGHT_GLASS_MOTION_2}
        offsetY="-50%"
      />
      <ScrollGlass
        className="quiz-section__glass quiz-section__glass--right"
        src={glassRight_3}
        motion={RIGHT_GLASS_MOTION_3}
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

        {!started && (
          <button
            type="button"
            className="quiz-section__start-btn"
            onClick={handleStart}
          >
            Spustit test
          </button>
        )}

        {started && (
          <>
            <div
              className="quiz-section__slider"
              role="group"
              aria-label="Řidičský kvíz"
            >
              <div className="btn__container">
                <button
                  type="button"
                  className="quiz-section__nav-btn arrow arrow--left"
                  onClick={handlePrev}
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

            <div
              className="quiz-section__pagination"
              role="tablist"
              aria-label="Otázky kvízu"
            >
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  className={`swiper-pagination-bullet${
                    index === activeSlide
                      ? " swiper-pagination-bullet-active"
                      : ""
                  }`}
                  aria-label={`Otázka ${index + 1}`}
                  aria-selected={index === activeSlide}
                  aria-current={index === activeSlide}
                  onClick={() => handlePaginationClick(index)}
                  disabled={index > maxReachableSlide}
                />
              ))}
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
          </>
        )}
      </div>

      <QuizModal
        isOpen={showResult}
        result={result}
        onClose={() => setShowResult(false)}
        onRestart={handleRestart}
      />
    </section>
  );
}
