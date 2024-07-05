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

router.use(SERVER_PATHS.AUTH.ROOT, auth)
router.use(SERVER_PATHS.USERS.ROOT, users)
router.use(SERVER_PATHS.UPLOADER.ROOT, uploader)
// prependRouterUse

export default router
