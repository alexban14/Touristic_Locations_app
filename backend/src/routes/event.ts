import express from 'express';
import eventController from '../controllers/event';
import { validateJoi, eventSchema } from '../middleware/ValidateSchema';
import { isLogedIn } from '../middleware/validateAuthor';

const router = express.Router();

router.get('/get', eventController.index);
router.get('/get/fromStartDate', eventController.showFromStartDate);
router.get('/get/fromStartEnd', eventController.showFromStartEnd);
router.get('/get/byCategory', eventController.showByCategory);
router.post('/create', isLogedIn, validateJoi(eventSchema), eventController.createEvent);
router.get('/get/:id', eventController.showEvent);
router.put('/edit/:id', isLogedIn, validateJoi(eventSchema), eventController.editEvent);
router.delete('/delete/:id', isLogedIn, eventController.deleteEvent);

export = router;
