import React from 'react';
import { Row, Col, Calendar, Select, Table, Popover } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';

const DayPlan = (props) => {
    const { dataSource, pagination, source, checkDayTime } = props;
    const columns = [
        {
            title: () => <ClockCircleOutlined />,
            dataIndex: 'executePeriod',
            width: 38,
        },
    ];
    const transData = (data) => {
        const nameList = [];
        data.forEach((item) => {
            nameList.push(item.executorName);
            const newItem = item;
            newItem.rowSpan = 0;
            const aa = data.find((_item) => _item && newItem.executePeriod === _item.executePeriod);
            aa[`${newItem.executorName}`] = [];
            aa[`${newItem.executorName}`].push({
                projectName: newItem.projectName,
                managerName: newItem.managerName,
                planTypeStr: newItem.planTypeStr,
                resourceApplyStatus: item.resourceApplyStatus,
            });
        });
        const newData = [];
        data.forEach((item) => {
            if (item.executorName in item) {
                newData.push(item);
            }
        });
        new Set(nameList).forEach((item1) => {
            columns.push({
                title: item1,
                key: item1,
                dataIndex: item1,
                render: (text) => {
                    if (text && text.length > 0) {
                        return text.map((item, index) => (
                            <Popover
                                key={index.toString()}
                                content={
                                    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.65)' }}>
                                        {item.planTypeStr && (
                                            <div
                                                style={{
                                                    fontSize: '16px',
                                                    color: 'rgba(0,0,0,0.85)',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                {item.planTypeStr}
                                            </div>
                                        )}
                                        <div style={{ marginBottom: '10px' }}>
                                            {item.projectName}
                                        </div>
                                        <div>项目经理：{item.managerName}</div>
                                    </div>
                                }
                            >
                                <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)' }}>
                                    <div
                                        style={{
                                            fontSize: '14px',
                                            color: '#1890FF',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {item.projectName}
                                    </div>
                                    {item.planTypeStr && (
                                        <div style={{ marginBottom: '10px' }}>
                                            计划类型：{item.planTypeStr}
                                        </div>
                                    )}
                                    <div>项目经理：{item.managerName}</div>
                                </div>
                            </Popover>
                        ));
                    }
                    return null;
                },
            });
        });
        return newData;
    };
    return (
        <>
            {props.source !== 'task' ? (
                <Row>
                    <Col
                        span={8}
                        style={{
                            border: '1px solid rgba(0,0,0,0.09)',
                            transform: 'translate(0,0)',
                        }}
                    >
                        <Calendar
                            fullscreen={false}
                            headerRender={({ value, onChange }) => {
                                const start = 0;
                                const end = 12;
                                const monthOptions = [];

                                const current = value.clone();
                                const localeData = value.localeData();
                                const months = [];
                                for (let i = 0; i < 12; i += 1) {
                                    current.month(i);
                                    months.push(localeData.monthsShort(current));
                                }

                                for (let index = start; index < end; index += 1) {
                                    monthOptions.push(
                                        <Select.Option className="month-item" key={`${index}`}>
                                            {months[index]}
                                        </Select.Option>,
                                    );
                                }
                                const month = value.month();

                                const year = value.year();
                                const options = [];
                                for (let i = year - 10; i < year + 10; i += 1) {
                                    options.push(
                                        <Select.Option key={i} value={i} className="year-item">
                                            {i}
                                        </Select.Option>,
                                    );
                                }
                                return (
                                    <div style={{ padding: 10 }}>
                                        <Row style={{ flexWrap: 'nowrap' }} gutter={8}>
                                            <Col style={{ flex: 'auto' }}>
                                                <Select
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    className="my-year-select"
                                                    onChange={(newYear) => {
                                                        const now = value.clone().year(newYear);
                                                        onChange(now);
                                                    }}
                                                    value={String(year)}
                                                >
                                                    {options}
                                                </Select>
                                            </Col>
                                            <Col style={{ flex: 'auto' }}>
                                                <Select
                                                    size="small"
                                                    dropdownMatchSelectWidth={false}
                                                    value={String(month)}
                                                    onChange={(selectedMonth) => {
                                                        const newValue = value.clone();
                                                        newValue.month(parseInt(selectedMonth, 10));
                                                        onChange(newValue);
                                                    }}
                                                >
                                                    {monthOptions}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            }}
                            onChange={(date) =>
                                checkDayTime([
                                    moment(date.format('YYYY/MM/DD 00:00:00')).valueOf(),
                                    moment(date.format('YYYY/MM/DD 23:59:59')).valueOf(),
                                ])
                            }
                        />
                    </Col>
                    <Col span={16}>
                        <Table
                            rowKey="managerId"
                            columns={columns}
                            bordered
                            showHeader={source !== 'personal'}
                            dataSource={transData(dataSource)}
                            pagination={pagination}
                        />
                    </Col>
                </Row>
            ) : (
                <Table
                    rowKey="id"
                    columns={columns}
                    bordered
                    showHeader={source !== 'personal'}
                    dataSource={transData(dataSource)}
                    pagination={pagination}
                />
            )}
        </>
    );
};
export default DayPlan;
DayPlan.propTypes = {
    source: PropTypes.string,
    dataSource: PropTypes.array,
    pagination: PropTypes.object,
    checkDayTime: PropTypes.func,
};
