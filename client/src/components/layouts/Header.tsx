/*=============================================== Header ===============================================*/

import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import {
    Header as Container,
    ButtonIcon,
    uuid,
    Skeleton,
} from "tsx-library-julseb"
import { useAuthContext, useThemeContext } from "context"
import { SITE_DATA } from "shared"
import { PATHS } from "routes"
import { baseLinks, anonLinks, protectedLinks } from "data"
import { NavLink as NavLinkType } from "types"

export function Header() {
    const { toggleTheme, selectedTheme } = useThemeContext()

    return (
        <Container
            logo={{ text: SITE_DATA.NAME, to: PATHS.ROOT }}
            navMobileVariant="drawer"
        >
            <Nav />

            <ButtonIcon
                icon={selectedTheme === "dark" ? "sun" : "moon"}
                size={24}
                variant="transparent"
                color="background"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            />
        </Container>
    )
}

function Nav() {
    const { isLoggedIn, logoutUser, isLoading } = useAuthContext()
    const [allLinks, setAllLinks] = useState<Array<NavLinkType>>(baseLinks)

    useEffect(() => {
        if (isLoggedIn) {
            setAllLinks([
                ...baseLinks,
                ...protectedLinks,
                { text: "Logout", onClick: logoutUser },
            ])
        } else {
            setAllLinks([...baseLinks, ...anonLinks])
        }
    }, [isLoggedIn])

    const skeletonProps = {
        width: 48,
        height: 24,
        backgroundColor: "transparent" as any,
        animation: "shine" as any,
    }

    if (isLoading)
        return (
            <>
                <Skeleton {...skeletonProps} />
                <Skeleton {...skeletonProps} />
                <Skeleton {...skeletonProps} />
            </>
        )

    return (
        <>
            {allLinks?.map(({ text, to, onClick, end }) =>
                to ? (
                    <NavLink to={to} end={end} key={uuid()}>
                        {text}
                    </NavLink>
                ) : (
                    <button onClick={onClick} key={uuid()}>
                        {text}
                    </button>
                )
            )}
        </>
    )
}
