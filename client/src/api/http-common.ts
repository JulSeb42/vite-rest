/*=============================================== Http common ===============================================*/

/*
    Create API link
*/

import axios from "axios"
import { BASE_API_URL } from "shared"

export const http = axios.create({
    baseURL: BASE_API_URL,
    headers: { "Content-type": "application/json" },
})
