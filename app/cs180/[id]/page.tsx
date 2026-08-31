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

type PageProps = {
  params: Promise<{ id: string }>
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
    description: project.summary,
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
          {project.due ? ` · due ${project.due}` : ''}
        </p>
        <h1 className="cs180-title cs180-title--project">{project.title}</h1>
        <p className="cs180-subtitle">{project.summary}</p>
        <span className={`cs180-status cs180-status--${project.status}`}>
          {project.status.replace('-', ' ')}
        </span>
      </header>

      <MeanderStrip />

      {hasWriteup ? (
        <article className="cs180-writeup">
          {project.parts.map((part) => (
            <section key={part.title} className="cs180-part">
              <h2 className="cs180-part-title">{part.title}</h2>
              {part.prose?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              {!part.prose?.length && !part.figures?.length && (
                <p className="cs180-part-empty">figures forthcoming.</p>
              )}
              {part.figures && part.figures.length > 0 && (
                <div
                  className={`cs180-figures cs180-figures--${part.figureLayout ?? 'stack'}`}
                >
                  {part.figures.map((figure) => (
                    <figure key={figure.src} className="cs180-figure">
                      <img src={figure.src} alt={figure.alt ?? figure.caption ?? ''} />
                      {figure.caption && (
                        <figcaption>{figure.caption}</figcaption>
                      )}
                    </figure>
                  ))}
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
