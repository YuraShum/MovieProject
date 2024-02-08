import { body } from 'express-validator'
import requestHandler from '../../../handlers/requestHandler.js'
import tokenMiddleware from '../../../middleware/token.js'
import userController from '../../../controllers/userController.js'
import favoriteController from '../../../controllers/favoriteController.js'
const createFieldConfig = (fieldName) => {
    const favoritesPost = ['type', 'id', 'title', 'poster', 'rate'].includes(fieldName)
    return favoritesPost ?
        body(fieldName)
            .exists()
            .withMessage(`${fieldName} is required`)
        :
        body(fieldName)
            .exists()
            .withMessage(`${fieldName} is required`)
            .isLength({ min: 8 })
            .withMessage(`${fieldName} minimum 8 characters`)
}
const userPostRouteConfig = {
    signup: [
        createFieldConfig('userName')
            .custom(async value => {
                const user = await userModel.findOne({ username: value })
                if (user) {
                    return Promise.reject("userName already used")
                }
            }),
        createFieldConfig('password'),
        createFieldConfig('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) throw new Error('confirmPassword not match')
                return true
            }),
        createFieldConfig('displayName'),
        requestHandler.validate,
        userController.userSignUp,
    ],
    signin: [
        createFieldConfig('userName'),
        createFieldConfig('password'),
        requestHandler.validate,
        userController.userSignIn,
    ],
    favorites: [
        tokenMiddleware.userAuthChecks,
        createFieldConfig('type')
            .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
        createFieldConfig('id')
            .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
        createFieldConfig('title'),
        createFieldConfig('poster'),
        createFieldConfig('rate'),
        requestHandler.validate,
        favoriteController.addToFavorite
    ]

}

export default userPostRouteConfig

