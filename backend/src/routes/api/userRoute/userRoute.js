import express from "express"
import { body } from "express-validator"
import userPostRouteConfig from "./userPostConfig"
import tokenMiddleware from '../../../middleware/token'
import requestHandler from '../../../handlers/requestHandler'
import userController from '../../../controllers/userController'
import favoriteController from '../../../controllers/favoriteController'
import userPutRouteConfig from "./userPutConfig"

const router = express.Router()
// signup, signin, favorites
for (const [path, config] of Object.entries(userPostRouteConfig)) {
    router.post(`/${path}`, ...config);
}
for (const [path, config] of Object.entries(userPutRouteConfig)) {
    router.put(`/${path}`, ...config);
}
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

