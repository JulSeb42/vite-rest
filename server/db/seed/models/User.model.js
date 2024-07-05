/*=============================================== User model ===============================================*/

const { Schema, model } = require("mongoose")

const userSchema = new Schema(
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

const UserModel = model("User", userSchema)

module.exports = { UserModel }
