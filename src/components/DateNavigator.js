import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DateNavigator = ({ view, selectedDate, setSelectedDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if (view === 'week-schedule') {
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
            setSelectedDate(startOfWeek);
        }
        else if (view === 'day-schedule') {
            const today = new Date();
            setSelectedDate(today);
        }
    }, [view]);

    const updateDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
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

    const handlePrev = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(-1));
        } else if (view === 'week-schedule') {
            setSelectedDate(updateWeek(-1));
        } else if (view === 'month-schedule') {
            setSelectedDate(updateMonth(-1));
        }
    };

    const handleNext = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(1));
        } else if (view === 'week-schedule') {
            setSelectedDate(updateWeek(1));
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
        if (view === 'day-schedule') {
            return selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        } else if (view === 'week-schedule') {
            const startOfWeek = new Date(selectedDate);
            const endOfWeek = new Date(selectedDate);
            endOfWeek.setDate(selectedDate.getDate() + 6);
            return `${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        } else if (view === 'month-schedule') {
            return selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        }
    };

    return (
        <div className="date-navigator">
            <Button onClick={handlePrev}><FaChevronLeft /></Button>
            <Button onClick={toggleCalendar}>{formatDate()}</Button>
            <Button onClick={handleNext}><FaChevronRight /></Button>
            {showCalendar && (
                <div>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
                </div>
            )}
        </div>
    );
};

export default DateNavigator;
