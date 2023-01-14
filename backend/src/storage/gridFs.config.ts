import { Request } from 'express';

import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from '../config/config';

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
const upload = multer({ storage });

export = upload;
