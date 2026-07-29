import { useEffect, useRef, useState } from 'react'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Animates a number from 0 to `target` once `start` becomes true.
 * Used to run the stat counters when they scroll into view.
 */
export function useCountUp(target, { start = false, duration = 1400 } = {}) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    if (!start || played.current) return undefined
    played.current = true

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(target * easeOutExpo(progress)))
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [start, target, duration])

  return value
}
