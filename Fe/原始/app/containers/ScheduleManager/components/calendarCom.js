import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Calendar, Row, Col, Radio, DatePicker, Switch, Popover } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import WeekPlan from './WeekPlan';
import DayPlan from './DayPlan';
import {
    queryScheduleManager,
    queryScheduleStaffTechnology,
    querySchedulePersonalTechnology,
} from '../api';

const { Group, Button } = Radio;
const { RangePicker } = DatePicker;

// task 只有技术负责人看，staff技术负责人和项目经理 personal所有人
const CalendarCom = (props) => {
    const { state, source, formValues, refreshSchedule, refreshCallback, rxRole } = props;
    const { manager, projectId } = searchParams();
    const [scheduleDataList, setScheduleDataList] = useState([]);
    const [hiddenStaff, setHiddenStaff] = useState(false);
    const [currKey, setCurrKey] = useState(state ? 'random' : 'month');
    const [isShowPicker, setIsShowPicker] = useState(false);
    const start = 'startScheduleDate';
    const START_MONTH = moment(moment().format('YYYY MM 01 00:00:00')).valueOf();
    const END_MONTH = moment(
        moment()
            .endOf('month')
            .format('YYYY MM DD 23:59:59'),
    ).valueOf();
    const [params, changeParams] = useState({
        limit: 20,
        offset: 0,
        param: {
            startDate:
                state && state.startScheduleDate
                    ? moment(moment(state[start]).format('YYYY MM DD 00:00:00')).valueOf()
                    : START_MONTH,
            endDate:
                state && state.startScheduleDate
                    ? moment(moment(state.endScheduleDate).format('YYYY MM DD 23:59:59')).valueOf()
                    : END_MONTH,
        },
    });

    useEffect(() => {
        if (source === 'task') {
            queryScheduleStaffTechnology(params).then((res) => {
                if (res.code === 200) {
                    setScheduleDataList(res.data || []);
                    if (typeof refreshCallback === 'function') {
                        refreshCallback(false);
                    }
                }
            });
        }
        const personalParams = params;
        personalParams.param = {
            ...params.param,
            startDate: params.param.startDate,
            endDate: params.param.endDate,
        };
        if (source === 'personal') {
            querySchedulePersonalTechnology(personalParams).then((res) => {
                if (res.code === 200) {
                    setScheduleDataList(res.data || []);
                    if (typeof refreshCallback === 'function') {
                        refreshCallback(false);
                    }
                }
            });
        }
        if (source === 'staff') {
            if (manager) {
                if (rxRole.indexOf('项目经理') !== -1) {
                    queryScheduleManager({
                        ...personalParams,
                        param: {
                            ...personalParams.param,
                            projectId,
                        },
                    }).then((res) => {
                        if (res.code === 200) {
                            setScheduleDataList(res.data || []);
                            if (typeof refreshCallback === 'function') {
                                refreshCallback(false);
                            }
                        }
                    });
                }
            } else if (rxRole.indexOf('技术负责人') !== -1) {
                queryScheduleStaffTechnology(personalParams).then((res) => {
                    if (res.code === 200) {
                        setScheduleDataList(res.data || []);
                        if (typeof refreshCallback === 'function') {
                            refreshCallback(false);
                        }
                    }
                });
            }
        }
    }, [params, refreshSchedule]);

    const changeTimeParams = (dateType, chooseTime) => {
        const monthParam = {
            startDate: moment(moment().format('YYYY MM 01 00:00:00')).valueOf(),
            endDate: moment(
                moment()
                    .endOf('month')
                    .format('YYYY MM DD 23:59:59'),
            ).valueOf(),
        };
        const weekParam = {
            startDate: moment(
                moment()
                    .subtract(moment().format('E') - 1, 'days')
                    .format('YYYY MM DD 00:00:00'),
            ).valueOf(),
            endDate: moment(
                moment()
                    .subtract(moment().format('E'), 'days')
                    .add(7, 'days')
                    .format('YYYY MM DD 23:59:59'),
            ).valueOf(),
        };
        const dayParam = {
            startDate: moment(moment().format('YYYY MM DD 00:00:00')).valueOf(),
            endDate: moment(moment().format('YYYY MM DD 23:59:59')).valueOf(),
        };
        const randomParam = {
            startDate: moment(moment(chooseTime[0]).format('YYYY MM/DD 00:00:00')).valueOf(),
            endDate: moment(moment(chooseTime[1]).format('YYYY MM DD 23:59:59')).valueOf(),
        };
        switch (dateType) {
            case 'month':
                changeParams({
                    ...params,
                    param: {
                        ...params.param,
                        ...monthParam,
                    },
                });
                break;
            case 'week':
                changeParams({
                    ...params,
                    param: {
                        ...params.param,
                        ...weekParam,
                    },
                });
                break;
            case 'day':
                changeParams({
                    ...params,
                    param: {
                        ...params.param,
                        ...dayParam,
                    },
                });
                break;
            default:
                changeParams({
                    ...params,
                    param: {
                        ...params.param,
                        ...randomParam,
                    },
                });
        }
    };

    const changeDate = (type) => {
        const newTime = [];
        if (type === 'minus') {
            switch (currKey) {
                case 'month':
                    newTime[0] = moment(
                        moment(params.param.startDate).subtract(1, 'months'),
                    ).valueOf();
                    newTime[1] = moment(
                        moment(params.param.endDate).subtract(1, 'months'),
                    ).valueOf();
                    break;
                case 'day':
                    newTime[0] = moment(
                        moment(params.param.startDate).subtract(7, 'days'),
                    ).valueOf();
                    newTime[1] = moment(moment(params.param.endDate).subtract(7, 'days')).valueOf();
                    break;
                default:
                    newTime[0] = moment(
                        moment(params.param.startDate).subtract(1, 'weeks'),
                    ).valueOf();
                    newTime[1] = moment(
                        moment(params.param.endDate).subtract(1, 'weeks'),
                    ).valueOf();
                    break;
            }
        } else {
            switch (currKey) {
                case 'month':
                    newTime[1] = moment(moment(params.param.endDate).add(1, 'months')).valueOf();
                    newTime[0] = moment(moment(params.param.startDate).add(1, 'months')).valueOf();
                    break;
                case 'day':
                    newTime[1] = moment(moment(params.param.endDate).add(7, 'days')).valueOf();
                    newTime[0] = moment(moment(params.param.startDate).add(7, 'days')).valueOf();
                    break;
                default:
                    newTime[1] = moment(moment(params.param.endDate).add(1, 'weeks')).valueOf();
                    newTime[0] = moment(moment(params.param.startDate).add(1, 'weeks')).valueOf();
                    break;
            }
        }
        changeParams({
            ...params,
            param: {
                ...params.param,
                startDate: newTime[0],
                endDate: newTime[1],
            },
        });
    };

    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };

    const getListData = (value) => {
        const o = {};
        if (scheduleDataList && scheduleDataList.records && scheduleDataList.records.length > 0) {
            scheduleDataList.records.forEach((obj) => {
                const array = o[moment(obj.executeDate).format('YYYY MM DD')] || [];
                array.push(obj);
                o[moment(obj.executeDate).format('YYYY MM DD')] = array;
            });
        }
        return o[value.format('YYYY MM DD')] || [];
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <Popover
                        key={item.id}
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
                                <div style={{ marginBottom: '10px' }}>{item.projectName}</div>
                                <div>项目经理：{item.managerName}</div>
                            </div>
                        }
                    >
                        <li
                            style={{
                                fontSize: '12px',
                                color: 'rgba(0,0,0,0.85)',
                                background: 'rgba(24,144,255,0.04)',
                            }}
                        >
                            {item.planTypeStr && `${item.planTypeStr}|`}
                            {item.projectName}
                        </li>
                    </Popover>
                ))}
            </ul>
        );
    };

    const changeDateType = (key) => {
        changeTimeParams(key, [params.param.startDate, params.param.endDate]);
        setCurrKey(key);
    };
    const headerHtml = (value, type, onChange, onTypeChange) => {
        let spanWidth = 0;
        if (source === 'task') {
            spanWidth = 13;
        } else {
            spanWidth = 9;
        }
        return (
            <Row justify="space-between" align="center" style={{ marginBottom: '16px' }}>
                {source !== 'task' && (
                    <Col span={4} offset={1}>
                        <Group value={currKey || type}>
                            <Button value="random" onClick={() => setIsShowPicker(!isShowPicker)}>
                                日历
                            </Button>
                            <Button value="day" onClick={() => changeDateType('day')}>
                                今天
                            </Button>
                        </Group>
                        {isShowPicker && (
                            <RangePicker
                                style={{ visibility: 'hidden' }}
                                bordered={false}
                                onChange={(dates) => {
                                    changeTimeParams('random', dates);
                                    changeDateType('random');
                                    setIsShowPicker(!isShowPicker);
                                    setCurrKey('random');
                                }}
                                open={isShowPicker}
                                onOpenChange={() => {
                                    setIsShowPicker(!isShowPicker);
                                    setCurrKey('random');
                                }}
                            />
                        )}
                    </Col>
                )}
                <Col span={9} offset={1}>
                    <span>
                        <LeftOutlined onClick={() => changeDate('minus')} />
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                            }}
                        >
                            {moment(params.param.startDate).format('YYYY年MM月DD日')}-
                            {moment(params.param.endDate).format('YYYY年MM月DD日')}
                        </span>
                        <RightOutlined onClick={() => changeDate('plus')} />
                    </span>
                </Col>
                <Col span={spanWidth}>
                    <Row>
                        {source === 'task' && (
                            <Col span={4}>
                                <Button value="day" onClick={() => changeDateType('day')}>
                                    今天
                                </Button>
                            </Col>
                        )}
                        <Col span={10}>
                            <Group
                                value={currKey || type}
                                onChange={(e) => onTypeChange && onTypeChange(e.target.value)}
                            >
                                {source !== 'task' && (
                                    <Button value="day" onClick={() => changeDateType('day')}>
                                        日
                                    </Button>
                                )}
                                <Button value="week" onClick={() => changeDateType('week')}>
                                    周
                                </Button>
                                <Button value="month" onClick={() => changeDateType('month')}>
                                    月
                                </Button>
                                {source === 'task' && (
                                    <Button
                                        value="random"
                                        onClick={() => setIsShowPicker(!isShowPicker)}
                                    >
                                        自定义
                                        {isShowPicker && (
                                            <RangePicker
                                                style={{ visibility: 'hidden' }}
                                                bordered={false}
                                                onChange={(dates) =>
                                                    changeTimeParams('random', dates)
                                                }
                                                open={isShowPicker}
                                                onPanelChange={() => {
                                                    changeDateType('random');
                                                    setIsShowPicker(!isShowPicker);
                                                    setCurrKey('random');
                                                }}
                                                onOpenChange={() => {
                                                    setIsShowPicker(!isShowPicker);
                                                    setCurrKey('random');
                                                }}
                                            />
                                        )}
                                    </Button>
                                )}
                            </Group>
                        </Col>
                        {source === 'task' && (
                            <Col span={9}>
                                <Switch
                                    style={{ marginLeft: '10px' }}
                                    size="small"
                                    onChange={(e) => setHiddenStaff(e)}
                                />
                                <span
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: '22px',
                                        margin: '2px 0 0 5px',
                                    }}
                                >
                                    隐藏时间冲突人员
                                </span>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        );
    };
    return (
        <>
            {currKey !== 'month' ? (
                <>
                    {headerHtml()}
                    {currKey === 'day' ? (
                        <DayPlan
                            time={params}
                            checkDayTime={(value) =>
                                changeParams({
                                    ...params,
                                    param: {
                                        ...params.param,
                                        startDate: value.length > 0 && value[0],
                                        endDate: value.length > 0 && value[1],
                                    },
                                })
                            }
                            source={source}
                            dataSource={scheduleDataList.records || []}
                            pagination={{
                                pageSize: 20,
                                onChange: pageChange,
                                total: scheduleDataList.total || 0,
                                showSizeChanger: false,
                            }}
                        />
                    ) : (
                        <WeekPlan
                            time={params}
                            source={source}
                            hiddenStaff={hiddenStaff}
                            formValues={formValues}
                            dataSource={scheduleDataList.records || []}
                            pagination={{
                                pageSize: 20,
                                onChange: pageChange,
                                total: scheduleDataList.total || 0,
                                showSizeChanger: false,
                            }}
                        />
                    )}
                </>
            ) : (
                <Calendar
                    headerRender={({ value, type, onChange, onTypeChange }) =>
                        headerHtml(value, type, onChange, onTypeChange)
                    }
                    locale={{ lang: { locale: 'zh_CN' } }}
                    dateCellRender={dateCellRender}
                />
            )}
        </>
    );
};
CalendarCom.propTypes = {
    source: PropTypes.string,
    formValues: PropTypes.object,
    state: PropTypes.object,
    refreshSchedule: PropTypes.bool,
    refreshCallback: PropTypes.func,
    rxRole: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CalendarCom);
