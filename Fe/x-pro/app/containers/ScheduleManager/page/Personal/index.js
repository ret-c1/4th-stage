import React from 'react';
import { Card } from 'antd';
import CalendarCom from '../../components/calendarCom';

const PersonalSchedule = () => (
    <Card style={{ margin: 30 }}>
        <CalendarCom source="personal" />
    </Card>
);
export default PersonalSchedule;
