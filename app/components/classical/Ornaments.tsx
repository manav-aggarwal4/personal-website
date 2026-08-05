/** Tasteful classical SVG ornaments — Greek key, laurel, rosette, pilasters */

export function GreekKey({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 10H8V2H16V10H24V2H32V10H40V2H48V10H56V2H64V10H72V2H80V10H88V2H96V10H104V2H112V10H120V2H128V10H136V2H144V10H152V2H160V10H168V2H176V10H184V2H192V10H200V2H208V10H216V2H224V10H232V2H240"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

export function LaurelMonogram({
  letters = 'MA',
  className = '',
}: {
  letters?: string
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left laurel */}
      <path
        d="M30 50c-8-4-14-12-14-22 0-6 2-11 5-15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M18 20c2 1.5 3.5 3 4 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16 27c2.5 1 4 2.5 4.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M16 34c2.5.8 4.2 2.2 5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 41c2 .6 3.5 1.8 4.2 3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Right laurel */}
      <path
        d="M34 50c8-4 14-12 14-22 0-6-2-11-5-15"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M46 20c-2 1.5-3.5 3-4 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M48 27c-2.5 1-4 2.5-4.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M48 34c-2.5.8-4.2 2.2-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M46 41c-2 .6-3.5 1.8-4.2 3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Ribbon knot */}
      <path
        d="M28 50h8M30 52l2-2 2 2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="34"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-display), serif',
          fontSize: '14px',
          letterSpacing: '0.04em',
        }}
      >
        {letters}
      </text>
    </svg>
  )
}

export function Rosette({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="7.5"
          rx="2.2"
          ry="3.8"
          stroke="currentColor"
          strokeWidth="0.9"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
    </svg>
  )
}

export function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`ornament-divider ${className}`} aria-hidden="true">
      <span className="ornament-divider-line" />
      <Rosette className="ornament-rosette" />
      <span className="ornament-divider-line" />
    </div>
  )
}

export function MeanderBand({ className = '' }: { className?: string }) {
  return (
    <div className={`meander-band ${className}`} aria-hidden="true">
      <GreekKey className="meander-svg" />
    </div>
  )
}

export function ColumnFlutes({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <div className={`column-flutes column-flutes--${side}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

export function ArchFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`arch-frame ${className}`}>
      <svg
        className="arch-frame-svg"
        viewBox="0 0 400 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M20 78 V40 Q20 8 200 8 Q380 8 380 40 V78"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M32 78 V42 Q32 20 200 20 Q368 20 368 42 V78"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.45"
        />
      </svg>
      <div className="arch-frame-content">{children}</div>
    </div>
  )
}

export function CornerAcanthus({
  position = 'tl',
  className = '',
}: {
  position?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
}) {
  return (
    <svg
      className={`corner-acanthus corner-acanthus--${position} ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 44 V12 Q4 4 12 4 H44"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      <path
        d="M4 28c6-2 10-6 12-12M16 4c2 6 6 10 12 12"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="4" cy="4" r="1.2" fill="currentColor" />
    </svg>
  )
}
