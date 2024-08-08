import React from 'react';
import CalendarMinsBlock from '../components/CalendarMinsBlock';
import CalendarCell from '../components/CalendarCell';

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
    const hours = Array.from({length: 17}, (_, i) => i + 6);

    return (
        <div classeName="calendar-week">
            <div classNamed="calendar-header">
                <div className="calendar-hour-label"></div>
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
                        {days.map((day, dayIndex) => {
                            const minutesBase = 360 + (hour - 6) * 60;
                            return (
                                <div key={dayIndex} className="calendar-day-column">
                                    {[...Array(4)].map((_, i) => (
                                        <CalendarMinsBlock
                                            key={i}
                                            minutes={minutesBase + i * 15}
                                            onClick={() => console.log('Schedule Class')}
                                        />
                                    ))}
                                    <CalendarCell classes={classes} day={day} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWeek;