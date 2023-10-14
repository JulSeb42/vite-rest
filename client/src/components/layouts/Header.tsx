/*=============================================== Header ===============================================*/

import { useContext } from "react"
import { NavLink } from "react-router-dom"
import {
    Header as Container,
    ThemeContext,
    ButtonIcon,
    uuid,
} from "tsx-library-julseb"
import type { ThemeContextProps } from "tsx-library-julseb/types"

import { useAuthContext } from "context"

import { SITE_DATA } from "data"
import { PATHS } from "routes"

import type { NavLink as NavLinkType } from "types"

export function Header() {
    const { isLoggedIn, logoutUser } = useAuthContext()

    const { toggleTheme, selectedTheme } = useContext(
        ThemeContext
    ) as ThemeContextProps

    const baseLinks: Array<NavLinkType> = [
        {
            text: "Home",
            to: PATHS.ROOT,
            end: true,
        },
        {
            text: "All users",
            to: PATHS.USERS,
        },
    ]

    const anonLinks: Array<NavLinkType> = [
        {
            text: "Log in",
            to: PATHS.LOGIN,
        },
        {
            text: "Sign up",
            to: PATHS.SIGNUP,
        },
    ]

    const loggedInLinks: Array<NavLinkType> = [
        {
            text: "My account",
            to: PATHS.MY_ACCOUNT,
        },
        {
            text: "Log out",
            onClick: logoutUser,
        },
    ]

    const navLinksFunc = (links: Array<NavLinkType>) =>
        links.map(({ text, to, onClick, end }) =>
            to ? (
                <NavLink to={to} end={end} key={uuid()}>
                    {text}
                </NavLink>
            ) : (
                <button onClick={onClick} key={uuid()}>
                    {text}
                </button>
            )
        )

    return (
        <Container
            logo={{ text: SITE_DATA.NAME, to: PATHS.ROOT }}
            navMobileVariant="drawer"
        >
            {navLinksFunc(baseLinks)}

            {isLoggedIn ? navLinksFunc(loggedInLinks) : navLinksFunc(anonLinks)}

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
