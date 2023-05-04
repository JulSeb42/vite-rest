/*=============================================== PublicProfile ===============================================*/

import { useParams } from "react-router-dom"
import { useFetch } from "tsx-library-julseb"
import type { AxiosResponse } from "axios"

import { userService } from "api"

import { Page, UserHeader } from "components"

import type { UserType } from "types"

export const PublicProfile = () => {
    const { id } = useParams<{ id: string }>()

    const { response, error, loading } = useFetch<AxiosResponse>(
        userService.getUser(id || "")
    )
    const user: UserType = response?.data

    return (
        <Page title={user?.fullName}>
            <UserHeader user={user} isLoading={loading} error={error} />
        </Page>
    )
}
