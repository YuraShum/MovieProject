import { Typography } from '@mui/material';
import './CustomTitle.css'

const CustomTitle = ({ title }) => {

  const charStyle = {
    color: 'rimary.text',
    fontSize: '2rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    animation: 'animate 1s ease-in-out infinite',
  };

  return (
    <Typography
      className="word-container"
      sx={{
        textAlign: 'center',
        position: 'relative',
        WebkitBoxReflect: 'below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.1))',
      }}
    >
      {title.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            animation: 'charAnimate 1s ease-in-out infinite',
            animationDelay: `calc(0.05s * ${index + 1})`,
          }}
        >
          {char === ' ' ? '\u00A0' : (
            <span
              className="char"
              aria-hidden="true"
              style={{
                ...charStyle,
              }}
            >
              {char}
            </span>
          )}
        </span>
      ))}
    </Typography>
  );
};

export default CustomTitle