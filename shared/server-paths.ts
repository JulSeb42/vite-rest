/*=============================================== Server paths ===============================================*/

export const BASE_API_URL = "/api"

const SERVER_PATH_ROOTS = {
    AUTH: "/auth",
    UPLOADER: "/uploader",
    USERS: "/users",
    // prependRoot
}

export const SERVER_PATHS = {
    AUTH: {
        ROOT: SERVER_PATH_ROOTS.AUTH,
        SIGNUP: `${SERVER_PATH_ROOTS}/signup`,
        LOGIN: `${SERVER_PATH_ROOTS}/login`,
        LOGGED_IN: `${SERVER_PATH_ROOTS}/loggedin`,
        VERIFY: `${SERVER_PATH_ROOTS}/verify`,
        FORGOT_PASSWORD: `${SERVER_PATH_ROOTS}/forgot-password`,
        RESET_PASSWORD: `${SERVER_PATH_ROOTS}/reset-password`,
    },
    UPLOADER: {
        ROOT: SERVER_PATH_ROOTS.UPLOADER,
        UPLOAD_PICTURE: `${SERVER_PATH_ROOTS.UPLOADER}/upload-picture`,
    },
    USERS: {
        ROOT: SERVER_PATH_ROOTS.USERS,
        ALL_USERS: `${SERVER_PATH_ROOTS.USERS}/all-users`,
        USER: (id = ":id") => `${SERVER_PATH_ROOTS.USERS}/user/${id}`,
        EDIT_ACCOUNT: (id = ":id") =>
            `${SERVER_PATH_ROOTS.USERS}/edit-account/${id}`,
        EDIT_PASSWORD: (id = ":id") =>
            `${SERVER_PATH_ROOTS.USERS}/edit-password/${id}`,
        DELETE_ACCOUNT: (id = ":id") =>
            `${SERVER_PATH_ROOTS.USERS}/delete-account/${id}`,
    },
    // prependServerPath
}
