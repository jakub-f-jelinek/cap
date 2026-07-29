import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quizQuestions, quizResults } from '@/data/quiz.js'
import './QuizModal.scss'

const getResult = (score) =>
  quizResults.find((result) => score >= result.minScore && score <= result.maxScore) ?? quizResults[0]

export default function QuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!isOpen) return undefined
    setStep(0)
    setScore(0)
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isFinished = step >= quizQuestions.length
  const question = quizQuestions[step]

  const handleAnswer = (optionScore) => {
    setScore((prev) => prev + optionScore)
    setStep((prev) => prev + 1)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="quiz-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Jaký jste typ řidiče"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="quiz-modal__panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="quiz-modal__close" onClick={onClose} aria-label="Zavřít test">
            &times;
          </button>

          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <p className="quiz-modal__step">
                  {step + 1}. {question.question}
                </p>
                <div className="quiz-modal__options">
                  {question.options.map((option) => (
                    <button
                      type="button"
                      key={option.label}
                      className="quiz-modal__option"
                      onClick={() => handleAnswer(option.score)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="quiz-modal__result"
              >
                <p className="section-eyebrow">Váš výsledek</p>
                <h3>{getResult(score).label}</h3>
                <p>{getResult(score).description}</p>
                <button
                  type="button"
                  className="quiz-modal__restart"
                  onClick={() => {
                    setStep(0)
                    setScore(0)
                  }}
                >
                  Zkusit znovu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
