/*=============================================== EditPassword ===============================================*/

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Text, Form, Input, passwordRegex } from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"
import { useAuthContext } from "context"
import { userService } from "api"
import { Page, ErrorMessage } from "components"
import { PATHS } from "routes"
import { COMMON_TEXTS } from "data"
import type { ErrorMessage as ErrorMessageType } from "types"

export function EditPassword() {
    const { user, setUser, setToken } = useAuthContext()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState<ValidationTypes>(undefined)
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

        setValidation(
            e.target.value.length > 0
                ? passwordRegex.test(password)
                    ? "passed"
                    : "not-passed"
                : undefined
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        userService
            .editPassword(user?._id!, { password })
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <Page title="Edit password" mainWidth="form">
            <Text tag="h1">Edit your password</Text>

            <Form
                onSubmit={handleSubmit}
                buttonPrimary="Save"
                buttonSecondary={{ text: "Cancel", to: PATHS.MY_ACCOUNT }}
            >
                <Input
                    id="password"
                    password
                    label="New password"
                    helperBottom={{
                        text: validation
                            ? COMMON_TEXTS.PASSWORD_NOT_PASSED
                            : "",
                        icon:
                            validation && COMMON_TEXTS.ICON_PASSWORD_NOT_PASSED,
                        iconColor: "danger",
                    }}
                    validation={validation}
                    value={password}
                    onChange={handlePassword}
                    autoFocus
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </Page>
    )
}
