/*=============================================== Cloudinary service ===============================================*/

import { http } from "api"

const errorHandler = (err: any) => {
    throw err
}

const uploadImage = (file: any) => {
    return http
        .put("/uploader/upload-picture", file)
        .then(res => res.data)
        .catch(errorHandler)
}

const createImage = (newImage: any) => {
    return http
        .post("/uploader/edit-picture", newImage)
        .then(res => res.data)
        .catch(errorHandler)
}

export const cloudinaryService = {
    uploadImage,
    createImage,
}
