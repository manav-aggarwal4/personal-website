export interface Club {
  name: string
  role: string
  logo: string
  description: string
  logoWidth?: string // For non-square logos
}

export const clubs: Club[] = [
  {
    name: "Launchpad",
    role: "Vice President",
    logo: "/launchpad.png",
    description: "Building creative ML projects, hosting paper reading groups & workshops. I manage client engagements and finances.",
  },
  {
    name: "Valley Consulting",
    role: "Senior Consultant",
    logo: "/vcg.jpeg",
    description: "Solving business & tech problems for Fortune 500 companies. I also serve as a development mentor for new members.",
  },
  {
    name: "CS Mentors",
    role: "Senior Mentor",
    logo: "/csm.png",
    logoWidth: "w-44",
    description: "Leading biweekly CS 61A tutoring sessions. Coaching fellow mentors on pedagogy.",
  },
]
