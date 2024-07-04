/*=============================================== Server paths ===============================================*/

export const BASE_API_URL = "/api"

export const SERVER_PATHS = {
    AUTH: "/auth",
    UPLOADER: "/uploader",
    USERS: "/users",
    // prependServerPath
}

export const SERVER_AUTH_PATHS = {
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGGED_IN: "/loggedin",
    VERIFY: "/verify",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
}

export const SERVER_USERS_PATHS = {
    ALL_USERS: "/all-users",
    USER: (id = ":id") => `/user/${id}`,
    EDIT_ACCOUNT: (id = ":id") => `/edit-account/${id}`,
    EDIT_PASSWORD: (id = ":id") => `/edit-password/${id}`,
    DELETE_ACCOUNT: (id = ":id") => `/delete-account/${id}`,
}

export const SERVER_UPLOADER_PATHS = {
    UPLOAD_PICTURE: "/upload-picture",
}

// prependNewPaths
