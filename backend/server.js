import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cors from "cors"
import cookieParser from "cookie-parser"
import http from 'http'

// express app
const app = express()

// так як сервер та кієнт будуть спілкуватись між собою,
// варто уникати CORS обмежень
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser)


const server = http.createServer(app)

// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database')
        server.listen(process.env.PORT || 5000, () => {
            console.log('listening for requests on port:', process.env.PORT || 5000)
        })
    })
    .catch((error) => {
        console.log({ error })
        process.exit(1)
    })