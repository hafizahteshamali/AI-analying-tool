import multer from "multer";
import storage from "../config/profileCloudinary.js";

const profileUpload = multer({storage: storage})

export default profileUpload;