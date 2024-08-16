import React, {useState, useEffect} from 'react';
import SchedulePeriodTabs from '../components/SchedulePeriodTabs';
import ScheduleFormatTabs from '../components/ScheduleFormatTabs';
import ListSchedule from '../components/ListSchedule';
import CalendarSchedule from '../components/CalendarSchedule';
import DateNavigator from '../components/DateNavigator';

const SchedulePage = ({classes, selectedDate, setSelectedDate}) => {
    const [activeFormatTab, setActiveFormatTab] = useState('list-schedule');
    const [activePeriodTab, setActivePeriodTab] = useState('day-schedule');
    const [viewType, setViewType] = useState('timeGridDay');

    useEffect(() => {
        setViewType(getViewType(activePeriodTab));
    }, [activePeriodTab]);

    const getViewType = (view) => {
        switch(view) {
            case 'day-schedule':
                return 'timeGridDay';
            case 'week-schedule':
                return 'timeGridWeek';
            case 'month-schedule':
                return 'dayGridMonth';
            default:
                return 'timeGridDay';
        }
    };

    return (
        <div id="schedule" className="tab active">
            <h3>Schedule</h3><br />
            <ScheduleFormatTabs activeTab={activeFormatTab} setActiveTab={setActiveFormatTab} />
            <SchedulePeriodTabs activeTab={activePeriodTab} setActiveTab={setActivePeriodTab} />
            <DateNavigator 
                view={activePeriodTab}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            {activeFormatTab === 'list-schedule' && <ListSchedule viewType={viewType} classes={classes} selectedDate={selectedDate} />}
            {activeFormatTab === 'list-schedule' && activePeriodTab ==='month-schedule' && (setActiveFormatTab('calendar-schedule'))}
            {activeFormatTab === 'calendar-schedule' && <CalendarSchedule viewType={viewType} classes={classes} selectedDate={selectedDate} />}
        </div>
    );
}

export default SchedulePage;
