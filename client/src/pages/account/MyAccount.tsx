/*=============================================== MyAccount ===============================================*/

import { useContext } from "react"
import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Page, UserHeader } from "components"

import { emptyUser } from "utils"

export const MyAccount = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    return (
        <Page title="My account">
            <UserHeader user={user || emptyUser} isAccount />

            {!user?.verified && <Text>Your account is not verified!</Text>}

            <Text>
                <Link to="/my-account/edit">Edit your account.</Link>
            </Text>
        </Page>
    )
}
