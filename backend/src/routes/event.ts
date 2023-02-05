import express from 'express';
import { validateJoi, eventSchema } from '../middleware/ValidateSchema';
import { isLogedIn } from '../middleware/validateAuthor';

const router = express.Router();

router.get('/get');
router.post('/create', isLogedIn, validateJoi(eventSchema));
router.get('/get/:id');
router.put('/edit/:id', isLogedIn, validateJoi(eventSchema));
router.delete('/delete/:id', isLogedIn);

export = router;
