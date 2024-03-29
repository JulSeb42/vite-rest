/*=============================================== User service ===============================================*/

import { http } from "api"
import { SERVER_PATHS } from "routes"

class UserService {
    allUsers() {
        return http.get(`${SERVER_PATHS.USERS}/all-users`)
    }

    getUser(id: string) {
        return http.get(`${SERVER_PATHS.USERS}/user/${id}`)
    }

    editAccount(id: string, data: any) {
        return http.put(`${SERVER_PATHS.USERS}/edit-account/${id}`, data)
    }

    editPassword(id: string, data: any) {
        return http.put(`${SERVER_PATHS.USERS}/edit-password/${id}`, data)
    }

    deleteAccount(id: string) {
        return http.delete(`${SERVER_PATHS.USERS}/delete-account/${id}`)
    }
}

export const userService = new UserService()
