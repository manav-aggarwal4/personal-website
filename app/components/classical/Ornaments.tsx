/** Classical ornaments — Greek key, laurel, rosette, arch */

export function GreekKey({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 6.5h8V1.5h5v3.5h5V1.5h5v5h8V1.5h5v3.5h5V1.5h5v5h8V1.5h5v3.5h5V1.5h5v5h8V1.5h5v3.5h5V1.5h5v5H120"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function MeanderStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`meander-strip ${className}`} aria-hidden="true">
      <svg className="meander-strip-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern
            id="meander-pattern"
            width="28"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 8h4V2h3v4h3V2h3v6h4V2h3v4h3V2h3v6h2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="miter"
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
      <path
        d="M26 44c-7.5-3.5-13-11-13-19.5C13 17 16 12 19.5 8.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {[
        'M15.5 16.5c1.8 1.2 3 2.6 3.4 4.2',
        'M13.8 23c2.2.9 3.6 2.2 4 3.9',
        'M13.8 29.5c2.2.7 3.7 1.9 4.3 3.5',
        'M15.5 36c1.8.5 3.1 1.5 3.7 2.8',
      ].map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" />
      ))}
      <path
        d="M30 44c7.5-3.5 13-11 13-19.5C43 17 40 12 36.5 8.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {[
        'M40.5 16.5c-1.8 1.2-3 2.6-3.4 4.2',
        'M42.2 23c-2.2.9-3.6 2.2-4 3.9',
        'M42.2 29.5c-2.2.7-3.7 1.9-4.3 3.5',
        'M40.5 36c-1.8.5-3.1 1.5-3.7 2.8',
      ].map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" />
      ))}
      <path
        d="M25 44.5h6M27 46.2l1.5-1.5 1.5 1.5"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="28"
        y="30.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: '13px',
          letterSpacing: '0.06em',
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
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
      <circle cx="14" cy="14" r="5.5" stroke="currentColor" strokeWidth="0.9" opacity="0.85" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="14"
          cy="6.2"
          rx="1.6"
          ry="3"
          stroke="currentColor"
          strokeWidth="0.85"
          transform={`rotate(${deg} 14 14)`}
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
        viewBox="0 0 400 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M24 54V36C24 14 80 6 200 6C320 6 376 14 376 36V54"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M36 54V37C36 20 90 14 200 14C310 14 364 20 364 37V54"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.4"
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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 22V6C2 3.8 3.8 2 6 2H22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
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
