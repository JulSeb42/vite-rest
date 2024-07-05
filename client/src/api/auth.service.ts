/*=============================================== Auth service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"
import { generateServerRoute } from "utils"
import type {
    SignupFormData,
    LoginFormData,
    LoggedInFormData,
    ForgotPasswordFormData,
    ResetPasswordFormData,
} from "types"

const { AUTH: PATHS } = SERVER_PATHS

const generateRoute = (route: Exclude<keyof typeof PATHS, "ROOT">) =>
    generateServerRoute("AUTH", route)

class AuthService {
    async signup(data: SignupFormData) {
        return await http.post(generateRoute("SIGNUP"), data)
    }

    async login(data: LoginFormData) {
        return await http.post(generateRoute("LOGIN"), data)
    }

    async loggedIn(data: LoggedInFormData) {
        return await http.get(generateRoute("LOGGED_IN"), data)
    }

    async verify(id: string, token: string) {
        return await http.put(
            generateServerRoute("AUTH", "VERIFY", [id, token])
        )
    }

    async forgotPassword(data: ForgotPasswordFormData) {
        return await http.post(generateRoute("FORGOT_PASSWORD"), data)
    }

    async resetPassword(data: ResetPasswordFormData) {
        return await http.put(generateRoute("RESET_PASSWORD"), data)
    }
}

export const authService = new AuthService()
