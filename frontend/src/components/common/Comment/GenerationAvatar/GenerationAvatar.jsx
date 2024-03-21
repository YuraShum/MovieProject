import { Avatar } from '@mui/material';
import stringHash from 'string-hash'; // Підключаємо бібліотеку для генерації хешу

const GenerationAvatar = ({ name }) => {
    // Функція для генерації колірного хешу на основі тексту
    const generateColor = (text) => {
        const hash = stringHash(text); // Генеруємо хеш тексту
        // Розраховуємо значення червоного, зеленого та синього кольорів на основі хешу
        const red = (hash & 0xFF0000) >> 16;
        const green = (hash & 0x00FF00) >> 8;
        const blue = hash & 0x0000FF;
        // Повертаємо RGB колір у вигляді рядка
        return `rgb(${red}, ${green}, ${blue})`;
    };

    const initials = name
        .split(" ")
        .map(word => word[0].toUpperCase())
        .join("");

    const avatarColor = generateColor(name); // Генеруємо колір на основі тексту

    return (
        <Avatar
            sx={{
                backgroundColor: avatarColor,
                width: '50px',
                height: '50px'
            }}
        >
            {initials}
        </Avatar>
    );
};

export default GenerationAvatar;