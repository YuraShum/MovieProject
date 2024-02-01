import mongoose from "mongoose";
import modelOptions from "./optionsModel";
const Schema = mongoose.Schema

const reviewShema = new Schema({
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

const reviewModel = mongoose.model('Review', reviewShema)

export default reviewModel