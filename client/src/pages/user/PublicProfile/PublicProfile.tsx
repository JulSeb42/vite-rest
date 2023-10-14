/*=============================================== PublicProfile ===============================================*/

import { useParams } from "react-router-dom"
import { useFetch } from "tsx-library-julseb"
import type { AxiosResponse } from "axios"

import { userService } from "api"

import { Page, UserHeader } from "components"

import type { User } from "types"

export function PublicProfile() {
    const { id } = useParams<{ id: string }>()

    const { response, error, loading } = useFetch<AxiosResponse>(
        userService.getUser(id!)
    )
    const user: User = response?.data

    return (
        <Page title={loading ? "Loading" : user ? user?.fullName : "Error"}>
            <UserHeader user={user} isLoading={loading} error={error} />
        </Page>
    )
}
