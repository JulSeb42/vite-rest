/*=============================================== Theme context ===============================================*/

import { useContext } from "react"
import { ThemeContext } from "tsx-library-julseb"
import type { ThemeContextProps } from "tsx-library-julseb/types"

export function useThemeContext() {
    return useContext(ThemeContext) as ThemeContextProps
}
