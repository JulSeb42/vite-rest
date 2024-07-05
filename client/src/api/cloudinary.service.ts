/*=============================================== Cloudinary service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"

function errorHandler(err: any) {
    throw err
}

function uploadImage(file: any) {
    return http
        .put(SERVER_PATHS.UPLOADER.UPLOAD_PICTURE, file)
        .then(res => res.data)
        .catch(errorHandler)
}

export const cloudinaryService = {
    uploadImage,
}
