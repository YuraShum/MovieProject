import express from 'express'
import contentController from '../../controllers/contentController.js'

const router = express.Router({ mergeParams: true })

router.get('/search', contentController.search)
router.get('/genres', contentController.getContentGenres)
router.get('/detail/:id', contentController.getContentDetail)
router.get('/:category', contentController.getContentList)

export default router