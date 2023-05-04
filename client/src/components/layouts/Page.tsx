/*=============================================== Page ===============================================*/

import { useContext } from "react"
import { Wrapper, Main, PageLoading } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Helmet } from "components/layouts/Helmet"
import { Header } from "components/layouts/Header"

import type { HelmetProps } from "components/layouts/Helmet"

export const Page = ({
    children,
    title,
    description,
    keywords,
    cover,
    mainWidth = "default",
    noWrapper,
    isLoading,
    template = "1col",
}: Props) => {
    const { isLoading: isApiLoading } = useContext(
        AuthContext
    ) as AuthContextType

    return isApiLoading || isLoading ? (
        <PageLoading />
    ) : (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            {!isLoading && <Header />}

            {!noWrapper ? (
                <Wrapper>
                    {template === "1col" ? (
                        <Main minHeight="calc(100vh - 56px)" size={mainWidth}>
                            {children}
                        </Main>
                    ) : (
                        children
                    )}
                </Wrapper>
            ) : (
                children
            )}
        </>
    )
}

interface Props extends HelmetProps {
    children?: any
    mainWidth?: "default" | "large" | "form"
    template?: "1col" | "2cols" | "3cols"
    isLoading?: boolean
    noWrapper?: boolean
}
