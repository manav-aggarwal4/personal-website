import type { Cs180Figure, Cs180Project } from './cs180'
import { cs180Project3PartB } from './cs180-project3-partb'

// Images extracted from the saved outputs of part_a_cs180_project3 (1).ipynb.
// Alternate PNG/JPEG representations and the repeated original share one asset.
function figure(name: string, caption: string, wide = true): Cs180Figure {
  const extension = name === 'conditional-samples' || name === 'cfg-samples' ? '-unlabeled.svg' : '.webp'
  return { src: `/cs180/3/${name}${extension}`, caption, alt: caption, wide }
}

export const cs180Project3: Cs180Project = {
  id: '3',
  title: 'fun with flow models',
  status: 'in-progress',
  due: 'part a · october 20, 2026',
  summary: 'sampling, guidance, image editing, and optical illusions with flow models.',
  parts: [
    {
      title: 'part a: exploring the power of flow models',
      prose: [
        'this part explores image generation and editing with the pretrained PixNerd-XXL-P16-T2I flow model. the experiments move from noisy inputs and denoising to classifier-free guidance, image editing, visual anagrams, and hybrid images.',
        'the inputs are center-cropped and resized to 512×512, with RGB values normalized to [−1, 1]. the sampling step size is 0.02. guided sampling uses weight w = 7 and an empty-string unconditional prompt. each editing sweep uses the same initial noise at starting times 0.02, 0.04, 0.06, 0.10, 0.14, 0.25, and 0.50.',
      ],
      figures: [{ ...figure('original', 'original image · starting point for the denoising experiments', false), centered: true }],
    },
    {
      title: '1.1 constructing noisy training inputs',
      prose: [
        'i used a photo of rohan for the denoising experiments. linear interpolation mixes one fixed gaussian noise tensor with the clean image: t = 0 is pure noise, and t = 1 is the original. the same noise and image are reused throughout sections 1.1–1.5.',
      ],
      equations: ['x(t) = (1 − t)ε + t·x(1)'],
      figures: [
        figure('training-inputs', 'original and noisy inputs · t = 0.25, 0.50, 0.75'),
      ],
    },
    {
      title: '1.2 classical denoising',
      prose: [
        'the gaussian baseline first divides the noisy input by t to restore the image amplitude, then blurs it. the notebook tries σ = 1, 2, 4, 8, and 16, choosing the smallest mean squared error against the clean image. the selected values are 8, 4, and 1 as t increases. stronger blur suppresses the noise but also washes out the face, shirt, and background details.',
      ],
      figures: [
        figure('blur-t025', 't = 0.25 · noisy input and gaussian blur · σ = 8'),
        figure('blur-t050', 't = 0.50 · noisy input and gaussian blur · σ = 4'),
        figure('blur-t075', 't = 0.75 · noisy input and gaussian blur · σ = 1'),
      ],
    },
    {
      title: '1.3 one-step denoising',
      prose: [
        'one-step denoising predicts velocity once and extrapolates to the clean endpoint with the prompt “a high quality photo”. even at t = 0.25, the model recovers a recognizable person and table, although it smooths out details. at larger starting times, more of the original shirt and drink survive.',
      ],
      equations: ['x̂(1) = x(t) + (1 − t)·v(x(t), t, c)'],
      figures: [
        figure('one-step-t025', 't = 0.25 · original, noisy input, one-step estimate'),
        figure('one-step-t050', 't = 0.50 · original, noisy input, one-step estimate'),
        figure('one-step-t075', 't = 0.75 · original, noisy input, one-step estimate'),
      ],
    },
    {
      title: '1.4 visualizing velocity',
      prose: [
        'the predicted update is compared with the ground-truth update, which is the clean image minus the noisy input. the error maps show the root-mean-square difference across RGB at each pixel, computed before display scaling. all updates use one symmetric RGB scale with zero at middle gray; all error maps share the same linear limits.',
      ],
      figures: [
        { ...figure('velocity-t025', 't = 0.25 · noisy image, predicted update, ground-truth update, RGB RMS error'), large: true },
        { ...figure('velocity-t050', 't = 0.50 · noisy image, predicted update, ground-truth update, RGB RMS error'), large: true },
        { ...figure('velocity-t075', 't = 0.75 · noisy image, predicted update, ground-truth update, RGB RMS error'), large: true },
      ],
    },
    {
      title: '1.5 iterative denoising with euler sampling',
      prose: [
        'starting from the saved t = 0.50 input, euler sampling recomputes the velocity after every 0.02 step, taking 25 updates to reach t = 1. the trajectory shows the initial image and every fifth update. compared with gaussian blur, both model-based methods preserve much more structure; the iterative result retains more of the shirt pattern than the one-step estimate.',
      ],
      equations: ['x(t + h) = x(t) + h·v(x(t), t, c)'],
      figures: [
        figure('euler-trajectory', 'euler trajectory · t = 0.50, 0.60, 0.70, 0.80, 0.90, 1.00'),
        figure('denoising-comparison', 'same t = 0.50 input · original, gaussian blur, one-step estimate, euler denoising'),
      ],
    },
    {
      title: '1.6 generating images from noise',
      prose: [
        'these five samples start from independent gaussian noises and run 50 euler updates from t = 0 to t = 1 with “a high quality photo”. the generic prompt produces people in all five saved samples, but the image quality varies: some faces are distorted, and one sample has a painted appearance.',
      ],
      figures: [
        figure('conditional-samples', 'ordinary conditional generation · prompt: “a high quality photo”'),
      ],
    },
    {
      title: '2.1 classifier-free guidance',
      prose: [
        'the guided samples reuse the same initial noises so they can be compared with ordinary conditional generation. this notebook defines guidance as the conditional velocity plus w times the difference between conditional and unconditional velocities, so w = 0 recovers ordinary conditional generation. at w = 7, the saved outputs are clearer, more consistent portrait photographs, although the composition is less varied.',
      ],
      equations: ['v_cfg = v_c + w·(v_c − v_u)'],
      figures: [
        figure('conditional-samples', 'before guidance · ordinary conditional sampling'),
        figure('cfg-samples', 'with guidance · w = 7 · step size 0.02'),
      ],
    },
    {
      title: '3.1 image-to-image editing',
      prose: [
        'each sweep mixes the input with gaussian noise and then samples toward “a high quality photo”. smaller starting times leave more room for the model to invent a new image; larger times preserve more of the original. the campanile keeps a tower-like silhouette even at low times, while the two personal photos can become unrelated portraits or objects. by t = 0.25 and 0.50, the original scenes are much easier to recognize.',
      ],
      figures: [
        figure('edit-campanile', 'campanile · original and seven starting times · prompt: “a high quality photo”'),
        figure('edit-rohan', 'rohan · original and seven starting times · prompt: “a high quality photo”'),
        figure('edit-japan', 'japan photo · original and seven starting times · prompt: “a high quality photo”'),
      ],
    },
    {
      title: '3.1 editing hand-drawn and web images',
      prose: [
        'i repeated the same sweep on an otter illustration from the web and two drawings. at very low starting times, the model sometimes produces portraits or simple objects. the diet coke lettering and the flower drawing return as the starting time increases, showing how strongly the remaining input constrains the result.',
      ],
      figures: [
        { ...figure('edit-web-otter', 'web otter illustration · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
        { ...figure('edit-drawing-diet-coke', 'diet coke drawing · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
        { ...figure('edit-drawing-flower', 'flower drawing · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
      ],
    },
    {
      title: '3.2 text-guided image editing',
      prose: [
        'changing the prompt changes what the sampler builds from the noisy input. the oski prompt turns the campanile into bear imagery at small starting times, while larger times keep the tower. the werewolf sweep preserves more of the original pose and setting in its intermediate results. the japan sweep moves from the eiffel tower prompt toward the original red gates as the starting time increases.',
      ],
      figures: [
        figure('text-edit-campanile', 'campanile · prompt: “A photograph of Oski the Bear (UC Berkeley Mascot)”'),
        figure('text-edit-rohan', 'rohan · prompt: “A photograph of a smiling Werewolf with a pint of Guinness”'),
        figure('text-edit-japan', 'japan photo · prompt: “A photograph of Arnold Schwarzenegger flexing in front of the Eiffel Tower”'),
      ],
    },
    {
      title: '3.3 visual anagrams',
      prose: [
        'the sampler averages two guided velocities: one from the upright image and one from the image rotated 180°, rotated back before combining. this saved result pairs “an oil painting of a fluffy baby penguin” with “an oil painting of an old wizard’s face with a flowing white beard”. the penguin’s dark body and pale chest become the wizard’s hat and beard in the rotated view.',
        'the second illusion pairs “an oil painting of a single golden flaky crescent-shaped croissant, centered on a dark background” with “an oil painting of a sleeping orange cat curled up, with its face and ears visible, centered on a dark background”. the curled orange form supports both readings, although the sleeping cat is clearer than the croissant.',
      ],
      figures: [
        figure('anagram-penguin-wizard', 'baby penguin upright / old wizard rotated 180° · w = 7'),
        figure('anagram-croissant-cat', 'croissant upright / sleeping orange cat rotated 180° · w = 7'),
      ],
    },
    {
      title: '3.4 hybrid images',
      prose: [
        'the hybrid sampler combines the low frequencies of one guided velocity with the high frequencies of another. the low-pass filter uses a 265×265 gaussian kernel with σ = 16. the prompt pairs are cookie / sunflower and yoda / forest, with the first prompt controlling distant structure and the second controlling close-up detail.',
        'the reduced views below are displayed at their saved 64×64 size. the sunflower remains prominent at both scales, so the cookie interpretation is weaker. in the second result, the branches and ferns form a green face-like structure in the reduced view.',
      ],
      equations: ['v_hybrid = lowpass(v_a) + v_b − lowpass(v_b)'],
      figureLayout: 'grid2',
      figures: [
        { ...figure('hybrid-cookie-sunflower-near', 'near · “a detailed oil painting of a sunflower with dark seeds and golden petals”', false), displayWidth: 512 },
        { ...figure('hybrid-cookie-sunflower-distant', 'distant · “an oil painting of a round chocolate chip cookie” · 64×64', false), displayWidth: 64, verticalCenter: true },
        { ...figure('hybrid-yoda-forest-near', 'near · “a detailed oil painting of a mossy forest with tangled branches and ferns”', false), displayWidth: 512 },
        { ...figure('hybrid-yoda-forest-distant', 'distant · “an oil painting of Yoda’s face with large pointed ears” · 64×64', false), displayWidth: 64, verticalCenter: true },
      ],
    },
    ...cs180Project3PartB,
  ],
}
