/*=============================================== Users routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex } from "ts-utils-julseb"
import { UserModel } from "../models"
import { SALT_ROUNDS, TOKEN_SECRET, jwtConfig } from "../utils"
import { COMMON_TEXTS, SERVER_PATHS } from "../../shared"
import { EditAccountFormData, EditPasswordFormData } from "../../shared/types"

const router = Router()

const { USERS: PATHS } = SERVER_PATHS

// Get all users
router.get(PATHS.ALL_USERS, async (_, res, next) => {
    return await UserModel.find()
        .then(usersFromDb => res.status(200).json(usersFromDb))
        .catch(err => next(err))
})

// Get user by ID
router.get(PATHS.USER(), async (req, res, next) => {
    return await UserModel.findById(req.params.id)
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => {
            next(err)
            return res.status(400).json({
                message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
            })
        })
})

// Edit user
router.put(PATHS.EDIT_ACCOUNT(), async (req, res, next) => {
    const { fullName } = req.body as EditAccountFormData

    if (!fullName) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY })
    }

    return await UserModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { user: updatedUser }
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig as any)

            return res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Edit password
router.put(PATHS.EDIT_PASSWORD(), async (req, res, next) => {
    const { oldPassword, newPassword } = req.body as EditPasswordFormData

    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
            message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
        })
    }

    return await UserModel.findById(req.params.id)
        .then(async foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
            }

            if (!(await bcrypt.compare(oldPassword, foundUser?.password))) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.OLD_PASSWORD_WRONG })
            }

            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(newPassword, salt)

            return await UserModel.findByIdAndUpdate(
                req.params.id,
                { password: hashedPassword },
                { new: true }
            ).then(updatedUser => {
                const payload = { user: updatedUser }
                const authToken = jwt.sign(
                    payload,
                    TOKEN_SECRET,
                    jwtConfig as any
                )

                return res.status(201).json({ user: updatedUser, authToken })
            })
        })
        .catch(err => next(err))
})

// Delete user
router.delete(PATHS.DELETE_ACCOUNT(), async (req, res, next) => {
    return await UserModel.findByIdAndDelete(req.params.id)
        .then(() =>
            res.status(200).json({ message: COMMON_TEXTS.USER_DELETED })
        )
        .catch(err => next(err))
})

export default router
