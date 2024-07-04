/*=============================================== Users routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex } from "ts-utils-julseb"
import { UserModel } from "../models"
import { SALT_ROUNDS, TOKEN_SECRET, jwtConfig } from "../utils"
import { COMMON_TEXTS, SERVER_USERS_PATHS } from "../../shared"

const router = Router()

// Get all users
router.get(SERVER_USERS_PATHS.ALL_USERS, (_, res, next) => {
    UserModel.find()
        .then(usersFromDb => res.status(200).json(usersFromDb))
        .catch(err => next(err))
})

// Get user by ID
router.get(SERVER_USERS_PATHS.USER(), (req, res) => {
    UserModel.findById(req.params.id)
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(() =>
            res
                .status(400)
                .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
        )
})

// Edit user
router.put(SERVER_USERS_PATHS.EDIT_ACCOUNT(), (req, res, next) => {
    const { fullName, avatar } = req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY })
    }

    UserModel.findByIdAndUpdate(
        req.params.id,
        { fullName, avatar },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { user: updatedUser }

            // @ts-expect-error
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Edit password
router.put(SERVER_USERS_PATHS.EDIT_PASSWORD(), (req, res, next) => {
    const { password } = req.body

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
        })
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const hashedPassword = bcrypt.hashSync(password, salt)

    UserModel.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        { new: true }
    )
        .then(updatedUser => {
            const payload = { user: updatedUser }

            // @ts-expect-error
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

            res.status(201).json({
                user: updatedUser,
                authToken: authToken,
            })
        })
        .catch(err => next(err))
})

// Delete user
router.delete(SERVER_USERS_PATHS.DELETE_ACCOUNT(), (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() =>
            res.status(200).json({ message: COMMON_TEXTS.USER_DELETED })
        )
        .catch(err => next(err))
})

export default router
