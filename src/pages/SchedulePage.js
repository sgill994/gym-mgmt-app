import React, {useState, useEffect} from 'react';
import SchedulePeriodTabs from '../components/SchedulePeriodTabs';
import ScheduleFormatTabs from '../components/ScheduleFormatTabs';
import DateNavigator from '../components/DateNavigator';

const SchedulePage = ({classes}) => {
    const [activeFormatTab, setActiveFormatTab] = useState('list-schedule');
    const [activePeriodTab, setActivePeriodTab] = useState('day-schedule');
    const [view, setView] = useState(activePeriodTab);

    useEffect(() => {
        setView(activePeriodTab);
    }, [activePeriodTab]);

    return (
        <div id="schedule" className="tab active">
            <h3>Schedule</h3><br />
            <ScheduleFormatTabs activeTab={activeFormatTab} setActiveTab={setActiveFormatTab} />
            <SchedulePeriodTabs activeTab={activePeriodTab} setActiveTab={setActivePeriodTab} />
            <DateNavigator view={view} />
        </div>
    );
}

export default SchedulePage;

