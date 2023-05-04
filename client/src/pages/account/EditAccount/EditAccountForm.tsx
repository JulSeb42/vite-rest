/*=============================================== EditAccountForm ===============================================*/

import { useContext, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Form, Input } from "tsx-library-julseb"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"
import { userService } from "api"

import { ImageUploader, ErrorMessage } from "components"

import type { ErrorMessageType } from "types"

export const EditAccountForm = () => {
    const navigate = useNavigate()

    const { user, setUser, setToken } = useContext(
        AuthContext
    ) as AuthContextType

    const [inputs, setInputs] = useState({
        fullName: user?.fullName,
    })
    const [avatar, setAvatar] = useState(user?.avatar || "")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] =
        useState<ErrorMessageType>(undefined)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>
        setInputs({ ...inputs, [e.target.id]: e.target.value })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const requestBody = {
            ...inputs,
            avatar,
        }

        userService
            .editAccount(user?._id || "", requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                navigate(-1)
            })
            .catch(err => setErrorMessage(err))
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                buttonPrimary="Save changes"
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                isLoading={isLoading}
            >
                <Input
                    id="fullName"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    label="Full name"
                    autoFocus
                />

                <Input
                    id="email"
                    value={user?.email}
                    label="Email"
                    helperBottom="You can not edit your email."
                    disabled
                />

                <ImageUploader
                    img={avatar}
                    setImageUrl={setAvatar}
                    setIsLoading={setIsLoading}
                    id="avatar"
                    label="Profile picture"
                    icons={{ empty: "user" }}
                />
            </Form>

            <ErrorMessage error={errorMessage} />
        </>
    )
}
