import DriverCard from './DriverCard.jsx'
import { drivers } from '@/data/drivers.js'
import glassAccent from '@/assets/glass/glass-16.png'
import './DriverStories.scss'

export default function DriverStories() {
  return (
    <section id="pribehy" className="driver-stories section">
      <img className="driver-stories__glass" src={glassAccent} alt="" aria-hidden="true" loading="lazy" />

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
  )
}
