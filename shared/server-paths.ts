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
        SIGNUP: "/signup",
        LOGIN: "/login",
        LOGGED_IN: "/loggedin",
        VERIFY: (args = [":id", ":token"]) => {
            const joinedArgs = args
                .map(arg => (arg[0] === "/" ? arg.replace("/", "") : arg))
                .join("/")

            return `/verify/${joinedArgs}`
        },
        FORGOT_PASSWORD: "/forgot-password",
        RESET_PASSWORD: "/reset-password",
    },
    UPLOADER: {
        ROOT: SERVER_PATH_ROOTS.UPLOADER,
        UPLOAD_PICTURE: "/upload-picture",
    },
    USERS: {
        ROOT: SERVER_PATH_ROOTS.USERS,
        ALL_USERS: "/all-users",
        USER: (id = ":id") => `/user/${id}`,
        EDIT_ACCOUNT: (id = ":id") => `/edit-account/${id}`,
        EDIT_PASSWORD: (id = ":id") => `/edit-password/${id}`,
        DELETE_ACCOUNT: (id = ":id") => `/delete-account/${id}`,
    },
    // prependServerPath
}
