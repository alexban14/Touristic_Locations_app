import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { gfs } from '../storage/gridFs.config';

const uploadImg = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({ fileName: req.file?.filename });
};

const uploadImgs = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({ files: 'Files uploaded succesfully' });
};

const getImg = async (req: Request, res: Response) => {
    try {
        const files: any[] = await gfs.find({ filename: req.params.filename }).toArray();
        const fileName = files[0].filename;
        console.log(files);
        if (!files || files.length === 0) {
            res.status(404).json({ message: 'No files found' });
        } else {
            gfs.openDownloadStreamByName(fileName).pipe(res);
            // readStream.pipe(res);
            // res.download(file);
            // return res.status(200).send(files);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteImg = async (req: Request, res: Response) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();
        console.log(file);
        const fileId = new mongoose.Types.ObjectId(file[0]._id);
        gfs.delete(fileId);
        res.status(201).json({ message: 'Image deleted!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

export default { uploadImg, uploadImgs, getImg, deleteImg };
