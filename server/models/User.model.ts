/*=============================================== User model ===============================================*/

import { Schema, model } from "mongoose"
import type { User } from "../types"

const userSchema = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        password: String,
        verified: Boolean,
        verifyToken: String,
        resetToken: String,
        avatar: String,
    },
    { timestamps: true }
)

export const UserModel = model<User>("User", userSchema)
