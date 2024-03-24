import responseHandlers from "../handlers/responseHandlers.js"
import movieDBApi from "../theMovieDatabase/api.js"
import token from '../middleware/token.js'
import userModel from "../models/userModel.js"
import commentsModel from "../models/commentModel.js"
const contentController = {
    // функція отримує список медіапроектів (фільми або телешоу)
    // на основі типу та категорії, а також номеру сторінки
    getContentList: async (request, response) => {
        try {
            // console.log('RR', request.query, request.params)
            // отримання сторінки із запиту
            const { page } = request.query
            // отримання значень із параметрів запиту 
            const { content, category } = request.params
            // отримання списку медіа проектів за допомоги описаної movieDBApi
            const result = await movieDBApi.list({ type: content, category, page })
            // console.log('Result', result)
            if (result) {
                return responseHandlers.ok(response, result)
            }
        } catch {
            responseHandlers.error(response)
        }
    },
    getContentGenres: async (request, response) => {
        try {
            const { content } = request.params
            const result = await movieDBApi.genres({ type: content })
            if (result) {
                responseHandlers.ok(response, result)
            }
        } catch {
            responseHandlers.error(response)
        }
    },
    getContentDetail: async (request, response) => {
        try {
            const { content, id } = request.params
            // console.log('params', request.params)
            const contents = await movieDBApi.detail({ type: content, id })
            // console.log(contents)
            
            // виконуємо наповнення даних content
            const informationAboutActor = await movieDBApi.informationAboutActors({ type: content, id })
            contents.credits = informationAboutActor
            // console.log(contents)

            const videos = await movieDBApi.videos({  type: content, id })
            contents.videos = videos

            const recommend = await movieDBApi.recommend({  type: content, id })
            contents.recommend = recommend

            const images = await movieDBApi.images({  type: content, id })
            contents.images = images
            

            const tokenDecryptioned = token.tokenDecryption(request)
            if (tokenDecryptioned) {
                // отримання користувача якщо є токен 
                const user = await userModel.findById(tokenDecryptioned.data)

                if (user) {
                    // перевірка чи є в користувача олюблені  тайтли
                    const isFavorite = await favoriteModel.findOne({ user: user.id, id })
                    contents.isFavorite = isFavorite !== null
                }
            }
            const comments = await commentsModel.find({ id })
                .populate('user')
                .sort("-createdAt")

            contents.comments = comments
            // console.log(contents)
            responseHandlers.ok(response, contents)

        } catch {
            responseHandlers.error(response)
        }
    },
    search: async (request, response) => {
        try {
            console.log("Params", request.params)
            console.log('Query', request.query)
            const { content } = request.params
            const { query, page } = request.query

            // Список знайдених медіа проектів
            const result = await movieDBApi.search({
                query,
                page,
                type: content === "people" ? "person" : content
            })

            responseHandlers.ok(response, result)

        } catch {
            responseHandlers.error(response)
        }
    }
}

export default contentController