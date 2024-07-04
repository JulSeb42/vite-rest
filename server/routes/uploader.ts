/*=============================================== Uploader ===============================================*/

import { Router } from "express"
import { fileUploader } from "../config/cloudinary.config"
import { SERVER_UPLOADER_PATHS } from "../../shared"

const router = Router()

router.put(
    SERVER_UPLOADER_PATHS.UPLOAD_PICTURE,
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

export default router
