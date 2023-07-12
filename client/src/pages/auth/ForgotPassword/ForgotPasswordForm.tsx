/*=============================================== ForgotPasswordForm ===============================================*/

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Form, Input } from "tsx-library-julseb"
import { useNavigate } from "react-router-dom"

import { authService } from "api"

import { ErrorMessage } from "components"

import type { ErrorMessageType } from "types"

export const ForgotPasswordForm = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value)

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await authService
            .forgotPassword({ email })
            .then(() => navigate("/login/forgot-password/email-sent"))
            .catch(err => setErrorMessage(err))
    }

    return (
        <>
            <Form
                onSubmit={handleSubmitForm}
                buttonPrimary="Send"
                buttonSecondary={{ text: "Cancel", to: "/login" }}
            >
                <Input
                    id="email"
                    onChange={handleEmail}
                    value={email}
                    label="Email"
                    autoFocus
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </>
    )
}
