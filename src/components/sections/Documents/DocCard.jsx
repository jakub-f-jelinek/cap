export default function DocCard({ doc }) {
  if (!doc?.href) return null;

  return (
    <a
      className="doc-card"
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="doc-card__title">{doc.title}</span>
      <svg
        className="doc-card__icon"
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1L7.5 7.5L1 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
