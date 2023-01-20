import { Request, Response } from 'express';
import { gfs } from '../storage/gridFs.config';

const uploadImg = (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({ fileName: req.file?.filename });
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

export default { uploadImg, getImg };
