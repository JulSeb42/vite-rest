/*=============================================== AnonRoute ===============================================*/

import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"
import { useAuthContext } from "context"
import { PATHS } from "routes"

export function AnonRoute({
    children,
    redirectTo = PATHS.MY_ACCOUNT,
}: AnonRouteProps) {
    const { isLoggedIn, isLoading } = useAuthContext()

    return isLoading ? (
        <PageLoading />
    ) : !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface AnonRouteProps {
    children: Children
    redirectTo?: string
}
