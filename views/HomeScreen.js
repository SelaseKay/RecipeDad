import { setStatusBarBackgroundColor, setStatusBarStyle } from "expo-status-bar";
import { FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
    useFonts,
    LibreBaskerville_400Regular,
    LibreBaskerville_400Regular_Italic,
    LibreBaskerville_700Bold
} from '@expo-google-fonts/libre-baskerville'
import SearchTextInput from "./sharedcomponents/SearchTextInput";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/reducer/recipeCategorySlice";
import Spinner from "./sharedcomponents/Spinner";
import RetryView from "./sharedcomponents/RetryView";
import showRetryingToast from "../util/retryToast";



const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        dispatch(getCategories())
        console.log("Home Screen")
    }, [])

    setStatusBarBackgroundColor("#9B6A4F")
    setStatusBarStyle('light')

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    })

    const dispatch = useDispatch()


    if (!fontsLoaded) {
        return (
            <View>

            </View>
        )
    }

    return (
        <SafeAreaView
            style={styles.container}>
            <SearchButton
                onPress={() => {
                    navigation.navigate('Search',{
                        title: ""
                    })
                }} />
            <HeaderText />
            <CategoryList
                onPressItem={title => {
                    navigation.navigate('Search', {title: title})
                }} />
        </SafeAreaView>
    )
}


//HomeScreen components------------------------------------------------

//SearchButton
const SearchButton = ({ onPress }) => {
    return (

        <View
            style={
                {
                    flexDirection: 'row',
                    backgroundColor: '#fff'
                }
            }>
            <Button
                style={styles.searchButton}
                contentStyle={{
                    alignSelf: 'flex-start'
                }}
                uppercase={false}
                icon="magnify"
                color="#938D8D"
                onPress={onPress}>
                Search category...
            </Button>
        </View>
    )
}

//Header
const HeaderText = () => {
    return (
        <Text
            style={styles.header}>
            Categories
        </Text>
    )
}

//Error View
const ErrorView = () => {

    const dispatch = useDispatch()
    const isConnectionAvailable = useSelector(state => state.recipeCategory.connection)
    const errorMessage = useSelector(state => state.recipeCategory.errorMessage)

    return (
        <RetryView
            visible={isConnectionAvailable}
            errorMessage={errorMessage}
            onRetry={() => {
                showRetryingToast()
                dispatch(getCategories())
            }
            } />
    )
}

//Category Item
const CategoryItem = ({ uri, title, onPress }) => {
    return (
        <View
            style={styles.categoryItemContainer}>
            <TouchableOpacity
                onPress={
                    onPress
                }>
                <Image
                    style={styles.categoryItem}
                    source={{
                        uri: uri
                    }} />
                <Text style={styles.categoryTitle}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


//Category list
const CategoryList = ({ onPressItem }) => {

    const isConnectionAvailable = useSelector(state => state.recipeCategory.connection)
    const recipes = useSelector(state => state.recipeCategory.recipes)

    if (recipes.categories === undefined && isConnectionAvailable == true) {
        return (
            <Spinner />
        )
    }

    if (isConnectionAvailable == false) {
        return (
            <ErrorView />
        )
    }


    const renderItem = ({ item }) => (
        <CategoryItem
            onPress={() => onPressItem(item.title)}
            uri={item.imageUrl}
            title={item.title} />
    )

    return (
        <FlatList
            style={styles.categoryList}
            columnWrapperStyle={{
                justifyContent: 'space-between'
            }}
            data={recipes.categories}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} />
    )
}


//HomeScreen components------------------------------------------------




const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    searchContainer: {
        flexDirection: 'row',
        marginStart: 8,
        marginLeft: 8,
        marginTop: 8,
        flex: 1
    },

    header: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: 24,
        marginTop: 18,
        marginStart: 8,
        lineHeight: 32,
        color: "#4E4E4E",
        fontFamily: 'LibreBaskerville_700Bold'
    },

    searchButton: {
        flex: 1,
        height: 40,
        fontSize: 14,
        backgroundColor: "#E0E0E0",
        fontSize: 14,
        borderRadius: 24,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        margin: 8,
    },

    categoryList: {
        marginTop: 20,
        marginHorizontal: 8,
    },

    categoryItem: {
        height: 112,
        borderRadius: 8,
        backgroundColor: "#B9B9B9"
    },

    categoryItemContainer: {
        width: '45%',
        marginBottom: 16

    },

    categoryTitle: {
        color: "#767676",
        fontSize: 14,
        lineHeight: 17,
        fontFamily: 'LibreBaskerville_400Regular',
        alignSelf: 'center',
        justifyContent: 'center'
    },

    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    progressBar: {
        height: 80,
        width: 80,
        color: "#EED34E"
    }
})

export default HomeScreen