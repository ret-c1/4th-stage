import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Tabs, PageHeader, Descriptions } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import TaskIcon from '@assets/images/task.png';
import ThreatDetailList from './component/ThreatDetailList';
import {
    getAssetKeyAction,
    assetUndoListAction,
    assetDoingListAction,
    getResultListAction,
    queryEventAction,
} from '../../action';

const { TabPane } = Tabs;
const TaskDetail = (props) => {
    const {
        assetDoingList,
        assetUndoList,
        getAssetUndoList,
        getAssetDoingList,
        getResultList,
        resultList,
        rxRole,
        rxInfo,
        eventRecord,
        queryEvent,
    } = props;
    const history = useHistory();
    const { query, state } = history.location;
    useEffect(() => {
        getAssetDoingList({
            ...assetDoingList.params,
            param: { threatId: query && query.threatId, planId: query && query.planId },
        });
    }, []);

    const onChangeList = (activeKey) => {
        if (activeKey === '排查中') {
            getAssetDoingList({
                ...assetDoingList.params,
                param: { threatId: query && query.threatId, planId: query && query.planId },
            });
        }
        if (activeKey === '已排查') {
            getResultList({
                ...resultList.params,
                param: { threatId: query && query.threatId, planId: query && query.planId },
            });
        }
        if (activeKey === '未排查') {
            getAssetUndoList({
                ...assetUndoList.params,
                param: { threatId: query && query.threatId, planId: query && query.planId },
            });
        }
    };
    return (
        <>
            <PageHeader
                style={{ background: '#ffffff' }}
                title={state && state.name}
                className="site-page-header"
                avatar={{ src: TaskIcon }}
            >
                <Descriptions column={4}>
                    <Descriptions.Item label="项目名称" key="projectName">
                        {state && state.projectName}
                    </Descriptions.Item>
                    <Descriptions.Item label="执行起止时间" key="clientName">
                        {state && (
                            <span>
                                {moment(state.scheduledStartDate).format('YYYY-MM-DD')}~
                                {moment(state.scheduledEndDate).format('YYYY-MM-DD')}
                            </span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="优先级" key="priority">
                        {state && state.priority}
                    </Descriptions.Item>
                    <Descriptions.Item label="执行人" key="executor">
                        {state && state.executor}
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Card title="排查列表" style={{ margin: '24px 24px 0' }}>
                <Tabs type="card" onChange={onChangeList}>
                    <TabPane tab="排查中" key="排查中">
                        <ThreatDetailList
                            source="排查中"
                            columnList={assetDoingList}
                            getList={getAssetDoingList}
                            rxRole={rxRole}
                            rxInfo={rxInfo}
                            progressParams={query}
                            eventRecord={eventRecord}
                            queryEvent={queryEvent}
                        />
                    </TabPane>
                    <TabPane tab="未排查" key="未排查">
                        <ThreatDetailList
                            source="未排查"
                            getList={getAssetUndoList}
                            columnList={assetUndoList}
                            rxRole={rxRole}
                            rxInfo={rxInfo}
                            eventRecord={eventRecord}
                            queryEvent={queryEvent}
                        />
                    </TabPane>
                    <TabPane tab="已排查" key="已排查">
                        <ThreatDetailList
                            source="已排查"
                            getList={getResultList}
                            columnList={resultList}
                            rxRole={rxRole}
                            rxInfo={rxInfo}
                            eventRecord={eventRecord}
                            queryEvent={queryEvent}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    );
};

TaskDetail.propTypes = {
    assetUndoList: PropTypes.object,
    assetDoingList: PropTypes.object,
    resultList: PropTypes.object,
    getAssetUndoList: PropTypes.func,
    getAssetDoingList: PropTypes.func,
    getResultList: PropTypes.func,
    rxRole: PropTypes.array,
    rxInfo: PropTypes.object,
    eventRecord: PropTypes.object,
    queryEvent: PropTypes.func,
};

const mapStateToProps = (state) => ({
    assetKey: state.intelligence.assetKey,
    assetUndoList: state.intelligence.assetUndoList,
    assetDoingList: state.intelligence.assetDoingList,
    resultList: state.intelligence.resultList,
    eventRecord: state.intelligence.eventRecord,
    rxRole: state.global.role,
    rxInfo: state.global.useinfo,
});

const mapDispatchToProps = (dispatch) => ({
    getAssetKey: (params) => {
        dispatch(getAssetKeyAction(params));
    },
    getAssetUndoList: (params) => {
        dispatch(assetUndoListAction(params));
    },
    getAssetDoingList: (params) => {
        dispatch(assetDoingListAction(params));
    },
    getResultList: (params) => {
        dispatch(getResultListAction(params));
    },
    queryEvent: (params) => {
        dispatch(queryEventAction(params));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TaskDetail);
