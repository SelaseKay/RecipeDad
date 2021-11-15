import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../views/HomeScreen"
import React from "react"
import SearchScreen from "../views/SearchScreen"
import { Provider } from "react-redux"
import store from "../redux/store/store"
import DetailScreen from "../views/DetailScreen"



const Stack = createNativeStackNavigator()

export const Navigator = () => {


    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={
                        {
                            header: () => null
                        }
                    }>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen} />
                    <Stack.Screen
                        name="Search"
                        component={SearchScreen} />
                    <Stack.Screen
                        name="Detail"
                        component={DetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}