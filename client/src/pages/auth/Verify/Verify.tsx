/*=============================================== Verify ===============================================*/

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "context"
import { authService } from "api"
import {
    VerifySkeleton,
    NotLoggedIn,
    VerificationFailed,
    VerificationSuccess,
} from "pages/auth/Verify/sections"
import type { ErrorMessage } from "types"

export function Verify() {
    const { user, setUser, isLoggedIn, setToken } = useAuthContext()
    const { token, id } = useParams<{ id: string; token: string }>()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>(undefined)

    useEffect(() => {
        if (isLoading) {
            if (isLoggedIn && user?._id === id && user?.verifyToken === token) {
                authService
                    .verify({ id })
                    .then(res => {
                        setUser(res.data.user)
                        setToken(res.data.authToken)
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setErrorMessage(err)
                        setIsLoading(false)
                    })
            }
        }
    }, [id, isLoading, isLoggedIn, setToken, setUser, token, user])

    if (isLoading) return <VerifySkeleton />

    if (!isLoggedIn) return <NotLoggedIn />

    if (errorMessage) return <VerificationFailed errorMessages={errorMessage} />

    return <VerificationSuccess />
}
