import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether the observed element has entered the viewport.
 * By default it fires once and stays true, since most reveal
 * animations on this site shouldn't replay on scroll-back.
 */
export function useInView({ threshold = 0.25, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
