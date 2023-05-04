/*=============================================== UserHeader types ===============================================*/

import type { AxiosError } from "axios"
import type { UserType } from "types"

export interface UserHeaderProps {
    user: UserType
    isLoading?: boolean
    error?: AxiosError
    isAccount?: boolean
}
