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

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { SITE_DATA, PATHS } from "data"

import type { NavLinkType } from "types"

export const Header = () => {
    const { isLoggedIn, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType
    const { toggleTheme, selectedTheme } = useContext(
        ThemeContext
    ) as ThemeContextProps

    const baseLinks: NavLinkType[] = [
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

    const anonLinks: NavLinkType[] = [
        {
            text: "Log in",
            to: PATHS.LOGIN,
        },
        {
            text: "Sign up",
            to: PATHS.SIGNUP,
        },
    ]

    const loggedInLinks: NavLinkType[] = [
        {
            text: "My account",
            to: PATHS.MY_ACCOUNT,
        },
        {
            text: "Log out",
            onClick: logoutUser,
        },
    ]

    const navLinksFunc = (links: NavLinkType[]) =>
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
