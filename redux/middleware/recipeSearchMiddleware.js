import axios from "axios"
import { RECIPE_URL } from "../../config/url"
import { getSearchedRecipes, setConnection, setErrorMessage, setIsLoading } from "../reducer/recipeSearchSlice"

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
    return next(action)

}