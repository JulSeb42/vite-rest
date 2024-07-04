/*=============================================== Error handling ===============================================*/

import { COMMON_TEXTS } from "../../shared"

export const errorHandler = (app: any) => {
    app.use((_: null, res: any) => {
        res.status(404).json({
            errorMessage: COMMON_TEXTS.ERRORS.ROUTE_NOT_EXIST,
        })
    })

    app.use((err: any, req: any, res: any) => {
        console.error("ERROR", req.method, req.path, err)

        if (!res.headersSent) {
            res.status(500).json({
                errorMessage: COMMON_TEXTS.ERRORS.SERVER_ERROR,
            })
        }
    })
}
