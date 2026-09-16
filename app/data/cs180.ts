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
  before?: string
  beforeLabel?: string
  afterLabel?: string
  caption?: string
  alt?: string
  favorite?: boolean
}

export type Cs180Part = {
  title: string
  prose?: string[]
  equation?: string
  equationFrac?: {
    left: string
    num: string
    den: string
  }
  equationKind?: 'gaussian'
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
            caption: 'close up',
            alt: 'close wide-angle selfie with perspective distortion',
          },
          {
            src: '/cs180/0/selfie-zoom.jpg',
            caption: 'step back and zoomed',
            alt: 'step back and zoomed',
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
  {
    id: '1',
    title: 'images of the russian empire — colorizing the prokudin-gorskii collection',
    status: 'published',
    parts: [
      {
        title: 'intro',
        prose: [
          'each prokudin-gorskii plate stores a scene as three vertically stacked exposures, captured through blue, green, and red filters. the task is to extract those channels and recover a single color photograph by estimating a 2d translation that registers the green and red plates onto blue.',
        ],
      },
      {
        title: 'l2 norm',
        prose: [
          'for each candidate shift, we compare a crop of the moving channel (green or red) against the same window of blue. l2 is the euclidean distance between those two pixel vectors: add up the squared per-pixel differences, then take a square root. a smaller distance means the channels look more alike at that displacement.',
        ],
        equation: 'L₂(I, J) = √ Σ (I − J)²',
      },
      {
        title: 'normalized cross-correlation (ncc)',
        prose: [
          'the three filter plates are different exposures, so a region that is bright in blue may be dim in red. l2 treats that as a large error even when the scene is aligned. normalized cross-correlation (ncc) first subtracts each crop’s mean and divides by its l2 magnitude (norm), then takes a dot product. this compares the shape of the brightness pattern, not the raw intensity.',
          'the score is a correlation in [−1, 1]. we pick the displacement with the largest ncc. our goal is to *maximize* ncc (alternatively, minimize l2 norm).',
        ],
        equationFrac: {
          left: 'NCC(I, J) =',
          num: '(I − mean(I)) · (J − mean(J))',
          den: '||I − mean(I)||    ||J − mean(J)||',
        },
      },
      {
        title: 'gaussian blur',
        prose: [
          'before we shrink a channel we blur it, otherwise the downsample would alias high frequencies into the coarse image and throw off the search. the kernel is a 7×7 discrete gaussian (radius 3, σ = 1), normalized so the weights sum to 1, then applied with reflect padding.',
        ],
        equationKind: 'gaussian',
      },
      {
        title: 'image pyramid',
        prose: [
          'on a ~3000px tiff, green or red can be shifted by tens or hundreds of pixels. searching that at full resolution would mean trying every (dx, dy) in a huge window, and running ncc on millions of pixels each time. instead we search a small version of the image first, then refine.',
          'each level uses the gaussian blur above, then keeps every other pixel ([::2, ::2]) and recurses. at the coarsest level the channel is under 100px, so we do the same ±15 exhaustive search as single-scale. coming back up, we double that offset (one coarse pixel is two fine pixels) and only look ±2 around it. our wider search occurs on a scaled down image and subsequent, larger level uses the previous estimate, which is much more efficient than our brute-force search.',
        ],
      },
      {
        title: 'border crop',
        prose: [
          'np.roll is circular: pixels that slide off one edge wrap around to the other. those wrapped strips would skew both l2 and ncc calculations, so i opted for the search to only score the interior (about 10% of the channel height/width is left out). after stacking, the same wrap borders are cropped off. i chose 20px for the jpegs, since the images are generally smaller, and 100px for the tiffs.',
        ],
      },
      {
        title: 'single-scale l2 norm',
        figureLayout: 'row',
        prose: [
          'cathedral, monastery, and tobolsk are small enough for a ±15 exhaustive search. scored with l2 norm. offsets are (dx, dy) of g and r relative to b.',
        ],
        figures: [
          {
            src: '/cs180/1/cathedral-l2.jpg',
            before: '/cs180/1/cathedral-before.jpg',
            caption: 'cathedral · g (2, 5) · r (3, 12)',
            alt: 'cathedral aligned with single-scale l2',
          },
          {
            src: '/cs180/1/monastery-l2.jpg',
            before: '/cs180/1/monastery-before.jpg',
            caption: 'monastery · g (2, -3) · r (2, 3)',
            alt: 'monastery aligned with single-scale l2',
          },
          {
            src: '/cs180/1/tobolsk-l2.jpg',
            before: '/cs180/1/tobolsk-before.jpg',
            caption: 'tobolsk · g (3, 3) · r (3, 6)',
            alt: 'tobolsk aligned with single-scale l2',
          },
        ],
      },
      {
        title: 'single scale + l2 norm vs pyramid + ncc',
        figureLayout: 'row',
        prose: [
          'just for comparison, here is our naive search with the l2 norm metric versus a pyramid search using the normalized cross-correlation (ncc) metric. we find similar results!',
        ],
        figures: [
          {
            src: '/cs180/1/cathedral.jpg',
            before: '/cs180/1/cathedral-l2.jpg',
            beforeLabel: 'l2 norm + single-scale',
            afterLabel: 'pyramid + ncc',
            caption: 'cathedral · both g (2, 5) · r (3, 12)',
            alt: 'cathedral l2 versus pyramid ncc',
          },
          {
            src: '/cs180/1/monastery.jpg',
            before: '/cs180/1/monastery-l2.jpg',
            beforeLabel: 'l2 norm + single-scale',
            afterLabel: 'pyramid + ncc',
            caption: 'monastery · both g (2, -3) · r (2, 3)',
            alt: 'monastery l2 versus pyramid ncc',
          },
          {
            src: '/cs180/1/tobolsk.jpg',
            before: '/cs180/1/tobolsk-l2.jpg',
            beforeLabel: 'l2 norm + single-scale',
            afterLabel: 'pyramid + ncc',
            caption: 'tobolsk · l2 norm g (3, 3) · ncc g (2, 3) · r (3, 6)',
            alt: 'tobolsk l2 versus pyramid ncc',
          },
        ],
      },
      {
        title: 'multi-scale pyramid alignment',
        figureLayout: 'row',
        prose: [
          'the remaining plates are the full-size tiffs. the pyramid keeps the search to a few dozen ncc evaluations per level instead of a giant ±displacement window on a 3000px channel. offsets are (dx, dy) in pixels at full resolution.',
        ],
        figures: [
          {
            src: '/cs180/1/church.jpg',
            before: '/cs180/1/church-before.jpg',
            caption: 'church · g (-11, 25) · r (-5, 58)',
            alt: 'colorized church',
          },
          {
            src: '/cs180/1/harvesters.jpg',
            before: '/cs180/1/harvesters-before.jpg',
            caption: 'harvesters · g (16, 60) · r (14, 124)',
            alt: 'colorized harvesters',
          },
          {
            src: '/cs180/1/icon.jpg',
            before: '/cs180/1/icon-before.jpg',
            caption: 'icon · g (17, 41) · r (23, 89)',
            alt: 'colorized icon',
          },
          {
            src: '/cs180/1/ilemselga.jpg',
            before: '/cs180/1/ilemselga-before.jpg',
            caption: 'ilemselga · g (6, 40) · r (9, 130)',
            alt: 'colorized ilemselga',
          },
          {
            src: '/cs180/1/melons.jpg',
            before: '/cs180/1/melons-before.jpg',
            caption: 'melons · g (9, 82) · r (12, 178)',
            alt: 'colorized melons',
          },
          {
            src: '/cs180/1/religous_painting.jpg',
            before: '/cs180/1/religous_painting-before.jpg',
            caption: 'religious painting · g (4, 28) · r (7, 68)',
            alt: 'colorized religious painting',
          },
          {
            src: '/cs180/1/self_portrait.jpg',
            before: '/cs180/1/self_portrait-before.jpg',
            caption: 'self portrait · g (26, 78) · r (34, 176)',
            alt: 'colorized self portrait',
          },
          {
            src: '/cs180/1/siren.jpg',
            before: '/cs180/1/siren-before.jpg',
            caption: 'siren · g (-7, 49) · r (-25, 96)',
            alt: 'colorized siren',
          },
          {
            src: '/cs180/1/three_generations.jpg',
            before: '/cs180/1/three_generations-before.jpg',
            caption: 'three generations · g (13, 55) · r (10, 112)',
            alt: 'colorized three generations',
          },
          {
            src: '/cs180/1/wharf.jpg',
            before: '/cs180/1/wharf-before.jpg',
            caption: 'wharf · g (-7, 15) · r (-17, 83)',
            alt: 'colorized wharf',
          },
        ],
      },
      {
        title: 'library of congress plates',
        figureLayout: 'row',
        prose: [
          'three more plates pulled from the library of congress collection, run through the same pyramid + normalized cross-correlation (ncc) pipeline.',
        ],
        figures: [
          {
            src: '/cs180/1/rainbow.jpg',
            before: '/cs180/1/rainbow-before.jpg',
            caption: 'rainbow · g (-5, 52) · r (17, 106)',
            alt: 'colorized rainbow over a river',
            favorite: true,
          },
          {
            src: '/cs180/1/sobor.jpg',
            before: '/cs180/1/sobor-before.jpg',
            caption: 'sobor · g (-7, 39) · r (-13, 126)',
            alt: 'colorized white cathedral',
          },
          {
            src: '/cs180/1/floodgate.jpg',
            before: '/cs180/1/floodgate-before.jpg',
            caption: 'floodgate · g (-5, 32) · r (-11, 75)',
            alt: 'colorized canal and floodgate',
          },
        ],
      },
      {
        title: 'failure: emir',
        figureLayout: 'stack',
        prose: [
          'emir is the one plate the pipeline did not recover. green landed at (24, 49), which is in a reasonable range, but red jumped to (-593, -442), which is quite off. you can see red emir\'s "ghost" to the top left of the forefront.',
          'the likely cause is that emir’s filter plates have very different intensity patterns. a bright white turban in one plate may be darker in another; saturated clothing can also change contrast across filters. ncc compares pixel brightness patterns, so it can mistake unrelated large bright/dark regions for a match at a coarse pyramid level.',
          'that wrong coarse shift is then doubled at each finer level. since the refine search only looks ±2 pixels around that estimate, it cannot travel hundreds of pixels back to the correct position. edges could help because they represent intensity changes instead of absolute brightness. the turban’s outline, the robe seams, the silhouette, and the door-frame boundaries should still show up in every channel even when their brightness differs.',
        ],
        figures: [
          {
            src: '/cs180/1/emir.jpg',
            before: '/cs180/1/emir-before.jpg',
            caption: 'emir · g (24, 49) · r (-593, -442)',
            alt: 'failed alignment of the emir of bukhara',
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
  return project.parts.length > 0
}
