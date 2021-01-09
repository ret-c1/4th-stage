import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Tabs, Modal, Drawer } from 'antd';
import WarningList from '../../components/Warning/WarningList';
import WarningAnalyseRecord from '../../components/Warning/WarningAnalyseRecord';
import LogList from '../../components/Log/LogList';
import LogAnalyseRecord from '../../components/Log/LogAnalyseRecord';
import EventList from '../../components/Event/EventList';
import EventAnalyseRecord from '../../components/Event/EventAnalyseRecord';
import EventAddEdit from '../../components/Event/EventAddEdit';
import { ScContent, ScSpread, ScFullScreen } from '../../style';
// import {
//     addEventAction,
//     getWarningListAction,
//     getLogListAction,
//     getEventListAction,
//     queryWarningAction,
//     queryLogAction,
//     queryEventAction,
//     recordReadyTimeAction,
//     getProjectAction,
// } from '../../action';

const { TabPane } = Tabs;

const ResearchPage = (props) => {
    const {
        warningList,
        // getWarningList,
        logList,
        // getLogList,
        eventList,
        // getEventList,
        warningRecord,
        logRecord,
        eventRecord,
        // queryWarning,
        // queryLog,
        // addEvent,
        // queryEvent,
        readyTimeList,
        // recordReadyTime,
        projectList,
        // getProject,
    } = props;
    const [formData, setFormData] = useState({
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        source: '',
        isFullScreen: false,
        listRecord: {},
    });

    useEffect(() => {
        // getWarningList();
    }, []);

    const fullScreen = (def) => {
        if (!formData.isFullScreen) {
            requestFullScreen(def);
        } else {
            exitFullscreen();
        }
        setFormData({ ...formData, isFullScreen: !formData.isFullScreen });
    };

    // 进入全屏
    const requestFullScreen = (def) => {
        if (def.requestFullscreen) {
            def.requestFullscreen(def);
        } else if (def.mozRequestFullScreen) {
            def.mozRequestFullScreen();
        } else if (def.webkitRequestFullScreen) {
            def.webkitRequestFullScreen();
        }
    };

    // 退出全屏
    const exitFullscreen = () => {
        const de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };
    const onChangeList = (activeKey) => {
        if (activeKey === '1') {
            // getWarningList();
        }
        if (activeKey === '2') {
            // getLogList();
        }
        if (activeKey === '3') {
            // getEventList();
        }
    };

    return (
        <>
            <ScContent>
                <Card
                    id="eventCard1"
                    title="研判事件选择"
                    bordered={false}
                    style={{ marginBottom: '24px' }}
                    extra={
                        <div>
                            <ScSpread
                                onClick={() => setFormData({ ...formData, card1: !formData.card1 })}
                            />
                            <ScFullScreen
                                onClick={() => fullScreen(document.getElementById('eventCard1'))}
                            />
                        </div>
                    }
                >
                    {!formData.card1 ? (
                        <Tabs type="card" onChange={onChangeList}>
                            <TabPane tab="告警记录列表" key="1">
                                <WarningList
                                    page="event"
                                    // recordReadyTime={recordReadyTime}
                                    // queryWarning={queryWarning}
                                    warningList={warningList}
                                    // getWarningList={getWarningList}
                                    spreadWarning={(val, source) => {
                                        if (source.indexOf('event') !== -1) {
                                            const newVal = val;
                                            newVal.threatWarnAnalysisId = val.id;
                                            setFormData({
                                                ...formData,
                                                card4: true,
                                                source,
                                                listRecord: newVal,
                                            });
                                        } else {
                                            setFormData({ ...formData, card2: true, source });
                                        }
                                    }}
                                    // queryEvent={queryEvent}
                                />
                            </TabPane>
                            <TabPane tab="日志记录列表" key="2">
                                <LogList
                                    page="event"
                                    // recordReadyTime={recordReadyTime}
                                    // queryLog={queryLog}
                                    // queryEvent={queryEvent}
                                    logList={logList}
                                    // getLogList={getLogList}
                                    spreadWarning={(val, source) => {
                                        if (source.indexOf('event') !== -1) {
                                            const newVal = val;
                                            newVal.threatLogAnalysisId = val.id;
                                            setFormData({
                                                ...formData,
                                                card4: true,
                                                source,
                                                listRecord: newVal,
                                            });
                                        } else {
                                            setFormData({ ...formData, card3: true, source });
                                        }
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="研判记录列表" key="3">
                                <EventList
                                    page="event"
                                    // recordReadyTime={recordReadyTime}
                                    // queryEvent={queryEvent}
                                    eventList={eventList}
                                    // getEventList={getEventList}
                                    spreadWarning={(val, source) =>
                                        setFormData({ ...formData, card4: true, source })
                                    }
                                />
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
                <Drawer
                    title="告警分析记录"
                    visible={formData.card2}
                    width={500}
                    style={{
                        fontFamily: 'PingFangSC-Regular',
                        fontSize: '14px',
                    }}
                    onClose={() => setFormData({ ...formData, card2: false })}
                >
                    <WarningAnalyseRecord warningRecord={warningRecord} />
                </Drawer>
                <Drawer
                    title="日志分析记录"
                    visible={formData.card3}
                    width={500}
                    style={{
                        fontFamily: 'PingFangSC-Regular',
                        fontSize: '14px',
                    }}
                    onClose={() => setFormData({ ...formData, card3: false })}
                >
                    <LogAnalyseRecord logRecord={logRecord} />
                </Drawer>
                {formData.source === 'eventEdit' ? (
                    <Modal
                        title="事件研判记录"
                        visible={formData.card4}
                        width={1000}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        footer={null}
                        onCancel={() => setFormData({ ...formData, card4: false })}
                    >
                        <EventAddEdit
                            // getProject={getProject}
                            projectList={projectList}
                            readyTimeList={readyTimeList}
                            listRecord={formData.listRecord}
                            eventRecord={eventRecord}
                            onOk={() => setFormData({ ...formData, card4: false })}
                            onCancel={() => setFormData({ ...formData, card4: false })}
                        />
                    </Modal>
                ) : (
                    <Drawer
                        title="事件研判记录"
                        visible={formData.card4}
                        width={500}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        onClose={() => setFormData({ ...formData, card4: false })}
                    >
                        <EventAnalyseRecord eventRecord={eventRecord} />
                    </Drawer>
                )}
            </ScContent>
        </>
    );
};
ResearchPage.propTypes = {
    // getWarningList: PropTypes.func,
    // getLogList: PropTypes.func,
    // getEventList: PropTypes.func,
    // addEvent: PropTypes.func,
    // queryWarning: PropTypes.func,
    // queryLog: PropTypes.func,
    // queryEvent: PropTypes.func,
    warningList: PropTypes.object,
    logList: PropTypes.object,
    eventList: PropTypes.object,
    warningRecord: PropTypes.object,
    logRecord: PropTypes.object,
    eventRecord: PropTypes.object,
    readyTimeList: PropTypes.object,
    // recordReadyTime: PropTypes.func,
    // getProject: PropTypes.func,
    projectList: PropTypes.array,
};

const mapStateToProps = (state) => ({
    logList: state.happening.logList,
    eventList: state.happening.eventList,
    warningList: state.happening.warningList,
    warningRecord: state.happening.warningRecord,
    logRecord: state.happening.logRecord,
    eventRecord: state.happening.eventRecord,
    readyTimeList: state.happening.readyTimeList,
    projectList: state.happening.projectList,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ResearchPage);
