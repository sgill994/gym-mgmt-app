import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarSchedule = ({ viewType, classes, selectedDate }) => {
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(viewType);
        calendarApi.gotoDate(selectedDate);
    }, [viewType, selectedDate]);

    const padZero = (num) => {
        return num.toString().padStart(2, '0');
    };

    const formatDateString = (date) => {
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1); // Months are zero-based
        const day = padZero(date.getDate());
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        const seconds = padZero(date.getSeconds());
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
    
    const transformEvents = () => {
        let transformedEvents = [];

        classes.forEach(cls => {
            const daysInWeek = [cls.Sunday, cls.Monday, cls.Tuesday, cls.Wednesday, cls.Thursday, cls.Friday, cls.Saturday];
            const dayOfWeek = selectedDate.getDay();

            if (viewType === 'timeGridDay') {
                // Only create an event for the specific day if the boolean for that day is true
                if (daysInWeek[dayOfWeek]) {
                    const currentDateStart = new Date(selectedDate);
                    currentDateStart.setHours(cls.startHour24, cls.startMin, 0, 0);

                    const currentDateEnd = new Date(selectedDate);
                    currentDateEnd.setHours(cls.endHour24, cls.endMin, 0, 0);

                    transformedEvents.push({
                        id: cls.courseID,
                        title: cls.title,
                        start: formatDateString(currentDateStart),
                        end: formatDateString(currentDateEnd),
                        backgroundColor: cls.calendarColor,
                        borderColor: cls.calendarColor,
                    });
                }
            } else if (viewType === 'timeGridWeek' || viewType === 'dayGridMonth') {
                // For each day in the week/month, check if the event should be added based on the boolean
                const daysInView = viewType === 'timeGridWeek' ? 7 : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                const startDay = viewType === 'timeGridWeek' ? selectedDate.getDay() : 1;  // Start with the correct day of the week

                for (let i = 0; i < daysInView; i++) {
                    const currentDate = new Date(selectedDate);
                    currentDate.setDate(viewType === 'timeGridWeek' ? selectedDate.getDate() + i : i + 1);
                    const currentDayOfWeek = currentDate.getDay();

                    if (daysInWeek[currentDayOfWeek]) {
                        const currentDateStart = new Date(currentDate);
                        currentDateStart.setHours(cls.startHour24, cls.startMin, 0, 0);

                        const currentDateEnd = new Date(currentDateStart);
                        currentDateEnd.setHours(cls.endHour24, cls.endMin, 0, 0);

                        transformedEvents.push({
                            id: `${cls.courseID}-${i}`, // Unique ID for each instance
                            title: cls.title,
                            start: formatDateString(currentDateStart),
                            end: formatDateString(currentDateEnd),
                            backgroundColor: cls.calendarColor,
                            borderColor: cls.calendarColor,
                        });
                    }
                }
            }
        });

        return transformedEvents;
    };

    return (
        <div className="calendar-schedule">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={viewType}
                initialDate={selectedDate}
                events={transformEvents()}
                headerToolbar={false}
                slotDuration="00:15:00" 
                allDaySlot={false}
            />
        </div>
    );
};

export default CalendarSchedule;
