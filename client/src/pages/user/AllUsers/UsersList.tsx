/*=============================================== UsersList ===============================================*/

import type { AxiosResponse } from "axios"
import { useFetch, Text, Grid, generateNumbers } from "tsx-library-julseb"

import { userService } from "api"

import { UserCard, UserCardSkeleton } from "components"

import type { UserType } from "types"

export const UsersList = () => {
    const { response, error, loading } = useFetch<AxiosResponse>(
        userService.allUsers()
    )
    const users: UserType[] | null = response?.data

    if (loading) return <UsersListSkeleton />

    if (error) return <Text>Error while fetching users: {error}</Text>

    if (!users?.length) return <Text>No user yet.</Text>

    return (
        <Grid col={3} gap="s">
            {users.map(user => (
                <UserCard user={user} key={user._id} />
            ))}
        </Grid>
    )
}

const UsersListSkeleton = () => {
    return (
        <Grid col={3} gap="s">
            {generateNumbers(0, 4).map(n => (
                <UserCardSkeleton key={n} />
            ))}
        </Grid>
    )
}
