import * as express from 'express';
import multer from 'multer';
import locationsController from '../controllers/locations';
import { validateJoi, locationSchema } from '../middleware/ValidateSchema';
import { isLogedIn, isLocationAuthor } from '../middleware/validateAuthor';
const { storage } = require('../cloudinary.config');
const upload = multer({ storage });

const router = express.Router();

router.get('/get', locationsController.index);
router.post('/create', isLogedIn, upload.array('image'), validateJoi(locationSchema), locationsController.createLocation);
router.get('/get/:id', locationsController.showLocation);
router.put('/edit/:id', isLogedIn, isLocationAuthor, upload.array('image'), validateJoi(locationSchema), locationsController.updateLocation);
router.delete('/delete/:id', isLogedIn, isLocationAuthor, locationsController.deleteLocation);

export = router;
