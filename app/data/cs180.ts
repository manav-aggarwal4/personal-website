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
  summary: string
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
    due: 'september 1, 2026',
    summary:
      'perspective, focal length, and the center of projection — three photographic studies.',
    parts: [
      {
        title: 'part 1: selfie, the wrong way vs the right way',
        figureLayout: 'row',
        prose: [
          'two portraits, same face size in frame. the left is a close selfie on the iphone wide camera (~24mm equivalent). the right is the same framing after stepping back several feet and zooming to ~97mm.',
          'up close, my nose is much nearer the camera than my ears or the sides of my face. that depth difference is a large fraction of the camera-to-subject distance, so perspective stretches the center of the face and pinches the edges — the usual wide-angle selfie look.',
          'once the camera is farther away, those same facial depths are a small fraction of the total distance. the projection is closer to orthographic, features sit in more natural proportion, and the portrait looks like what you actually see in person. zoom only recovers the framing; the thing that fixes the face is moving the center of projection.',
        ],
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
        prose: [
          'toyota of berkeley, shot so the dealership occupies about the same slice of the frame in both photos. the left is from across the street on a long lens (~151mm). the right is after walking in and shooting wide (~24mm).',
          'from far away, depth in the scene is a small fraction of the camera distance, so the apartment tower sits almost on top of the showroom and the parked cars stack into a flat row — telephoto compression.',
          'up close, those same depths are a large fraction of the camera distance. the facade recedes, the tower drops back, and the cars in the foreground blow up. nothing about the building changed; only the center of projection did.',
        ],
        figures: [
          {
            src: '/cs180/0/arch-zoom.jpg',
            caption: 'from across the street · ~151mm · compressed',
            alt: 'telephoto shot of toyota of berkeley with compressed depth',
          },
          {
            src: '/cs180/0/arch-wide.jpg',
            caption: 'walked up, no zoom · ~24mm · expanded',
            alt: 'wide shot of toyota of berkeley from closer, with receding facade',
          },
        ],
      },
      {
        title: 'part 3: the dolly zoom',
        figureLayout: 'stack',
        prose: [
          'a market aisle with a long red runner and a fridge at the far wall. i walked backward while zooming in, keeping the runner roughly the same width in frame (hitchcock’s vertigo shot / dolly zoom).',
          'because focal length and camera center move in opposite directions, the subject can hold size while the space around it changes. as the sequence plays, the fridge stays in play and the shelves squeeze inward — depth looks like it is collapsing even though the aisle itself is not.',
        ],
        figures: [
          {
            src: '/cs180/0/dolly-zoom.gif',
            caption: 'dolly zoom · walk back + zoom in, seven stills',
            alt: 'animated dolly zoom down a market aisle',
          },
        ],
      },
    ],
  },
  {
    id: '1',
    title: 'images of the russian empire — colorizing the prokudin-gorskii collection',
    status: 'upcoming',
    summary: 'align and composite the glass-plate rgb channels into a single color photograph.',
    parts: [],
  },
  {
    id: '2',
    title: 'fun with filters and frequencies',
    status: 'upcoming',
    summary: 'convolutions, gaussian and laplacian pyramids, hybrid images, and blending.',
    parts: [],
  },
  {
    id: '3',
    title: '(auto)stitching and photo mosaics',
    status: 'upcoming',
    summary: 'homographies, warping, and feature-based panoramas.',
    parts: [],
  },
  {
    id: '4',
    title: 'neural radiance field',
    status: 'upcoming',
    summary: 'novel-view synthesis with a neural radiance field.',
    parts: [],
  },
  {
    id: '5',
    title: 'fun with diffusion models',
    status: 'upcoming',
    summary: 'sampling, image-to-image translation, and flow matching.',
    parts: [],
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
