import { useState } from 'react'
import QuizModal from './QuizModal.jsx'
import glassLeft from '@/assets/glass/glass-1.png'
import glassRight from '@/assets/glass/glass-44.png'
import './QuizSection.scss'

export default function QuizSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="test" className="quiz-section section">
      <img className="quiz-section__glass quiz-section__glass--left" src={glassLeft} alt="" aria-hidden="true" loading="lazy" />
      <img className="quiz-section__glass quiz-section__glass--right" src={glassRight} alt="" aria-hidden="true" loading="lazy" />

      <div className="container quiz-section__inner">
        <h2>
          Otestujte se.
          <br />
          Jaký jste typ řidiče?
        </h2>
        <p>Odpovězte na pár krátkých otázek a zjistěte, jak riskantní je váš styl jízdy.</p>
        <button type="button" className="quiz-section__cta" onClick={() => setOpen(true)}>
          Spustit test
        </button>
      </div>

      <QuizModal isOpen={open} onClose={() => setOpen(false)} />
    </section>
  )
}
