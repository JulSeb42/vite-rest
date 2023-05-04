/*=============================================== Signup ===============================================*/

import { Link } from "react-router-dom"
import { Text } from "tsx-library-julseb"

import { Page } from "components"
import { SignupForm } from "pages/auth/Signup/SignupForm"

export const Signup = () => {
    return (
        <Page title="Signup" mainWidth="form">
            <Text tag="h1">Create an account</Text>

            <SignupForm />

            <Text>
                You already have an account? <Link to="/login">Log in</Link>.
            </Text>
        </Page>
    )
}
