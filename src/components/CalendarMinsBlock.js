import React, {useState} from 'react';

const CalenderMinsBlock = ({minutes, onClick}) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div 
            className={`calendar-mins-block ${hovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {hovered && <button className="schedule-class-btn">Schedule Class</button>}
        </div>
    );
};

export default CalenderMinsBlock;