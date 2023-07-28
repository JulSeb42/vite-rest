/*=============================================== Http common ===============================================*/

/*
    Create API link
*/

import axios from "axios"

const API_URI = import.meta.env.VITE_API_URL || "http://localhost:5005"

export const http = axios.create({
    baseURL: `${API_URI}/api`,
})
