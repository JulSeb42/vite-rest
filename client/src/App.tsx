/*=============================================== App ===============================================*/

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider, PageLoading } from "tsx-library-julseb"
import { routes } from "routes"
import { useThemeContext } from "context"

export function App() {
    const { theme } = useThemeContext()

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider
                router={createBrowserRouter(routes)}
                fallbackElement={<PageLoading />}
            />
        </ThemeProvider>
    )
}
