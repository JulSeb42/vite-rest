/*=============================================== Cloudinary service ===============================================*/

import { http } from "api"
import { SERVER_PATHS, SERVER_UPLOADER_PATHS } from "shared"
import { generateUrl } from "utils"

const generatePath = (url: string) => generateUrl(SERVER_PATHS.UPLOADER, url)

function errorHandler(err: any) {
    throw err
}

function uploadImage(file: any) {
    return http
        .put(generatePath(SERVER_UPLOADER_PATHS.UPLOAD_PICTURE), file)
        .then(res => res.data)
        .catch(errorHandler)
}

export const cloudinaryService = {
    uploadImage,
}
