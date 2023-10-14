/*=============================================== SignupForm ===============================================*/

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Input, passwordRegex, getRandomAvatar } from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"
import { useAuthContext } from "context"
import { authService } from "api"
import { ErrorMessage } from "components"
import { PATHS } from "routes"
import type { ErrorMessage as ErrorMessageType } from "types"

export function SignupForm() {
    const { loginUser } = useAuthContext()
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)
    const [validationPassword, setValidationPassword] =
        useState<ValidationTypes>(undefined)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (e.target.id === "password" && e.target.value.length > 0) {
            if (passwordRegex.test(e.target.value)) {
                setValidationPassword("passed")
            } else {
                setValidationPassword("not-passed")
            }
        } else {
            setValidationPassword(undefined)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await authService
            .signup({
                ...inputs,
                avatar: getRandomAvatar(),
            })
            .then(res => {
                loginUser(res.data.authToken)
                navigate(PATHS.THANK_YOU)
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <>
            <Form onSubmit={handleSubmit} buttonPrimary="Create your account">
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    autoFocus
                />

                <Input
                    id="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                />

                <Input
                    id="password"
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                    password
                    validation={validationPassword}
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </>
    )
}
