/**
 * CS 180 / 280A portfolio.
 *
 * To publish a project:
 *   1. Drop images in public/cs180/<id>/
 *   2. Set status to 'published' (or 'in-progress')
 *   3. Fill parts[].prose and parts[].figures
 *
 * Routes:
 *   /cs180       index
 *   /cs180/0     project 0, etc.
 */

export type Cs180Status = 'upcoming' | 'in-progress' | 'published'

export type Cs180Figure = {
  src: string
  caption?: string
  alt?: string
}

export type Cs180Part = {
  title: string
  prose?: string[]
  figures?: Cs180Figure[]
  figureLayout?: 'stack' | 'row'
}

export type Cs180Project = {
  id: string
  title: string
  status: Cs180Status
  due?: string
  summary?: string
  parts: Cs180Part[]
}

export const cs180Meta = {
  course: 'cs 180 / 280a',
  name: 'intro to computer vision and computational photography',
  term: 'fall 2026',
  school: 'uc berkeley',
  instructors: 'alexei efros · ren ng',
}

export const cs180Projects: Cs180Project[] = [
  {
    id: '0',
    title: 'becoming friends with your camera',
    status: 'published',
    parts: [
      {
        title: 'part 1: selfie, the wrong way vs the right way',
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/0/selfie-close.jpg',
            caption: 'close · ~24mm · the wrong way',
            alt: 'close wide-angle selfie with perspective distortion',
          },
          {
            src: '/cs180/0/selfie-zoom.jpg',
            caption: 'step back and zoom · ~97mm · the right way',
            alt: 'portrait from farther away with zoom, more natural proportions',
          },
        ],
      },
      {
        title: 'part 2: architectural perspective compression',
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/0/arch-zoom.jpg',
            caption: 'Zoomed in view of Berkeley Toyota Dealership',
            alt: 'Zoomed in view of Berkeley Toyota Dealership',
          },
          {
            src: '/cs180/0/arch-wide.jpg',
            caption: 'Close up view of Berkeley Toyota Dealership',
            alt: 'Close up view of Berkeley Toyota Dealership',
          },
        ],
      },
      {
        title: 'part 3: the dolly zoom',
        figureLayout: 'stack',
        figures: [
          {
            src: '/cs180/0/dolly-zoom.gif',
            caption: 'Dolly Zoom in the Classic Shattuck Market Perishables Aisle',
            alt: 'Dolly Zoom in the Classic Shattuck Market Perishables Aisle',
          },
        ],
      },
    ],
  },
]

export function getCs180Project(id: string) {
  return cs180Projects.find((p) => p.id === id)
}

export function projectHasWriteup(project: Cs180Project) {
  return project.parts.some(
    (part) => (part.prose && part.prose.length > 0) || (part.figures && part.figures.length > 0)
  )
}
