import React from "react"
import { Snackbar } from "react-native-paper"

const RetrySnackBar = ({visible, errorMessage, onRetry}) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => {

            }}
            action={
                {
                    label: 'Retry',
                    onPress: onRetry
                }
            } >
            {errorMessage}
        </Snackbar>
    )
}

export default RetrySnackBar