/*=============================================== Nav link types ===============================================*/

import type { ButtonLinkTypesRequire } from "tsx-library-julseb/types"

export type NavLinkType = ButtonLinkTypesRequire & {
    text: string
    end?: boolean
}
