import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../assets/styles/Schedule.css';

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

    const classTimeString = (cls) => {
        let timeStr = `${cls.startHour12}:${padZero(cls.startMin)}${cls.startTimeMod} - `;
        timeStr += `${cls.endHour12}:${padZero(cls.endMin)}${cls.endTimeMod}`;
        return timeStr;
    };

    const eventTitle = (cls) => {
        // Only return start time and class name to display on Month calendar view
        if (viewType === 'dayGridMonth') {
            let monthTitle = `&nbsp;${cls.startHour12}:${padZero(cls.startMin)}${cls.startTimeMod} <b>${cls.title}</b>`;
            return monthTitle;
        }
        else {
            let title = `<b>${cls.title}</b><br />${classTimeString(cls)}`;
            title += `<br /><span style="font-size: 75%;">with ${cls.instructor}</span>`;
            if (cls.limitReservations) {
                title += `<br /><span style="font-size: 75%;">${cls.clientsBooked}/${cls.reservationLimit}</span>`;
            }
            return title;
        }
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
                        title: eventTitle(cls),
                        start: formatDateString(currentDateStart),
                        end: formatDateString(currentDateEnd),
                        backgroundColor: cls.calendarColor,
                        borderColor: cls.calendarColor,
                        textColor: 'black',
                    });
                }
            } else if (viewType === 'timeGridWeek' || viewType === 'dayGridMonth') {
                // For each day in the week/month, check if the event should be added based on the boolean
                const daysInView = viewType === 'timeGridWeek' ? 7 : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                // const startDay = viewType === 'timeGridWeek' ? selectedDate.getDay() : 1;  // Start with the correct day of the week

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
                            title: eventTitle(cls),
                            start: formatDateString(currentDateStart),
                            end: formatDateString(currentDateEnd),
                            backgroundColor: cls.calendarColor,
                            borderColor: cls.calendarColor,
                            textColor: 'black',
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
                slotLabelInterval="01:00:00"
                slotDuration="00:15:00"             
                allDaySlot={false}
                nowIndicator={true}
                scrollTime={new Date().toTimeString().slice(0, 5)}
                eventContent={(arg) => (
                    <div 
                        dangerouslySetInnerHTML={{ __html: arg.event.title }}
                        style={{ backgroundColor: arg.event.backgroundColor }} 
                    />
                )}
                eventClassNames="scrollable-event"
            />
        </div>
    );
};

export default CalendarSchedule;
