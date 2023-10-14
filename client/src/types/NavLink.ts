/*=============================================== Nav link types ===============================================*/

import type { ButtonLinkTypesRequire } from "tsx-library-julseb/types"

export type NavLink = ButtonLinkTypesRequire & {
    text: string
    end?: boolean
}
