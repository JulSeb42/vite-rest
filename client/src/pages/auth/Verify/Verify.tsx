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
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | string>(
        undefined
    )

    useEffect(() => {
        if (isLoggedIn !== null) {
            console.log("hello")
            if (id && token && isLoggedIn) {
                console.log("Start service")
                authService
                    .verify(id, token)
                    .then(res => {
                        setUser(res.data.user)
                        setToken(res.data.authToken)
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                        setErrorMessage(err)
                        setIsLoading(false)
                    })
            } else if (!id || !token) {
                if (!id)
                    setErrorMessage([
                        ...(errorMessage as Array<string>),
                        "ID is missing",
                    ])
                if (!token)
                    setErrorMessage([
                        ...(errorMessage as Array<string>),
                        "Token is missing",
                    ])
                setIsLoading(false)
            } else if (!isLoggedIn) {
                setErrorMessage("You are not logged in.")
                setIsLoading(false)
            }
        }
    }, [id, isLoggedIn, isLoading, setToken, setUser, token, user])

    if (isLoading) return <VerifySkeleton />

    if (!isLoggedIn) return <NotLoggedIn />

    if (errorMessage) return <VerificationFailed errorMessages={errorMessage} />

    return <VerificationSuccess />
}
