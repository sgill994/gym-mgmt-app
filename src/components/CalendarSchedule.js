import React, {useState} from 'react';
import CalendarDay from '../components/CalendarDay'
import CalendarWeek from '../components/CalendarWeek';
import CalendarMonth from '../components/CalendarMonth';
import '../assets/styles/CalendarSchedule.css';

const CalendarSchedule = ({view, classes, selectedDate}) => {
    return (
        <div className="calendar-schedule">
            {view === 'day-schedule' && <CalendarDay classes={classes} day={selectedDate} />}
            {view === 'week-schedule' && <CalendarWeek classes={classes} selectedDate={selectedDate} />}
            {view === 'month-schedule' && <CalendarMonth classes={classes} selectedDate={selectedDate} />}
        </div>
    );
};

export default CalendarSchedule;