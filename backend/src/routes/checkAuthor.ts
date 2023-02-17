import express from 'express';
import chechStatusController from '../controllers/checkAuthor';

const router = express.Router();

router.get('/logStatus', chechStatusController.isLogedInStatus);
router.get('/location/:id', chechStatusController.isLocationAuthorStatus);
router.get('/event/:id', chechStatusController.isEventAuthorStatus);
router.get('/review/:id', chechStatusController.isReviewAuthorStatus);
router.get('/user', chechStatusController.logedInUser);

export = router;
