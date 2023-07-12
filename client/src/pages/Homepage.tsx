/*=============================================== Homepage ===============================================*/

import { useContext } from "react"
import { Text } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Page } from "components"

export const Homepage = () => {
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType

    return (
        <Page title="Home">
            <Text tag="h1">Hello World!</Text>

            {isLoggedIn && (
                <Text>Hello {user?.fullName}, you are logged in!</Text>
            )}
        </Page>
    )
}
