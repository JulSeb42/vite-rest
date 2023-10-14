/*=============================================== ErrorMessage component ===============================================*/

import { Alert } from "tsx-library-julseb"

import type { ErrorMessage } from "types"

export function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) return null

    return <Alert color="danger">{error.response?.data.message}</Alert>
}

interface ErrorMessageProps {
    error: ErrorMessage
}
