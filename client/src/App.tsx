/*=============================================== App ===============================================*/

import { useContext } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeContext, ThemeProvider, PageLoading } from "tsx-library-julseb"
import type { ThemeContextProps } from "tsx-library-julseb/types"

import { routes } from "routes"

export function App() {
    const { theme } = useContext(ThemeContext) as ThemeContextProps

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider
                router={createBrowserRouter(routes)}
                fallbackElement={<PageLoading />}
            />
        </ThemeProvider>
    )
}
