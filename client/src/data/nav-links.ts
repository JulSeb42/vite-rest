/*=============================================== NavLinks ===============================================*/

import { PATHS } from "routes"
import type { NavLink } from "types"

export const baseLinks: Array<NavLink> = [
    { text: "Home", to: PATHS.ROOT, end: true },
    { text: "All users", to: PATHS.USERS },
]

export const anonLinks: Array<NavLink> = [
    { text: "Log in", to: PATHS.LOGIN },
    { text: "Sign up", to: PATHS.SIGNUP },
]

export const protectedLinks: Array<NavLink> = [
    { text: "My account", to: PATHS.MY_ACCOUNT },
]
