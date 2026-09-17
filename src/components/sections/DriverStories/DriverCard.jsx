import { useState } from "react";

export default function DriverCard({ driver }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`driver-card${isFlipped ? " driver-card--flipped" : ""}`}
      tabIndex={0}
      onClick={() => setIsFlipped((flipped) => !flipped)}
    >
      <div className="driver-card__inner">
        <div className="driver-card__front">
          <img src={driver.img} alt={driver.name} loading="lazy" />
          <div className="driver-card__front-content">
            <div className="driver-card__front-content--inner">
              <p className="driver-card__name">{driver.name}</p>
              <p className="driver-card__excerpt">{driver.excerpt}</p>
            </div>
          </div>
        </div>

        <div className="driver-card__back">
          <p className="driver-card__name driver-card__name--dark">
            {driver.name}
          </p>
          <p className="driver-card__bio">{driver.bio}</p>
          <span className="section-rule" />
        </div>
      </div>
    </div>
  );
}
