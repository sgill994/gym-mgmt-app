import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DateNavigator = ({ view, selectedDate, setSelectedDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [weekSelectedDate, setWeekSelectedDate] = useState(new Date(selectedDate));

    useEffect(() => {
        if (view === 'week-schedule') {
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
            setWeekSelectedDate(startOfWeek);
        }
    }, [view]);

    const updateDate = (days) => {
        let newDate;
        if (view === 'week-schedule') {
            newDate = new Date(weekSelectedDate);
            newDate.setDate(weekSelectedDate.getDate() + days);
        }
        else {
            newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() + days);
        }
        return newDate;
    };

    const updateWeek = (weeks) => {
        return updateDate(weeks * 7);
    };

    const updateMonth = (months) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + months);
        return newDate;
    };

    const handleToday = () => {
        setSelectedDate(new Date());
    }

    const handlePrev = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(-1));
        } else if (view === 'week-schedule') {
            setWeekSelectedDate(updateWeek(-1));
        } else if (view === 'month-schedule') {
            setSelectedDate(updateMonth(-1));
        }
    };

    const handleNext = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(1));
        } else if (view === 'week-schedule') {
            setWeekSelectedDate(updateWeek(1));
        } else if (view === 'month-schedule') {
            setSelectedDate(updateMonth(1));
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const formatDate = () => {
        const currentDay = new Date(selectedDate);
        if (view === 'day-schedule') {
            return currentDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        } else if (view === 'week-schedule') {
            const startOfWeek = new Date(weekSelectedDate);
            const endOfWeek = new Date(weekSelectedDate);
            endOfWeek.setDate(weekSelectedDate.getDate() + 6);
            return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        } else if (view === 'month-schedule') {
            return currentDay.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        }
    };

    return (
        <div className="date-navigator">
            <Button onClick={handleToday}>Today</Button>&ensp;
            <Button onClick={handlePrev}><FaChevronLeft /></Button>&ensp;
            <Button onClick={toggleCalendar}>{formatDate()}</Button>&ensp;
            <Button onClick={handleNext}><FaChevronRight /></Button>&ensp;
            {showCalendar && (
                <div>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
                </div>
            )}
        </div>
    );
};

export default DateNavigator;
