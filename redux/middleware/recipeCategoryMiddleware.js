import axios from "axios"
import { CATEGORY_URL } from "../../config/url"
import { getCategories, setConnection, setErrorMessage, setIsLoading } from "../reducer/recipeCategorySlice"

export default recipeCategoryMiddleware = storeApi => next => action => {

    console.log("recipe category middleware")

    if (action.type === "recipeCategory/getCategories") {
        axios.get(CATEGORY_URL, { timeout: 9000 })
            .then(function (response) {

                next(setConnection(true))

                next(getCategories(response.data))

                next(setIsLoading(false))

            })
            .catch(function (error) {

                if (error.message === "Network Error")
                    next(setConnection(false))

                next(setErrorMessage(error.message))
                console.log("error", error.message)
            })
            next(setIsLoading(true))
        return
    }
    return next(action)
}