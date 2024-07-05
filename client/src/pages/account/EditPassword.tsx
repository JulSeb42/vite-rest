/*=============================================== EditPassword ===============================================*/

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Text, Form, Input, passwordRegex } from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"
import { useAuthContext } from "context"
import { userService } from "api"
import { Page, ErrorMessage } from "components"
import { PATHS } from "routes"
import { COMMON_TEXTS } from "shared"
import type { ErrorMessage as ErrorMessageType } from "types"

export function EditPassword() {
    const { user, setUser, setToken } = useAuthContext()
    const navigate = useNavigate()

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [validation, setValidation] = useState<
        | undefined
        | { oldPassword?: ValidationTypes; newPassword?: ValidationTypes }
    >(undefined)
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target

        setPasswords({ ...passwords, [id]: value })

        setValidation({
            ...validation,
            [id]:
                value.length > 0
                    ? passwordRegex.test(value)
                        ? "passed"
                        : "not-passed"
                    : undefined,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!passwords.oldPassword || !passwords.newPassword) {
            setValidation({
                oldPassword: !passwords.oldPassword ? "not-passed" : undefined,
                newPassword: !passwords.newPassword ? "not-passed" : undefined,
            })
            return
        }

        userService
            .editPassword(user?._id!, passwords)
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
                    id="oldPassword"
                    password
                    label="Old password"
                    helperBottom={{
                        text:
                            validation?.oldPassword === "not-passed"
                                ? COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID
                                : undefined,
                        icon:
                            validation?.oldPassword === "not-passed"
                                ? COMMON_TEXTS.ERRORS.ICON_PASSWORD_NOT_VALID
                                : undefined,
                        iconColor: "danger",
                    }}
                    validation={validation?.oldPassword}
                    value={passwords.oldPassword}
                    onChange={handlePassword}
                    autoFocus
                />
                <Input
                    id="newPassword"
                    password
                    label="New password"
                    helperBottom={{
                        text:
                            validation?.newPassword === "not-passed"
                                ? COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID
                                : undefined,
                        icon:
                            validation?.newPassword === "not-passed"
                                ? COMMON_TEXTS.ERRORS.ICON_PASSWORD_NOT_VALID
                                : undefined,
                        iconColor: "danger",
                    }}
                    validation={validation?.newPassword}
                    value={passwords.newPassword}
                    onChange={handlePassword}
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </Page>
    )
}
