import express from "express"
import userPostRouteConfig from "./userPostConfig.js"
import tokenMiddleware from '../../../middleware/token.js'
import requestHandler from '../../../handlers/requestHandler.js'
import userController from '../../../controllers/userController.js'
import favoriteController from '../../../controllers/favoriteController.js'
import userPutRouteConfig from "./userPutConfig.js"

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

