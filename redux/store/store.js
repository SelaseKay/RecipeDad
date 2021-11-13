import { configureStore } from "@reduxjs/toolkit";
import recipeCategoryMiddleware from "../middleware/recipeCategoryMiddleware";
import recipeSearchMiddleware from "../middleware/recipeSearchMiddleware";
import recipeCategoryReducer from "../reducer/recipeCategorySlice";
import recipeSearchReducer from "../reducer/recipeSearchSlice";

const store = configureStore({
    reducer: {
        recipeCategory: recipeCategoryReducer,
        recipeSearch: recipeSearchReducer
    },
    middleware: [recipeCategoryMiddleware, recipeSearchMiddleware]
})

export default store