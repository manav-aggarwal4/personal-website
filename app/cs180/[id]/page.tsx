import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MeanderStrip, OrnamentDivider } from '../../components/classical/Ornaments'
import {
  cs180Meta,
  cs180Projects,
  getCs180Project,
  projectHasWriteup,
} from '../../data/cs180'
import { GaussianEq } from '../MathEq'

type PageProps = {
  params: Promise<{ id: string }>
}

function renderProse(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((chunk, i) =>
    chunk.startsWith('*') && chunk.endsWith('*') ? (
      <em key={i}>{chunk.slice(1, -1)}</em>
    ) : (
      chunk
    )
  )
}

export function generateStaticParams() {
  return cs180Projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const project = getCs180Project(id)
  if (!project) return { title: 'cs 180 · Manav Aggarwal' }
  return {
    title: `proj. ${project.id} · cs 180 · Manav Aggarwal`,
    description: project.summary ?? project.title,
  }
}

export default async function Cs180ProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = getCs180Project(id)
  if (!project) notFound()

  const index = cs180Projects.findIndex((p) => p.id === project.id)
  const prev = index > 0 ? cs180Projects[index - 1] : null
  const next = index < cs180Projects.length - 1 ? cs180Projects[index + 1] : null
  const hasWriteup = projectHasWriteup(project)

  return (
    <main className="cs180-page">
      <header className="cs180-hero cs180-hero--project">
        <p className="label cs180-kicker">
          {cs180Meta.course} · proj. {project.id}
        </p>
        <h1 className="cs180-title cs180-title--project">{project.title}</h1>
        {project.summary && <p className="cs180-subtitle">{project.summary}</p>}
      </header>

      <MeanderStrip />

      {hasWriteup ? (
        <article className="cs180-writeup">
          {project.parts.map((part) => (
            <section key={part.title} className="cs180-part">
              <h2 className="cs180-part-title">{part.title}</h2>
              {part.prose?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{renderProse(paragraph)}</p>
              ))}
              {part.equation && (
                <p className="cs180-eq">{part.equation}</p>
              )}
              {part.equationFrac && (
                <div className="cs180-eq cs180-eq-frac">
                  <span className="cs180-eq-left">{part.equationFrac.left}</span>
                  <span className="cs180-eq-stack">
                    <span className="cs180-eq-num">{part.equationFrac.num}</span>
                    <span className="cs180-eq-den">{part.equationFrac.den}</span>
                  </span>
                </div>
              )}
              {part.equationKind === 'gaussian' && <GaussianEq />}
              {!part.prose?.length &&
                !part.figures?.length &&
                !part.equation &&
                !part.equationFrac &&
                !part.equationKind && (
                <p className="cs180-part-empty">figures forthcoming.</p>
              )}
              {part.figures && part.figures.length > 0 && (
                <div
                  className={
                    part.figures.some((figure) => figure.before)
                      ? 'cs180-gallery'
                      : `cs180-figures cs180-figures--${part.figureLayout ?? 'stack'}`
                  }
                >
                  {part.figures.map((figure) =>
                    figure.before ? (
                      <article
                        key={figure.src}
                        className={`cs180-compare${figure.beforeLabel ? ' cs180-compare--pair' : ''}`}
                      >
                        <figure
                          className={`cs180-compare-pane${figure.beforeLabel ? '' : ' cs180-compare-pane--plate'}`}
                        >
                          <span className="label">
                            {figure.beforeLabel ?? 'glass plate'}
                          </span>
                          <img src={figure.before} alt="" />
                        </figure>
                        <span className="cs180-compare-arrow" aria-hidden="true">
                          →
                        </span>
                        <figure className="cs180-compare-pane">
                          <span className="label">
                            {figure.afterLabel ?? 'after'}
                          </span>
                          <div className="cs180-compare-frame">
                            {figure.favorite && (
                              <span className="cs180-favorite" aria-hidden="true">
                                <span className="cs180-favorite-label">
                                  personal favorite!!
                                </span>
                                <svg
                                  className="cs180-favorite-arrow"
                                  viewBox="0 0 40 48"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M30 2C24 14 18 26 16 42"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M8 34L16 44L24 34"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                            <img
                              src={figure.src}
                              alt={figure.alt ?? figure.caption ?? ''}
                            />
                          </div>
                          {figure.caption && (
                            <figcaption className="cs180-compare-caption">
                              {figure.caption}
                            </figcaption>
                          )}
                        </figure>
                      </article>
                    ) : (
                      <figure
                        key={figure.src}
                        className={`cs180-figure${figure.favorite ? ' cs180-figure--favorite' : ''}`}
                      >
                        <img src={figure.src} alt={figure.alt ?? figure.caption ?? ''} />
                        {figure.caption && (
                          <figcaption>{figure.caption}</figcaption>
                        )}
                      </figure>
                    )
                  )}
                </div>
              )}

            </section>
          ))}
        </article>
      ) : (
        <div className="cs180-placeholder">
          {project.parts.length > 0 && (
            <ol className="cs180-outline">
              {project.parts.map((part) => (
                <li key={part.title}>{part.title}</li>
              ))}
            </ol>
          )}
          <p>writeup and figures forthcoming.</p>
        </div>
      )}

      <OrnamentDivider />

      <nav className="cs180-pager" aria-label="adjacent projects">
        {prev ? (
          <Link href={`/cs180/${prev.id}`} className="cs180-pager-link">
            <span className="label">previous</span>
            <span>
              {prev.id} · {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/cs180/${next.id}`} className="cs180-pager-link cs180-pager-link--next">
            <span className="label">next</span>
            <span>
              {next.id} · {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
