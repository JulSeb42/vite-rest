/*=============================================== UserHeader component ===============================================*/

import {
    Flexbox,
    Text,
    Avatar,
    SkeletonCard,
    Skeleton,
    SkeletonShine,
    getFirstName,
} from "tsx-library-julseb"

import type { UserHeaderProps } from "components/user/UserHeader/types"

export function UserHeader({
    user,
    isLoading,
    error,
    isAccount,
}: UserHeaderProps) {
    if (isLoading)
        return (
            <SkeletonCard flexDirection="row" gap="xs" alignItems="center">
                <Skeleton width={48} height={48} borderRadius="circle" />
                <Skeleton width="40%" height={60} borderRadius="s" />
                <SkeletonShine />
            </SkeletonCard>
        )

    if (error?.response?.status === 400)
        return <Text>Error while fetching user's header: {error?.message}</Text>

    const title = isAccount
        ? `Hello ${getFirstName(user?.fullName)}`
        : user?.fullName

    return (
        <Flexbox alignItems="center" gap="xs">
            <Avatar img={user?.avatar} alt={`Avatar ${user?.fullName}`} />
            <Text tag="h1">{title}</Text>
        </Flexbox>
    )
}
