/*=============================================== User ===============================================*/

export type UserType = {
    email: string
    fullName: string
    password: string
    verified: boolean
    verifyToken: string
    resetToken?: string
    avatar: string
    _id: string
}
