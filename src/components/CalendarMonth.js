import React from 'react';
import CalendarDay from '../components/CalendarDay';

const CalendarMonth = ({classes, selectedDate}) => {
    // Returns array of Date objects for month of 'selectedDate' when view it set to month schedule
    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];
        for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i)) 
        }
        return days;
    }

    const days = getMonthDays(selectedDate);

    return(
        <div className="calendar-month">
            {days.map((day, index) => (
                <CalendarDay classes={classes} day={day} />
            ))}
        </div>
    );
};

export default CalendarMonth;