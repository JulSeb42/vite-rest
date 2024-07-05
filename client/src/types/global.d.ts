/*=============================================== Global types ===============================================*/

import type { ReactNode } from "react"

declare global {
    type Children = ReactNode | Array<ReactNode>
}
