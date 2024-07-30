import React from 'react';

const SchedulePeriodTabs = ({activeTab, setActiveTab}) => (
    <div id="tabs">
        <div
        id="day-schedule-tab"
        className={activeTab === 'day-schedule' ? 'active' : ''}
        onClick={() => setActiveTab('day-schedule')}>
            Day
        </div>
        <div 
        id="week-schedule-tab"
        className={activeTab === 'week-schedule' ? 'active' : ''}
        onClick={() => setActiveTab('week-schedule')}>
            Week
        </div>
        <div 
        id="month-schedule-tab"
        className={activeTab === 'month-schedule' ? 'active' : ''}
        onClick={() => setActiveTab('month-schedule')}>
            Month
        </div>
    </div>
);

export default SchedulePeriodTabs;