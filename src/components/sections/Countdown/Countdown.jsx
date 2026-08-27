import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-09-01T18:00:00+02:00").getTime();

function getTimeLeft() {
  const difference = LAUNCH_DATE - Date.now();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return <MainWebsite />;
  }

  return <Countdown timeLeft={timeLeft} />;
}

function Countdown({ timeLeft }) {
  return (
    <div>
      <div>{timeLeft.days}</div>
      <div>{timeLeft.hours}</div>
      <div>{timeLeft.minutes}</div>
      <div>{timeLeft.seconds}</div>
    </div>
  );
}

function MainWebsite() {
  return (
    <main>
      <h1>Vítejte</h1>
      {/* celý onepage web */}
    </main>
  );
}
