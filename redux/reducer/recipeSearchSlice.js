import { createSlice } from "@reduxjs/toolkit"

const INITiAL_STATE = {
    searchedRecipes: [],
    errorMessage: "",
    connection: true,
    isLoading: false,
}

export const recipeSearchSlice = createSlice({
    name: 'recipeSearch',
    initialState: INITiAL_STATE,
    reducers: {
        refreshRecipes(state, action) {
            state.searchedRecipes = []
        },
        setConnection(state, action) {
            state.connection = action.payload
        },
        setIsLoading(state, action){
            state.isLoading = action.payload
        },
        setErrorMessage(state, action){
            state.errorMessage = action.payload
        },
        getSearchedRecipes(state, action) {
            state.searchedRecipes = action.payload
        }
    }
})

export const {
    setIsLoading,
    setErrorMessage,
    refreshRecipes,
    setConnection,
    getSearchedRecipes
} = recipeSearchSlice.actions
export default recipeSearchSlice.reducer