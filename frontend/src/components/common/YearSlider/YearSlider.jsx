import { Slider, Typography } from "@mui/material";
import { useState } from "react";


const YearSlider = ({ onChange }) => {
    const [years, setYears] = useState([1900, new Date().getFullYear()]);
    
    const handleChange = (event, newValue) => {
        // Перевірка, чи newValue є масивом
        if (Array.isArray(newValue)) {
            setYears(newValue);
            if (onChange) {
                onChange(newValue);
            }
        }
    };
    
    return (
        <div style={{ maxWidth: 300, width: '100%' }}>
            <Typography id="year-slider" gutterBottom>
                Year: {years[0]} - {years[1]}
            </Typography>
            <Slider
                getAriaLabel={() => 'Рівень'}
                value={years}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1900}
                max={new Date().getFullYear()}
            />
        </div>
    );
};

export default YearSlider;