import cloudinaryCore from 'cloudinary';
const cloudinary = cloudinaryCore.v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from './config/config';

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloud_key,
    api_secret: config.cloudinary.cloud_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'TouristicLocations',
        allowedFormats: ['jpeg', 'jpg', 'png']
    }
});

module.exports = { storage, cloudinary };
