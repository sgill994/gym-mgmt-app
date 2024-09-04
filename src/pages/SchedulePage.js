import React, {useState, useEffect} from 'react';
import SchedulePeriodTabs from '../components/SchedulePeriodTabs';
import ScheduleFormatTabs from '../components/ScheduleFormatTabs';
import ListSchedule from '../components/ListSchedule';
import CalendarSchedule from '../components/CalendarSchedule';
import DateNavigator from '../components/DateNavigator';

const SchedulePage = ({classes}) => {
    const [activeFormatTab, setActiveFormatTab] = useState('list-schedule');
    const [activePeriodTab, setActivePeriodTab] = useState('day-schedule');
    const [viewType, setViewType] = useState('timeGridDay');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekSelectedDate, setWeekSelectedDate] = useState (new Date());

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
                weekSelectedDate={weekSelectedDate}
                setWeekSelectedDate={setWeekSelectedDate}
            />
            {activeFormatTab === 'list-schedule' && (
                <>
                    {activePeriodTab === 'week-schedule' && <ListSchedule viewType={viewType} classes={classes} selectedDate={weekSelectedDate} />}
                    {activePeriodTab === 'day-schedule' && <ListSchedule viewType={viewType} classes={classes} selectedDate={selectedDate} />}
                    {activePeriodTab ==='month-schedule' && (setActiveFormatTab('calendar-schedule'))}
                </>
            )}
            {activeFormatTab === 'calendar-schedule' && (
                <CalendarSchedule
                    viewType={viewType}
                    classes={classes}
                    selectedDate={activePeriodTab === 'week-schedule' ? weekSelectedDate : selectedDate}
                />
            )}
        </div>
    );
}

export default SchedulePage;
