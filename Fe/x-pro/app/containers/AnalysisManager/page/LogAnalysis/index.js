import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Tabs, Modal, Button, Drawer } from 'antd';
// import moment from 'moment';
import WarningList from '../../components/Warning/WarningList';
import WarningAnalyseRecord from '../../components/Warning/WarningAnalyseRecord';
import LogList from '../../components/Log/LogList';
import LogAnalyseRecord from '../../components/Log/LogAnalyseRecord';
import LogAddEdit from '../../components/Log/LogAddEdit';
import { ScContent, ScSpread, ScFullScreen } from '../../style';
import {
    getWarningListAction,
    queryWarningAction,
    addLogAction,
    getLogListAction,
    queryLogAction,
    recordReadyTimeAction,
    getProjectAction,
} from '../../action';

const { TabPane } = Tabs;

const Log = (props) => {
    const {
        warningList,
        getWarningList,
        logList,
        getLogList,
        warningRecord,
        logRecord,
        addLog,
        queryWarning,
        queryLog,
        readyTimeList,
        recordReadyTime,
        getProject,
        projectList,
    } = props;
    const [formData, setFormData] = useState({
        card1: false,
        card2: true,
        card3: true,
        isFullScreen: false,
        listRecord: {},
    });

    useEffect(() => {
        getWarningList();
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
            getWarningList();
        }
        if (activeKey === '2') {
            getLogList();
        }
    };

    return (
        <>
            <ScContent>
                <Card
                    id="logCard2"
                    title="分析事件选择"
                    bordered={false}
                    style={{ marginBottom: '24px' }}
                    extra={
                        <div>
                            <ScSpread
                                onClick={() => setFormData({ ...formData, card1: !formData.card1 })}
                            />
                            <ScFullScreen
                                onClick={() => fullScreen(document.getElementById('logCard1'))}
                            />
                        </div>
                    }
                >
                    {!formData.card1 ? (
                        <Tabs type="card">
                            <TabPane tab="告警记录列表" key="1" onChange={onChangeList}>
                                <WarningList
                                    page="log"
                                    recordReadyTime={recordReadyTime}
                                    queryWarning={queryWarning}
                                    queryLog={queryLog}
                                    spreadWarning={(val, source) => {
                                        if (source.indexOf('log') !== -1) {
                                            const newVal = val;
                                            newVal.threatWarnAnalysisId = val.id;
                                            setFormData({
                                                ...formData,
                                                card3: false,
                                                source,
                                                listRecord: newVal,
                                            });
                                        } else {
                                            setFormData({ ...formData, card2: false, source });
                                        }
                                    }}
                                    warningList={warningList}
                                    getWarningList={getWarningList}
                                />
                            </TabPane>
                            <TabPane tab="日志记录列表" key="2">
                                <Button
                                    type="primary"
                                    style={{ marginBottom: 16 }}
                                    onClick={() => {
                                        // recordReadyTime({ logReadyTime: moment().format('x') });
                                        // setFormData({
                                        //     ...formData,
                                        //     card3: false,
                                        //     source: 'logEdit',
                                        // });
                                    }}
                                >
                                    新建日志分析记录
                                </Button>
                                <LogList
                                    recordReadyTime={recordReadyTime}
                                    page="log"
                                    spreadWarning={(val, source) =>
                                        setFormData({ ...formData, card3: false, source })
                                    }
                                    queryLog={queryLog}
                                    logList={logList}
                                    getLogList={getLogList}
                                />
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
                <Drawer
                    title="告警分析记录"
                    visible={!formData.card2}
                    width={500}
                    style={{
                        fontFamily: 'PingFangSC-Regular',
                        fontSize: '14px',
                    }}
                    onClose={() => setFormData({ ...formData, card2: true })}
                >
                    <WarningAnalyseRecord warningRecord={warningRecord} />
                </Drawer>
                {formData.source === 'logEdit' ? (
                    <Modal
                        title="日志分析记录"
                        visible={!formData.card3}
                        width={1000}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        footer={null}
                        onCancel={() => setFormData({ ...formData, card3: true })}
                    >
                        <LogAddEdit
                            getProject={getProject}
                            projectList={projectList}
                            readyTimeList={readyTimeList}
                            listRecord={formData.listRecord}
                            addLog={addLog}
                            logRecord={logRecord}
                            onOk={() => setFormData({ ...formData, card3: true })}
                            onCancel={() => setFormData({ ...formData, card3: true })}
                        />
                    </Modal>
                ) : (
                    <Drawer
                        title="日志分析记录"
                        visible={!formData.card3}
                        width={500}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        onClose={() => setFormData({ ...formData, card3: true })}
                    >
                        <LogAnalyseRecord logRecord={logRecord} />
                    </Drawer>
                )}
            </ScContent>
        </>
    );
};
Log.propTypes = {
    getWarningList: PropTypes.func,
    getLogList: PropTypes.func,
    warningList: PropTypes.object,
    logList: PropTypes.object,
    addLog: PropTypes.func,
    queryWarning: PropTypes.func,
    queryLog: PropTypes.func,
    warningRecord: PropTypes.object,
    logRecord: PropTypes.object,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
    getProject: PropTypes.func,
    projectList: PropTypes.array,
};

const mapStateToProps = (state) => ({
    warningList: state.analysis.warningList,
    warningRecord: state.analysis.warningRecord,
    logList: state.analysis.logList,
    logRecord: state.analysis.logRecord,
    readyTimeList: state.analysis.readyTimeList,
    projectList: state.analysis.projectList,
});

const mapDispatchToProps = (dispatch) => ({
    getWarningList: () => {
        dispatch(getWarningListAction());
    },
    queryWarning: (params) => {
        dispatch(queryWarningAction(params));
    },
    addLog: (params) => {
        dispatch(addLogAction(params));
    },
    getLogList: () => {
        dispatch(getLogListAction());
    },
    queryLog: (params) => {
        dispatch(queryLogAction(params));
    },
    recordReadyTime: (payload) => {
        dispatch(recordReadyTimeAction(payload));
    },
    getProject: (payload) => {
        dispatch(getProjectAction(payload));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Log);
