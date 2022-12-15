import express from 'express';
import locationsController from '../controllers/locations';
import { validateLocation, Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.get('/get', locationsController.index);
router.post('/create', validateLocation(Schemas.location), locationsController.createLocation);
router.get('/get/:id', locationsController.showLocation);
router.put('/edit/:id', validateLocation(Schemas.location), locationsController.updateLocation);
router.delete('/delete/:id', locationsController.deleteLocation);

export = router;
