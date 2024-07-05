/*=============================================== Context types ===============================================*/

import type { Dispatch, SetStateAction } from "react"
import type { User } from "types"

export type AuthContextType = {
    isLoggedIn: boolean | null
    isLoading: boolean
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    loginUser: (token: string) => void
    logoutUser: () => void
    setToken: (token: string) => void
}
