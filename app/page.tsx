'use client'

import { useEffect, useState } from 'react'
import {
  profile,
  aboutParagraphs,
  highlights,
  navItems,
  socialLinks,
  experiences,
  projects,
  skillCategories,
  clubs,
} from './data'
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from './components/icons'
import {
  LaurelMonogram,
  MeanderStrip,
  OrnamentDivider,
  ColumnFlutes,
  CornerMark,
  ArchFrame,
  GreekKey,
  Rosette,
} from './components/classical/Ornaments'

const ROMAN = ['I', 'II', 'III'] as const

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
  const [openHighlight, setOpenHighlight] = useState<number | null>(null)
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
          <LaurelMonogram letters="MA" />
        </button>

        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? 'Close' : 'Menu'}
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
            <p className="label">Est. · Huntsville, AL</p>
          </div>

          <div className="hero-meta animate-in delay-2">
            <div className="hero-meta-item">
              <span className="label">Currently</span>
              <span className="hero-meta-value">{profile.currently}</span>
            </div>
            <div className="hero-meta-rule" aria-hidden="true" />
            <div className="hero-meta-item">
              <span className="label">Based In</span>
              <span className="hero-meta-value">{profile.basedIn}</span>
            </div>
            <div className="hero-meta-rule" aria-hidden="true" />
            <div className="hero-meta-item">
              <span className="label">Education</span>
              <span className="hero-meta-value">{profile.education}</span>
            </div>
          </div>

          <div className="hero-name-wrap">
            <h1 className="hero-name">
              <span className="hero-name-line animate-name">{profile.firstName}</span>
              <span className="hero-name-line italic animate-name delay-1">
                {profile.lastName}
              </span>
            </h1>
            <GreekKey className="hero-name-underline animate-in delay-2" />
            <p className="hero-tagline animate-in delay-2">{profile.tagline}</p>
            <div className="hero-actions animate-in delay-3">
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                Resume ↗
              </a>
              <button type="button" className="hero-link" onClick={() => scrollTo('experience')}>
                Experience
              </button>
              <button type="button" className="hero-link" onClick={() => scrollTo('contact')}>
                Contact
              </button>
            </div>
          </div>

          <button
            type="button"
            className="hero-scroll-hint animate-in delay-4"
            onClick={() => scrollTo('about')}
            aria-label="Scroll to about"
          >
            <span className="label">Scroll</span>
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
              <span className="label">About</span>
            </div>
            <span className="label label-bronze">Vita</span>
          </div>
          <div className="section-body">
            <div className="about-grid section-inner">
              <div className="about-prose">
                {aboutParagraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}

                <div className="highlight-list">
                  <p className="label highlight-heading">Honors</p>
                  {highlights.map((h, i) => {
                    const open = openHighlight === i
                    return (
                      <button
                        key={h.label}
                        type="button"
                        className="highlight-item"
                        data-open={open}
                        onClick={() => setOpenHighlight(open ? null : i)}
                        aria-expanded={open}
                      >
                        <span className="highlight-label">
                          {h.label}
                          <span className="highlight-mark" aria-hidden="true">
                            {open ? '−' : '+'}
                          </span>
                        </span>
                        {open && <p className="highlight-detail">{h.detail}</p>}
                      </button>
                    )
                  })}
                </div>
              </div>

              <aside className="about-side">
                <div className="side-panel">
                  <CornerMark position="tl" />
                  <CornerMark position="br" />
                  <p className="label side-block-title">Clubs & communities</p>
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
                  <p className="label side-block-title">Skills</p>
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
              <span className="label">Experience</span>
            </div>
            <span className="label label-bronze">Cursus</span>
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
                      <span className="exp-toggle">{open ? 'Close' : 'Details'}</span>
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
              <span className="label">Projects</span>
            </div>
            <span className="label label-bronze">Opera</span>
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

        <MeanderStrip />

        <section className="contact" id="contact">
          <ArchFrame>
            <span className="label contact-label">Get in touch</span>
            <a href={socialLinks.email} className="contact-email">
              {socialLinks.emailDisplay}
            </a>
          </ArchFrame>
          <div className="contact-socials">
            <a href={socialLinks.email} aria-label="Email">
              <EmailIcon className="w-5 h-5" />
            </a>
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
              aria-label="X / Twitter"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              Resume ↗
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <span>Manav Aggarwal</span>
          <Rosette className="footer-ornament" />
          <span>Berkeley · EECS</span>
        </footer>
      </main>
    </>
  )
}
