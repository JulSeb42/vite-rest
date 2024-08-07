/*=============================================== VerificationFailed ===============================================*/

import { Text } from "tsx-library-julseb"
import { Page, ErrorMessage } from "components"
import type { ErrorMessage as ErrorMessageType } from "types"

export function VerificationFailed({ errorMessages }: VerificationFailedProps) {
    return (
        <Page title="Verify your account">
            <Text tag="h1">Verification failed</Text>

            <Text>
                Your account could not be verified, please try again later.
            </Text>

            <ErrorMessage error={errorMessages} />
        </Page>
    )
}

interface VerificationFailedProps {
    errorMessages: ErrorMessageType
}
