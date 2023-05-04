/*=============================================== Consts ===============================================*/

import "dotenv/config"

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/vite-rest"

export const PORT = process.env.PORT || 5005

export const ORIGIN = process.env.ORIGIN || "http://localhost:5173"

export const TOKEN_SECRET = process.env.TOKEN_SECRET || ""

export const jwtConfig = {
    algorithm: "HS256",
    expiresIn: "10d",
}

export const SALT_ROUNDS = 10
