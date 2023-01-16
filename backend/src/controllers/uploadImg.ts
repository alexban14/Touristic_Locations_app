import { Request, Response } from 'express';
import { gfs } from '../storage/gridFs.config';

const uploadImg = (req: Request, res: Response) => {
    console.log(req.file?.filename);
    res.status(201).json({ fileName: req.file?.filename });
};

const getImg = (req: Request, res: Response) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        console.log(err ? err : file);
        if (!file) {
            return res.status(404).json({ err: 'No file found in images.' });
        } else {
            // const readStream = gridFs.createReadStream(file?.filename);
            // readStream.pipe(res);
            res.status(200).json({ file });
        }
    });
};

export default { uploadImg, getImg };
