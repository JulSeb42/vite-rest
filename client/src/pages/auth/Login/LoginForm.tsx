/*=============================================== LoginForm ===============================================*/

import { useState, useContext } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Form, Input } from "tsx-library-julseb"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"
import { authService } from "api"

import { ErrorMessage } from "components"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await authService
            .login(inputs)
            .then(res => {
                loginUser(res.data.authToken)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <>
            <Form onSubmit={handleSubmit} buttonPrimary="Log in">
                <Input
                    id="email"
                    type="email"
                    value={inputs.email}
                    onChange={handleInputs}
                    label="Email"
                    autoFocus
                />

                <Input
                    id="password"
                    password
                    value={inputs.password}
                    onChange={handleInputs}
                    label="Password"
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </>
    )
}
