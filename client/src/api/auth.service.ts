/*=============================================== Auth service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "data"

class AuthService {
    signup(data: any) {
        return http.post(`${SERVER_PATHS.AUTH}/signup`, data)
    }

    login(data: any) {
        return http.post(`${SERVER_PATHS.AUTH}/login`, data)
    }

    loggedIn(data: any) {
        return http.get(`${SERVER_PATHS.AUTH}/loggedin`, data)
    }

    verify(data: any) {
        return http.put(`${SERVER_PATHS.AUTH}/verify`, data)
    }

    forgotPassword(data: any) {
        return http.post(`${SERVER_PATHS.AUTH}/forgot-password`, data)
    }

    resetPassword(data: any) {
        return http.put(`${SERVER_PATHS.AUTH}/reset-password`, data)
    }
}

export const authService = new AuthService()
