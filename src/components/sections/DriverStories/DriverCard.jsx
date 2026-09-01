export default function DriverCard({ driver, tint = 0 }) {
  return (
    <div className="driver-card" tabIndex={0}>
      <div className="driver-card__inner">
        <div className="driver-card__front">
          <img
            src={driver.img}
            alt={driver.name}
            loading="lazy"
            style={{ filter: `grayscale(1) hue-rotate(${tint}deg)` }}
          />
          <div className="driver-card__front-scrim" />
          <div className="driver-card__front-footer">
            <p className="driver-card__name">{driver.name}</p>
            <p className="driver-card__excerpt">{driver.bio}</p>
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
