import React, { useEffect, useState } from 'react';
import { Table, Popover } from 'antd';
import { ClockCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
moment.locale('zh-cn');

const WeekPlan = (props) => {
    const { hiddenStaff, dataSource, time, pagination, formValues } = props;
    const [newColumns, setColumns] = useState([]);

    const transData = (data, formVal) => {
        const cData = [];
        data.forEach((item) => {
            const newItem = item;
            newItem.rowSpan = 0;
            const i = data.find(
                (_item) =>
                    newItem.executorName === _item.executorName &&
                    newItem.executePeriod === _item.executePeriod,
            );
            i[`${moment(newItem.executeDate).format('YYYY MM DD')}`] = [];
            i[`${moment(newItem.executeDate).format('YYYY MM DD')}`].push({
                projectName: item.projectName,
                managerName: item.managerName,
                planTypeStr: item.planTypeStr,
                resourceApplyStatus: item.resourceApplyStatus,
            });
            const ii = data.findIndex(
                (_item) =>
                    item.executorName === _item.executorName &&
                    item.executePeriod === _item.executePeriod,
            );
            cData.push(data[ii]);
        });
        data.forEach((item) => {
            const newItem = item;
            const aa = [...new Set(cData)].find(
                (_item) => _item && newItem.executorName === _item.executorName,
            );
            aa.rowSpan = [...new Set(cData)].reduce(
                (a, v) => (v.executorName === newItem.executorName ? a + 1 : a),
                0,
            );
            if (formVal && formVal.executorInfos && formVal.executorInfos.length > 0) {
                formVal.executorInfos.forEach((item1) => {
                    if (item1.executorName === item.executorName) {
                        if (formVal.executePeriods && formVal.executePeriods.length > 0) {
                            formVal.executePeriods.forEach((item2) => {
                                if (item2 === item.executePeriod) {
                                    if (formVal.executeDates && formVal.executeDates.length > 0) {
                                        formVal.executeDates.forEach((item3) => {
                                            if (item.executeDate === moment(item3).valueOf()) {
                                                newItem.isConflict = true;
                                            } else {
                                                newItem.isConflict = false;
                                            }
                                        });
                                    } else {
                                        newItem.isConflict = false;
                                    }
                                } else {
                                    newItem.isConflict = false;
                                }
                            });
                        } else {
                            newItem.isConflict = false;
                        }
                    } else {
                        newItem.isConflict = false;
                    }
                });
            }
        });
        return [...new Set(cData)];
    };

    useEffect(() => {
        transData(dataSource, formValues);
    }, [time.param.startDate, formValues]);

    useEffect(() => {
        if (time.param.startDate) {
            const timeDiff = parseInt(
                moment(time.param.endDate - time.param.startDate).format('D') - 1,
                10,
            );
            const columns = [
                {
                    title: '人员',
                    dataIndex: 'executorName',
                    key: 'executorName',
                    width: 50,
                    render: (value, row) => {
                        const obj = {
                            children: value,
                            props: {},
                        };
                        obj.props.rowSpan = row.rowSpan;
                        return obj;
                    },
                },
                {
                    title: () => <ClockCircleOutlined />,
                    width: 50,
                    dataIndex: 'executePeriod',
                    key: 'executePeriod',
                },
            ];
            for (let i = 0; i < timeDiff; i += 1) {
                columns.push({
                    dataIndex: moment(time.param.startDate)
                        .add(i, 'days')
                        .format('YYYY MM DD'),
                    key: moment(time.param.startDate)
                        .add(i, 'days')
                        .format('YYYY MM DD'),
                    title: moment(time.param.startDate)
                        .add(i, 'days')
                        .format('dddd, MMMM Do'),
                    width: 200,
                    render: (text, record) => {
                        if (text && text.length > 0) {
                            return text.map((item, index) => (
                                <Popover
                                    key={index.toString()}
                                    content={
                                        <div
                                            style={{ fontSize: '14px', color: 'rgba(0,0,0,0.65)' }}
                                        >
                                            {record.isConflict && !hiddenStaff && (
                                                <div
                                                    style={{
                                                        backgroundColor: '#FFFBE6',
                                                        borderRadius: '4px',
                                                        marginBottom: '13px',
                                                    }}
                                                >
                                                    <InfoCircleTwoTone twoToneColor="#FAAD14" />
                                                    <span style={{ marginLeft: '3px' }}>
                                                        与当前所选时间冲突
                                                    </span>
                                                </div>
                                            )}
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
                                    {record.isConflict && !hiddenStaff && (
                                        <div style={{ textAlign: 'right' }}>
                                            <InfoCircleTwoTone twoToneColor="#FAAD14" />
                                        </div>
                                    )}
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
            }
            setColumns(columns);
        }
    }, [time.param.startDate, time.param.endDate, hiddenStaff, formValues]);

    return (
        <Table
            scroll={{ x: '100%' }}
            rowKey="id"
            bordered
            columns={newColumns}
            dataSource={transData(dataSource)}
            pagination={pagination}
        />
    );
};
export default WeekPlan;

WeekPlan.propTypes = {
    formValues: PropTypes.object,
    dataSource: PropTypes.array,
    pagination: PropTypes.object,
    time: PropTypes.object,
    hiddenStaff: PropTypes.bool,
};
