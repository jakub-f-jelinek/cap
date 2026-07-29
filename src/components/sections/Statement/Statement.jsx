import glassLeft from '@/assets/glass/glass-8.png'
import glassRight from '@/assets/glass/glass-40.png'
import './Statement.scss'

export default function Statement() {
  return (
    <section id="statement" className="statement section">
      <img className="statement__glass statement__glass--left" src={glassLeft} alt="" aria-hidden="true" loading="lazy" />
      <img className="statement__glass statement__glass--right" src={glassRight} alt="" aria-hidden="true" loading="lazy" />

      <div className="container">
        <div className="statement__box">
          <h2>
            Normální řízení zabíjí,
            <br />
            i když si to nepřipouštíme
          </h2>
          <p>
            Při řízení děláme často drobné prohřešky. Občas jedeme o něco rychleji. Podíváme se na
            telefon. Nedodržujeme bezpečný odstup. Projedeme na oranžovou… Připadá nám to normální.
          </p>
        </div>
      </div>
    </section>
  )
}
