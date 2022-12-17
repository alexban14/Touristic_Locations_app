import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateJoi, reviewSchema } from '../middleware/ValidateSchema';
import { isLogedIn, isReviewAuthor } from '../middleware/validateAuthor';

import reivewControllers from '../controllers/review';

router.post('/', isLogedIn, validateJoi(reviewSchema), reivewControllers.createReview);
router.delete('/:reviewId', isLogedIn, isReviewAuthor, reivewControllers.deleteReview);

export = router;
