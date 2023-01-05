import express from 'express';
import chechStatusController from '../controllers/checkAuthor';
import { isLogedIn } from '../middleware/validateAuthor';

const router = express.Router();

router.get('/logStatus', chechStatusController.isLogedInStatus);
router.get('/location/:id', isLogedIn, chechStatusController.isLocationAuthorStatus);
router.get('/review/:id', isLogedIn, chechStatusController.isReviewAuthorStatus);

export = router;
