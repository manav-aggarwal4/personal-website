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
  wide?: boolean
}

export type Cs180Part = {
  title: string
  prose?: string[]
  equation?: string
  equations?: string[]
  equationFrac?: {
    left: string
    num: string
    den: string
  }
  equationKind?: 'gaussian'
  snippets?: string[]
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
  {
    id: '2',
    title: 'fun with filters and frequencies',
    status: 'published',
    parts: [
      {
        title: 'intro',
        prose: [
          'this project is about 2d convolution, edges, and frequency: filters from scratch, then sharpening, hybrid images, and multi-resolution blending.',
        ],
      },
      {
        title: '1.1 convolutions from scratch',
        prose: [
          'a 2d convolution slides a flipped kernel over the image and takes a dot product at each pixel. i implemented “same” zero-padding so the output keeps the input size: pad by k//2 and (k−1)//2 on opposite sides so the kernel center can sit on the border for both odd and even kernels.',
          'the four-loop version multiplies every kernel tap by hand. the two-loop version still walks pixels, but np.sum does the window. both flip the kernel with np.flip, matching scipy.signal.convolve2d. on the cameraman (542×540) with a 9×9 box, the four-loop run took 5.9s, the two-loop 0.49s, and scipy 0.02s. the three outputs match to ~1e-15. scipy is faster because it is compiled (and can use fft); our padding is explicit zero-fill, which is the same as mode=\'same\' with fillvalue=0.',
        ],
        equations: [
          'Convolution: (I * K)(x, y) = ΣᵢΣⱼ I(x − i, y − j)K(i, j)',
          'Same padding output size: H_out = H_in, W_out = W_in',
        ],
        snippets: [
          `def zeroPadding(image, kernelRows, kernelCols):
    top, bottom = kernelRows // 2, (kernelRows - 1) // 2
    left, right = kernelCols // 2, (kernelCols - 1) // 2
    cpy = np.zeros((len(image) + top + bottom, len(image[0]) + left + right))
    cpy[top:top + len(image), left:left + len(image[0])] = image
    return cpy`,
          `def fullBruteForceConvolution(image, kernel):
    rows, cols = len(image), len(image[0])
    kernelRows, kernelCols = len(kernel), len(kernel[0])
    imagePadded = zeroPadding(image, kernelRows, kernelCols)
    output = np.zeros((rows, cols))
    convKernel = np.flip(kernel)
    for i in range(rows):
        for j in range(cols):
            runningTotal = 0
            for u in range(kernelRows):
                for v in range(kernelCols):
                    runningTotal += imagePadded[i + u][j + v] * convKernel[u][v]
            output[i, j] = runningTotal
    return output`,
          `def modifiedBruteForceConvolution(image, kernel):
    rows, cols = len(image), len(image[0])
    kernelRows, kernelCols = len(kernel), len(kernel[0])
    imagePadded = zeroPadding(image, kernelRows, kernelCols)
    output = np.zeros((rows, cols))
    convKernel = np.flip(kernel)
    for i in range(rows):
        for j in range(cols):
            output[i, j] = np.sum(
                imagePadded[i:i + kernelRows, j:j + kernelCols] * convKernel
            )
    return output`,
        ],
        figureLayout: 'row',
        figures: [
          { src: '/cs180/2/selfie.jpg', caption: 'grayscale selfie', alt: 'grayscale selfie' },
          { src: '/cs180/2/selfie-box.jpg', caption: '9×9 box filter', alt: 'selfie after 9 by 9 box filter' },
          { src: '/cs180/2/selfie-dx.jpg', caption: 'convolved with dx = [1, 0, −1]', alt: 'selfie x derivative' },
          { src: '/cs180/2/selfie-dy.jpg', caption: 'convolved with dy', alt: 'selfie y derivative' },
        ],
      },
      {
        title: '1.2 finite difference operator',
        prose: [
          'on the cameraman, dx = [1, 0, −1] picks up vertical edges and dy picks up horizontal ones. the gradient magnitude is √(dx² + dy²). to binarize, 0.23 was the best of {0.05, 0.1, 0.2, 0.23, 0.4, 0.5}: lower values light up grass as noise, higher values drop the tripod and coat. it is a qualitative tradeoff — keep the real contours, suppress the field.',
        ],
        equations: [
          'Dₓ = [1 0 −1],    Dᵧ = [1 0 −1]ᵀ',
          'Gradient magnitude: ||∇I|| = √((I * Dₓ)² + (I * Dᵧ)²)',
        ],
        figureLayout: 'row',
        figures: [
          { src: '/cs180/2/cameraman.jpg', caption: 'cameraman', alt: 'cameraman original' },
          {
            src: '/cs180/2/part1-2-derivatives.jpg',
            caption: '∂x, ∂y, and Gradient Magnitude',
            alt: 'cameraman partial derivatives and gradient magnitude',
            wide: true,
          },
          {
            src: '/cs180/2/part1-2-thresholds.jpg',
            caption: 'Threshold (α) sweep · chosen 0.23 on the bottom',
            alt: 'cameraman edge thresholds with chosen 0.23 below',
            wide: true,
          },
        ],
      },
      {
        title: '1.3 derivative of gaussian (DoG) filter',
        prose: [
          'plain finite differences are noisy because they amplify high frequencies. an 11×11 gaussian (σ = 2) from cv2.getGaussianKernel, outer-producted into 2d, smooths first; then the same dx/dy + magnitude + binarize pipeline. after blurring the magnitudes are smaller, so the useful thresholds sit around 0.02–0.08. t = 0.04 keeps the coat and tripod and drops most of the grass.',
          'convolving that gaussian with dx and dy gives derivative-of-gaussian filters, so the blur and the derivative happen in one convolution. side by side at the same threshold, blur-then-differentiate and the fused DoG look the same; leftover differences are from mode=\'same\' padding, not a different derivative.',
        ],
        equations: [
          '2D Gaussian: G(x, y) = (1 / 2πσ²)e^{−(x² + y²) / 2σ²}',
          'DoG filters: DoGₓ = G * Dₓ,    DoGᵧ = G * Dᵧ',
          '(I * G) * Dₓ = I * (G * Dₓ)',
        ],
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/2/part1-3-filters.jpg',
            caption: 'Gaussian, DoG ∂x, DoG ∂y',
            alt: 'gaussian and derivative of gaussian filters',
            wide: true,
          },
          {
            src: '/cs180/2/part1-3-gradients.jpg',
            caption: 'Blur-then-differentiate vs DoG: ∂x, ∂y, magnitude',
            alt: 'blurred and DoG gradient comparison',
            wide: true,
          },
          {
            src: '/cs180/2/part1-3-blur-thresholds.jpg',
            caption: 'Blurred Threshold (α) sweep',
            alt: 'blurred edge thresholds',
            wide: true,
          },
          {
            src: '/cs180/2/part1-3-edges-compare.jpg',
            caption: 'Blur then differentiate vs DoG, α = 0.04',
            alt: 'edge comparison at threshold 0.04',
            wide: true,
          },
        ],
      },
      {
        title: '2.1 image sharpening',
        prose: [
          'a gaussian is a low-pass filter. subtracting that blur from the original leaves the high frequencies. unsharp masking adds them back: I + α(I − G∗I), which is the same as convolving with (1+α)δ − αG. α = 1.1 for the two-step taj result, α = 1.2 for the single kernel.',
          'chasu and the red panda start soft, so adding high frequencies actually helps. kiss starts sharp: blur it, then sharpen, and you get edges back but not the original — the gaussian threw away detail the unsharp mask cannot invent.',
        ],
        equations: [
          'High frequencies: H = I − (G * I)',
          'Unsharp mask: I_sharp = I + αH = I + α(I − G * I)',
          'Single filter: I_sharp = I * ((1 + α)δ − αG)',
        ],
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/2/taj-steps.jpg',
            caption: 'taj · original, blur, high frequencies, two-step sharp, unsharp kernel',
            alt: 'taj mahal sharpening steps',
            wide: true,
          },
          {
            src: '/cs180/2/taj-alphas.jpg',
            caption: 'taj · α = 0.5, 1.2, 2.5',
            alt: 'taj sharpening amounts',
            wide: true,
          },
          {
            src: '/cs180/2/chasu-steps.jpg',
            caption: 'chasu · original, blur, high frequencies, sharpened',
            alt: 'chasu sharpening',
            wide: true,
          },
          {
            src: '/cs180/2/red-panda-steps.jpg',
            caption: 'red panda · original, blur, high frequencies, sharpened',
            alt: 'red panda sharpening',
            wide: true,
          },
          {
            src: '/cs180/2/kiss-eval.jpg',
            caption: 'evaluation · kiss original, blurred, then sharpened',
            alt: 'kiss blur then sharpen evaluation',
            wide: true,
          },
        ],
      },
      {
        title: '2.2 hybrid images',
        prose: [
          'a hybrid is a low-pass copy of one picture plus a high-pass copy of another. from far away you only see the blur; up close the edges take over. the low-pass is a gaussian; the high-pass is the image minus that gaussian (impulse minus g). both pictures are click-aligned first so eyes (or the can/glass) sit on top of each other.',
          'mama + papa is the process example. papa is the low-pass (far), mama the high-pass (close), with a 41×41 gaussian, σ = 16. the fft of the low-pass is a bright blob at the origin; the high-pass is a hole in the middle; the hybrid has both. derek + nutmeg uses σ = 8; ghost + raspberry uses σ = 14 so the berry shape survives at a distance while the logo stays sharp up close.',
        ],
        equations: [
          'Low-pass source: L = G * I_low',
          'High-pass source: H = I_high − (G * I_high)',
          'Hybrid image: I_hybrid = L + H',
        ],
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/2/mama-papa-aligned-low.jpg',
            caption: 'papa, aligned · low-pass source',
            alt: 'aligned papa',
          },
          {
            src: '/cs180/2/mama-papa-aligned-high.jpg',
            caption: 'mama, aligned · high-pass source',
            alt: 'aligned mama',
          },
          {
            src: '/cs180/2/mama-papa-lowpass.jpg',
            caption: 'low-pass papa',
            alt: 'gaussian low-pass papa',
          },
          {
            src: '/cs180/2/mama-papa-highpass.jpg',
            caption: 'high-pass mama',
            alt: 'high-pass mama',
          },
          {
            src: '/cs180/2/mama-papa-hybrid.jpg',
            caption: 'hybrid · far = papa, close = mama · ksize=41, σ=16',
            alt: 'mama papa hybrid',
          },
          {
            src: '/cs180/2/mama-papa-fft.jpg',
            caption: 'log fft · sources, low-pass, high-pass, hybrid',
            alt: 'mama papa fourier transforms',
            wide: true,
          },
          {
            src: '/cs180/2/derek-nutmeg-strip.jpg',
            caption: 'derek + nutmeg · aligned sources and hybrid · ksize=25, σ=8',
            alt: 'derek nutmeg aligned sources and hybrid',
            wide: true,
          },
          {
            src: '/cs180/2/ghost-raspberry-strip.jpg',
            caption: 'ghost + raspberry · aligned sources and hybrid · ksize=35, σ=14',
            alt: 'ghost raspberry aligned sources and hybrid',
            wide: true,
          },
        ],
      },
      {
        title: '2.3 gaussian and laplacian stacks',
        prose: [
          'a stack is a pyramid that never downsamples: each gaussian level is just another blur of the last, same size as the original. the laplacian at each level is the difference of two adjacent gaussians, with the coarsest gaussian kept as the residual so the bands sum back to the image.',
          'figure 3.42 uses a vertical step mask, blurred through the same gaussian stack. rows are laplacian levels 0, 4, and 8 (high / mid / low). left = apple × mask, middle = orange × (1−mask), right = their sum. (j)(k) are the sources; (l) is the collapsed oraple.',
        ],
        equations: [
          'Gaussian stack: G₀ = I,    Gᵢ = G * Gᵢ₋₁',
          'Laplacian stack: Lᵢ = Gᵢ − Gᵢ₊₁,    Lₙ = Gₙ',
          'Reconstruction: I = Σᵢ Lᵢ',
        ],
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/2/fig-3-42.jpg',
            caption: 'figure 3.42 · laplacian stack blending of apple and orange',
            alt: 'recreated szeliski figure 3.42 oraple',
            wide: true,
          },
        ],
      },
      {
        title: '2.4 multiresolution blending',
        prose: [
          'at each laplacian level we lerp with that level’s gaussian mask: α·a + (1−α)·b, then sum the bands. a hard step (or a drawn region) is stacked with the same gaussian so high frequencies keep a sharp cut and the residual mixes color.',
          'apple / orange is the vertical-seam sample (fig 3.42). skinny / fat is the same step on our photos after click-aligning the eyes. lombard / lava uses an irregular mask (white = road) so lava fills the street and the buildings stay.',
        ],
        equations: [
          'Blended level: Lᶜᵢ = MᵢLᴬᵢ + (1 − Mᵢ)Lᴮᵢ',
          'Final blend: I_blend = Σᵢ Lᶜᵢ',
        ],
        figureLayout: 'row',
        figures: [
          {
            src: '/cs180/2/oraple.jpg',
            caption: 'oraple · vertical step mask',
            alt: 'apple orange laplacian blend',
          },
          {
            src: '/cs180/2/fat-skinny-strip.jpg',
            caption: 'skinny / fat · vertical seam after aligning eyes',
            alt: 'skinny fat blend strip',
            wide: true,
          },
          {
            src: '/cs180/2/lombard-lava-strip.jpg',
            caption: 'lombard, lava, mask, blend',
            alt: 'lombard lava blend strip',
            wide: true,
          },
          {
            src: '/cs180/2/lombard-process.jpg',
            caption: 'process · laplacian levels 0, 4, 8 of lava×mask, street×(1−mask), sum; then sources and result',
            alt: 'lombard lava laplacian blending process',
            wide: true,
          },
        ],
      },
      {
        title: 'reflection',
        prose: [
          'one of the most important things i learned was how crucial gaussian blurring is for smooth blending. at first, i made the mistake of using a hard, unblurred mask, and the difference after applying a gaussian stack to the mask was night and day. the transition became much more natural because each frequency band blended at the right scale.',
          'i also learned how important alignment and image compatibility are, especially for hybrid images. even if the math is correct and the parameters like ksize and sigma are well chosen, the result will still look bad if the images are not aligned or do not share compatible shapes and features. i had to try several image pairs before finding hybrids that both looked interesting and actually worked perceptually.',
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
