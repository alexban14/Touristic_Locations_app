import { Request } from 'express';
import mongoose from 'mongoose';
import GridFs from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from '../config/config';

const connection = mongoose.createConnection(config.mongo.gridFs);

export let gridFs: GridFs.Grid;
connection.once('open', () => {
    gridFs = GridFs(connection.db, mongoose.mongo);
    gridFs.collection('uploads');
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
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
export const upload = multer({ storage });
