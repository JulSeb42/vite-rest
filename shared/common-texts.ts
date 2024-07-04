/*=============================================== Common texts ===============================================*/

import { SITE_DATA } from "./site-data"
import type { User } from "../server/types"

export const COMMON_TEXTS = {
    EMAIL_SIGNUP_TITLE: `Verify your account on ${SITE_DATA.NAME}`,
    EMAIL_SIGNUP_BODY: (user: User, token: string) =>
        `Hello ${user.fullName},<br /><br />Thank you for creating your account on ${SITE_DATA.NAME}! <a href="${process.env.ORIGIN}/verify/${token}/${user._id}">Click here to verify your account.</a>.`,

    EMAIL_RESET_PASSWORD_TITLE: `Reset your password on ${SITE_DATA.NAME}`,
    EMAIL_RESET_PASSWORD_BODY: (user: User, token: string) =>
        `Hello ${user.fullName},<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${token}/${user._id}">click here</a>.`,

    USER_DELETED: "User deleted.",

    ERRORS: {
        FULL_NAME_EMPTY: "Please provide your full name.",
        EMAIL_NOT_VALID: "Please provide a valid email address.",
        PASSWORD_NOT_VALID:
            "Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter.",
        ICON_PASSWORD_NOT_VALID: "close-circle",
        EMAIL_TAKEN: "This email is already taken.",
        PROVIDE_EMAIL_AND_PASSWORD: "Please provide your email and password.",
        USER_NOT_EXIST: "This user does not exist.",
        AUTH_NOT_POSSIBLE: "Unable to authenticate the user.",
        PROBLEM_RESET_PASSWORD:
            "There was a problem trying to reset your password.",
        ROUTE_NOT_EXIST: "This route does not exist",
        SERVER_ERROR: "Internal server error. Check the server console",
    },
}
