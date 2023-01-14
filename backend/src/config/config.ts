import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = 'mongodb://127.0.0.1:27017/touristic-locations';
const MONGO_URL_GRIDFS = 'mongodb://127.0.0.1:27017/gridFs';

const SERVER_PORT = process.env.SERVER_PORT;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

export const config = {
    mongo: {
        url: MONGO_URL,
        gridFs: MONGO_URL_GRIDFS
    },
    server: {
        port: SERVER_PORT
    },
    cloudinary: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        cloud_key: CLOUDINARY_KEY,
        cloud_secret: CLOUDINARY_SECRET
    }
};
