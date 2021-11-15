import React, { useEffect, useRef } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"

const SearchTextInput = ({ value, onChangeText, onSubmitEditing }) => {

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    console.log("value1", value)

    return (
        <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search category..."
            placeholderTextColor="#938D8D"
            value={value}
            selectionColor="#EC841C"
            onSubmitEditing={onSubmitEditing}
            returnKeyType="search"
            left={<TextInput.Icon
                name="magnify"
                color="#AEAAA7" />}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            onChangeText={text => onChangeText(text)}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        fontSize: 14,
        backgroundColor: "#E0E0E0",
        marginBottom: 16,
        fontSize: 14,
        borderRadius: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        margin: 8
    },
})

export default SearchTextInput