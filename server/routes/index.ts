/*=============================================== All routes ===============================================*/

import { Router } from "express"
import { SERVER_PATHS } from "../../shared"
import auth from "./auth"
import users from "./users"
import uploader from "./uploader"
// prependImport

const router = Router()

router.get("/", (_, res) => {
    res.json("All good in here")
})

router.use(SERVER_PATHS.AUTH, auth)
router.use(SERVER_PATHS.USERS, users)
router.use(SERVER_PATHS.UPLOADER, uploader)
// prependRouterUse

export default router
