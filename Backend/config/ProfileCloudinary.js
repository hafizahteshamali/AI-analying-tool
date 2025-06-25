import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "ITX_USER_PROFILE",
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{height: 500, width: 500, crop: 'limit'}]
    }
})

export default storage;