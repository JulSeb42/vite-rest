/*=============================================== AnonRoute ===============================================*/

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { PATHS } from "data"

export const AnonRoute = ({
    children,
    redirectTo = PATHS.MY_ACCOUNT,
}: AnonRouteProps) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface AnonRouteProps {
    children: any
    redirectTo?: string
}
