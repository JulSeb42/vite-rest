/*=============================================== ResetPassword ===============================================*/

import { Text } from "tsx-library-julseb"
import { Page } from "components"
import { ResetPasswordForm } from "pages/auth/ResetPassword/ResetPasswordForm"

export function ResetPassword() {
    return (
        <Page title="Reset your password" mainWidth="form">
            <Text tag="h1">Reset your password</Text>

            <ResetPasswordForm />
        </Page>
    )
}
