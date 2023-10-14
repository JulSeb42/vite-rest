/*=============================================== EditAccount ===============================================*/

import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { Page } from "components"
import { EditAccountForm } from "pages/account/EditAccount/EditAccountForm"
import { DeleteAccount } from "pages/account/EditAccount/DeleteAccount"
import { PATHS } from "routes"

export function EditAccount() {
    return (
        <Page title="Edit your account" mainWidth="form">
            <Text tag="h1">Edit your account</Text>

            <EditAccountForm />

            <Text>
                <Link to={PATHS.EDIT_PASSWORD}>Edit your password.</Link>
            </Text>

            <DeleteAccount />
        </Page>
    )
}
