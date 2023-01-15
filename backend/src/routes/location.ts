import * as express from 'express';
import locationsController from '../controllers/locations';
import { validateJoi, locationSchema } from '../middleware/ValidateSchema';
import { isLogedIn, isLocationAuthor } from '../middleware/validateAuthor';
import { upload } from '../storage/gridFs.config';

const router = express.Router();

router.get('/get', locationsController.index);
router.post('/create', isLogedIn, upload.single('file'), locationsController.createLocation);
router.get('/get/:id', locationsController.showLocation);
router.put('/edit/:id', isLogedIn, isLocationAuthor, validateJoi(locationSchema), locationsController.updateLocation);
router.delete('/delete/:id', isLogedIn, isLocationAuthor, locationsController.deleteLocation);

export = router;
