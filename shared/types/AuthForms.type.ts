/*=============================================== AuthForms ===============================================*/

import type { User } from "./User.type"

export type SignupFormData = Pick<
    User,
    "fullName" | "email" | "password" | "avatar"
>

export type LoginFormData = Pick<User, "email" | "password">

export type LoggedInFormData = { headers: { Authorization: string } }

export type ForgotPasswordFormData = Pick<User, "email">

export type ResetPasswordFormData = Pick<
    User,
    "_id" | "password" | "resetToken"
>
