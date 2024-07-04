/*=============================================== Authentification routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex, emailRegex, getRandomString } from "ts-utils-julseb"
import { UserModel } from "../models/User.model"
import { isAuthenticated } from "../middleware"
import { jwtConfig, SALT_ROUNDS, TOKEN_SECRET, sendMail } from "../utils"
import { COMMON_TEXTS } from "../../shared"

const router = Router()

// Signup
router.post("/signup", (req, res, next) => {
    const { email, fullName, password, avatar } = req.body
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

    UserModel.findOne({ email })
        // @ts-expect-error
        .then(foundUser => {
            if (foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.EMAIL_TAKEN })
            }

            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return UserModel.create({
                email,
                fullName,
                password: hashedPassword,
                verified: false,
                verifyToken,
                avatar,
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

                // @ts-expect-error
                const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

                res.status(201).json({
                    user: createdUser,
                    authToken: authToken,
                })
            })
        })
        .catch(err => next(err))
})

// Login
router.post("/login", (req, res, next) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.PROVIDE_EMAIL_AND_PASSWORD })
    }

    UserModel.findOne({ email })
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

            if (passwordCorrect) {
                const payload = { user: foundUser }
                // @ts-expect-error
                const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

                res.status(200).json({ authToken: authToken })
            } else {
                res.status(401).json({
                    message: COMMON_TEXTS.ERRORS.AUTH_NOT_POSSIBLE,
                })
            }
        })
        .catch(err => next(err))
})

// Verify if user is logged in
router.get("/loggedin", isAuthenticated, (req, res, next) => {
    // @ts-expect-error
    console.log(`req.payload: ${req.payload}`)
    // @ts-expect-error
    res.status(200).json(req.payload)
})

// Verify account
router.put("/verify", (req, res, next) => {
    const { id } = req.body

    UserModel.findByIdAndUpdate(id, { verified: true }, { new: true })
        .then(updatedUser => {
            const payload = { user: updatedUser }
            // @ts-expect-error
            const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

            res.status(200).json({ authToken: authToken, user: updatedUser })
        })
        .catch(err => next(err))
})

// Forgot password
router.post("/forgot-password", (req, res, next) => {
    const { email } = req.body
    const resetToken = getRandomString(20)

    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID })
    }

    UserModel.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
            }

            UserModel.findOneAndUpdate(
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
                res.status(200).json(res.body)
            })
        })
        .catch(err => next(err))
})

// Reset password
router.put("/reset-password", (req, res, next) => {
    const { password, resetToken, id } = req.body

    if (!passwordRegex.test(password)) {
        return res
            .status(400)
            .json({ message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID })
    }

    UserModel.findById(id)
        .then(foundUser => {
            // @ts-expect-error
            if (foundUser.resetToken !== resetToken) {
                return res.status(400).json({
                    message: COMMON_TEXTS.ERRORS.PROBLEM_RESET_PASSWORD,
                })
            }

            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            UserModel.findByIdAndUpdate(
                id,
                { password: hashedPassword, resetToken: "" },
                { new: true }
            ).then(updatedUser => {
                res.status(200).json({ user: updatedUser })
            })
        })
        .catch(err => next(err))
})

export default router
