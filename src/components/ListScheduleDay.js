import React from 'react';

const ListScheduleDay = ({classes, selectedDate}) => {
    const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const filteredClasses = classes.filter(c => c[dayOfWeek]);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>{formattedDate}</th>
                        <th>Class</th>
                        <th>Duration</th>
                        <th>Instructor</th>
                        <th>Capacity</th>
                        <th>Clients</th>
                        <th>Wait List</th>
                        <th> </th>
                        <th></th>
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
                            <td colSpan="4">No classes scheduled for this day.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListScheduleDay;


