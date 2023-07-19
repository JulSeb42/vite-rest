/*=============================================== Helmet ===============================================*/

import { Helmet as Head } from "tsx-library-julseb"

import { SITE_DATA } from "data"

export const Helmet = ({
    title,
    description,
    keywords,
    cover,
}: HelmetProps) => {
    return (
        <Head
            title={`${title} | ${SITE_DATA.NAME}`}
            description={description}
            keywords={[SITE_DATA.KEYWORDS, keywords]}
            siteName={SITE_DATA.NAME}
            favicon={SITE_DATA.FAVICON}
            author={SITE_DATA.AUTHOR}
            type={SITE_DATA.TYPE}
            cover={cover || SITE_DATA.COVER}
            language={SITE_DATA.LANGUAGE}
        />
    )
}

export interface HelmetProps {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
