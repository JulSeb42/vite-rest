/*=============================================== Empty user ===============================================*/

import type { UserType } from "types"

export const emptyUser: UserType = {
    email: "",
    fullName: "",
    password: "",
    verified: false,
    verifyToken: "",
    resetToken: "",
    avatar: "",
    _id: "",
}
