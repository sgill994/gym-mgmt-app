import React from 'react';
import '../assets/styles/CalendarCell.css';

const CalendarCell = ({classes, day}) => {
    const dayOfWeek = day.toLocaleDateString('en-US', {weekday: 'long'});
    const filteredClasses = classes.filter(c => c[dayOfWeek]);

    return (
        <div className="calendar-cell">
            {filteredClasses.map((c, index) => {
                const startHour = parseInt(c.startHour, 10);
                const startMin = parseInt(c.startMin, 10);
                const startQuarter = Math.floor(startMin / 15);
                const durationCells = c.timeCells;

                const top = (startQuarter * 25) + '%';
                const height = (durationCells * 25) + '%';

                return (
                    <div 
                        key={index}
                        className="calendar-class"
                        style={{
                            top,
                            height,
                            backgroundColor: c.calendarColor,
                        }}
                    >
                        <div className="class-title">{c.title}</div>
                        <div className="class-instructor">{c.instructor}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default CalendarCell;