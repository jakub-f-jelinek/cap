import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '@/data/navLinks.js'
import './Header.scss'

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="header">
      <button
        type="button"
        className={`header__burger${open ? ' header__burger--open' : ''}`}
        aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="header__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Hlavní navigace"
          >
            <ul className="header__list">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
