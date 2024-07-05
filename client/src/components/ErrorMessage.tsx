/*=============================================== ErrorMessage component ===============================================*/

import { Alert } from "tsx-library-julseb"
import type { ErrorMessage } from "types"

export function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) return null

    if (Array.isArray(error)) {
        return error.map(err => <Alert color="danger">{err}</Alert>)
    }

    return (
        <Alert color="danger">
            {typeof error === "string" ? error : error?.response?.data?.message}
        </Alert>
    )
}

interface ErrorMessageProps {
    error: ErrorMessage
}
