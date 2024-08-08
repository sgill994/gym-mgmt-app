import React, {useState, useEffect} from 'react';
import CalendarDay from '../components/CalendarDay'
import CalendarWeek from '../components/CalendarWeek';
import CalendarMonth from '../components/CalendarMonth';
import { DayPilotCalendar} from '@daypilot/daypilot-lite-react';

const CalendarSchedule = ({viewType, classes, selectedDate, setSelectedDate}) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const transformedEvents = classes.map((cls) => {
            const currentDateStart = new Date(selectedDate);
            currentDateStart.setHours(cls.startHour24, cls.startMin, 0);
            console.log(currentDateStart);
            const currentDateEnd = new Date(selectedDate);
            currentDateEnd.setHours(cls.endHour24, cls.endMin, 0);
            console.log(currentDateEnd);
            return {
                id: cls.courseID,
                text: cls.title,
                start: new Date(currentDateStart),
                end: new Date (currentDateEnd),
                backColor: cls.calendarColor
            };
        });
        console.log(transformedEvents);
        setEvents(transformedEvents);
    }, [classes, selectedDate]);

    return (
        <div className="calendar-schedule">
            <DayPilotCalendar
                startDate={selectedDate}
                viewType={viewType}
                events={events}
            />
        </div>
    );
};

export default CalendarSchedule;