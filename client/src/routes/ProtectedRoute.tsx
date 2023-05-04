/*=============================================== ProtectedRoute ===============================================*/

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

export const ProtectedRoute = ({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface ProtectedRouteProps {
    children: any
    redirectTo?: string
}
