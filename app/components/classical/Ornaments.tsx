/** Classical ornaments — pearl fillet, diamond dividers, soft arch */

/** Thin double-rule band with pearl dots (Roman/neo-classical, not Greek key) */
export function MeanderStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`meander-strip ${className}`} aria-hidden="true">
      <svg className="meander-strip-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern
            id="pearl-fillet"
            width="20"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer rails */}
            <line
              x1="0"
              y1="2"
              x2="20"
              y2="2"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <line
              x1="0"
              y1="12"
              x2="20"
              y2="12"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Center pearl */}
            <circle cx="10" cy="7" r="1.35" fill="currentColor" />
            {/* Side micro-dots for rhythm */}
            <circle cx="0" cy="7" r="0.55" fill="currentColor" opacity="0.5" />
            <circle cx="20" cy="7" r="0.55" fill="currentColor" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pearl-fillet)" />
      </svg>
    </div>
  )
}

export function MeanderBand({ className = '' }: { className?: string }) {
  return <MeanderStrip className={className} />
}

/** Optional geometric key — kept for reuse, not the main band */
export function GreekKey({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 10h6V4h5v4h5V4h5v6h6V4h5v4h5V4h5v6h6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
        strokeLinecap="square"
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
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="28"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: '16px',
          letterSpacing: '0.04em',
          textTransform: 'lowercase',
          fontStyle: 'italic',
        }}
      >
        {letters.toLowerCase()}
      </text>
    </svg>
  )
}

/** Lozenge with fine outer ring — section break mark */
export function Rosette({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <path
        d="M10 4.5L15.5 10L10 15.5L4.5 10L10 4.5Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="miter"
      />
      <circle cx="10" cy="10" r="1.4" fill="currentColor" />
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

export function ColumnFlutes({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <div className={`column-flutes column-flutes--${side}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

export function ArchFrame({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`arch-frame ${className}`}>
      <svg
        className="arch-frame-svg"
        viewBox="0 0 400 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {/* Single refined arch + base ticks */}
        <path
          d="M32 42V32C32 14 96 6 200 6C304 6 368 14 368 32V42"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M32 42h12M356 42h12" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="arch-frame-content">{children}</div>
    </div>
  )
}

export function CornerMark({
  position = 'tl',
  className = '',
}: {
  position?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
}) {
  return (
    <svg
      className={`corner-mark corner-mark--${position} ${className}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 16V4.5C2 3.12 3.12 2 4.5 2H16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <circle cx="2" cy="16" r="1" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function CornerAcanthus(props: {
  position?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
}) {
  return <CornerMark {...props} />
}
