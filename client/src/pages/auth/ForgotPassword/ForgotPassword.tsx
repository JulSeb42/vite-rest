/*=============================================== ForgotPassword ===============================================*/

import { Text } from "tsx-library-julseb"

import { Page } from "components"
import { ForgotPasswordForm } from "pages/auth/ForgotPassword/ForgotPasswordForm"

export function ForgotPassword() {
    return (
        <Page title="I forgot my password" mainWidth="form">
            <Text tag="h1">I forgot my password</Text>

            <Text>
                Please enter your email address, we will send you a link to
                reset your password.
            </Text>

            <ForgotPasswordForm />
        </Page>
    )
}
