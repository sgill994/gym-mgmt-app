import React from 'react';
import '../assets/styles/Classes.css'

const ListSchedule = ({viewType, classes, selectedDate}) => {
    // Create new Date objects for Day or Week 
    const getWeekDates = () => {
        if (viewType === 'timeGridWeek') {
            const dates = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(selectedDate);
                day.setDate(selectedDate.getDate() + i);
                dates.push(day);
            }
            return dates;
        }
        // Return only selectedDate if in Day view
        return [new Date(selectedDate)];
    }

    const formatDate = (date) => {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        return (
            <>
                <div>{dayOfWeek}</div>
                <div>{formattedDate}</div>
            </>
        );
    };

    const sortClasses = (filteredClasses) => {
        return filteredClasses.sort((a, b) => {
          // Assuming startTime is a Date object; if not, convert to Date
          return a.startDateTime - b.startDateTime;
        });
      };

    const getDayOfWeek = (date) => date.toLocaleDateString('en-US', { weekday: 'long' });
    const dates = getWeekDates();

    return (
        <div className="classes-page">
            {dates.map((currentDate, index) => {
                const currentDayOfWeek = getDayOfWeek(currentDate);
                let filteredClasses = classes.filter(c => c[currentDayOfWeek]);
                filteredClasses = sortClasses(filteredClasses);
                
                return (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{formatDate(currentDate)}</th>
                                <th>Class</th>
                                <th>Duration</th>
                                <th>Instructor</th>
                                <th>Capacity</th>
                                <th>Clients</th>
                                <th>Wait List</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClasses.length > 0 ? (
                                filteredClasses.map((c, index) => (
                                    <tr key={index}>
                                        <td>{c.startTimeStr} - {c.endTimeStr}</td>
                                        <td>{c.title}</td>
                                        <td>{c.duration}</td>
                                        <td>{c.instructor}</td>
                                        <td>{c.reservationLimit}</td>
                                        <td>{c.clientsBooked}</td>
                                        <td>{c.waitlist}</td>
                                        <td>
                                            <button>...</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No classes scheduled for this day.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                );
            })}
        </div>
    );
};

export default ListSchedule;
