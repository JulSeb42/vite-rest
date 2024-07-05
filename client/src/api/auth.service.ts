/*=============================================== Auth service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"

const { AUTH: PATHS } = SERVER_PATHS

class AuthService {
    signup(data: any) {
        return http.post(PATHS.SIGNUP, data)
    }

    login(data: any) {
        return http.post(PATHS.LOGIN, data)
    }

    loggedIn(data: any) {
        return http.get(PATHS.LOGGED_IN, data)
    }

    verify(data: any) {
        return http.put(PATHS.VERIFY, data)
    }

    forgotPassword(data: any) {
        return http.post(PATHS.FORGOT_PASSWORD, data)
    }

    resetPassword(data: any) {
        return http.put(PATHS.RESET_PASSWORD, data)
    }
}

export const authService = new AuthService()
