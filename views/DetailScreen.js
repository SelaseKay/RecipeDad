import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import { getRecipeDetail } from "../redux/reducer/recipeSearchSlice"

const DetailScreen = ({ route, navigation }) => {

    return (
        <SafeAreaView
            style={styles.container}>
            <ScreenHeader />
            <RecipeDetailsContainer />
        </SafeAreaView>
    )
}

//DetailScreen components

const ScreenHeader = () => {

    const recipe = useSelector(state => state.recipeSearch.recipe)

    console.log("recipe", recipe)


    return (
        <View
            style={styles.screenHeader}>
            <RecipeImage uri={recipe.image_url} />
            <RecipeTitle recipeTitle={recipe.title} />
        </View>
    )
}

const RecipeImage = ({ uri }) => {
    return (
        <Image
            style={styles.recipeImage}
            source={{
                uri: uri
            }} />
    )
}

const RecipeTitle = ({ recipeTitle }) => {
    return (
        <Text
            style={styles.recipeTitle}>
            {recipeTitle}
        </Text>
    )
}

const IngredientHeader = ({ headerText }) => {
    return (
        <View
            style={styles.ingredientHeader}>
            <Text
                style={styles.ingredientHeaderText}>
                {headerText}
            </Text>

        </View>
    )
}

const IngredientItem = ({ ingredientText }) => {
    return (
        <View style={styles.ingredientItem}>
            <View
                styles={styles.dot} />
            <Text>
                {ingredientText}
            </Text>
        </View>
    )
}

const RecipeSource = () => {

    const recipe = useSelector(state => state.recipeSearch.recipe)
    let sourceUrl = recipe.source_url

    return (
        <View
            style={styles.recipeSource}>
            <Text
                onPress={() => Linking.openURL(sourceUrl)}
                style={styles.recipeSourceText}>
                {sourceUrl}
            </Text>

        </View>
    )
}

const IngredientsContainer = () => {

    const recipe = useSelector(state => state.recipeSearch.recipe)

    const renderItem = ({ item }) => {
        return (
            <IngredientItem
                ingredientText={item} />
        )
    }

    return (
        <FlatList
            style={{
                padding: 8
            }}
            data={recipe.ingredients}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} />
    )
}

const RecipeDetailsContainer = ({ uriLink }) => {
    return (
        <View
            style={styles.recipeDetailContainer}>
            <IngredientHeader
                headerText="Ingredients" />
            <IngredientsContainer />
            <RecipeSource />
        </View>
    )
}

//DetailScreen components


const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    recipeImage: {
        flex: 3,
        marginTop: 30,
        marginHorizontal: 8,
        resizeMode: 'contain'
    },

    recipeTitle: {
        fontSize: 16,
        marginTop: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        color: "#000000"
    },

    screenHeader: {
        backgroundColor: "#E5E5E5",
        flex: 2,
        margin: 8,
        padding: 8,
        borderRadius: 16,
    },

    dot: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor: "#8E8C8B"
    },

    ingredientHeader: {
        marginTop: 8,
        marginStart: 8,
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 16,
        alignSelf: 'baseline',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F0A174"
    },

    ingredientHeaderText: {
        fontSize: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        color: "#fff"
    },

    ingredientText: {
        fontSize: 16,
        marginStart: 8,
        color: "#CA5310"
    },

    ingredientItem: {
        flexDirection: 'row',
        marginStart: 16
    },

    recipeSource: {
        marginBottom: 8,
        marginHorizontal: 8,
        borderRadius: 16,
        backgroundColor: "#fff"
    },

    recipeSourceText: {
        fontSize: 16,
        margin: 8,
        color: "#267DE3",
        textDecorationLine: 'underline',
        textDecorationColor: "#267DE3"
    },

    recipeDetailContainer: {
        flex: 3.5,
        borderRadius: 24,
        margin: 8,
        backgroundColor: "#F4EAE4"
    }


})

export default DetailScreen