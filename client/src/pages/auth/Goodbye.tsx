/*=============================================== Goodbye ===============================================*/

import { Text } from "tsx-library-julseb"

import { Page } from "components"

export const Goodbye = () => {
    return (
        <Page title="Goodbye!">
            <Text tag="h1">We're sorry to see you go!</Text>

            <Text>Your account was deleted successfully.</Text>
        </Page>
    )
}
