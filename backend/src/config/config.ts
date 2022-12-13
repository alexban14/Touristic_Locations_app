import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = 'mongodb://127.0.0.1:27017/touristic-locations';

const SERVER_PORT = 3500;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
