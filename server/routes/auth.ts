/*=============================================== Authentification routes ===============================================*/

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex, emailRegex, getRandomString } from "ts-utils-julseb"

import { UserModel } from "../models/User.model"

import { isAuthenticated } from "../middleware"

import { jwtConfig, SALT_ROUNDS, TOKEN_SECRET, sendMail } from "../utils"

const router = Router()

// Signup
router.post("/signup", (req, res, next) => {
    const { email, fullName, password, avatar } = req.body
    const verifyToken = getRandomString(20)

    if (!fullName) {
        return res
            .status(400)
            .json({ message: "Please provide your full name." })
    }

    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: "Please provide a valid email address." })
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    UserModel.findOne({ email })
        // @ts-expect-error
        .then(foundUser => {
            if (foundUser) {
                return res
                    .status(400)
                    .json({ message: "This email is already taken." })
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
                    "Verify your account on our app",
                    `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${createdUser._id}">Click here to verify your account</a>.`
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
            .json({ message: "Please provide your email and password." })
    }

    UserModel.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(401)
                    .json({ message: "This user does not exist." })
            }

            const passwordCorrect = bcrypt.compareSync(
                password,
                // @ts-expect-error
                foundUser.password
            )

            if (passwordCorrect) {
                const payload = { user: foundUser }
                // @ts-expect-error
                const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

                res.status(200).json({ authToken: authToken })
            } else {
                res.status(401).json({
                    message: "Unable to authenticate the user.",
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
        return res.status(400).json({ message: "Please enter a valid email." })
    }

    UserModel.findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                return res
                    .status(400)
                    .json({ message: "This user does not exist." })
            }

            UserModel.findOneAndUpdate(
                { email },
                { resetToken },
                { new: true }
            ).then(foundUser => {
                console.log("Start send mail")

                sendMail(
                    email,
                    "Reset your password on our app",
                    // @ts-expect-error
                    `Hello,<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${resetToken}/${foundUser._id}">click here</a>.`
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
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    UserModel.findById(id)
        .then(foundUser => {
            // @ts-expect-error
            if (foundUser.resetToken !== resetToken) {
                return res.status(400).json({
                    message:
                        "There was a problem trying to reset your password.",
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
