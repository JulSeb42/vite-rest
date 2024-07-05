/*=============================================== Generate server route ===============================================*/

import { SERVER_PATHS } from "shared"

type ParamFn = (param: string) => string

export function generateServerRoute(
    route: keyof typeof SERVER_PATHS,
    path: string,
    param?: string
) {
    const PATHS = SERVER_PATHS[route]
    const root = PATHS.ROOT
    const foundRoute: string | ParamFn = PATHS[path as keyof typeof PATHS]

    const routeFn: ParamFn | null =
        typeof foundRoute === "string"
            ? null
            : (foundRoute as unknown as ParamFn)

    if (param && routeFn) {
        return `${root}${routeFn(param)}`
    }

    return `${root}${foundRoute}`
}
