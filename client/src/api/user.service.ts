/*=============================================== User service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "shared"
import type { ApiResponse, User } from "types"

const { USERS: PATHS } = SERVER_PATHS

class UserService {
    async allUsers(): ApiResponse<Array<User>> {
        return await http.get(PATHS.ALL_USERS)
    }

    async getUser(id: string): ApiResponse<User> {
        return await http.get(PATHS.USER(id))
    }

    async editAccount(id: string, data: any) {
        return await http.put(PATHS.EDIT_ACCOUNT(id), data)
    }

    editPassword(id: string, data: any) {
        return http.put(PATHS.EDIT_PASSWORD(id), data)
    }

    deleteAccount(id: string) {
        return http.delete(PATHS.DELETE_ACCOUNT(id))
    }
}

export const userService = new UserService()
