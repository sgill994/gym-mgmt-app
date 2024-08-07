import React from 'react';
import '../assets/styles/CalendarDay.css';

const CalendarDay = ({classes, day}) => {
    const currentDay = new Date(day);
    const formattedDate = currentDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    const dayOfWeek = currentDay.toLocaleDateString('en-US', {weekday: 'long'});
    const filteredClasses = classes.filter(c => c[dayOfWeek]);

    return (
        <div className="calendar-day">
            <div className="calendar-day-header">{formattedDate}</div>
            <div className="calendar-day-classes">
                {filteredClasses.length > 0 ? (
                    filteredClasses.map((c, index) => (
                        <div key={index} className="calendar-class" style={{ backgroundColor: c.calendarColor }}>
                            <div className="class-time">{c.startTime} - {c.endTime}</div>
                            <div className="class-title">{c.title}</div>
                            <div className="class-instructor">{c.instructor}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-classes"></div>
                )}
            </div>
        </div>
    );
};

export default CalendarDay;
