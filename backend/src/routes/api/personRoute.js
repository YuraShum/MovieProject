import express from 'express'
import personController from '../../controllers/personController'

const router = express.Router({ mergeParams: true })

router.get('/:id/medias', personController.personMedias)
router.get('/:id', personController.personDetail)

export default router