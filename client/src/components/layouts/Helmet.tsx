/*=============================================== Helmet ===============================================*/

import { Helmet as Head } from "tsx-library-julseb"

import { siteData } from "data"

export const Helmet = ({
    title,
    description,
    keywords,
    cover,
}: HelmetProps) => {
    return (
        <Head
            title={`${title} | ${siteData.name}`}
            description={description}
            keywords={[siteData.keywords, keywords]}
            siteName={siteData.name}
            favicon={siteData.favicon}
            author={siteData.author}
            type={siteData.type}
            cover={cover || siteData.cover}
            language={siteData.language}
        />
    )
}

export interface HelmetProps {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
