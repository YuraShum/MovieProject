import mongoose from "mongoose";
import modelOptions from "./optionsModel.js";
const Schema = mongoose.Schema

const commentShema = new Schema({
    // Атрибут, що вказує на користувача, який залишив огляд
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Посилання на модель User
        required: true
    },
    // Вміст огляду
    content: {
        type: String,
        required: true
    },
    // Тип медіа (фільм чи серіал)
    type: {
        type: String,
        enum: ["tv", "movie"],
        required: true
    },
    // Ідентифікатор конкретного медіа
    id: {
        type: String,
        required: true
    },
    // Назва
    title: {
        type: String,
        required: true
    },
    // Посилання на постер
    poster: {
        type: String,
        required: true
    }

}, modelOptions)

const commentsModel = mongoose.model('Comment', commentShema)

export default commentsModel