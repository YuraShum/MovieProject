import { body } from "express-validator"
import tokenMiddleware from '../../../middleware/token.js'
import requestHandler from '../../../handlers/requestHandler.js'
import userController from '../../../controllers/userController.js'
const createFieldConfig = (fieldName) => {
    return body(fieldName)
        .exists()
        .withMessage(`${fieldName} is required`)
        .isLength({ min: 8 })
        .withMessage(`${fieldName}  minimum 8 characters`)
}

const userPutRouteConfig = {
    'update-password': [
        tokenMiddleware.userAuthChecks,
        createFieldConfig('password'),
        createFieldConfig('newPassword'),
        createFieldConfig('confirmNewPassword')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) throw new Error('confirmNewPassword not match')
                return true
            }),
        requestHandler.validate,
        userController.passwordUpdate
    ]
}

export default userPutRouteConfig