/*=============================================== ResetPasswordForm ===============================================*/

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Form,
    Input,
    passwordRegex,
    Text,
    Skeleton,
    Flexbox,
} from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"
import { authService, userService } from "api"
import { ErrorMessage } from "components"
import { COMMON_TEXTS } from "shared"
import { PATHS } from "routes"
import type { User } from "types"

export function ResetPasswordForm() {
    const navigate = useNavigate()
    const { token, id } = useParams<{ token: string; id: string }>()

    const [foundUser, setFoundUser] = useState<null | undefined | User>(
        undefined
    )
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const findUser = () =>
            userService.allUsers().then(res => {
                const users: Array<User> = res.data
                const getUser: User = users?.filter(user => user?._id === id)[0]

                if (getUser) setFoundUser(getUser)
                else setFoundUser(null)
            })

        setTimeout(() => {
            findUser()
            setIsLoading(false)
        }, 1000)
    }, [id])

    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState<ValidationTypes>(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setPassword(value)

        if (value.length > 0) {
            if (passwordRegex.test(value)) {
                setValidation("passed")
            } else {
                setValidation("not-passed")
            }
        } else {
            setValidation(undefined)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        authService
            .resetPassword({
                password,
                resetToken: token,
                id,
            })
            .then(() => navigate(PATHS.LOGIN))
            .catch(err => setErrorMessage(err))
    }

    if (isLoading)
        return (
            <Flexbox gap="xxs" flexDirection="column">
                <Text color="primary">New password</Text>
                <Skeleton height={32} borderRadius="s" animation="shine" />
            </Flexbox>
        )

    if (!foundUser) return <Text>No user has been found with this ID!</Text>

    return (
        <>
            <Form onSubmit={handleSubmit} buttonPrimary={{ text: "Send" }}>
                <Input
                    id="password"
                    password
                    label="New password"
                    helperBottom={{
                        text: validation
                            ? COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID
                            : "",
                        icon:
                            validation &&
                            COMMON_TEXTS.ERRORS.ICON_PASSWORD_NOT_VALID,
                        iconColor: "danger",
                    }}
                    value={password}
                    onChange={handlePassword}
                    validation={validation}
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </>
    )
}
