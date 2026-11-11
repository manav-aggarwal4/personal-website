import type { Cs180Figure, Cs180Part } from './cs180'

function figure(name: string, caption: string): Cs180Figure {
  return {
    src: `/cs180/4/part-b/${name}.webp`,
    caption,
    alt: caption,
    wide: true,
  }
}

export const cs180Project4PartB: Cs180Part[] = [
  {
    title: 'part b · feature matching for autostitching',
    prose: [
      'for part b, i used the same glade, doe, and mountain pairs and found correspondences automatically. the pipeline detects harris corners, selects a spatially distributed set with adaptive non-maximal suppression, describes each point with a normalized image patch, and matches the descriptors across the two images. four-point RANSAC then selects a consistent set of matches for the homography.',
      'i reused the inverse warping and blending code from part a to construct the final mosaics. the figures below follow the feature selection and matching steps, then compare each automatic mosaic with its manually matched counterpart. the mountain photographs are from the same external source credited in part a.',
    ],
  },
  {
    title: 'b.1 harris corners and adaptive non-maximal suppression',
    prose: [
      'i applied harris corner detection to grayscale images at their original resolution, using a single detection scale and a 20-pixel boundary exclusion. i selected local maxima of the harris response as candidate corners. the left panels show these candidates, including many points clustered around textured surfaces and repeated architectural details.',
      'the glade and doe inputs each contain about 24.5 million pixels. with local maxima only one pixel apart and no explicit response-strength cutoff, fine texture and small intensity variations produce hundreds of thousands of candidates. weak maxima can appear even in the sky, and ANMS can retain some of them because it favors points far from stronger neighbors. the mountain images contain about 10,800 candidates each. the ratio test and RANSAC later filter the matches produced from these points.',
      'for each candidate, i compute the distance to the nearest corner whose response is sufficiently stronger. specifically, a candidate j can suppress candidate i when fᵢ < 0.9 fⱼ. a point with no sufficiently stronger neighbor gets an infinite radius. i keep the 500 points with the largest suppression radii. using squared distances preserves the same ordering and avoids taking square roots. the right panels show the selected points.',
    ],
    equations: ['rᵢ² = minⱼ ‖pᵢ − pⱼ‖², over j satisfying fᵢ < 0.9 fⱼ'],
    figures: [
      figure('glade_img1_corners', 'memorial glade · image 1 · harris candidates and 500 ANMS corners'),
      figure('glade_img2_corners', 'memorial glade · image 2 · harris candidates and 500 ANMS corners'),
      figure('doe_reading_room_img1_corners', 'doe reading room · image 1 · harris candidates and 500 ANMS corners'),
      figure('doe_reading_room_img2_corners', 'doe reading room · image 2 · harris candidates and 500 ANMS corners'),
      figure('moutains1_corners', 'mountains · image 1 · harris candidates and 500 ANMS corners'),
      figure('moutains2_corners', 'mountains · image 2 · harris candidates and 500 ANMS corners'),
    ],
  },
  {
    title: 'b.2 feature descriptors',
    prose: [
      'around each selected corner, i extract a 40×40 grayscale window, apply a gaussian blur with a 5×5 kernel and σ = 1, and sample every fifth pixel to produce an axis-aligned 8×8 patch. each descriptor therefore summarizes a larger neighborhood around the corner. flattening the patch gives a vector of 64 values.',
      'i subtract the descriptor mean and divide by its standard deviation, with a small epsilon to handle constant patches. this bias/gain normalization reduces sensitivity to additive brightness changes and positive contrast scaling. the top rows below show source windows, and the bottom rows show the normalized descriptors. the descriptor orientation follows the image axes.',
    ],
    equations: ['d = vec(blur(P)[::5, ::5])', 'd̂ = (d − mean(d)) / (std(d) + 10⁻⁸)'],
    figures: [
      figure('glade_img1_descriptors', 'memorial glade · image 1 · 40×40 windows and normalized 8×8 descriptors'),
      figure('glade_img2_descriptors', 'memorial glade · image 2 · 40×40 windows and normalized 8×8 descriptors'),
      figure('doe_reading_room_img1_descriptors', 'doe reading room · image 1 · source windows and descriptors'),
      figure('doe_reading_room_img2_descriptors', 'doe reading room · image 2 · source windows and descriptors'),
      figure('moutains1_descriptors', 'mountains · image 1 · source windows and descriptors'),
      figure('moutains2_descriptors', 'mountains · image 2 · source windows and descriptors'),
    ],
  },
  {
    title: 'b.3 matching feature descriptors',
    prose: [
      'for each descriptor in image 1, i compute its sum of squared differences from every descriptor in image 2 and sort the distances. i accept the closest candidate when its squared distance divided by the second-closest squared distance is below 0.7. this tests whether the best match is clearly better than its nearest competitor. on ordinary euclidean distances, this threshold is equivalent to approximately 0.837. as professor efros said in class, “If you’re deciding between two hard choices and can’t decide because it’s too close, you probably should choose neither.”',
      'the ratio test leaves 33 matches for glade, 69 for doe, and 90 for the mountains. some incorrect pairs remain, especially among repeated windows, tables, and vegetation. RANSAC filters these using agreement with a common geometric transformation.',
    ],
    equations: ['SSD(a, b) = Σₖ (aₖ − bₖ)²', 'accept when SSD₁ / SSD₂ < 0.7'],
    figures: [
      figure('glade_matches', 'memorial glade · 33 matches after the descriptor ratio test'),
      figure('doe_matches', 'doe reading room · 69 matches after the descriptor ratio test'),
      figure('mountains_matches', 'mountains · 90 matches after the descriptor ratio test'),
    ],
  },
  {
    title: 'b.4 robust homography estimation with RANSAC',
    prose: [
      'i implemented four-point RANSAC. each iteration samples four matches without replacement and rejects a sample if any three source or destination points are collinear. the remaining sample defines a homography, which i use to project all matched image 1 points into image 2.',
      'a match counts as an inlier when its euclidean reprojection error is below five pixels in the original destination image. i run 10,000 iterations with a fixed random seed, keep the hypothesis with the most inliers, and refit the homography using all matches in that consensus set. the consensus sets contain 10 of 33 matches for glade, 19 of 69 for doe, and 63 of 90 for the mountains.',
    ],
    equations: ['eᵢ = ‖π(H [xᵢ, yᵢ, 1]ᵀ) − [uᵢ, vᵢ]ᵀ‖₂', 'inlier when eᵢ < 5 pixels; π([X, Y, W]ᵀ) = [X/W, Y/W]ᵀ'],
    figures: [
      figure('glade_inliers', 'memorial glade · 10 RANSAC consensus matches'),
      figure('doe_inliers', 'doe reading room · 19 RANSAC consensus matches'),
      figure('mountains_inliers', 'mountains · 63 RANSAC consensus matches'),
    ],
  },
  {
    title: 'b.4 automatic mosaics · memorial glade',
    prose: [
      'i pass the RANSAC consensus matches into the shared-plane stitching code from part a. it fits the inter-image homography, defines an intermediate view from the correspondence midpoints, and composes the second image’s transform through the first. both images are inverse-warped with bilinear interpolation and combined with the two-level gaussian/residual blend.',
      'the automatic glade mosaic aligns the library facade and the foreground steps using ten consensus matches. the lawn and architecture form a continuous wider view, while a visible brightness transition remains in the sky.',
    ],
    figures: [
      figure('glade_mosaic_preview', 'memorial glade · automatic mosaic from RANSAC matches'),
      figure('glade_comparison', 'memorial glade · manual stitching on the left, automatic stitching on the right'),
    ],
  },
  {
    title: 'b.4 automatic mosaics · doe reading room',
    prose: [
      'the doe pair contains many repeated structures that produce ambiguous descriptor matches. RANSAC retains 19 geometrically consistent pairs, and the resulting mosaic joins the ceiling, window wall, and rows of tables. the manual and automatic versions have similar overall geometry, with small differences in alignment and the resulting intermediate projection.',
      'the side-by-side figures use previews fitted to their panels. the original output resolutions differ between parts a and b, so these comparisons show the overall stitching and projection. fine-detail sharpness also depends on the sampling resolution.',
    ],
    figures: [
      figure('doe_mosaic_preview', 'doe reading room · automatic mosaic from RANSAC matches'),
      figure('doe_comparison', 'doe reading room · manual stitching on the left, automatic stitching on the right'),
    ],
  },
  {
    title: 'b.4 automatic mosaics · mountains',
    prose: [
      'the mountain pair has the largest consensus set, with 63 of the 90 ratio-test matches agreeing with the selected homography. the automatic result joins the ridge and rock face across the two views. its outline and intermediate perspective differ from the manually matched version because the fit uses a different set of correspondences.',
      'a brightness transition remains visible across the sky, where there is little texture to constrain matching and the two source colors differ. the rock face gives a clearer view of the geometric alignment. this is the image with the clearest improvement between manual and automated correspondences!',
    ],
    figures: [
      figure('mountains_mosaic_preview', 'mountains · automatic mosaic from RANSAC matches'),
      figure('mountains_comparison', 'mountains · manual stitching on the left, automatic stitching on the right'),
    ],
  },
]
