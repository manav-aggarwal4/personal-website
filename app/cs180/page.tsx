import Link from 'next/link'
import { MeanderStrip } from '../components/classical/Ornaments'
import { cs180Meta, cs180Projects } from '../data/cs180'

export default function Cs180IndexPage() {
  return (
    <main className="cs180-page">
      <header className="cs180-hero">
        <p className="label cs180-kicker">{cs180Meta.term} · {cs180Meta.school}</p>
        <h1 className="cs180-title">
          <span>{cs180Meta.course}</span>
        </h1>
        <p className="cs180-subtitle">{cs180Meta.name}</p>
        <p className="cs180-instructors">{cs180Meta.instructors}</p>
      </header>

      <MeanderStrip />

      <section className="cs180-toc" aria-label="projects">
        <div className="section-head">
          <div className="section-head-left">
            <span className="section-numeral" aria-hidden="true">
              I
            </span>
            <span className="label">projects</span>
          </div>
          <span className="label label-bronze">opera</span>
        </div>

        <ol className="cs180-project-list">
          {cs180Projects.map((project) => (
            <li key={project.id}>
              <Link href={`/cs180/${project.id}`} className="cs180-project-row">
                <span className="cs180-project-num">{project.id}</span>
                <span className="cs180-project-body">
                  <span className="cs180-project-title">{project.title}</span>
                  {project.summary && (
                    <span className="cs180-project-summary">{project.summary}</span>
                  )}
                </span>
                {project.status !== 'published' && (
                  <span className={`cs180-status cs180-status--${project.status}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
