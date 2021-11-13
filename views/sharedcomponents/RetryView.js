import { View } from "react-native"
import { useSelector } from "react-redux"
import RetrySnackBar from "./RetrySnackBar"
import Spinner from "./Spinner"
import React from "react"

const RetryView = ({ visible, onRetry, errorMessage }) => {


    return (
        <View style={{
            flex: 1
        }}>
            <Spinner />
            <RetrySnackBar
                visible={!visible}
                onRetry={onRetry}
                errorMessage={errorMessage} />
        </View>
    )
}

export default RetryView