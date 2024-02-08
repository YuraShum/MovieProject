import userModel from "../models/userModel.js";
import responseHandlers from "../handlers/responseHandlers.js";
import jsonwebtoken from 'jsonwebtoken'


const generateToken = (userId) => {
    return jsonwebtoken.sign(
        { data: userId },
        process.env.TOKEN_SECRET,
        { expiresIn: '12h' }
    )
}

const userAuthService = {
    userSignUp: async (request, response) => {
        try {
            const { userName, password, displayName } = request.body
            console.log(request)
            const checkUser = await userModel.findOne({ userName })
            // перевіряє, чи існує користувач із вказаним ім'ям користувача, 
            // і якщо так, повертає відповідь з помилкою
            if (checkUser) {
                return responseHandlers.badRequest(response, 'Unfortunately, the username is already taken')
            }
            // якщо користувача немає створюється новий
            const user = new userModel()

            // приствоєнна значень новому користувачу
            user.userName = userName
            user.displayName = displayName


            user.setPassword(password)
            // зберігаємо юзера в базі даних
            await user.save()

            // створюється JWT-токен для автентифікації
            const generatedToken = generateToken(user.id)

            responseHandlers.created(
                response,
                {
                    generatedToken,
                    ...user._doc,
                    id: user.id
                })
        } catch {
            responseHandlers.error(response)
        }

    },
    userSignIn: async (request, response) => {
        try {
            const { userName, password } = request.body

            const user = await userModel.findOne({ userName })
                .select('userName id displayName password salt')

            // виконується первірка чи існує користувач із 
            // вказаним ім'ям користувача, та чи вірний пароль
            if (!user) {
                return responseHandlers
                    .badRequest(response, `The user with the specified name ${userName} does not exist`)
            }
            console.log(user)
            if (!user.validPassword(password)) {
                return responseHandlers.badRequest(response, "The user's password is incorrect")
            }

            const generatedToken = generateToken(user.id)
            // позбавляємось чутливих данних
            user.password = undefined
            user.salt = undefined

            responseHandlers.created(
                response,
                {
                    generatedToken,
                    ...user._doc,
                    id: user.id
                })
        } catch {
            responseHandlers.error(response)
        }

    },
    getUserInformation: async (request, response) => {
        try {
            // пошук користувача за переданим ідентифікатором в запиті
            const user = await userModel.findById(request.user.id)

            if (!user) {
                return responseHandlers.notFound(response)
            }
            // якщо користувач існує повертаємо 200 статус та користувача
            responseHandlers.ok(response, user)
        } catch {
            responseHandlers.error(response)
        }
    },
    passwordUpdate: async (request, response) => {
        try {
            const { password, newPassword } = request.body

            const user = await userModel.findById(request.user.id)
                .select('id password salt')


            //  виконується перевірка чи поточний пароль 
            // вказано вірно, і якщо так, оновлює його на новий
            if (!user) {
                return responseHandlers.unauthorize(response)
            }
            if (!user.validPassword(password)) {
                return responseHandlers.badRequest(response, "The user's password is incorrect")
            }

            user.setPassword(newPassword)
            // збереження змін в базі даних
            await user.save()
            responseHandlers.ok(response)

        } catch {
            responseHandlers.error(response)
        }
    }

}

export default userAuthService