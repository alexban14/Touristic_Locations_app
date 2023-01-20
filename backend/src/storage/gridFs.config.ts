import { Request } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from '../config/config';

export let gfs: any;
mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
});

const storage = new GridFsStorage({
    url: config.mongo.url,
    file: (req: Request, file: any) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'files'
                };
                resolve(fileInfo);
            });
        });
    }
});

export const upload = multer({ storage });

// const connection = mongoose.createConnection(config.mongo.gridFs);

// export let gfs: Grid.Grid;
// connection.once('open', () => {
//     gfs = Grid(connection.db, connection.mongo);
//     gfs.collection('uploads');
// });
