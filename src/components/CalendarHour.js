import React from 'react';

const CalendarHour = ({hour, day, classes}) => {
    const dayOfWeek = day.toLocaleDateString('en-US', {weekday: 'long'});
    const filteredClasses = classes.filter(c => c[dayOfWeek]).sort((a, b) => {
        const aTime = a.startTimeObject.getHours() * 60 + a.startTimeObject.getMinutes();
        const bTime = b.startTimeObject.getHours() * 60 + b.startTimeObject.getMinutes();
        return aTime - bTime;
    });
    
    const renderClasses = () => {
        return filteredClasses.map((c, index) => {
            const startHour = c.startTimeObject.getHours();
            const startMin = c.startTimeObject.getMinutes();
            const endHour = c.endTimeObject.getHours();
            const endMin = c.endTimeObject.getMinutes();
            const isWithinHour = (startHour === hour && startMin >= 0 || endHour === hour && endMin <= 59);

            if (isWithinHour) {
                const top = (startMin / 60) * 100;
                const height = ((endMin - startMin) / 60) * 100;

                return(
                    <div
                        key={index}
                        className="calendar-class"
                        style={{
                            top: `${top}`,
                            height: `${height}`,
                            backgroundColor: c.calendarColor,
                        }}
                    >
                        <div className="class-title">{c.title}</div>
                        <div className="class-instructor">{c.instructor}</div>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="calender-hour">
            {renderClasses()}
        </div>
    );
};

export default CalendarHour;