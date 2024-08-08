import React from 'react';

const CalendarHour = ({hour, day, classes}) => {
    const dayOfWeek = day.toLocaleDateString('en-US', {weekday: 'long'});
    const filteredClasses = classes.filter(c => c[dayOfWeek]).sort((a, b) => a.durationMins - b.durationMins);
    
    const renderClasses = () => {
        return filteredClasses.map((c, index) => {
            const isWithinHour = (c.startHour === hour && c.startMin >= 0 || c.endHour === hour && c.endMin <= 59);

            if (isWithinHour) {
                const top = (c.startMin / 60) * 100;
                const height = ((c.endMin - c.startMin) / 60) * 100;

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