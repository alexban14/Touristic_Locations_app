import express from 'express';
import locationsController from '../controllers/locations';
import { validateJoi, locationSchema } from '../middleware/ValidateSchema';
import { isLogedIn, isLocationAuthor } from '../middleware/validateAuthor';

const router = express.Router();

router.get('/get', locationsController.index);
router.post('/create', isLogedIn, validateJoi(locationSchema), locationsController.createLocation);
router.get('/get/:id', locationsController.showLocation);
router.put('/edit/:id', isLogedIn, isLocationAuthor, validateJoi(locationSchema), locationsController.updateLocation);
router.delete('/delete/:id', isLogedIn, isLocationAuthor, locationsController.deleteLocation);

export = router;
