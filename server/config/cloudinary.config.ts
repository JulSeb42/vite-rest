/*=============================================== Cloudinary config ===============================================*/

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        // @ts-expect-error
        allowed_formats: ["jpg", "png"],
        folder: "vite-rest",
    },
})

export const fileUploader = multer({ storage })
