/*=============================================== UsersList ===============================================*/

import {
    Text,
    Grid,
    uuid,
    useFetch,
    generateNumbers,
    Skeleton,
    SkeletonCard,
    SkeletonShine,
} from "tsx-library-julseb"
import type { AxiosResponse } from "axios"

import { userService } from "api"

import { UserCard } from "components"

import type { UserType } from "types"

export const UsersList = () => {
    const { response, error, loading } = useFetch<AxiosResponse>(
        userService.allUsers()
    )
    const users: UserType[] | null = response?.data

    if (loading)
        return (
            <Grid col={3} gap="s">
                {generateNumbers(0, 4)?.map(n => (
                    <SkeletonCard
                        borderRadius="m"
                        border={{ width: 1 }}
                        flexDirection="column"
                        gap="xs"
                        alignItems="center"
                        justifyContent="center"
                        padding="s"
                        key={n}
                    >
                        <Skeleton
                            width={32}
                            height={32}
                            borderRadius="circle"
                        />
                        <Skeleton width="70%" height={24} borderRadius="s" />
                        <SkeletonShine />
                    </SkeletonCard>
                ))}
            </Grid>
        )

    if (error) return <Text>Error while fetching users: {error}</Text>

    if (!users?.length) return <Text>No user yet.</Text>

    return (
        <Grid col={3} gap="s">
            {users?.map(user => (
                <UserCard user={user} key={uuid()} />
            ))}
        </Grid>
    )
}
