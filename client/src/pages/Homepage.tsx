/*=============================================== Homepage ===============================================*/

import { Text } from "tsx-library-julseb"

import { useAuthContext } from "context"

import { Page } from "components"

export function Homepage() {
    const { isLoggedIn, user } = useAuthContext()

    return (
        <Page title="Home" data-testid="Homepage">
            <Text tag="h1">Hello World!</Text>

            {isLoggedIn && (
                <Text>Hello {user?.fullName}, you are logged in!</Text>
            )}
        </Page>
    )
}
