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
            const { content , category } = request.params
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
            const { type, id } = request.params
            console.log(`Type: ${type}, id: ${id}`)
            const content = await movieDBApi.detail({ type, id })
            
            // виконуємо наповнення даних content
            const informationAboutActor = await movieDBApi.informationAboutActors({ type, id })
            content.credits = informationAboutActor

            const videos = await movieDBApi.videos({ type, id })
            content.videos = videos

            const recommend = await movieDBApi.recommend({ type, id })
            content.recommend = recommend

            const images = await movieDBApi.images({ type, id })
            content.images = images


            const tokenDecryptioned = token.tokenDecryption(request)
            if (tokenDecryptioned) {
                // отримання користувача якщо є токен 
                const user = await userModel.findById(tokenDecryptioned.data)

                if (user) {
                    // перевірка чи є в користувача олюблені  тайтли
                    const isFavorite = await favoriteModel.findOne({ user: user.id, id })
                    media.isFavorite = isFavorite !== null
                }
            }
            const comments = await commentsModel.find({ media })
                .populate('user')
                .sort("-createdAt")
            content.comments = comments

            responseHandlers.ok(response, content)

        } catch {
            console.log(e)
            responseHandlers.error(response)
        }
    },
    search: async (request, response) => {
        try {
            const { type } = request.params
            const { query, page } = request.query

            // Список знайдених медіа проектів
            const result = await tmdbApi.mediaSearch({
                query,
                page,
                type: type === "people" ? "person" : type
            })

            responseHandlers.ok(response, result)

        } catch {
            responseHandlers.error(response)
        }
    }
}

export default contentController