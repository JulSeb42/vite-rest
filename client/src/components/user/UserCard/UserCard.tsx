/*=============================================== UserCard component ===============================================*/

import { Avatar, Text } from "tsx-library-julseb"

import { StyledUserCard } from "components/user/UserCard/styles"
import type { UserCardProps } from "components/user/UserCard/types"

import { PATHS } from "data"

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <StyledUserCard
            to={PATHS.USER(user?._id)}
            border={{ width: 1 }}
            flexDirection="column"
            gap="xs"
            alignItems="center"
            justifyContent="center"
        >
            <Avatar img={user?.avatar} size={32} />
            <Text tag="strong">{user?.fullName}</Text>
        </StyledUserCard>
    )
}
