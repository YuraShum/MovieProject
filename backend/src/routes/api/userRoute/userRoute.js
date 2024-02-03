import express from "express"
import { body } from "express-validator"
import userPostRouteConfig from "./userPostConfig"
import tokenMiddleware from '../../../middleware/token'
import requestHandler from '../../../handlers/requestHandler'
import userController from '../../../controllers/userController'
import favoriteController from '../../../controllers/favoriteController'

const router = express.Router()

// signup, signin, favorites
for (const [path, config] of Object.entries(userPostRouteConfig)) {
    router.post(`/${path}`, ...config);
}

//!! можливо також винести в файл config
router.put(
    "/update-password",
    tokenMiddleware.userAuthChecks,
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage("password minimum 8 characters"),
    body('newPassword')
        .exists()
        .withMessage('newPassword is required')
        .isLength({ min: 8 })
        .withMessage("newPassword minimum 8 characters"),
    body('confirmNewPassword')
        .exists()
        .withMessage('confirmNewPassword is required')
        .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters").
        custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error('confirmNewPassword not match')
            return true
        }),
    requestHandler.validate,
    userController.passwordUpdate

)

router.get(
    '/info',
    tokenMiddleware.userAuthChecks,
    userController.getUserInformation
)
router.get(
    "/favorites",
    tokenMiddleware.userAuthChecks,
    favoriteController.getFavorutesOfUser
)

router.delete(
    "/favorites/:id",
    tokenMiddleware.userAuthChecks,
    favoriteController.removeFromFavorite
);

export default router

