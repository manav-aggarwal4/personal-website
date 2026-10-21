import type { Cs180Figure, Cs180Part } from './cs180'

// Saved outputs from CS180_proj3_part_b (1).ipynb, with final comparisons
// updated from CS180_proj3_part_b (2).ipynb; model code stays private.
function figure(name: string, caption: string): Cs180Figure {
  const file = name === 'class-loss-comparison' ? 'class-loss-comparison-stacked.svg' : `${name}.webp`
  return {
    src: `/cs180/3/part-b/${file}`,
    caption,
    alt: caption,
    wide: true,
    large: true,
    displayWidth: name.startsWith('class-') || name === 'time-samples' ? 960 : undefined,
  }
}

export const cs180Project3PartB: Cs180Part[] = [
  {
    title: 'part b: flow matching from scratch',
    prose: [
      'in part a, the pretrained model already knew how to move from noise toward an image, and my job was to decide how to sample from it. for part b, i trained the models myself on MNIST. i started with a UNet that removes noise in one step, then added time conditioning so it could learn a velocity field, and finally added digit labels to control which number it generated.',
      'MNIST contains 60,000 training images and 10,000 test images, each 28×28 with pixel values in [0, 1]. i ran the training on a tesla t4 GPU. the flow models still move from gaussian noise at t = 0 to an image at t = 1, but part b uses a different guidance convention: the unconditional prediction plus γ times the conditional-minus-unconditional difference. i used γ = 5 when sampling from the class-conditioned model.',
    ],
  },
  {
    title: 'b.1.1 implementing the UNet',
    prose: [
      'i built the UNet from convolution, batch normalization, and GELU blocks. the encoder first processes the 28×28 input, then downsamples it to 14×14 and 7×7. an average pooling operation compresses the 7×7 features to a 1×1 bottleneck. the decoder reverses this process with transposed convolutions until the output has the same spatial dimensions as the input.',
      'the skip connections are important because reducing an image to a small bottleneck can discard the local information needed to reconstruct its strokes. i concatenated the encoder features with the decoder features at matching resolutions, giving the later layers access to both the compressed representation and the earlier spatial detail. for the single-step denoiser, i used 128 hidden channels and a final convolution that produces one grayscale output channel.',
    ],
  },
  {
    title: 'b.1.2 noisy inputs and single-step denoising',
    prose: [
      'for this first denoising task, i constructed the input by adding gaussian noise directly to a clean MNIST digit. i reused one noise tensor while changing σ through 0, 0.2, 0.4, 0.5, 0.6, 0.8, and 1.0, so the figure shows the effect of increasing the strength of the same noise pattern. at σ = 0, the digit is unchanged; by σ = 1.0, much of its shape is hidden.',
      'this noising process is slightly different from the interpolation in part a. the clean digit is not multiplied by a time value here, so increasing σ only changes the amount of noise added to it. the denoiser’s job is to take that corrupted image and predict the original digit in one forward pass.',
    ],
    equations: ['z = x + σ·ε'],
    figures: [figure('noise-levels', 'one MNIST training image · increasing gaussian noise from σ = 0 to 1.0')],
  },
  {
    title: 'b.1.2.1 training the denoiser',
    prose: [
      'i trained the unconditional UNet for five epochs with batch size 256 and Adam at a learning rate of 1e-4. each time a batch was loaded, i added fresh gaussian noise with σ = 0.5. generating the noise during training means the model sees different corruptions of the same digit across epochs, rather than memorizing one fixed noisy version of each training image.',
      'for the loss, i compared the predicted image with the clean digit using mean squared error. the curve drops sharply during the first part of training and then improves more gradually. this is a reconstruction task, so the model is rewarded for recovering the particular digit that produced its input. the next section checks what happens when the amount of corruption changes from the σ = 0.5 used during training.',
    ],
    figures: [figure('denoiser-loss', 'single-step denoiser training loss · five epochs · σ = 0.5 · Adam lr = 1e-4')],
  },
  {
    title: 'b.1.2.2 out-of-distribution testing',
    prose: [
      'after training at σ = 0.5, i tested the denoiser on a held-out digit with several different noise levels. i kept the underlying image and noise realization fixed while varying σ, which makes it easier to see when the reconstruction begins to change. the figure shows the model’s outputs across the same seven values used in the noising visualization.',
      'near and below the training noise level, the reconstructed 7 remains fairly clear. at σ = 0.8 and 1.0, extra strokes appear and the shape becomes less reliable. the model has learned how to handle a particular range of corruption, so increasing the noise does not simply make the result blurrier; it can change which strokes the model thinks belong in the digit. this figure shows one test example, so it illustrates the behavior without measuring performance across the full test set.',
    ],
    figures: [figure('denoiser-ood', 'held-out digit reconstruction · σ = 0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0')],
  },
  {
    title: 'b.1.2.3 denoising pure noise',
    prose: [
      'i then trained a fresh UNet with the same hidden dimension, batch size, learning rate, and five-epoch schedule, but replaced the corrupted-digit inputs with pure gaussian noise. each noise input was independent of the clean digit used as its target. i kept eight fixed noise inputs for the visualizations so that i could compare the outputs after epochs 1 and 5.',
      'although the loss decreases, the outputs all look like similar blurry averages rather than different handwritten numbers. to see why this happens, let X be a clean MNIST image and Z be the independent gaussian noise given to the network. for a particular input Z = z, call the network’s output a. minimizing MSE means choosing a to minimize the expected squared distance to all possible target images. differentiating that expected loss gives the conditional mean as the optimal prediction:',
    ],
    equations: [
      'ℓ(a; z) = E[‖a − X‖² | Z = z]',
      '∇ₐℓ(a; z) = 2a − 2E[X | Z = z]',
      '∇ₐℓ = 0  ⇒  D*(z) = E[X | Z = z]',
      'X ⟂ Z  ⇒  E[X | Z = z] = E[X] = μ',
      'μ ≈ (1/N) Σᵢ xᵢ',
    ],
    afterSnippetsProse: [
      'because the noise and target are independent, conditioning on z tells us nothing about which digit to predict. the optimal output is therefore the same mean image μ for every noise input. the last line estimates this expectation by averaging the N training images separately at each pixel, so strokes from different digits overlap into a blurry shape. training pushes the network toward this solution, although a finite training run does not have to reach the exact mean. the decreasing loss is consistent with learning that average, rather than learning to generate distinct digits.',
    ],
    figures: [
      figure('pure-noise-epochs', 'eight fixed pure-noise inputs · predictions after epoch 1 (top) and epoch 5 (bottom)'),
      figure('pure-noise-loss', 'pure-noise training loss · five epochs · independent noise inputs and clean-digit targets'),
    ],
  },
  {
    title: 'b.2.1 time-conditioned flow matching',
    prose: [
      'the pure-noise experiment shows why directly predicting a clean image from an unrelated noise input is not enough. for flow matching, i instead trained the network to predict how an intermediate image should move along the path from noise to a digit. i sampled a noise image and a time t for each clean training image, interpolated between the two, and used the difference between the clean image and noise as the target velocity.',
      'the network also needs to know where along that path it is operating. i added two fully connected blocks that turn the scalar time into embeddings with the appropriate channel dimensions, then multiplied those embeddings into the decoder features at two resolutions. this gives the same UNet a way to change its prediction depending on whether it is looking at an almost-noisy input or one that is already close to a digit.',
    ],
    equations: ['x(t) = (1 − t)·x(0) + t·x(1)', 'Target velocity: v = x(1) − x(0)'],
  },
  {
    title: 'b.2.2 training the time-conditioned UNet',
    prose: [
      'i trained the time-conditioned model for ten epochs with 64 hidden channels, batch size 64, and Adam starting at a learning rate of 1e-2. for every batch, i drew fresh noise and a random time for each image. the loss compares the model’s predicted velocity with the ground-truth difference between the digit and its sampled noise, rather than comparing the output directly with a clean image.',
      'i also used an exponential learning-rate scheduler, multiplying the learning rate by γ = 0.1^(1/10) ≈ 0.7943 after each epoch. over ten epochs, this reduces it to one tenth of its starting value. the training curve falls quickly at the beginning and then settles into a lower range with variation between batches. learning the field across different times is what will let me repeatedly query the network during sampling instead of relying on one large denoising step.',
    ],
    figures: [figure('time-loss', 'time-conditioned flow-matching training loss · ten epochs · exponential learning-rate decay · γ = 0.1^(1/10) ≈ 0.7943')],
  },
  {
    title: 'b.2.3 sampling from the time-conditioned UNet',
    prose: [
      'once the model was trained, i started from gaussian noise and used its predicted velocity to take 50 euler steps toward t = 1. after each step, i passed the updated image and time back into the network to get the next direction. this is the same sampling idea used in part a, except that the velocity field now comes from the smaller model i trained on MNIST.',
      'i compared outputs after epochs 1, 5, and 10 using the same initial noise. the epoch-1 result has several disconnected or extra strokes, while the later results have a more coherent digit-like shape. they are still imperfect, and this comparison only contains one sample per checkpoint. it shows the progression of this particular input rather than establishing how consistently the model generates legible digits.',
    ],
    equations: ['x(t + h) = x(t) + h·v(x(t), t)', 'h = 1 / 50'],
    figures: [figure('time-samples', 'time-conditioned samples · epochs 1, 5, 10 · 50 euler steps')],
  },
  {
    title: 'b.2.4 class-conditioned flow matching',
    prose: [
      'the time-conditioned model has to learn the shapes of all ten digits without being told which one to generate. to give it that extra control, i added a one-hot vector representing the digit class and embedded it with two more fully connected blocks. time t is represented as a scalar because its numerical ordering has a meaning: increasing t moves us from noise toward a clean image. digit labels do not have that same ordering. using a one-hot vector avoids suggesting that, for example, an 8 should be more similar to a 7 than to a 1 just because their labels are closer numerically.',
      'the class FCBlocks turn those one-hot vectors into learned representations that scale the UNet’s feature channels according to the requested digit. in the earlier time-conditioned model, i multiplied the features by a learned time embedding, not by the raw scalar t. with class conditioning, the class embedding takes over that scaling role, and the learned time embedding is added as an offset instead. intuitively, the class-dependent scales can emphasize or suppress channels useful for a particular digit, while the time-dependent shifts adjust the features for the current denoising stage. both embeddings are learned during training and broadcast across the spatial dimensions at the two conditioning points in the decoder.',
      'during training, i dropped the class condition for 10% of the examples by setting the one-hot vector to zero. the network therefore learns to make predictions both with and without a digit label. at sampling time, i can evaluate those two cases on the same input and combine their velocities using classifier-free guidance. i used γ = 5 to strengthen the influence of the requested digit.',
    ],
    equations: [
      'Time-only conditioning: f ← e_t(t) ⊙ f',
      'Class + time conditioning: f ← e_c(c) ⊙ f + e_t(t)',
      'v_cfg = v_u + γ·(v_c − v_u)',
      'γ = 5',
    ],
  },
  {
    title: 'b.2.5 training and learning-rate comparison',
    prose: [
      'for the class-conditioned model, i kept 64 hidden channels and batch size 64, with class dropout probability 0.1. the first run used Adam starting at 1e-2 and the same exponential scheduler as the time-conditioned experiment, with γ = 0.1^(1/10) ≈ 0.7943, training for ten epochs. to see whether i could remove the scheduler, i trained a fresh model at a constant learning rate of 1e-3 for twenty epochs. the smaller initial rate gives more conservative updates, while the longer run gives the model more time to learn.',
      'the full-range loss plot shows the large initial drop, and the zoomed plot makes the later behavior easier to compare. both runs reach a much lower loss than they started with. the sample grids below also show that the constant-rate model produces cleaner digits early on, although this comparison changes more than the scheduler alone: it uses a different initial learning rate, and its final checkpoint has twice as many training epochs. i included matching-epoch results so that the effect of the additional training is visible separately.',
    ],
    figures: [figure('class-loss-comparison', 'class-conditioned training loss · full range (top), zoomed to MSE 0–0.3 (bottom) · scheduled lr = 1e-2 / constant lr = 1e-3')],
  },
  {
    title: 'b.2.6 sampling from the class-conditioned UNet',
    prose: [
      'i generated four examples of each digit with 300 euler steps and guidance scale 5. each column corresponds to one requested class, from 0 through 9. i reused the same initial noises across checkpoints and between the scheduled and constant-rate models so that changes in the grids would reflect the learned models rather than different sampling inputs. the results are shown side by side at epochs 1, 5, and 10, with the scheduled model on the left and the constant-rate model on the right. the constant-rate model’s additional training results at epochs 15 and 20 are shown below.',
      'the scheduled model’s epoch-1 outputs have some broken or extra strokes, particularly in the curved digits. by epochs 5 and 10, most columns contain clearly recognizable examples of the requested number. the constant-rate model also produces legible digits, showing that lowering the learning rate can work without exponential decay in this experiment. its later checkpoints change the shapes and thickness of the strokes, but the improvement from epoch 10 to epoch 20 is much less dramatic than the change during the early training epochs.',
    ],
    figureLayout: 'checkpoint-pairs',
    figures: [
      figure('class-scheduled-epoch1', 'scheduled learning rate · epoch 1 · four samples per class · 300 steps · γ = 5'),
      figure('class-constant-epoch1', 'constant lr = 1e-3 · epoch 1 · same labels, initial noises, and sampling settings'),
      figure('class-scheduled-epoch5', 'scheduled learning rate · epoch 5'),
      figure('class-constant-epoch5', 'constant lr = 1e-3 · epoch 5'),
      figure('class-scheduled-epoch10', 'scheduled learning rate · epoch 10'),
      figure('class-constant-epoch10', 'constant lr = 1e-3 · epoch 10'),
      figure('class-constant-epoch15', 'constant lr = 1e-3 · epoch 15 · additional training'),
      figure('class-constant-epoch20', 'constant lr = 1e-3 · epoch 20 · additional training'),
    ],
  },
]
