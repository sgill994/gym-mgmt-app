import React from 'react';
import ListScheduleDay from '../components/ListScheduleDay';

const ListSchedule = ({view, classes, selectedDate}) => {
    const updateDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        return newDate;
    }

    return (
        <div>
            {view === 'day-schedule' && (
                <ListScheduleDay classes={classes} selectedDate={selectedDate} />
            )}
            {view === 'week-schedule' && (
                <>
                <ListScheduleDay classes={classes} selectedDate={selectedDate} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(1)} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(2)} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(3)} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(4)} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(5)} />
                <ListScheduleDay classes={classes} selectedDate={updateDate(6)} />
                </>
            )} 
        </div>
    );
};

export default ListSchedule;


