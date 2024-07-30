import React, {useState, useEffect} from 'react';
import {Button, Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const DateNavigator = ({view}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    // Assigns 'selectedDate' to the Sunday of the week containing the selected date
    // or today's date when user is viewing weekly schedule
    useEffect(() => {
        if (view === 'week-schedule') {
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
            setSelectedDate(startOfWeek);
        }
    }, [view]);

    // Creates a new Date object to use when applying changes
    const updateDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days);
        return newDate;
    }

    // Shifts selected date forward/back by a week (7 days)
    const updateWeek = (weeks) => {
        return updateDate(weeks*7);
    };

    // Shifts selected date forward/back by a month
    const updateMonth = (months) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(selectedDate.getMonth() + months);
        return newDate;
    }

    // Subtracts 1 from current date to update 'selectedDate' on '<' click
    const handlePrev = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(-1)); 
        } else if (view === 'week-schedule') {
            setSelectedDate(updateWeek(-1));
        } else if (view === 'month-schedule') {
            setSelectedDate(updateMonth(-1));
        }
    };

    // Adds 1 to current date to update 'selectedDate' on '>' click
    const handleNext = () => {
        if (view === 'day-schedule') {
            setSelectedDate(updateDate(1)); 
        } else if (view === 'week-schedule') {
            setSelectedDate(updateWeek(1));
        } else if (view === 'month-schedule') {
            setSelectedDate(updateMonth(1));
        }
    };

    // Updates 'selectedDate' from calendar selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    // Updates calendar visibilty on click of current date button 
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const formatDate = () => {
        if (view === 'day-schedule') {
            return selectedDate.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'})
        } else if (view === 'week-schedule') {
            const startOfWeek = new Date(selectedDate);
            startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - `
                 + `${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        } else if (view === 'month-schedule') {
            return selectedDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long'});
        }
    }

    return (
        <div className="date-navigator">
            <Button onClick={handlePrev}><FaChevronLeft /></Button>
            <Button onClick={toggleCalendar}>{formatDate()}</Button>
            <Button onClick={handleNext}><FaChevronRight /></Button>

            <Modal show={showCalendar} onHide={toggleCalendar}>
                <Modal.Header>
                    Select Date
                </Modal.Header>
                <Modal.Body>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DateNavigator;