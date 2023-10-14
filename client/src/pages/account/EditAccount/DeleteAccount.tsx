/*=============================================== DeleteAccount ===============================================*/

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "context"
import { userService } from "api"

import { DangerZone, ErrorMessage } from "components"

import { PATHS } from "routes"

import type { ErrorMessage as ErrorMessageType } from "types"

export function DeleteAccount() {
    const navigate = useNavigate()

    const { user, logoutUser } = useAuthContext()

    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handleDelete = () => {
        userService
            .deleteAccount(user?._id!)
            .then(() => {
                logoutUser()
                navigate(PATHS.GOODBYE)
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <>
            <DangerZone
                texts={{
                    body: "Are you sure you want to delete your account?",
                    buttonOpen: "Delete your account",
                }}
                buttonPrimary={{
                    text: "Yes, delete my account",
                    onClick: handleDelete,
                }}
            />

            <ErrorMessage error={errorMessage} />
        </>
    )
}
