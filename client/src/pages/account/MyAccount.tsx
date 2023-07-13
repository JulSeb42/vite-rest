/*=============================================== MyAccount ===============================================*/

import { useContext } from "react"
import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Page, UserHeader } from "components"

import { PATHS } from "data"

export const MyAccount = () => {
    const { user } = useContext(AuthContext) as AuthContextType

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
