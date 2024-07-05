/*=============================================== MyAccount ===============================================*/

import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { useAuthContext } from "context"
import { Page, UserHeader } from "components"
import { PATHS } from "routes"

export function MyAccount() {
    const { user } = useAuthContext()

    return (
        <Page title="My account">
            <UserHeader user={user!} isAccount />

            {!user?.verified && <Text>Your account is not verified!</Text>}

            <Text>
                <Link to={PATHS.EDIT_ACCOUNT}>Edit your account.</Link>
            </Text>
        </Page>
    )
}
