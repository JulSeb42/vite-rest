/*=============================================== UserCard styles ===============================================*/

import styled from "styled-components"
import { Transitions, Card } from "tsx-library-julseb"

export const StyledUserCard = styled(Card)`
    transition: ${Transitions.Short};

    &:hover {
        transform: scale(1.02);
    }
`
