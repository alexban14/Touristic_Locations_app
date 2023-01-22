import express from 'express';
import { isLogedIn, isLocationAuthor } from '../middleware/validateAuthor';
import { upload } from '../storage/gridFs.config';
import uploadImgController from '../controllers/uploadImg';

const router = express.Router();

router.post('/upload', isLogedIn, upload.single('file'), uploadImgController.uploadImg);
router.post('/uploadMulti', isLogedIn, upload.array('file'), uploadImgController.uploadImgs);
router.get('/get/:filename', uploadImgController.getImg);
router.delete('/delete/:filename', isLogedIn, uploadImgController.deleteImg);

export = router;
