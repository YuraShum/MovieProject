// Опції моделі для конфігурації поведінки моделі
// при конвертації в JSON об'єкт
const modelOptions = {
    toJSON: {
        virtuals: true,
        // Функція, яка викликається для трансформації 
        // об'єкта перед конвертацією в JSON або об'єкт JavaScript.
        tansform: (_, object) => {
            // видаляємо поле ідентифікатора із об'єкта
            delete object._id
            return object
        }
    },
    toObject: {
        virtuals: true,
        tansform: (_, object) => {
            delete object._id 
            return object
        }
    },
    versionKey: false, // Відключити поле для зберігання версії
    timestamps: true   // Додавати поля created_at та updated_at
}

export default modelOptions