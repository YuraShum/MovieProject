import responseHandlers from "../handlers/responseHandlers.js"
import commentsModel from "../models/commentModel.js"


const commentController = {
    createComment: async (request, response) => {
        console.log('Create')
        try {
            // отримання ідентифікатору фільму з параметрів запиту 
            
            const { id } = request.params

            // створюється новий об'єкт за допомогою моделі commentModel,
            const comment = new commentsModel({
                user: request.user.id,
                id,
                ...request.body
            })

            // інформація зберігається в базі даних
            await comment.save()

            // ідправляється відповідь зі статус-кодом 201 
            // та інформацією про новий огляд
            responseHandlers.created(response, {
                ...comment._doc,
                id: comment.id,
                user: request.user
            })
        } catch {
            responseHandlers.error(response)
        }
    },
    removeComment: async (requset, response) => {
        try {
            // отримання ідентифікатора із параметрів запиту
            const { id } = requset.params

            // Пошук огляду за допомогою моделі 
            const comment = await commentsModel.findOne({
                _id: id,
                user: requset.user.id
            })

            // Якщо огляд не знайдено, повертається відповідь зі статус-кодом 404
            if (!comment) {
                return responseHandlers.notFound(response)
            }

            // якщо огляд існує він видаляється 
            await comment.deleteOne()

            responseHandlers.ok(response)
        } catch {
            responseHandlers.error(response)
        }
    },
    getCommentOfUser: async (request, response) => {
        try {
            // писок соментарів відсортований за датою 
            // створення в порядку спадіння
            const comment = await commentsModel.find({
                user: request.user.id
            })
                .sort("-createAt")
            // відправка 200 статусі та списку оглядів
            responseHandlers.ok(response, comment)
        } catch {
            responseHandlers.error(response)
        }
    }
}

export default commentController