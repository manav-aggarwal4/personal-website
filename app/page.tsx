'use client'

import { useEffect, useState } from 'react'
import {
  profile,
  aboutParagraphs,
  navItems,
  socialLinks,
  experiences,
  projects,
  skillCategories,
  clubs,
  writings,
  readings,
  interests,
} from './data'
import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from './components/icons'
import {
  MeanderStrip,
  OrnamentDivider,
  ColumnFlutes,
  CornerMark,
  ArchFrame,
} from './components/classical/Ornaments'

const ROMAN = ['I', 'II', 'III', 'IV'] as const

function toRomanIndex(n: number) {
  const map = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  ]
  return map[n] ?? String(n + 1)
}

function formatLink(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default function Home() {
  const [openExp, setOpenExp] = useState<number | null>(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = navItems.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-22% 0px -55% 0px', threshold: [0.12, 0.4] }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 54
    window.scrollTo({ top, behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <div className="marble-veins" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <nav className="site-nav">
        <button
          type="button"
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ma
        </button>

        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? 'close' : 'menu'}
        </button>

        <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-link"
              data-active={activeSection === item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <section className="hero" id="home" aria-label="Introduction">
          <ColumnFlutes side="left" />
          <ColumnFlutes side="right" />

          <div className="hero-epigraph animate-in">
            <p className="label">est. · huntsville, al</p>
          </div>

          <div className="hero-meta animate-in delay-2">
            <div className="hero-meta-item">
              <span className="label">based in</span>
              <span className="hero-meta-value">{profile.basedIn}</span>
            </div>
            <div className="hero-meta-rule" aria-hidden="true" />
            <div className="hero-meta-item">
              <span className="label">education</span>
              <span className="hero-meta-value">{profile.education}</span>
              {profile.educationNote && (
                <span className="hero-meta-note">{profile.educationNote}</span>
              )}
            </div>
          </div>

          <div className="hero-name-wrap">
            <h1 className="hero-name">
              <span className="hero-name-line animate-name">{profile.firstName}</span>
              <span className="hero-name-line italic animate-name delay-1">
                {profile.lastName}
              </span>
            </h1>
          </div>

          <button
            type="button"
            className="hero-scroll-hint animate-in delay-4"
            onClick={() => scrollTo('about')}
            aria-label="Scroll to about"
          >
            <span className="label">scroll</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </button>
        </section>

        <MeanderStrip />

        <section className="section" id="about">
          <div className="section-head">
            <div className="section-head-left">
              <span className="section-numeral" aria-hidden="true">
                {ROMAN[0]}
              </span>
              <span className="label">about</span>
            </div>
            <span className="label label-bronze">vita</span>
          </div>
          <div className="section-body">
            <div className="about-grid section-inner">
              <div className="about-prose">
                {aboutParagraphs.map((p, i) => (
                  <p key={i}>
                    {p.segments.map((seg, j) =>
                      seg.href ? (
                        <a
                          key={j}
                          href={seg.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="about-inline-link"
                        >
                          {seg.text}
                        </a>
                      ) : (
                        <span key={j}>{seg.text}</span>
                      )
                    )}
                  </p>
                ))}
              </div>

              <aside className="about-side">
                <div className="side-panel">
                  <CornerMark position="tl" />
                  <CornerMark position="br" />
                  <p className="label side-block-title">clubs & communities at berkeley</p>
                  {clubs.map((club) => (
                    <div key={club.name} className="club-row">
                      <span className="club-name">{club.name}</span>
                      <span className="club-role">{club.role}</span>
                      <p className="club-desc">{club.description}</p>
                    </div>
                  ))}
                </div>

                <div className="side-panel">
                  <CornerMark position="tr" />
                  <CornerMark position="bl" />
                  <p className="label side-block-title">skills</p>
                  {skillCategories.map((cat) => (
                    <div key={cat.title} className="skill-group">
                      <p className="label skill-title">{cat.title}</p>
                      <div className="skill-tags">
                        {cat.skills.map((skill) => (
                          <span key={skill} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <OrnamentDivider />

        <section className="section" id="experience">
          <div className="section-head">
            <div className="section-head-left">
              <span className="section-numeral" aria-hidden="true">
                {ROMAN[1]}
              </span>
              <span className="label">experience</span>
            </div>
            <span className="label label-bronze">cursus</span>
          </div>
          <div className="section-body section-body--tight">
            <div className="exp-list">
              {experiences.map((exp, i) => {
                const open = openExp === i
                return (
                  <div key={exp.company} className="exp-row" data-open={open}>
                    <button
                      type="button"
                      className="exp-row-main"
                      onClick={() => setOpenExp(open ? null : i)}
                      aria-expanded={open}
                    >
                      <div>
                        <div className="exp-company">{exp.company}</div>
                        <div className="exp-date">{exp.duration}</div>
                      </div>
                      <div className="exp-role">
                        {exp.role.includes('·') ? (
                          <>
                            {exp.role.split('·')[0].trim()}
                            <span className="exp-role-muted">
                              {' '}
                              / {exp.role.split('·')[1].trim()}
                            </span>
                          </>
                        ) : (
                          exp.role
                        )}
                      </div>
                      <span className="exp-toggle">{open ? 'close' : 'details'}</span>
                    </button>
                    <div className="exp-details">
                      <div className="exp-details-inner">
                        <ul className="exp-bullets">
                          {exp.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {formatLink(exp.link)} ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <OrnamentDivider />

        <section className="section" id="projects">
          <div className="section-head">
            <div className="section-head-left">
              <span className="section-numeral" aria-hidden="true">
                {ROMAN[2]}
              </span>
              <span className="label">projects</span>
            </div>
            <span className="label label-bronze">opera</span>
          </div>
          <div className="section-body">
            <div className="project-grid section-inner">
              {projects.map((project, i) => (
                <article key={project.title} className="project-card">
                  <span className="project-index">{toRomanIndex(i)}</span>
                  <h3 className="project-title">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {project.title} ↗
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OrnamentDivider />

        <section className="section" id="parerga">
          <div className="section-head">
            <div className="section-head-left">
              <span className="section-numeral" aria-hidden="true">
                {ROMAN[3]}
              </span>
              <span className="label">parerga</span>
            </div>
            <span className="label label-bronze">
              writings · readings · interests
            </span>
          </div>
          <div className="section-body">
            <div className="parerga-grid section-inner">
              <div className="side-panel parerga-panel">
                <CornerMark position="tl" />
                <CornerMark position="br" />
                <p className="label side-block-title">writings</p>
                {writings.map((piece) => (
                  <article key={piece.slug} className="parerga-writing">
                    <div className="essay-meta">
                      {piece.tag && <span className="essay-tag">{piece.tag}</span>}
                      <span className="essay-date">{piece.date}</span>
                    </div>
                    <h3 className="parerga-item-title">
                      <a href={`/writings/${piece.slug}`} className="parerga-writing-link">
                        {piece.title} ↗
                      </a>
                    </h3>
                    {piece.teaser && (
                      <p className="parerga-writing-teaser">{piece.teaser}</p>
                    )}
                  </article>
                ))}
                <p className="parerga-writing-note">
                  in efforts to get the ball rolling i wrote the above, more soon!
                </p>
              </div>

              <div className="side-panel parerga-panel">
                <CornerMark position="tr" />
                <CornerMark position="bl" />
                <p className="label side-block-title">readings</p>
                {readings.map((book) => (
                  <div key={book.title} className="club-row">
                    <span className="club-name">{book.title}</span>
                    <span className="club-role">
                      {book.author}
                      {book.status === 'now' ? ' · now' : book.status === 'queue' ? ' · queue' : ''}
                    </span>
                    {book.note && <p className="club-desc">{book.note}</p>}
                  </div>
                ))}
              </div>

              <div className="side-panel parerga-panel">
                <CornerMark position="tl" />
                <CornerMark position="br" />
                <p className="label side-block-title">interests</p>
                {interests.map((item) => (
                  <div key={item.title} className="club-row">
                    <span className="club-name">{item.title}</span>
                    {item.href ? (
                      <p className="club-desc">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interest-link"
                        >
                          {item.detail} ↗
                        </a>
                      </p>
                    ) : (
                      <p className="club-desc">{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MeanderStrip />

        <section className="contact" id="contact">
          <ArchFrame>
            <span className="label contact-label">get in touch</span>
            <a href={socialLinks.email} className="contact-email">
              {socialLinks.emailDisplay}
            </a>
          </ArchFrame>
          <div className="contact-socials">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <XIcon className="w-5 h-5" />
            </a>
          </div>
        </section>

      </main>
    </>
  )
}
