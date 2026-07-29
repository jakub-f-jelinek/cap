import { useLayoutEffect, useRef } from 'react'

// Smoothing factor for the progress lerp: higher = snappier/closer to raw
// scroll, lower = smoother but laggier. This also caps how far the video
// seeks in a single frame, which is what actually keeps scrubbing feeling
// smooth on big/fast scroll jumps.
const LERP_FACTOR = 0.2
const EPSILON = 0.0005

/**
 * Drives scroll-scrub progress (0 -> 1) through a tall wrapper entirely
 * outside React's render cycle. `onProgress` is called with a smoothed
 * progress value on every animation frame while the target is moving, so
 * callers can write straight to refs/DOM (e.g. video.currentTime) without
 * triggering a re-render per scroll tick.
 */
export function useScrollScrub(onProgress) {
  const wrapperRef = useRef(null)
  const callbackRef = useRef(onProgress)
  callbackRef.current = onProgress

  useLayoutEffect(() => {
    const node = wrapperRef.current
    if (!node) return undefined

    let target = 0
    let current = 0
    let frame = null

    const computeTarget = () => {
      const rect = node.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const raw = scrollable <= 0 ? 1 : -rect.top / scrollable
      target = Math.min(Math.max(raw, 0), 1)
    }

    const tick = () => {
      const delta = target - current
      current = Math.abs(delta) < EPSILON ? target : current + delta * LERP_FACTOR
      callbackRef.current(current)
      frame = Math.abs(target - current) > EPSILON ? requestAnimationFrame(tick) : null
    }

    const requestTick = () => {
      computeTarget()
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    computeTarget()
    current = target
    callbackRef.current(current)

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)
    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return wrapperRef
}
