import React from 'react';
import './style.less';
import { Calendar } from 'antd';

const CalendarContent = () => {
    const onPanelChange = (value, mode) => {
        console.log(value, mode);
    };
    return (
        <div className="calendar-wrap">
            <Calendar onPanelChange={onPanelChange} />
        </div>
    );
}

export default CalendarContent;