import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    recipes: [],
    errorMessage: "",
    isLoading: false,
    connection: true
}

export const recipeCategorySlice = createSlice({
    name: 'recipeCategory',
    initialState: INITIAL_STATE,
    reducers: {
        setConnection(state, action) {
            state.connection = action.payload
        },
        setIsLoading(state, action){
            state.isLoading = action.payload
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        },
        getCategories(state, action) {
            state.recipes = action.payload
        }
    }
})

export const {
    setIsLoading,
    setErrorMessage,
    setConnection,
    getCategories
} = recipeCategorySlice.actions

export default recipeCategorySlice.reducer