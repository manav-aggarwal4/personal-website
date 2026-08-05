'use client'

import type { Experience } from '../data/experience'

interface ExperienceCardProps extends Experience {
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
}

export default function ExperienceCard({
  company,
  role,
  duration,
  logo,
  bullets,
  link,
  isOpen,
  onToggle,
  isLast,
}: ExperienceCardProps) {
  return (
    <div className="relative group">
      <div className="flex-1">
        <div className="rounded-2xl border border-line bg-bg-elevated p-4 max-w-[700px] min-h-[80px] mx-auto w-full flex flex-col justify-center">
          <button
            className="flex justify-between items-center w-full text-left focus:outline-none"
            onClick={onToggle}
          >
            <div className="flex items-center gap-x-4 min-w-0">
              {logo && (
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-white shrink-0">
                  <img src={logo} alt={`${company} Logo`} className="object-contain w-full h-full" />
                </div>
              )}
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="text-base font-medium text-ink text-left">{role}</h4>
                <p className="text-accent font-medium mt-1 text-sm text-left">{company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider text-muted">
                {duration}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-line p-4 mt-1">
          <ul className="space-y-2 text-sm text-ink-soft">
            {bullets.map((b) => (
              <li key={b}>– {b}</li>
            ))}
          </ul>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-mono text-muted hover:text-ink"
            >
              {link.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
            </a>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-6 bg-line z-0" />
      )}
    </div>
  )
}
