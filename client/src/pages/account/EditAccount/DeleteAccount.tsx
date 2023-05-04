/*=============================================== DeleteAccount ===============================================*/

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"
import { userService } from "api"

import { DangerZone, ErrorMessage } from "components"

import type { ErrorMessageType } from "types"

export const DeleteAccount = () => {
    const navigate = useNavigate()

    const { user, logoutUser } = useContext(AuthContext) as AuthContextType

    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handleDelete = () => {
        userService
            .deleteAccount(user?._id || "")
            .then(() => {
                logoutUser()
                navigate("/goodbye")
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
