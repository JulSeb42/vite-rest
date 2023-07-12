/*=============================================== Context types ===============================================*/

import type { UserType } from "types"

export type AuthContextType = {
    isLoggedIn?: boolean
    isLoading?: boolean
    user: UserType | null
    setUser?: any
    loginUser?: any
    logoutUser?: any
    setToken?: any
}
