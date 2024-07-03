/*=============================================== ProtectedRoute ===============================================*/

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"
import { useAuthContext } from "context"
import { PATHS } from "routes"

export function ProtectedRoute({
    children,
    redirectTo = PATHS.LOGIN,
}: ProtectedRouteProps) {
    const { isLoggedIn, isLoading } = useAuthContext()

    return isLoading ? (
        <PageLoading />
    ) : isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface ProtectedRouteProps {
    children: ReactNode | Array<ReactNode>
    redirectTo?: string
}
