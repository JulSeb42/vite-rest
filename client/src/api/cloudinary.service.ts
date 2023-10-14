/*=============================================== Cloudinary service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "routes"

function errorHandler(err: any) {
    throw err
}

function uploadImage(file: any) {
    return http
        .put(`${SERVER_PATHS.UPLOADER}/upload-picture`, file)
        .then(res => res.data)
        .catch(errorHandler)
}

function createImage(newImage: any) {
    return http
        .post(`${SERVER_PATHS.UPLOADER}/edit-picture`, newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

export const cloudinaryService = {
    uploadImage,
    createImage,
}
