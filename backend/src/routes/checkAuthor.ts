import express from 'express';
import chechStatusController from '../controllers/checkAuthor';

const router = express.Router();

router.get('/logStatus', chechStatusController.isLogedInStatus);
router.get('/location/:id', chechStatusController.isLocationAuthorStatus);
router.get('/review/:id', chechStatusController.isReviewAuthorStatus);

export = router;
