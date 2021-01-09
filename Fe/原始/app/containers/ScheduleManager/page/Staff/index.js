import React from 'react';
import { Card } from 'antd';
import CalendarCom from '../../components/calendarCom';

const StaffSchedule = () => (
    <Card style={{ margin: 30 }}>
        <CalendarCom source="staff" />
    </Card>
);

export default StaffSchedule;
