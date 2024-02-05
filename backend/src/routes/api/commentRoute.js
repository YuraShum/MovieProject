import expres from 'express'
import { body } from 'express-validator'
import commentController from '../../controllers/commentController'

import tokenMiddleware from '../../middleware/token'
import requestHandler from '../../handlers/requestHandler'

const createFieldConfig = (fieldName) => {
    return body(`${fieldName}`)
        .exists()
        .withMessage(`${fieldName} is required`)
}
const router = expres.Router({ mergeParams: true })


router.get(
    '/',
    tokenMiddleware.userAuthChecks,
    commentController.getCommentOfUser
)
router.delete(
    '/:id',
    tokenMiddleware.userAuthChecks,
    commentController.removeComment
)
router.post(
    '/',
    tokenMiddleware.userAuthChecks,
    createFieldConfig('id')
        .isLength({ min: 1 })
        .withMessage("Id con not be empty"),
    createFieldConfig('content')
        .isLength({ min: 5 })
        .withMessage("content con not be empty"),
    createFieldConfig("type")
        .custom(type => ["movie", "tv"].includes(type))
        .withMessage("Type invalid"),
    createFieldConfig("title"),
    createFieldConfig("poster"),
    requestHandler.validate,
    commentController.createComment
)

export default router
