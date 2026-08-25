/** Classical ornaments — Greek meander, diamond dividers, arch, corners */

export function GreekKey({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 9h4V3h3.5v4H11V3h3.5v6H18V3h3.5v4H25V3h3.5v6H32V3h4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Running Greek-key meander with outer rails */
export function MeanderStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`meander-strip ${className}`} aria-hidden="true">
      <svg className="meander-strip-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern
            id="meander-pattern"
            width="36"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10.5h36"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <path
              d="M0 1.5h36"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <path
              d="M0 9h4V3h3.5v4H11V3h3.5v6H18V3h3.5v4H25V3h3.5v6H32V3h4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.05"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meander-pattern)" />
      </svg>
    </div>
  )
}

export function MeanderBand({ className = '' }: { className?: string }) {
  return <MeanderStrip className={className} />
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

export function Rosette({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1.5L14.5 8L8 14.5L1.5 8L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
      />
      <path
        d="M8 5L11 8L8 11L5 8L8 5Z"
        fill="currentColor"
        opacity="0.35"
      />
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
        viewBox="0 0 400 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M28 46V34C28 16 90 8 200 8C310 8 372 16 372 34V46"
          stroke="currentColor"
          strokeWidth="1"
        />
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 18V5C2 3.343 3.343 2 5 2H18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <path
        d="M2 18H5M18 2V5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity="0.4"
      />
    </svg>
  )
}

export function CornerAcanthus(props: {
  position?: 'tl' | 'tr' | 'bl' | 'br'
  className?: string
}) {
  return <CornerMark {...props} />
}
