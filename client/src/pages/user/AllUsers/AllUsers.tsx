/*=============================================== AllUsers ===============================================*/

import { Text } from "tsx-library-julseb"
import { Page } from "components"
import { UsersList } from "pages/user/AllUsers/UsersList"

export function AllUsers() {
    return (
        <Page title="All Users">
            <Text tag="h1">All users</Text>
            <UsersList />
        </Page>
    )
}
