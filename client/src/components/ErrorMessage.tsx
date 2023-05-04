/*=============================================== ErrorMessage component ===============================================*/

import { Alert } from "tsx-library-julseb"

import type { ErrorMessageType } from "types"

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if (!error) return null

    return <Alert color="danger">{error.response?.data.message}</Alert>
}

interface ErrorMessageProps {
    error: ErrorMessageType
}
