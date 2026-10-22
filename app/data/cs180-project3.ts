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
  status: 'published',
  due: 'part a · october 20, 2026',
  parts: [
    {
      title: 'part a: exploring the power of flow models',
      prose: [
        'in the first part of this project, i used the pretrained [PixNerd-XXL-P16-T2I](https://huggingface.co/MCG-NJU/PixNerd-XXL-P16-T2I) model to explore how a flow model turns noise into an image. i started by adding noise to a real photograph and comparing a few ways of recovering it. once that was working, i used the same sampling process to generate new images, change existing photos with text prompts, and make images that look different when they are rotated or viewed from a distance.',
        'for the denoising examples, i used a picture of my friend rohan at [little plearn thai kitchen](https://www.littleplearnthai.com/) with a halloween-themed thai tea. the image is center-cropped and resized to 512×512, and its RGB values are normalized to [−1, 1]. i kept the same image and noise for the early comparisons so that the differences would come from the denoising methods themselves. for guided sampling, i used an euler step size of 0.02, guidance weight w = 7, and an empty text prompt for the unconditional prediction.',
      ],
      figures: [{ ...figure('original', 'original image', false), alt: 'original image of my friend Rohan at Little Plearn Thai Kitchen with a Halloween-Themed Thai Tea', centered: true }],
    },
    {
      title: '1.1 constructing noisy training inputs',
      prose: [
        'before trying to remove any noise, i first needed a way to construct the noisy images. i did this by linearly interpolating between a gaussian noise tensor and the original photo. the value of t controls how much of each goes into the result: at t = 0, the input is entirely noise, and at t = 1, it is the original image. this is different from simply adding noise on top of a photo because the image itself is also multiplied by t.',
        'the three examples below use t = 0.25, 0.50, and 0.75 with the same noise tensor. at 0.25, it is hard to make out much beyond the broad colors of the scene. as t increases, rohan’s face, the lettering on his shirt, and the drink become easier to recognize. i saved these exact inputs to reuse in the following sections so that each method would have to reconstruct the same starting image.',
      ],
      equations: ['x(t) = (1 − t)ε + t·x(1)'],
      figures: [
        figure('training-inputs', 'original and noisy inputs · t = 0.25, 0.50, 0.75'),
      ],
    },
    {
      title: '1.2 classical denoising',
      prose: [
        'i started with gaussian blur as a denoising baseline, which connects back to the filtering work from project 2. averaging nearby pixels can reduce the random variations caused by noise, but it also smooths out real edges and texture. before applying the blur, i divided the noisy image by t to restore the amplitude of the original image contribution. but this rescales the noise too, so it does not solve the denoising problem on its own.',
        'for each input, i tried σ = 1, 2, 4, 8, and 16 and chose the result with the lowest mean squared error against the original photo. the selected values were 8, 4, and 1 for t = 0.25, 0.50, and 0.75, respectively. the tradeoff is especially clear in the first result: a strong blur removes much of the grain, but it also greatly blurs the facial features, shirt lettering, and background details. with less noise to begin with, a smaller blur is enough to preserve more of the original detail.',
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
        'next, i used the pretrained model to predict how the noisy image should change as it moves toward a clean image. the model predicts a velocity, so i multiplied that prediction by the remaining time, 1 − t, and added it to the input. this gives a clean-image estimate from just one model prediction. i used the prompt “a high quality photo” for all three inputs so that the comparison would focus on the amount of noise rather than a change in the text condition.',
        'the model recovers much more recognizable structure than gaussian blur does, especially when comparing the two methods at t = 0.25. it can produce a face and a table even when the input is heavily corrupted, but recovering a plausible photo is not quite the same as recovering the exact original. some details of the drink and shirt get simplified or changed. the inputs at larger t values retain more information, so their reconstructions stay closer to the original photo.',
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
        'to understand what the one-step denoiser was doing, i looked at the update it adds to the noisy image. since i know the original photograph, i can also calculate the exact update that would recover it by subtracting the noisy input from the clean image. the figures below put this ground-truth update next to the model’s predicted update, followed by an error map showing where they disagree.',
        'for each pixel, i calculated the root-mean-square difference between the two updates across the RGB channels. i computed that error before clipping or scaling anything for display. the predicted and ground-truth updates share one symmetric color scale, where middle gray represents zero, and the error maps use the same limits across all three times. that makes the rows comparable: the darker error maps at larger t show that the remaining update is smaller and its absolute prediction error is lower, although this alone does not tell us the relative accuracy of the velocity prediction.',
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
        'one-step denoising assumes that a single velocity prediction is enough to get from the noisy input to the clean endpoint. the learned velocity can change as the image changes, though, so i also implemented euler sampling to follow it in smaller steps. after each update, i evaluated the model again using the new image and time. starting from the saved t = 0.50 input, a step size of 0.02 gives 25 updates before reaching t = 1.',
        'i displayed the initial state and every fifth update to show how the grain gradually disappears. the final comparison uses the same starting input for gaussian blur, one-step denoising, and euler denoising. both model-based methods preserve the scene much better than the blur baseline, and the iterative version keeps more of the shirt pattern than the one-step result. it still does not reproduce every detail of the original, but recomputing the direction gives it more opportunities to refine the reconstruction along the way.',
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
        'once the euler sampler was working on a partially noisy photograph, i could use it to generate an image without supplying a photograph at all. i started from gaussian noise at t = 0 and ran 50 updates to reach t = 1, again using “a high quality photo” as the prompt. the five results below come from independent initial noises, so each one follows its own path through the model.',
        'even though the prompt does not ask for a particular subject, all five outputs are images of people. they also vary quite a bit in quality. some have distorted facial features, and one looks more like a painting than a photograph. these results show that the sampler can turn pure noise into recognizable images, but the generic prompt alone does not consistently produce the kind of clean photograph i would expect from the wording.',
      ],
      figures: [
        figure('conditional-samples', 'ordinary conditional generation · prompt: “a high quality photo”'),
      ],
    },
    {
      title: '2.1 classifier-free guidance',
      prose: [
        'for classifier-free guidance, i evaluated the model twice at the same image and time: once with the photo prompt and once with an empty prompt. i then used the difference between those predictions to strengthen the direction associated with the text condition. in the convention used for part a, the guided velocity is the conditional prediction plus w times that difference. setting w = 0 therefore gives the ordinary conditional prediction from the previous section.',
        'i used w = 7 and reused the same five initial noise tensors so that the before-and-after comparison would be meaningful. the guided outputs look much more like conventional portrait photographs, with clearer faces and more consistent lighting. they also have a more similar composition to one another. guidance improves how strongly the results follow the idea of a high-quality photo here, but some of the variety in the original set is lost.',
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
        'for image-to-image editing, i returned to the same idea of mixing an input image with noise and then sampling back toward t = 1. the difference is that i varied the starting time to control how much of the input remained before denoising. i tried this on the campanile, the photo of rohan, and a photo of me at the torii gates in kyoto, japan, using “a high quality photo” as the prompt for all three. each sweep uses starting times 0.02, 0.04, 0.06, 0.10, 0.14, 0.25, and 0.50.',
        'at the smaller starting times, there is so little image information left that the result can become a different person or even an unrelated object. the campanile still tends to leave a tall shape against the sky, while the personal photos change more dramatically. at t = 0.25 and 0.50, the original scenes are much easier to recognize. this makes the starting time a useful control over the edit: preserving more of the input also gives the model less room to reinterpret it.',
      ],
      figures: [
        figure('edit-campanile', 'campanile · original and seven starting times · prompt: “a high quality photo”'),
        figure('edit-rohan', 'rohan · original and seven starting times · prompt: “a high quality photo”'),
        figure('edit-japan', 'Torii gates · original and seven starting times · prompt: “a high quality photo”'),
      ],
    },
    {
      title: '3.1 editing hand-drawn and web images',
      prose: [
        'i also tried the same editing procedure on images that were not photographs: an otter illustration from the web, a diet coke drawing, and a drawing of the “Don’t Be Dumb” emoji from A$AP Rocky merch i bought at his concert. i used the same generic photo prompt and the same seven starting times as above. this lets me see what the model does when the input’s colors and shapes are recognizable, but its style is quite different from the photographs the prompt asks for.',
        'at very low starting times, the connection to the input can disappear almost completely. the otter illustration sometimes becomes a portrait, while the diet coke drawing becomes a small gray case at t = 0.02. as more of the input is preserved, the lettering on the can and the face of the merch emoji return. the model does not automatically turn every drawing into a realistic photo; in several of these results, it keeps much of the drawing’s original style instead.',
      ],
      figures: [
        { ...figure('edit-web-otter', 'web otter illustration · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
        { ...figure('edit-drawing-diet-coke', 'diet coke drawing · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
        { ...figure('edit-drawing-flower', 'Don’t Be Dumb · A$AP Rocky merch emoji · original and seven starting times · prompt: “a high quality photo”'), displayWidth: 720 },
      ],
    },
    {
      title: '3.2 text-guided image editing',
      prose: [
        'the previous section used the same generic prompt for every image. here, i changed the prompt to describe the edit i wanted while keeping the sampling procedure and starting times the same. i asked for oski for the campanile, a smiling werewolf with a pint of guinness for rohan’s photo, and arnold schwarzenegger flexing in front of the eiffel tower for the torii gates photo. the full prompts are shown with each set of results.',
        'at low starting times, the prompt has enough freedom to replace most of the scene. at higher times, the original photo becomes much harder to change. the intermediate werewolf results are a good example of the two constraints working together: the subject changes, but parts of the pose, table, and restaurant setting remain. in the campanile sweep, the bear imagery gradually gives way to decorations on a tower, while the torii gates sweep brings back the red gates as the starting time increases.',
      ],
      figures: [
        figure('text-edit-campanile', 'campanile · prompt: “A photograph of Oski the Bear (UC Berkeley Mascot)”'),
        figure('text-edit-rohan', 'rohan · prompt: “A photograph of a smiling Werewolf with a pint of Guinness”'),
        figure('text-edit-japan', 'Torii gates · prompt: “A photograph of Arnold Schwarzenegger flexing in front of the Eiffel Tower”'),
      ],
    },
    {
      title: '3.3 visual anagrams',
      prose: [
        'for the visual anagrams, i wanted one image to support two different interpretations depending on which way it is rotated. i predicted a guided velocity for the upright image with the first prompt, then rotated the input by 180° and predicted another velocity with the second prompt. before averaging the two, i rotated the second velocity back into the original orientation. using that average in each euler step lets both prompts influence the same final image.',
        'my first pair uses “an oil painting of a fluffy baby penguin” and “an oil painting of an old wizard’s face with a flowing white beard”. this works particularly well because the penguin’s dark body and pale chest become the wizard’s hat and beard when rotated. the second pair uses “an oil painting of a single golden flaky crescent-shaped croissant, centered on a dark background” and “an oil painting of a sleeping orange cat curled up, with its face and ears visible, centered on a dark background”. the orange curled shape connects the two subjects, although the sleeping cat is easier to recognize than the croissant.',
      ],
      figures: [
        figure('anagram-penguin-wizard', 'baby penguin upright / old wizard rotated 180° · w = 7'),
        figure('anagram-croissant-cat', 'croissant upright / sleeping orange cat rotated 180° · w = 7'),
      ],
    },
    {
      title: '3.4 hybrid images',
      prose: [
        'this section connects back to the hybrid images from project 2. instead of combining the frequency components of two finished images, i combined the frequency components of two guided velocity predictions at every sampling step. one prompt supplies the low-frequency structure, and the other supplies the high-frequency detail. i used a 265×265 gaussian kernel with σ = 16 to form the low-pass component, then subtracted the blur from the other prediction to obtain its high-pass component.',
        'i tried cookie / sunflower and yoda / forest as the two prompt pairs. each result is shown at a larger size and as a 64×64 distant view so that the change in appearance is easier to compare. the sunflower dominates the first result at both sizes, so the cookie reading is not very convincing. the forest result works well: up close, the branches and ferns stand out, while from a distance they come together into a recognizable green face with yoda’s pointed ears. this pair gives a stronger change in appearance between the two viewing sizes than the cookie / sunflower example.',
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
