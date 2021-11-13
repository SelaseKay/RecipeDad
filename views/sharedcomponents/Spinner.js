import { StyleSheet, View } from "react-native"
import React from "react"
import { ActivityIndicator } from "react-native-paper"

const Spinner = () => {
    return (
        <View
            style={styles.loadingView}>
            <ActivityIndicator
                color="#EED34E"
                style={styles.progressBar} />
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Spinner