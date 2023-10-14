/*=============================================== DangerZone ===============================================*/

import { useState } from "react"
import { Button, Alert, Text, Flexbox } from "tsx-library-julseb"

export function DangerZone({ texts, buttonPrimary }: DangerZoneProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            {!isVisible && (
                <Button color="danger" onClick={() => setIsVisible(true)}>
                    {texts.buttonOpen}
                </Button>
            )}

            {isVisible && (
                <Alert color="danger">
                    <Text>{texts.body}</Text>

                    <Flexbox alignItems="center" gap="xs">
                        <Button color="danger" onClick={buttonPrimary.onClick}>
                            {buttonPrimary.text}
                        </Button>

                        <Button
                            variant="transparent"
                            onClick={() => setIsVisible(false)}
                        >
                            {texts.buttonSecondary || "Cancel"}
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </>
    )
}

interface DangerZoneProps {
    texts: {
        buttonOpen: string
        body: string
        buttonSecondary?: string
    }

    buttonPrimary: {
        text: string
        onClick: () => void
    }
}
