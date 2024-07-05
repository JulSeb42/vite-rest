/*=============================================== Authentification routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex, emailRegex, getRandomString } from "ts-utils-julseb"
import { UserModel } from "../models"
import { isAuthenticated } from "../middleware"
import { jwtConfig, SALT_ROUNDS, TOKEN_SECRET, sendMail } from "../utils"
import { COMMON_TEXTS, SERVER_PATHS } from "../../shared"
import {
    SignupFormData,
    LoginFormData,
    ForgotPasswordFormData,
} from "../../shared/types"

const router = Router()

const { AUTH: PATHS } = SERVER_PATHS

// Signup
router.post(PATHS.SIGNUP, async (req, res, next) => {
    const { email, fullName, password } = req.body as SignupFormData

    const verifyToken = getRandomString(20)

    if (!fullName || !emailRegex.test(email) || !passwordRegex.test(password)) {
        if (!fullName)
            res.status(400).json({
                message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY,
            })

        if (!emailRegex.test(email))
            res.status(400).json({
                message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID,
            })

        if (!passwordRegex.test(password))
            res.status(400).json({
                message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
            })

        return
    }

    return await UserModel.findOne({ email })
        .then(async foundUser => {
            if (foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.EMAIL_TAKEN })
            }

            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return await UserModel.create({
                ...req.body,
                password: hashedPassword,
                verified: false,
                verifyToken,
            }).then(createdUser => {
                sendMail(
                    email,
                    COMMON_TEXTS.EMAIL_SIGNUP_TITLE,
                    COMMON_TEXTS.EMAIL_SIGNUP_BODY(
                        createdUser as any,
                        verifyToken
                    )
                )

                const payload = { user: createdUser }
                const authToken = jwt.sign(
                    payload,
                    TOKEN_SECRET,
                    jwtConfig as any
                )

                return res.status(201).json({ user: createdUser, authToken })
            })
        })
        .catch(err => next(err))
})

// Login
router.post(PATHS.LOGIN, async (req, res, next) => {
    const { email, password } = req.body as LoginFormData

    if (email === "" || password === "") {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.PROVIDE_EMAIL_AND_PASSWORD })
    }

    return await UserModel.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(401)
                    .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
            }

            const passwordCorrect = bcrypt.compareSync(
                password,
                foundUser.password
            )

            if (!passwordCorrect) {
                return res.status(401).json({
                    message: COMMON_TEXTS.ERRORS.AUTH_NOT_POSSIBLE,
                })
            }

            const payload = { user: foundUser }
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig as any)

            return res.status(200).json({ authToken: authToken })
        })
        .catch(err => next(err))
})

// Verify if user is logged in
router.get(PATHS.LOGGED_IN, isAuthenticated, (req, res) => {
    // @ts-expect-error
    console.log(`req.payload: ${req.payload}`)

    // @ts-expect-error
    return res.status(200).json(req.payload)
})

// Verify account
router.put(PATHS.VERIFY(), async (req, res, next) => {
    const { id, token } = req.params

    await UserModel.findById(id).then(async foundUser => {
        if (!foundUser) {
            return res
                .status(400)
                .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
        }

        if (foundUser.verifyToken !== token) {
            return res
                .status(400)
                .json({ message: COMMON_TEXTS.ERRORS.VERIFY_TOKEN_NOT_MATCH })
        }

        return await UserModel.findByIdAndUpdate(
            id,
            { verified: true },
            { new: true }
        )
            .then(updatedUser => {
                const payload = { user: updatedUser }
                const authToken = jwt.sign(
                    payload,
                    TOKEN_SECRET,
                    jwtConfig as any
                )

                return res.status(200).json({
                    user: updatedUser,
                    authToken,
                })
            })
            .catch(err => next(err))
    })
})

// Forgot password
router.post(PATHS.FORGOT_PASSWORD, async (req, res, next) => {
    const { email } = req.body as ForgotPasswordFormData

    const resetToken = getRandomString(20)

    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID })
    }

    return await UserModel.findOne({ email })
        .then(async foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
            }

            return await UserModel.findOneAndUpdate(
                { email },
                { resetToken },
                { new: true }
            ).then(foundUser => {
                console.log("Start send mail")

                sendMail(
                    email,
                    COMMON_TEXTS.EMAIL_RESET_PASSWORD_TITLE,
                    COMMON_TEXTS.EMAIL_RESET_PASSWORD_BODY(
                        foundUser as any,
                        resetToken
                    )
                )

                // @ts-expect-error
                return res.status(200).json(res.body)
            })
        })
        .catch(err => next(err))
})

// Reset password
router.put(PATHS.RESET_PASSWORD, async (req, res, next) => {
    const { password, resetToken, id } = req.body

    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID })
    }

    return await UserModel.findById(id)
        .then(async foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
            }

            if (foundUser.resetToken !== resetToken) {
                return res.status(400).json({
                    message: COMMON_TEXTS.ERRORS.PROBLEM_RESET_PASSWORD,
                })
            }

            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return await UserModel.findByIdAndUpdate(
                id,
                { password: hashedPassword, resetToken: "" },
                { new: true }
            ).then(updatedUser => {
                return res.status(200).json({ user: updatedUser })
            })
        })
        .catch(err => next(err))
})

export default router
