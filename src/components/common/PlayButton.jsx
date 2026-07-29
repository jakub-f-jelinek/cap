import './PlayButton.scss'

export default function PlayButton({ size = 'md' }) {
  return (
    <span className={`play-button play-button--${size}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M9 7.5v9l7.5-4.5-7.5-4.5Z" fill="currentColor" />
      </svg>
    </span>
  )
}
