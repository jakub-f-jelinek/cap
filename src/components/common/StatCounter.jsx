import { useInView } from "@/hooks/useInView.js";
import { useCountUp } from "../../hooks/useCountUp";
import "./StatCounter.scss";

export default function StatCounter({
  value,
  suffix = " %",
  label,
  duration = 900,
}) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, { start: inView, duration });

  return (
    <div className="stat-counter" ref={ref}>
      <p className="stat-counter__value">
        {count}
        {suffix}
      </p>
      <p className="stat-counter__label">{label}</p>
      <span className="section-rule" />
    </div>
  );
}
