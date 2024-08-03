import React, {useState, useEffect} from 'react';
import SchedulePeriodTabs from '../components/SchedulePeriodTabs';
import ScheduleFormatTabs from '../components/ScheduleFormatTabs';
import DateNavigator from '../components/DateNavigator';
import ListSchedule from '../components/ListSchedule';
import CalendarSchedule from '../components/CalendarSchedule';

const SchedulePage = ({classes}) => {
    const [activeFormatTab, setActiveFormatTab] = useState('list-schedule');
    const [activePeriodTab, setActivePeriodTab] = useState('day-schedule');
    const [view, setView] = useState(activePeriodTab);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setView(activePeriodTab);
    }, [activePeriodTab]);

    return (
        <div id="schedule" className="tab active">
            <h3>Schedule</h3><br />
            <ScheduleFormatTabs activeTab={activeFormatTab} setActiveTab={setActiveFormatTab} />
            <SchedulePeriodTabs activeTab={activePeriodTab} setActiveTab={setActivePeriodTab} />
            <DateNavigator view={view} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {activeFormatTab === 'list-schedule' && <ListSchedule view={view} classes={classes} selectedDate={selectedDate} />}
            {activeFormatTab === 'list-schedule' && activePeriodTab ==='month-schedule' && (setActiveFormatTab('calendar-schedule'))}
            {activeFormatTab === 'calendar-schedule' && <CalendarSchedule view={view} classes={classes} selectedDate={selectedDate} />}
        </div>
    );
}

export default SchedulePage;

