/*=============================================== Error type ===============================================*/

import type { AxiosError } from "axios"

export type ErrorType<T> = AxiosError<T> | undefined
export type ErrorMessage = ErrorType<{ message: string }> | string | string[]
