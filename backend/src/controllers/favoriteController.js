import responseHandlers from "../handlers/responseHandlers.js"
import favoriteModel from "../models/favoriteModel.js"


const favoriteController = {
    addToFavorite: async (request, response) => {
        try {
            // перевіряємо, чи вже існує улюблений елемент
            // для заданого користувача та медіа-ідентифікатора
            const isFavoirite = await favoriteModel.findOne({
                user: request.user.id,
                id: request.body.id
            })
            // якщо елемент вже існує, повертається відповідь зі статус-кодом 200
            if (isFavoirite) {
                return responseHandlers.ok(response, isFavoirite)
            }
            // Якщо такий елемент відсутній, створюється новий 
            // елемент за допомогою моделі favoriteModel, і 
            // його інформація зберігається у базі даних
            const favorite = new favoriteModel({
                ...request.body,
                user: request.user.id
            })

            await favorite.save()
            //  відправляється відповідь зі статус-кодом 201 
            // та інформацією про новий улюблений елемент
            responseHandlers.created(response, favorite)
        } catch {
            // У разі помилки відправляється відповідь зі статус-кодом 500
            responseHandlers.error(response)
        }
    },
    removeFromFavorite: async (request, response) => {
        try {
            // отримання ідентифікатора, який переданий в запиті
            const { favoriteId } = request.params
            console.log("favorite id:", favoriteId)

            // пошук даного елемента
            const favorite = await favoriteModel.findOne({
                user: request.user.id,
                _id: favoriteId
            })
            console.log(favorite)

            // Якщо такого елемента не знайдено, повертається 
            // відповідь зі статус-кодом 404
            if (!favorite) {
                return responseHandlers.notFound(response)
            }
            // елемент знайдено, він видаляється
            await favorite.deleteOne()

            responseHandlers.ok(response)
        } catch {
            responseHandlers.error(response)
        }
    },
    getFavorutesOfUser: async (request, response) => {
        try {
            // Список елементів відсортований за датою створення в порядку спадання
            const favorite = await favoriteModel.find({
                user: request.user.id
            }).sort("-createdAt")
    
    
            // повертаємо 200 код та список олюблених
            responseHandlers.ok(response, favorite)
        } catch {
            responseHandlers.error(response)
        }
    }
}

export default favoriteController