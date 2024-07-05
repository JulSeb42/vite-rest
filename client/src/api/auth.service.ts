/*=============================================== Auth service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"
import { generateServerRoute } from "utils"

const { AUTH: PATHS } = SERVER_PATHS

const generateRoute = (route: Exclude<keyof typeof PATHS, "ROOT">) =>
    generateServerRoute("AUTH", route)

class AuthService {
    async signup(data: any) {
        return await http.post(generateRoute("SIGNUP"), data)
    }

    async login(data: any) {
        return await http.post(generateRoute("LOGIN"), data)
    }

    async loggedIn(data: any) {
        return await http.get(generateRoute("LOGGED_IN"), data)
    }

    async verify(data: any) {
        return await http.put(generateRoute("VERIFY"), data)
    }

    async forgotPassword(data: any) {
        return await http.post(generateRoute("FORGOT_PASSWORD"), data)
    }

    async resetPassword(data: any) {
        return await http.put(generateRoute("RESET_PASSWORD"), data)
    }
}

export const authService = new AuthService()
