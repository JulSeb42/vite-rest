/*=============================================== Auth service ===============================================*/

import { http } from "api"

class AuthService {
    signup(data: any) {
        return http.post("/auth/signup", data)
    }

    login(data: any) {
        return http.post("/auth/login", data)
    }

    loggedIn(data: any) {
        return http.get("/auth/loggedin", data)
    }

    verify(data: any) {
        return http.put("/auth/verify", data)
    }

    forgotPassword(data: any) {
        return http.post("/auth/forgot-password", data)
    }

    resetPassword(data: any) {
        return http.put("/auth/reset-password", data)
    }
}

export const authService = new AuthService()
