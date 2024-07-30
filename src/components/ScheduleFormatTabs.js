import React from 'react';

const ScheduleFormatTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div
        id="list-schedule-tab"
        className={activeTab === 'list-schedule' ? 'active' : ''}
        onClick={() => setActiveTab('list-schedule')}>
            Class List
        </div>
        <div 
        id="calendar-schedule-tab"
        className={activeTab === 'calendar-schedule' ? 'active' : ''}
        onClick={() => setActiveTab('calendar-schedule')}>
            Class Calendar
        </div>
    </div>
);

export default ScheduleFormatTabs;