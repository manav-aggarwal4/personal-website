import type { Metadata } from 'next'
import Link from 'next/link'
import { getWritingBySlug } from '../../data/writings'

const piece = getWritingBySlug('energy-drinks')!

export const metadata: Metadata = {
  title: `${piece.title} · Manav Aggarwal`,
  description: piece.paragraphs.join(' '),
}

export default function EnergyDrinksWritingPage() {
  return (
    <div className="writing-page">
      <div className="grain" aria-hidden="true" />
      <div className="marble-veins" aria-hidden="true" />

      <header className="writing-page-nav">
        <Link href="/#parerga" className="writing-back">
          ← back
        </Link>
        <Link href="/" className="writing-home">
          ma
        </Link>
      </header>

      <article className="writing-article">
        <p className="label writing-kicker">
          {piece.tag ? `${piece.tag} · ` : ''}
          {piece.date}
        </p>
        <h1 className="writing-title">{piece.title}</h1>
        <div className="writing-body">
          {piece.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <p className="writing-signoff">
          in efforts to get the ball rolling i wrote the above, more soon!
        </p>
      </article>
    </div>
  )
}
