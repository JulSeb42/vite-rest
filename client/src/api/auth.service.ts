/*=============================================== Auth service ===============================================*/

import { http } from "api"
import { SERVER_PATHS, SERVER_AUTH_PATHS } from "shared"
import { generateUrl } from "utils"

const generatePath = (url: string) => generateUrl(SERVER_PATHS.AUTH, url)

class AuthService {
    signup(data: any) {
        return http.post(generatePath(SERVER_AUTH_PATHS.SIGNUP), data)
    }

    login(data: any) {
        return http.post(generatePath(SERVER_AUTH_PATHS.LOGIN), data)
    }

    loggedIn(data: any) {
        return http.get(generatePath(SERVER_AUTH_PATHS.LOGGED_IN), data)
    }

    verify(data: any) {
        return http.put(generatePath(SERVER_AUTH_PATHS.VERIFY), data)
    }

    forgotPassword(data: any) {
        return http.post(generatePath(SERVER_AUTH_PATHS.FORGOT_PASSWORD), data)
    }

    resetPassword(data: any) {
        return http.put(generatePath(SERVER_AUTH_PATHS.RESET_PASSWORD), data)
    }
}

export const authService = new AuthService()
