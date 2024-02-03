import express from 'express'
import personRoute from './api/personRoute'
import contentRoute from './api/contentRoute'
import commentRoute from "./api/commentRoute"
import userRoute from './api/userRoute/userRoute'

const router = express.Router()

router.use('/person', personRoute)
router.use('/:content', contentRoute)
router.use('/comment', commentRoute)
router.use('/user', userRoute)


export default router