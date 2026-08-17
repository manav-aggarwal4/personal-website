export * from './experience'
export * from './projects'
export * from './skills'
export * from './clubs'
export * from './writings'
export * from './readings'
export * from './interests'

export const profile = {
  firstName: 'manav',
  lastName: 'aggarwal',
  basedIn: 'palo alto, ca',
  education: 'uc berkeley',
  educationNote: "regents' scholar · u.s. presidential scholar",
}

export type AboutSegment = {
  text: string
  href?: string
}

export type AboutParagraph = {
  segments: AboutSegment[]
}

export const aboutParagraphs: AboutParagraph[] = [
  {
    segments: [
      {
        text: "I'm Manav, nice to meet you! I like to train models and understand how they work. I got my start in engineering at 15 when I worked on the Nasa Artemis II Rocket. I found it incredibly rewarding, (especially when it ",
      },
      {
        text: 'launched',
        href: 'https://www.youtube.com/watch?v=EO8Pse8ns2Q',
      },
      {
        text: " 5 years later) and i've been hooked ever since. currently, i am particularly interested in recursive self-improvement, especially in robotics, biological, or kernel engineering applications.",
      },
    ],
  },
  {
    segments: [
      {
        text: 'Outside of work, I really enjoy espresso and cooking. my favorite coffee shop is Tide Coffee Roasters in Seoul, and my favorite restaurant is my-oh-my shawarma in berkeley.',
      },
    ],
  },
]

export const profilePhotos = [
  '/Websitepic13.jpg',
  '/WebsitePic3.jpeg',
  '/Websitepic12.jpg',
  '/Websitepic1.jpg',
  '/Websitepic2.jpg',
  '/Websitepic4.jpg',
  '/Websitepic5.jpg',
  '/Websitepic6.jpeg',
  '/Websitepic7.jpg',
  '/Websitepic8.jpg',
  '/Websitepic10.jpg',
  '/Websitepic11.jpg',
  '/Websitepic9.jpg',
]

export const navItems = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'parerga', label: 'parerga' },
  { id: 'contact', label: 'contact' },
]

export const socialLinks = {
  email: 'mailto:manavaggarwal240@gmail.com',
  emailDisplay: 'manavaggarwal240@gmail.com',
  github: 'https://github.com/manav-aggarwal4',
  linkedin: 'https://www.linkedin.com/in/manavaggarwal4/',
  twitter: 'https://x.com/manav_a4',
}
