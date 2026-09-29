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
  centered?: boolean
}

export type Cs180Part = {
  title: string
  prose?: string[]
  afterSnippetsProse?: string[]
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
  figureLayout?: 'stack' | 'row' | 'grid2' | 'hybrid-process'
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
          'lots of fun with {kernels, edge detection, frequency-domain image processing, and multiresolution blending}.',
        ],
      },
      {
        title: '1.1 convolutions from scratch',
        prose: [
          'a 2d convolution slides a flipped kernel over the image and takes a dot product at each pixel. i chose to implement “same” zero-padding, so the output shape is the same as the input shape. we pad by `k//2` and `(k−1)//2` on opposite sides so both even and odd-sized kernels can be applied accurately at the image borders.',
          'i made two versions of convolution from scratch using numpy. the four-loop version explicitly multiplies each kernel entry against the corresponding image pixel. the two-loop version still walks each pixel, but np.sum does the window multiplication. compared with scipy.signal.convolve2d, both of my versions are obviously slower, though they use the same convolution convention by flipping the kernel with np.flip. on the cameraman (542×540) with a 9×9 box, the four-loop run took 5.9s, the two-loop 0.49s, and scipy 0.02s. the three outputs match to ~1e-15. the scipy version is faster because it is compiled (and can use fft); my padding is explicit zero-fill, which can be reproduced in scipy with mode=\'same\' and fillvalue=0.',
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
        afterSnippetsProse: [
          'here are my hand-rolled convolution functions in action against a selfie of me in [Qahwa Time](https://qahwatime.co/) (yemeni coffee open till midnight every day, i recommend!). i applied a 9×9 box filter, and also convolved the selfie with the x- and y-derivative filters.',
        ],
        figureLayout: 'grid2',
        figures: [
          { src: '/cs180/2/selfie.jpg', caption: 'grayscale selfie', alt: 'grayscale selfie' },
          { src: '/cs180/2/selfie-box.jpg', caption: '9×9 box filter', alt: 'selfie after 9 by 9 box filter' },
          { src: '/cs180/2/selfie-dx.jpg', caption: 'convolved with x-derivative filter Dₓ = [1, 0, −1]', alt: 'selfie x derivative' },
          { src: '/cs180/2/selfie-dy.jpg', caption: 'convolved with y-derivative filter Dᵧ = [1, 0, −1]ᵀ', alt: 'selfie y derivative' },
        ],
      },
      {
        title: '1.2 finite difference operator',
        prose: [
          'on the cameraman (and my selfie), dx = [1, 0, −1] picks up vertical edges and dy picks up horizontal ones. the gradient magnitude is √(dx² + dy²). to turn the gradient magnitude into a binary edge image, i tested thresholds in {0.05, 0.1, 0.2, 0.23, 0.4, 0.5} and chose 0.23. lower thresholds kept too much grass texture as noise, while higher thresholds started removing real edges in the tripod and coat. 0.23 felt like the best qualitative tradeoff as it kept the main contours while suppressing most of the field texture.',
        ],
        equations: [
          'Dₓ = [1 0 −1],    Dᵧ = [1 0 −1]ᵀ',
          'Gradient magnitude: ||∇I|| = √((I * Dₓ)² + (I * Dᵧ)²)',
        ],
        figureLayout: 'row',
        figures: [
          { src: '/cs180/2/cameraman.jpg', caption: 'cameraman', alt: 'cameraman original', centered: true },
          {
            src: '/cs180/2/part1-2-derivatives.jpg',
            caption: '∂x, ∂y, and Gradient Magnitude',
            alt: 'cameraman partial derivatives and gradient magnitude',
            wide: true,
          },
          {
            src: '/cs180/2/part1-2-thresholds-featured.jpg',
            caption: 'Threshold (α) sweep · chosen 0.23 on the right',
            alt: 'cameraman edge thresholds with chosen 0.23 on the right',
            wide: true,
          },
        ],
      },
      {
        title: '1.3 derivative of gaussian (DoG) filter',
        prose: [
          'the finite difference results are pretty noisy because derivative filters amplify high frequencies in the image. to reduce that noise, i blurred the image before taking the derivative. i made an 11×11 gaussian filter with σ = 2 using cv2.getGaussianKernel, then turned the 1d gaussian into a 2d filter with an outer product. after that blur, i reused the same derivative filters, gradient magnitude calculation, and thresholding process as before. because the blurred image has smaller gradient magnitudes, the useful thresholds are also smaller, around 0.02 to 0.08. i chose t = 0.04 because it keeps the coat and tripod edges while removing most of the grass texture.',
          'i also combined the gaussian blur and derivative step into a single derivative-of-gaussian filter by convolving the gaussian with dx and dy. this means one filter can smooth the image and take the derivative at the same time. the blur-then-differentiate result and the DoG result look extremely similar at α = 0.04, which makes sense because convolution is associative. the small leftover differences come from mode=\'same\' padding at the image boundary, not from a different edge detector.',
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
          'a gaussian blur acts like a low-pass filter because it keeps the smooth, slowly changing parts of the image and removes a lot of the fine detail. if i subtract the blurred image from the original, what is left is mostly the high-frequency detail, like edges and texture. unsharp masking sharpens the image by adding some of those high frequencies back into the original: I + α(I − G∗I). this is equivalent to applying one combined convolution filter, (1+α)δ − αG. for the taj example, i used α = 1.1 for the two-step version and α = 1.2 for the single-kernel version.',
          'this works well on chasu and the red panda because both images start out a little soft, so boosting the high frequencies makes the details look clearer. the kiss example is different because the original image starts sharp. after i blur it and then try to sharpen it again, the edges come back somewhat, but the result still does not match the original. the gaussian blur already removed some real detail, and the unsharp mask can emphasize existing edges but cannot invent detail that was already lost.',
          'i recently came back from japan and discovered how cute red pandas are in real life. i also had chasu, or braised pork belly, ramen for the first time in tokyo, and it was phenomenal, so i chose those as two of my images. the kiss art piece is also a lego decoration i have in my room, so i thought it would be a fun image to use for the blur-and-resharpening test.',
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
          'a hybrid image combines the low frequencies from one picture with the high frequencies from another. from far away, the low-frequency image dominates because the viewer mostly sees broad shapes and smooth color changes. up close, the high-frequency image becomes more visible because the edges and fine details are easier to see. i created the low-pass image by applying a gaussian blur, and i created the high-pass image by subtracting a gaussian blur from the original image. before combining them, i click-aligned each pair so important features, like the eyes or the can and glass, landed in the same place.',
          'a hybrid of my mom and dad is my main process example. my dad is the low-pass source, so he is the image that appears from far away, while my mom is the high-pass source, so she is the image that appears more clearly up close. for this pair, i used a 41×41 gaussian with σ = 16. the fft visualizations show the frequency split: the low-pass image has most of its energy near the center, the high-pass image removes much of that center energy, and the final hybrid contains both kinds of information. for the other examples, derek + nutmeg uses σ = 8, while ghost + raspberry uses σ = 14 so the raspberry shape still reads from far away and the ghost logo stays crisp up close.',
        ],
        equations: [
          'Low-pass source: L = G * I_low',
          'High-pass source: H = I_high − (G * I_high)',
          'Hybrid image: I_hybrid = L + H',
        ],
        figureLayout: 'hybrid-process',
        figures: [
          {
            src: '/cs180/2/mama-papa-aligned-low-crop.jpg',
            caption: 'papa, aligned · low-pass source',
            alt: 'aligned papa',
          },
          {
            src: '/cs180/2/mama-papa-aligned-high-crop.jpg',
            caption: 'mama, aligned · high-pass source',
            alt: 'aligned mama',
          },
          {
            src: '/cs180/2/mama-papa-lowpass-crop.jpg',
            caption: 'low-pass papa',
            alt: 'gaussian low-pass papa',
          },
          {
            src: '/cs180/2/mama-papa-highpass-crop.jpg',
            caption: 'high-pass mama',
            alt: 'high-pass mama',
          },
          {
            src: '/cs180/2/mama-papa-hybrid-crop.jpg',
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
            src: '/cs180/2/derek-nutmeg-strip-crop.jpg',
            caption: 'derek + nutmeg · aligned sources and hybrid · ksize=25, σ=8',
            alt: 'derek nutmeg aligned sources and hybrid',
            wide: true,
          },
          {
            src: '/cs180/2/ghost-raspberry-strip-crop.jpg',
            caption: 'ghost + raspberry · aligned sources and hybrid · ksize=35, σ=14',
            alt: 'ghost raspberry aligned sources and hybrid',
            wide: true,
          },
        ],
      },
      {
        title: '2.3 gaussian and laplacian stacks',
        prose: [
          'a stack is similar to a pyramid, except it never downsamples the image. every gaussian level stays the same size as the original image; each level is just a blurrier version of the previous one. i built the laplacian stack by subtracting each gaussian level from the next blurrier gaussian level. the final, coarsest gaussian is kept as the residual, so adding all of the laplacian bands and the residual reconstructs the original image.',
          'for the figure 3.42 recreation, i used a vertical step mask and blurred that mask through the same gaussian stack. each row shows a different laplacian level: level 0 captures the highest-frequency detail, level 4 captures medium-scale structure, and level 8 captures the lowest-frequency color and lighting. in each row, the left image is the apple contribution multiplied by the mask, the middle image is the orange contribution multiplied by 1−mask, and the right image is their sum. the final row shows the original apple and orange sources, followed by the collapsed oraple result.',
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
          'for multiresolution blending, i blend the two laplacian stacks one level at a time. at each level, i use the matching gaussian-mask level to interpolate between the two images: α·a + (1−α)·b. then i sum the blended laplacian bands back together to get the final image. using a gaussian stack for the mask is important because it lets high-frequency details keep a relatively sharp boundary while lower-frequency colors and lighting transition more smoothly.',
          'the apple / orange blend is the vertical-seam example from figure 3.42. the junior year / sophomore year blend uses the same kind of vertical step mask on two photos of me from sophomore to junior year, after click-aligning the eyes. the lombard / lava example uses an irregular hand-drawn mask instead of a straight seam. i used the famous lombard street in san francisco as the base image, and in the mask, white selects the road area, so the lava fills the street while the buildings stay mostly from the original lombard image.',
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
            centered: true,
          },
          {
            src: '/cs180/2/fat-skinny-strip.jpg',
            caption: 'junior year / sophomore year · vertical seam after aligning eyes',
            alt: 'junior year sophomore year blend strip',
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
          {
            src: '/cs180/2/lombard-lava.jpg',
            caption: 'look how cool!!',
            alt: 'final lombard lava multiresolution blend',
            centered: true,
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
