import expres from 'express'
import { body } from 'express-validator'
import commentController from '../../controllers/commentController'

import tokenMiddleware from '../../middleware/token'
import requestHandler from '../../handlers/requestHandler'

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
    body("id")
        .exists()
        .withMessage("Id is required")
        .isLength({ min: 1 })
        .withMessage("Id con not be empty"),
    body("content")
        .exists()
        .withMessage("content is required")
        .isLength({ min: 3 })
        .withMessage("content con not be empty"),
    body("type")
        .exists()
        .withMessage("Type is required")
        .custom(type => ["movie", "tv"].includes(type))
        .withMessage("Type invalid"),
    body("title")
        .exists()
        .withMessage('Title is required'),
    body("poster")
        .exists()
        .withMessage('Poster is required'),
    requestHandler.validate,
    commentController.createComment

)


export default router
