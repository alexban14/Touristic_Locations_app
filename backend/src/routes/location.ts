import express from 'express';
import locationsController from '../controllers/locations';

const router = express.Router();

router.get('/locations', locationsController.index);
router.post('/locations', locationsController.createLocation);
router.get('/locations/:id', locationsController.showLocation);
router.put('/locations/:id', locationsController.updateLocation);
router.delete('/locations/:id', locationsController.createLocation);
