import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"

const DetailScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView
            style={styles.container}>
            <ScreenHeader />
            <RecipeDetailsContainer/>
        </SafeAreaView>
    )
}

//DetailScreen components

const ScreenHeader = ({ uri, recipeTitle }) => {
    return (
        <View
            style={styles.screenHeader}>
            <RecipeImage uri={uri} />
            <RecipeTitle recipeTitle={recipeTitle} />
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

const RecipeSource = ({ uriLink }) => {
    return (
        <View
            style={styles.recipeSource}>
            <Text
                style={styles.recipeSourceText}>
                {uriLink}
            </Text>

        </View>
    )
}

const IngredientsContainer = ({ data }) => {

    const renderItem = ({ item }) => {
        return (
            <IngredientItem
                ingredientText={item} />
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} />
    )
}

const RecipeDetailsContainer = ({ data, uriLink }) => {
    return (
        <View
            style={styles.recipeDetailContainer}>
            <IngredientHeader
                headerText="Ingredients" />
            <IngredientsContainer
                data={data} />
            <RecipeSource
                uriLink={uriLink} />
        </View>
    )
}

//DetailScreen components


const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    recipeImage: {
        hieght: 192,
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
        flex: 2
    },

    dot: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        backgroundColor: "#8E8C8B"
    },

    ingredientHeader: {
        height: 32,
        marginTop: 8,
        backgroundColor: "#F0A174"
    },

    ingredientHeaderText: {
        fontSize: 16,
        color: "#fff"
    },

    ingredientText: {
        fontSize: 16,
        marginStart: 8,
        color: "#CA5310"
    },

    ingredientItem: {
        flexDirection: 'row',
        marginStart: 8
    },

    recipeSource: {
        height: 32,
        marginBottom: 8,
        backgroundColor: "#fff"
    },

    recipeSourceText: {
        fontSize: 16,
        color: "#267DE3",
        textDecorationLine: 'underline',
        textDecorationColor: "#267DE3"
    },

    recipeDetailContainer: {
        flex: 4,
        borderRadius: 24,
        backgroundColor: "#F4EAE4"
    }


})

export default DetailScreen