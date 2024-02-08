import express from 'express'
import personRoute from './api/personRoute.js'
import contentRoute from './api/contentRoute.js'
import commentRoute from "./api/commentRoute.js"
import userRoute from './api/userRoute/userRoute.js'

const router = express.Router()

router.use('/person', personRoute)
router.use('/:content', contentRoute)
router.use('/comments', commentRoute)
router.use('/user', userRoute)


export default router