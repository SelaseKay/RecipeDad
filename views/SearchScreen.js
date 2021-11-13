import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedRecipes, refreshRecipes } from "../redux/reducer/recipeSearchSlice";
import showRetryingToast from "../util/retryToast";
import RetryView from "./sharedcomponents/RetryView";
import SearchTextInput from "./sharedcomponents/SearchTextInput";
import Spinner from "./sharedcomponents/Spinner";

const SearchScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        dispatch(refreshRecipes())
    }, [])

    const handleSearchKeyPressed = (e) => {
        console.log('search pressed')
        if (inputText === "") {
            ToastAndroid.show('Search field cannot be empty', ToastAndroid.SHORT)
        }
        else {
            dispatch(getSearchedRecipes(inputText.trim()))
        }
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <SearchTextInput
                value={inputText}
                onChangeText={inputText => setInputText(inputText)}
                onSubmitEditing={handleSearchKeyPressed}
                placeholder="Search category..."
                placeholderTextColor="#938D8D"
                selectionColor="#EC841C"
                style={styles.input} />
            <SearchResultList
                onRetry={() => {
                    showRetryingToast()
                    dispatch(getSearchedRecipes(inputText.trim()))
                }} />
        </SafeAreaView>
    )
}


//Search Screen Components ------------------------------------------------

//No Result View
const NoResultView = () => {
    return (
        <View
            style={styles.noResultView}>
            <Text
                style={styles.noResultText}>
                No Recipe Found
            </Text>
        </View>
    )
}

//Error view
const ErrorView = ({ onRetry, visible }) => {

    const errorMessage = useSelector(state => state.recipeSearch.errorMessage)

    return (
        <RetryView
            errorMessage={errorMessage}
            onRetry={onRetry}
            visible={visible} />
    )
}

// Search Result List
const SearchResultList = ({ onRetry }) => {

    const isConnectionAvailable = useSelector(state => state.recipeSearch.connection)
    const searchedRecipes = useSelector(state => state.recipeSearch.searchedRecipes)
    const isLoading = useSelector(state => state.recipeSearch.isLoading)

    let recipes = searchedRecipes.recipes

    console.log("connection", isConnectionAvailable)

    if (!isConnectionAvailable) {
        return (
            <ErrorView
                onRetry={onRetry}
                visible={isConnectionAvailable} />
        )
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    if (recipes !== undefined && recipes.length === 0) {
        return (
            <NoResultView />
        )
    }

    const renderItem = ({ item }) => (
        <RecipeItem
            uri={item.imageUrl}
            title={item.title} />
    )
    return (
        <FlatList
            data={recipes}
            renderItem={renderItem}
            initialNumToRender={30}
            keyExtractor={(item, index) => index.toString()} />
    )
}


//Recipe Item
const RecipeItem = ({ uri, title }) => {
    return (
        <View
            style={styles.recipeItemContainer}>
            <Image
                style={styles.recipeImage}
                source={{
                    uri: uri
                }} />
            <Text
                style={styles.recipeItemTitle}>
                {title}
            </Text>

        </View>
    )
}

//Search Screen Components ------------------------------------------------

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    input: {
        height: 40,
        fontSize: 14,
        backgroundColor: "#E0E0E0",
        fontSize: 14,
        elevation: 0,
        borderRadius: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        margin: 8
    },

    recipeItemContainer: {
        marginHorizontal: 24,
        borderRadius: 16,
    },

    recipeImage: {
        height: 208,
        borderRadius: 16,
        marginBottom: 16,
        backgroundColor: "#8FDCAE"
    },

    recipeItemTitle: {
        fontSize: 16,
        color: "#fff",
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 24,
        marginStart: 8,
    },

    noResultView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    noResultText: {
        fontSize: 16,
        color: "#CFCFCF"
    }
})

export default SearchScreen