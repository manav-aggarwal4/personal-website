import type { Cs180Project } from './cs180'

export const cs180Project4: Cs180Project = {
  "id": "4",
  "title": "image warping and mosaicing",
  "status": "in-progress",
  "parts": [
    {
      "title": "part a: image warping and mosaicing",
      "prose": [
        "in this project, i used least-squares homography estimation, inverse warping, and image interpolation for two applications: perspective rectification of the amoeba music and sana’a cafe signs, and panorama stitching of memorial glade, doe reading room, and a mountain scene. i walked around berkeley’s campus on a beautiful sunny day, taking photos of memorial glade and doe reading room to combine overlapping views into wider panoramas."
      ]
    },
    {
      "title": "a.1 shooting the pictures · memorial glade",
      "prose": [
        "my first pair looks across memorial glade. the photographs share the library facade, the lawn, and the steps in the foreground, while each captures a different side of the scene. this overlap gives me recognizable features to match across the two views.",
        "mosaicing assumes that the camera rotates around a fixed center of projection. under that assumption, a homography can relate the two views even though objects in the scene are at different depths. changing the camera’s position between shots causes objects at different depths to shift by different amounts so a single homography may not align the entire scene. people moving between exposures can also produce ghosting, even when the stationary background is aligned."
      ],
      "figureLayout": "grid2",
      "figures": [
        {
          "src": "/cs180/4/glade-1.webp",
          "caption": "memorial glade · image 1",
          "alt": "memorial glade · image 1",
          "wide": false
        },
        {
          "src": "/cs180/4/glade-2.webp",
          "caption": "memorial glade · image 2",
          "alt": "memorial glade · image 2",
          "wide": false
        }
      ]
    },
    {
      "title": "a.1 shooting the pictures · doe reading room",
      "prose": [
        "the second pair was taken inside the doe reading room. the repeated tables, tall windows, and ceiling details provide many possible correspondences. i used features spread through the overlap so that the fit would account for more than one small region of the image."
      ],
      "figureLayout": "grid2",
      "figures": [
        {
          "src": "/cs180/4/doe-1.webp",
          "caption": "doe reading room · image 1",
          "alt": "doe reading room · image 1",
          "wide": false
        },
        {
          "src": "/cs180/4/doe-2.webp",
          "caption": "doe reading room · image 2",
          "alt": "doe reading room · image 2",
          "wide": false
        }
      ]
    },
    {
      "title": "a.1 shooting the pictures · mountains",
      "prose": [
        "for the third pair, i used [externally sourced mountain photographs](https://github.com/CorentinBrtx/image-stitching/tree/main/samples/mountain) showing overlapping views of a rocky mountain face and the forest below it. i matched distinctive features along the ridge and across the rock face. the broad stretch of sky has few features to click so the rock formations provide the constraints for the alignment."
      ],
      "figureLayout": "grid2",
      "figures": [
        {
          "src": "/cs180/4/mountains-1.webp",
          "caption": "mountains · image 1",
          "alt": "mountains · image 1",
          "wide": false
        },
        {
          "src": "/cs180/4/mountains-2.webp",
          "caption": "mountains · image 2",
          "alt": "mountains · image 2",
          "wide": false
        }
      ]
    },
    {
      "title": "a.2 recovering homographies",
      "prose": [
        "i selected corresponding points with a matplotlib interface that alternates clicks between the two photographs and saves their original pixel coordinates. i used 11 pairs for the glade, 12 for doe, and 8 for the mountains. each pair contributes two equations so all three fits have more constraints than the eight unknown entries of the homography.",
        "for a source point (x, y) and its match (u, v), i multiply by H in homogeneous coordinates and divide by the third coordinate. setting the bottom-right entry of H to 1 leaves eight unknowns. rearranging the equations gives the two rows below, which i stack for every correspondence. my computeH function solves the resulting overdetermined system with numpy.linalg.lstsq."
      ],
      "equations": [
        "[u, v, 1]ᵀ ∝ H [x, y, 1]ᵀ",
        "[x  y  1  0  0  0  −ux  −uy] h = u\n[0  0  0  x  y  1  −vx  −vy] h = v",
        "h = [h₁₁, h₁₂, h₁₃, h₂₁, h₂₂, h₂₃, h₃₁, h₃₂]ᵀ\nh* = argminₕ ‖Ah − b‖²;  h₃₃ = 1"
      ]
    },
    {
      "title": "a.2 memorial glade · correspondences and recovered matrix",
      "prose": [
        "the numbered green crosses show my clicked correspondences, and the red circles in the second image show where H predicts those source points will land. for memorial glade, the mean reprojection error is 7.79 pixels and the largest error is 16.56 pixels, measured in the original 5712×4284 images.",
        "these residuals measure agreement with the points used to fit H. they help reveal inaccurate clicks or an imperfect geometric fit, but do not measure alignment everywhere else in the image. the matrix below maps image 1 into image 2; the mosaic uses separate transforms into a shared canvas."
      ],
      "equations": [
        "H = [ 0.28037  0.0536858  2702.89\n      -0.312413  0.786987  502.481\n      -0.000125616  -1.65673e-06  1 ]"
      ],
      "figures": [
        {
          "src": "/cs180/4/glade-correspondences.webp",
          "caption": "memorial glade · 11 point pairs · clicked matches and homography predictions",
          "alt": "memorial glade · 11 point pairs · clicked matches and homography predictions",
          "wide": true
        }
      ]
    },
    {
      "title": "a.2 doe reading room · correspondences and recovered matrix",
      "prose": [
        "the numbered green crosses show my clicked correspondences, and the red circles in the second image show where H predicts those source points will land. for doe reading room, the mean reprojection error is 7.50 pixels and the largest error is 13.77 pixels, measured in the original 5712×4284 images."
      ],
      "equations": [
        "H = [ 3.01199  -0.186078  -8425.99\n      0.882851  2.41783  -3219.98\n      0.000355981  -2.0892e-05  1 ]"
      ],
      "figures": [
        {
          "src": "/cs180/4/doe-correspondences.webp",
          "caption": "doe reading room · 12 point pairs · clicked matches and homography predictions",
          "alt": "doe reading room · 12 point pairs · clicked matches and homography predictions",
          "wide": true
        }
      ]
    },
    {
      "title": "a.2 mountains · correspondences and recovered matrix",
      "prose": [
        "i used eight corresponding points for the mountain pair. the mean reprojection error is 2.19 pixels, with a maximum of 3.99 pixels, measured in the 568×758 source images. the red predictions lie close to the clicked matches along the ridge and rock face. these images have a different resolution from the glade and doe photographs so the raw pixel errors are not directly comparable across the three scenes."
      ],
      "equations": [
        "H = [ 0.719696  -0.173759  -185.114\n      0.122705  0.609756  -20.5315\n      -0.000231637  -0.000555549  1 ]"
      ],
      "figures": [
        {
          "src": "/cs180/4/mountains-correspondences.webp",
          "caption": "mountains · eight point pairs · clicked matches and homography predictions",
          "alt": "mountains · eight point pairs · clicked matches and homography predictions",
          "wide": true
        }
      ]
    },
    {
      "title": "a.3 inverse warping and interpolation",
      "prose": [
        "to warp an image, i first project its four corners through H and take the floor and ceiling of the transformed bounds. this tells me the output size and its offset in the destination coordinate system. for each output pixel, i apply the inverse homography and divide by the homogeneous coordinate to find the corresponding location in the source image. sampling backward this way avoids the holes that can appear when source pixels are pushed forward.",
        "i implemented both interpolation methods directly. nearest neighbor rounds the source coordinates and copies one pixel. bilinear interpolation finds the four surrounding pixels and combines them according to the horizontal and vertical fractional offsets. a separate validity mask records which output pixels received image data so an actual black pixel is not confused with an empty part of the canvas.",
        "for rectification, i selected the four corners of a sign and mapped them to the corners of a rectangle. i chose the output dimensions to set the rectangle’s aspect ratio, since the homography alone does not describe the sign’s actual width and height."
      ],
      "equations": [
        "[x, y, w]ᵀ = H⁻¹ [u, v, 1]ᵀ;  (xₛ, yₛ) = (x/w, y/w)",
        "a = xₛ − floor(xₛ);  b = yₛ − floor(yₛ)\nI(xₛ, yₛ) = (1−a)(1−b)I₀₀ + a(1−b)I₁₀\n              + (1−a)bI₀₁ + abI₁₁"
      ]
    },
    {
      "title": "a.3 rectification · amoeba music",
      "prose": [
        "i mapped the four selected corners of the amoeba music mural to a 400×600 rectangle. the original photograph compresses the sign toward the right, while the rectified versions spread the lettering across a front-facing rectangle.",
        "the two results look quite similar at this scale, with bilinear interpolation producing a slightly smoother appearance. the saved run took 0.62 seconds for nearest neighbor and 1.32 seconds for bilinear so the smoother result took about twice as long in this implementation."
      ],
      "figures": [
        {
          "src": "/cs180/4/amoeba-rectification.webp",
          "caption": "amoeba music · original selection, nearest neighbor, and bilinear · 400×600",
          "alt": "amoeba music · original selection, nearest neighbor, and bilinear · 400×600",
          "wide": true
        }
      ]
    },
    {
      "title": "a.3 rectification · sana’a cafe",
      "prose": [
        "for the sana’a cafe sign, i used a wider 600×250 destination rectangle. the sign’s sloping border becomes horizontal, and the lettering is easier to compare across the two sampling methods.",
        "nearest neighbor took 0.34 seconds and bilinear took 0.81 seconds in the saved comparison. the nearest-neighbor and bilinear results look almost identical at this scale, with both recovering the same geometry. these timings include the pixel-by-pixel inverse-warping loops and describe these particular runs, rather than a general benchmark for the two methods."
      ],
      "figures": [
        {
          "src": "/cs180/4/sana-rectification.webp",
          "caption": "sana’a cafe · original selection, nearest neighbor, and bilinear · 600×250",
          "alt": "sana’a cafe · original selection, nearest neighbor, and bilinear · 600×250",
          "wide": true
        }
      ]
    },
    {
      "title": "a.4 building and blending the mosaics",
      "prose": [
        "i compared using either photograph as the reference with warping both into a shared intermediate view. using image 1’s plane keeps image 1 unchanged and warps image 2 into it, while using image 2’s plane reverses those roles. in the glade and doe comparisons below, either fixed reference leaves the opposite side more stretched, while the third, intermediate plane spreads the perspective change across both images and gives a more balanced overall view. in the current pipeline, i average the two sets of correspondence coordinates and fit H₁ from image 1 to those midpoints. if H maps image 1 to image 2, i set H₂ = H₁H⁻¹ so that both source images are mapped consistently into the same coordinate system.",
        "before sampling, i resize each source to a maximum width of 1200 pixels and adjust the transforms for the change of coordinates. i then project the corners of both images, find their combined bounds, and inverse-warp both onto that canvas with bilinear interpolation.",
        "for blending, i compute each warped image’s distance to its mask boundary and choose a seam that favors the image farther from its edge. i split the images into a coarse gaussian level and a high-frequency residual. a broadly smoothed seam blends the coarse levels, while a narrower transition blends the detail levels. after reconstructing the image, i keep the original warped values wherever only one image is valid. this two-level laplacian blend softens the transition without averaging fine detail across the entire overlap."
      ],
      "equations": [
        "mᵢ = (pᵢ + qᵢ)/2;  H₁: pᵢ → mᵢ;  H₂ = H₁H⁻¹",
        "Lᵢ = Iᵢ − expand(Gᵢ)\nM = expand(w_G G₁ + (1−w_G)G₂)\n    + w_L L₁ + (1−w_L)L₂"
      ]
    },
    {
      "title": "a.4 mosaic 1 · memorial glade",
      "prose": [
        "the glade mosaic brings the lawn, library, and foreground steps into one wider view. the intermediate projection distributes the perspective change across both photographs instead of leaving one view fixed. people who moved between the exposures can still create local inconsistencies, because blending cannot make two different moments agree."
      ],
      "figures": [
        {
          "src": "/cs180/4/glade-mosaic.webp",
          "caption": "memorial glade · shared intermediate view · bilinear warping and two-level laplacian blending",
          "alt": "memorial glade · shared intermediate view · bilinear warping and two-level laplacian blending",
          "wide": true
        },
        {
          "src": "/cs180/4/glade-projections.webp",
          "caption": "memorial glade · image 1 reference, image 2 reference, and shared intermediate view",
          "alt": "memorial glade · image 1 reference, image 2 reference, and shared intermediate view",
          "wide": false,
          "displayWidth": 792
        }
      ]
    },
    {
      "title": "a.4 mosaic 2 · doe reading room",
      "prose": [
        "the doe mosaic combines the two sides of the reading room and extends the view across the tables and ceiling. the repeated architecture makes small alignment errors noticeable: a mismatch along a window frame or table edge can remain visible even when the color transition is smooth. comparing the reference choices also shows how strongly the final perspective depends on the coordinate system used for the mosaic."
      ],
      "figures": [
        {
          "src": "/cs180/4/doe-mosaic.webp",
          "caption": "doe reading room · shared intermediate view · bilinear warping and two-level laplacian blending",
          "alt": "doe reading room · shared intermediate view · bilinear warping and two-level laplacian blending",
          "wide": true
        },
        {
          "src": "/cs180/4/doe-projections.webp",
          "caption": "doe reading room · image 1 reference, image 2 reference, and shared intermediate view",
          "alt": "doe reading room · image 1 reference, image 2 reference, and shared intermediate view",
          "wide": false,
          "displayWidth": 792
        }
      ]
    },
    {
      "title": "a.4 mosaic 3 · mountains",
      "prose": [
        "the mountain mosaic joins the two views into one continuous ridge and rock face, with the forest extending across the foreground. the main rock features line up without an obvious doubled outline. i kept the uncropped canvas so the boundaries of the warped photographs remain visible.",
        "a faint brightness transition remains in the sky near the upper center. the alignment of the mountain is much less noticeable than this change in sky color, which makes the example useful for separating geometric alignment from blending quality. the mosaic uses the same shared intermediate view, bilinear sampling, and two-level laplacian blend as the other scenes."
      ],
      "figures": [
        {
          "src": "/cs180/4/mountains-mosaic.webp",
          "caption": "mountains · shared intermediate view · bilinear warping and two-level laplacian blending",
          "alt": "mountains · shared intermediate view · bilinear warping and two-level laplacian blending",
          "wide": true
        }
      ]
    }
  ]
}
