import { ToastAndroid } from "react-native"

const showRetryingToast = () => {
    ToastAndroid.show("Retrying...", ToastAndroid.SHORT)
}

export default showRetryingToast