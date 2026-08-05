import type { Metadata } from 'next'
import { getWritingBySlug } from '../../data/writings'

const piece = getWritingBySlug('energy-drinks')!

export const metadata: Metadata = {
  title: `${piece.title} · Manav Aggarwal`,
  description:
    piece.intro ??
    piece.paragraphs?.join(' ') ??
    piece.teaser ??
    piece.title,
}

export default function EnergyDrinksWritingPage() {
  return (
    <div className="writing-page">
      <div className="grain" aria-hidden="true" />
      <div className="marble-veins" aria-hidden="true" />

      <article className="writing-article">
        <p className="label writing-kicker">
          {piece.tag ? `${piece.tag} : ` : ''}
          {piece.date}
        </p>
        <h1 className="writing-title">{piece.title}</h1>
        <div className="writing-body">
          {piece.intro && <p>{piece.intro}</p>}

          {piece.tiers && piece.tiers.length > 0 && (
            <ol className="writing-tier-list">
              {piece.tiers.map((tier) => (
                <li key={tier.rank} className="writing-tier">
                  <p className="writing-tier-head">
                    <span className="writing-tier-rank">{tier.rank}.</span>{' '}
                    {tier.name}
                    {tier.note ? (
                      <span className="writing-tier-note"> ({tier.note})</span>
                    ) : null}
                  </p>
                  <ol className="writing-flavor-list" type="a">
                    {tier.flavors.map((flavor) => (
                      <li key={flavor}>{flavor}</li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          )}

          {piece.paragraphs?.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  )
}
