import mongoose from "mongoose";
import modelOptions from "./optionsModel.js";

const Schema = mongoose.Schema

const favoriteShema = new Schema({
    // атрибут, який вказує на користувача 
    // що додав об'єкт до обраного
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Посилання на модель User
        required: true
    },
    // Тип медіа (фільм чи серіал)
    type: {
        type: String,
        enum: ["tv", "movie"],// Допустимі значення: "tv" або "movie"
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
    },
    // Рейтинг
    rate: {
        type: Number,
        required: true
    }

}, modelOptions)


const favoriteModel = mongoose.model('Favorite', favoriteShema)

export default favoriteModel