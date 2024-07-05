/*=============================================== User ===============================================*/

export type User = {
    _id: string
    email: string
    fullName: string
    password: string
    verified: boolean
    verifyToken: string
    resetToken?: string
    avatar: string
}

export type EditAccountFormData = Pick<User, "fullName" | "avatar">

export type EditPasswordFormData = {
    oldPassword: string
    newPassword: string
}
