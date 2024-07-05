/*=============================================== User service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"
import { generateServerRoute } from "utils"
import type {
    ApiResponse,
    User,
    EditAccountFormData,
    EditPasswordFormData,
} from "types"

const { USERS: PATHS } = SERVER_PATHS

const generateRoute = (
    route: Exclude<keyof typeof PATHS, "ROOT">,
    id?: string
) => generateServerRoute("USERS", route, id)

class UserService {
    async allUsers(): ApiResponse<Array<User>> {
        return await http.get(generateRoute("ALL_USERS"))
    }

    async getUser(id: string): ApiResponse<User> {
        return await http.get(generateRoute("USER", id))
    }

    async editAccount(id: string, data: EditAccountFormData) {
        return await http.put(generateRoute("EDIT_ACCOUNT", id), data)
    }

    async editPassword(id: string, data: EditPasswordFormData) {
        return await http.put(generateRoute("EDIT_PASSWORD", id), data)
    }

    async deleteAccount(id: string) {
        return await http.delete(generateRoute("DELETE_ACCOUNT", id))
    }
}

export const userService = new UserService()
