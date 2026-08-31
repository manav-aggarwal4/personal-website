'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cs180Projects } from '../data/cs180'

export default function Cs180Nav() {
  const pathname = usePathname()

  return (
    <nav className="site-nav cs180-nav">
      <Link href="/" className="nav-logo">
        ma
      </Link>
      <div className="cs180-nav-links">
        <Link
          href="/cs180"
          className="nav-link"
          data-active={pathname === '/cs180'}
        >
          index
        </Link>
        {cs180Projects.map((project) => (
          <Link
            key={project.id}
            href={`/cs180/${project.id}`}
            className="nav-link"
            data-active={pathname === `/cs180/${project.id}`}
          >
            {project.id}
          </Link>
        ))}
      </div>
    </nav>
  )
}
