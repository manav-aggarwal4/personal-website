import type { Cs180Figure, Cs180Part } from './cs180'

// Saved outputs from CS180_proj3_part_b (1).ipynb, with final comparisons
// updated from CS180_proj3_part_b (2).ipynb; model code stays private.
function figure(name: string, caption: string): Cs180Figure {
  return { src: `/cs180/3/part-b/${name}.webp`, caption, alt: caption, wide: true }
}

export const cs180Project3PartB: Cs180Part[] = [
  {
    title: 'part b: flow matching from scratch',
    prose: [
      'in part b, i build and train UNets on MNIST, starting with a single-step denoiser and then learning time-conditioned and class-conditioned velocity fields. the dataset contains 60,000 training images and 10,000 test images, each 28×28 with pixel values in [0, 1]. the notebook uses seed 180 and a tesla t4 GPU.',
      'flow time still runs from gaussian noise at t = 0 to data at t = 1. part b uses a different guidance convention from part a: the unconditional velocity plus γ times the conditional-minus-unconditional difference, with γ = 5.',
    ],
  },
  {
    title: 'b.1.1 implementing the UNet',
    prose: [
      'the UNet uses convolution, batch normalization, and GELU blocks. two downsampling blocks reduce the spatial resolution from 28×28 to 14×14 and then 7×7. average pooling compresses the features to a 1×1 bottleneck, and transposed convolutions restore the resolution. skip connections concatenate encoder features into the decoder so that local structure can survive the bottleneck.',
    ],
  },
  {
    title: 'b.1.2 noisy inputs and single-step denoising',
    prose: [
      'for the denoising baseline, i add gaussian noise directly to a clean digit. the figure reuses one noise realization at σ = 0, 0.2, 0.4, 0.5, 0.6, 0.8, and 1.0. unlike the flow-matching interpolation, this corruption does not scale down the clean image.',
    ],
    equations: ['z = x + σ·ε'],
    figures: [figure('noise-levels', 'one MNIST training image · increasing gaussian noise from σ = 0 to 1.0')],
  },
  {
    title: 'b.1.2.1 training the denoiser',
    prose: [
      'i trained the unconditional UNet with hidden dimension 128 for five epochs, using batch size 256 and Adam with learning rate 0.0001. each batch receives fresh noise at σ = 0.5, and the model minimizes mean squared error against the clean image. the training loss falls sharply at the start, then decreases more slowly over the remaining updates.',
    ],
    figures: [figure('denoiser-loss', 'single-step denoiser training loss · five epochs · σ = 0.5 · Adam lr = 0.0001')],
  },
  {
    title: 'b.1.2.2 out-of-distribution testing',
    prose: [
      'i evaluated the trained denoiser on a held-out test digit across the same seven noise levels. the digit remains recognizable near and below the training noise level. at σ = 0.8 and 1.0, the output develops distorted strokes as the input becomes more corrupted than the noise used during training. this is a visual comparison on one test example, rather than an aggregate test-set metric.',
    ],
    figures: [figure('denoiser-ood', 'held-out digit reconstruction · σ = 0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0')],
  },
  {
    title: 'b.1.2.3 denoising pure noise',
    prose: [
      'i trained a fresh hidden-dimension-128 UNet for five epochs with the same batch size and learning rate, but supplied pure gaussian noise independent of the target digit. the eight fixed noise inputs produce similar blurry shapes at epochs 1 and 5. because the input contains no information about its randomly paired target, minimizing squared error encourages an average digit image instead of distinct samples.',
    ],
    figures: [
      figure('pure-noise-epochs', 'eight fixed pure-noise inputs · predictions after epoch 1 (top) and epoch 5 (bottom)'),
      figure('pure-noise-loss', 'pure-noise training loss · five epochs · independent noise inputs and clean-digit targets'),
    ],
  },
  {
    title: 'b.2.1 time-conditioned flow matching',
    prose: [
      'the time-conditioned UNet embeds the scalar time with two fully connected blocks and multiplies the resulting embeddings into decoder features at two resolutions. training samples an independent noise image and a random time for each clean digit. the model predicts the path velocity, rather than the clean image or the noise.',
    ],
    equations: ['x(t) = (1 − t)·x(0) + t·x(1)', 'Target velocity: v = x(1) − x(0)'],
  },
  {
    title: 'b.2.2 training the time-conditioned UNet',
    prose: [
      'i trained a hidden-dimension-64 model for ten epochs with batch size 64 and Adam starting at learning rate 0.01. an exponential scheduler multiplies the learning rate by 0.1^(1/10) after each epoch. the velocity-prediction MSE drops quickly and then settles into a lower band with batch-to-batch variation.',
    ],
    figures: [figure('time-loss', 'time-conditioned flow-matching training loss · ten epochs · exponential learning-rate decay')],
  },
  {
    title: 'b.2.3 sampling from the time-conditioned UNet',
    prose: [
      'sampling starts from gaussian noise and integrates the learned velocity with 50 euler steps. the saved figure compares the same sampling seed, 42, after epochs 1, 5, and 10. the early sample is fragmented; the later samples have a clearer digit-like shape. this notebook saves one generated image per checkpoint for this comparison.',
    ],
    equations: ['x(t + h) = x(t) + h·v(x(t), t)', 'h = 1 / 50'],
    figures: [figure('time-samples', 'time-conditioned samples · epochs 1, 5, 10 · seed 42 · 50 euler steps')],
  },
  {
    title: 'b.2.4 class-conditioned flow matching',
    prose: [
      'the class-conditioned UNet adds embeddings of the one-hot digit label. class embeddings scale decoder features, while time embeddings provide additive offsets. during training, labels are dropped with probability 0.1 by zeroing their one-hot vectors. this lets the same network supply both conditional and unconditional predictions for guidance.',
    ],
    equations: ['v_cfg = v_u + γ·(v_c − v_u)', 'γ = 5'],
  },
  {
    title: 'b.2.5 training and learning-rate comparison',
    prose: [
      'the scheduled class-conditioned run uses hidden dimension 64, batch size 64, Adam starting at 0.01, and ten epochs of exponential decay with factor 0.1^(1/10). the comparison trains a fresh model at constant learning rate 0.001 for twenty epochs. both use class dropout probability 0.1.',
      'the plots overlay their batch losses against training epoch, showing the full range on the left and a zoomed view from 0 to 0.3 on the right. the constant-rate model already produces cleaner digits in the saved epoch-1 grid, while both produce recognizable classes at later checkpoints. the comparison changes both the learning-rate policy and initial learning rate; the constant-rate run also receives twice as many epochs, so its final results are not an equal-compute comparison.',
    ],
    figures: [figure('class-loss-comparison', 'class-conditioned training loss · full range (left), zoomed to MSE 0–0.3 (right) · scheduled lr = 0.01 / constant lr = 0.001')],
  },
  {
    title: 'b.2.6 sampling from the class-conditioned UNet',
    prose: [
      'each grid contains four generated examples per digit, with columns labeled 0–9. sampling uses 300 euler steps, guidance scale 5, and seed 42 for every checkpoint. the scheduled and constant-rate runs are shown consecutively at matching epochs 1, 5, and 10, followed by the constant-rate run at epochs 15 and 20.',
      'the scheduled epoch-1 samples include broken or extra strokes, particularly in several curved digits. by epochs 5 and 10, most digits are clearly legible in both runs. further constant-rate training changes stroke shapes but does not produce an equally dramatic visual improvement over its epoch-10 grid.',
    ],
    figures: [
      figure('class-scheduled-epoch1', 'scheduled learning rate · epoch 1 · four samples per class · 300 steps · γ = 5'),
      figure('class-constant-epoch1', 'constant lr = 0.001 · epoch 1 · same labels, seed, and sampling settings'),
      figure('class-scheduled-epoch5', 'scheduled learning rate · epoch 5'),
      figure('class-constant-epoch5', 'constant lr = 0.001 · epoch 5'),
      figure('class-scheduled-epoch10', 'scheduled learning rate · epoch 10'),
      figure('class-constant-epoch10', 'constant lr = 0.001 · epoch 10'),
      figure('class-constant-epoch15', 'constant lr = 0.001 · epoch 15 · additional training'),
      figure('class-constant-epoch20', 'constant lr = 0.001 · epoch 20 · additional training'),
    ],
  },
]
