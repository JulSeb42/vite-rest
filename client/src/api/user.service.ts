/*=============================================== User service ===============================================*/

import { http } from "api"
import { SERVER_PATHS, SERVER_USERS_PATHS } from "shared"
import { generateUrl } from "utils"
import type { ApiResponse, User } from "types"

const generatePath = (url: string) => generateUrl(SERVER_PATHS.USERS, url)

class UserService {
    allUsers(): ApiResponse<Array<User>> {
        return http.get(generatePath(SERVER_USERS_PATHS.ALL_USERS))
    }

    getUser(id: string): ApiResponse<User> {
        return http.get(generatePath(SERVER_USERS_PATHS.USER(id)))
    }

    editAccount(id: string, data: any) {
        return http.put(generatePath(SERVER_USERS_PATHS.EDIT_ACCOUNT(id)), data)
    }

    editPassword(id: string, data: any) {
        return http.put(
            generatePath(SERVER_USERS_PATHS.EDIT_PASSWORD(id)),
            data
        )
    }

    deleteAccount(id: string) {
        return http.delete(generatePath(SERVER_USERS_PATHS.DELETE_ACCOUNT(id)))
    }
}

export const userService = new UserService()
