import React from 'react';
import CalendarHour from '../components/CalendarHour';
import '../assets/styles/CalendarWeek.css';
import '../assets/styles/CalendarHour.css';

const CalendarWeek = ({classes, selectedDate}) => {
    // Returns array of Date objects for week of 'selectedDate' when view it set to week schedule
    const getWeekDays = (date) => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const current = new Date(date);
            current.setDate(date.getDate() + i);
            days.push(current);
        }
        return days;
    };

    const days = getWeekDays(selectedDate);
    const hours = Array.from({length: 24}, (_, i) => i);

    return (
        <div classeName="calendar-week">
            <div classNamed="calendar-header">
                {days.map((day, index) => (
                    <div key={index} className="calendar-header-cell">
                        {day.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})}
                    </div>
                ))}
            </div>
            <div className="calendar-body">
                {hours.map(hour => (
                    <div key={hour} className="calendar-row">
                        <div className="calendar-hour-label">{`${hour}:00`}</div>
                        {days.map((day, index) => (
                            <CalendarHour key={index} hour={hour} day={day} classes={classes} />
                        ))}
                        </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWeek;