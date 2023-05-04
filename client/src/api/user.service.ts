/*=============================================== User service ===============================================*/

import { http } from "api"

class UserService {
    allUsers() {
        return http.get("/users/all-users")
    }

    getUser(id: string) {
        return http.get(`/users/user/${id}`)
    }

    editAccount(id: string, data: any) {
        return http.put(`/users/edit-account/${id}`, data)
    }

    editPassword(id: string, data: any) {
        return http.put(`/users/edit-password/${id}`, data)
    }

    deleteAccount(id: string) {
        return http.delete(`/users/delete-account/${id}`)
    }
}

export const userService = new UserService()
