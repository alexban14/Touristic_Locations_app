import express from 'express';
const router = express.Router({ mergeParams: true });
import { validateJoi, reviewSchema } from '../middleware/ValidateSchema';
import { isLogedIn } from '../middleware/validateAuthor';

import reivewControllers from '../controllers/review';

router.post('/', isLogedIn, reivewControllers.createReview);
router.delete('/:reviewId', isLogedIn, reivewControllers.deleteReview);

export = router;
