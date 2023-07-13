/*=============================================== Cloudinary service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "data"

const errorHandler = (err: any) => {
    throw err
}

const uploadImage = (file: any) => {
    return http
        .put(`${SERVER_PATHS.UPLOADER}/upload-picture`, file)
        .then(res => res.data)
        .catch(errorHandler)
}

const createImage = (newImage: any) => {
    return http
        .post(`${SERVER_PATHS.UPLOADER}/edit-picture`, newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

export const cloudinaryService = {
    uploadImage,
    createImage,
}
