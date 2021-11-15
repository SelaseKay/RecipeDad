import axios from "axios"
import { RECIPE_DETAIL_URL, RECIPE_URL } from "../../config/url"
import { getRecipeDetail, getSearchedRecipes, setConnection, setErrorMessage, setIsLoading } from "../reducer/recipeSearchSlice"

export default recipeSearchMiddleware = storeApi => next => action => {

    console.log("recipe search middleware")
    if (action.type === "recipeSearch/getSearchedRecipes") {
        axios.get(`${RECIPE_URL}q=${action.payload}&page=1`, { timeout: 9000 })
            .then(function (response) {
                next(setConnection(true))
                next(getSearchedRecipes(response.data))
                next(setIsLoading(false))
            })
            .catch(function (error) {
                if(error.message === "Network Error")
                    next(setConnection(false))
                next(setErrorMessage
                    (error.message))
                console.log("error", error.message)
            })
        next(setIsLoading(true))
        return
    }

    if (action.type === "recipeSearch/getRecipeDetail") {
        axios.get(`${RECIPE_DETAIL_URL}${action.payload}`)
            .then(function(response){
                next(getRecipeDetail(response.data.recipe))
            })
            .catch(function(error){
                console.log("error", error.message)
            })
    }
    return next(action)

}