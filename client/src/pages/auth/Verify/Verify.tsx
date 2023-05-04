/*=============================================== Verify ===============================================*/

import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"
import { authService } from "api"

import {
    VerifySkeleton,
    NotLoggedIn,
    VerificationFailed,
    VerificationSuccess,
} from "pages/auth/Verify/sections"

import type { ErrorMessageType } from "types"

export const Verify = () => {
    const { user, setUser, isLoggedIn, setToken } = useContext(
        AuthContext
    ) as AuthContextType
    const { token, id } = useParams<{ id: string; token: string }>()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    useEffect(() => {
        const verifyUser = () => {
            if (isLoggedIn && user?._id === id && user?.verifyToken === token) {
                authService
                    .verify({ id })
                    .then(res => {
                        setUser(res.data.user)
                        setToken(res.data.authToken)
                    })
                    .catch(err => setErrorMessage(err))
            }

            setIsLoading(false)
        }

        setTimeout(() => verifyUser(), 1000)
        // eslint-disable-next-line
    }, [id, user, isLoggedIn, token])

    if (isLoading) return <VerifySkeleton />

    if (!isLoggedIn) return <NotLoggedIn />

    if (errorMessage) return <VerificationFailed errorMessages={errorMessage} />

    return <VerificationSuccess />
}
