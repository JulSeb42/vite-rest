/*=============================================== Uploader ===============================================*/

import { Router } from "express"
import { fileUploader } from "../config/cloudinary.config"
import { SERVER_PATHS } from "../../shared"

const router = Router()

router.put(
    SERVER_PATHS.UPLOADER.UPLOAD_PICTURE,
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
