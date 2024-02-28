import mongoose from "mongoose";
import modelOptions from "./optionsModel.js";
import crypto from 'crypto'

const Schema = mongoose.Schema
// Створення схеми користувача
const userShema = new Schema({
    // Унікальне ім'я користувача
    userName: {
        type: String,
        required: true,
        unique: true
    },
    // Відображуване ім'я користувача
    displayName: {
        type: String,
        required: true,
    },
    // Захешований пароль користувача
    password: {
        type: String,
        required: true,
        select: false

    },
    // хешування паролю
    salt: {
        type: String,
        required: true,
        select: false

    },

}, modelOptions)

userShema.methods.setPassword = function (password) {
    // Генерування випадкового рядка
    console.log(password)
    this.salt = crypto.randomBytes(16).toString("hex")
    console.log("Salt", this.salt)
    // Хешування паролю https://www.geeksforgeeks.org/node-js-crypto-pbkdf2sync-method/
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")
}

userShema.methods.validPassword = function (password) {
    // Хешування введеного парол
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")

    // console.log(password, hash)
    // console.log(this.password === hash)
    // Порівняння хеша введеного паролю з збереженим хешем
    return this.password === hash
}


const userModel = mongoose.model('User', userShema)
export default userModel