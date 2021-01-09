import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import moment from 'moment';
import { Card, Button, Tag, Tabs, Modal, Upload, message, Drawer } from 'antd';
import WarningEventRecord from '../../components/WarningEventRecord';
import WarningList from '../../components/Warning/WarningList';
import WarningAnalyseRecord from '../../components/Warning/WarningAnalyseRecord';
import WarningAddEdit from '../../components/Warning/WarningAddEdit';
import { ScContent, ScChanged, ScSpread, ScFullScreen } from '../../style';
import {
    warningEventAction,
    addWarningAction,
    getChoosePropertyAction,
    clearPropertyAction,
    getWarningListAction,
    queryWarningAction,
    addLogAction,
    getLogListAction,
    queryLogAction,
    recordReadyTimeAction,
    getProjectAction,
} from '../../action';

const { TabPane } = Tabs;

const Warning = (props) => {
    const {
        getWarningEvent,
        addWarning,
        getWarningList,
        warningEvent,
        warningList,
        chooseProperty,
        clearProperty,
        getChooseProperty,
        warningRecordSource,
        warningRecord,
        queryWarning,
        global,
        readyTimeList,
        recordReadyTime,
        getProject,
        projectList,
    } = props;

    const [formData, setFormData] = useState({
        card1: false,
        card2: true,
        source: 'warningEdit',
        isFullScreen: false,
    });

    useEffect(() => {
        // getWarningEvent({
        //     ...warningEvent.params,
        //     param: { destIps: [] },
        // });
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
        if (activeKey === '2') {
            getWarningList();
        }
    };
    return (
        <>
            <ScContent>
                <Card
                    id="warningCard1"
                    title={
                        <>
                            告警事件选择
                            <ScChanged>
                                已选
                                <Button type="link">
                                    {chooseProperty ? chooseProperty.length : 0}
                                </Button>
                                项
                            </ScChanged>
                            <span>
                                {chooseProperty &&
                                    chooseProperty.length > 0 &&
                                    chooseProperty.map((item, index) => (
                                        <Tag closable key={`${item}-${index.toString()}`}>
                                            {item}
                                        </Tag>
                                    ))}
                            </span>
                            <Button type="link" onClick={() => clearProperty()}>
                                清空
                            </Button>
                        </>
                    }
                    bordered={false}
                    style={{ marginBottom: '24px' }}
                    extra={
                        <div>
                            <ScSpread
                                onClick={() => setFormData({ ...formData, card1: !formData.card1 })}
                            />
                            <ScFullScreen
                                onClick={() => fullScreen(document.getElementById('warningCard1'))}
                            />
                        </div>
                    }
                >
                    {!formData.card1 ? (
                        <Tabs type="card" onChange={onChangeList}>
                            <TabPane tab="告警事件列表" key="1">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button
                                        type="primary"
                                        style={{ marginBottom: 16 }}
                                        onClick={() => {
                                            // recordReadyTime({
                                            //     warningReadyTime: moment().format('x'),
                                            // });
                                            // setFormData({
                                            //     ...formData,
                                            //     card2: false,
                                            //     source: 'warningEdit',
                                            // });
                                        }}
                                    >
                                        添加告警分析记录
                                    </Button>
                                    <Upload
                                        action="/api/threat/warnEvents/excel/import"
                                        accept=".xls,.xlsx"
                                        method="post"
                                        onChange={(info) => {
                                            if (info.file.status !== 'uploading') {
                                                console.log(info.file, info.fileList);
                                            }
                                            if (info.file.status === 'done') {
                                                message.success(`${info.file.name} file`);
                                                getWarningEvent(warningEvent.params);
                                            } else if (info.file.status === 'error') {
                                                message.error(`${info.file.name} file uploa`);
                                            }
                                        }}
                                    >
                                        <Button style={{ marginBottom: 16 }}>导入</Button>
                                    </Upload>
                                </div>
                                <WarningEventRecord
                                    getChooseWarningProperty={getChooseProperty}
                                    getWarningEvent={getWarningEvent}
                                    warningEvent={warningEvent}
                                />
                            </TabPane>
                            <TabPane tab="告警记录列表" key="2">
                                <WarningList
                                    page="warning"
                                    recordReadyTime={recordReadyTime}
                                    queryWarning={queryWarning}
                                    warningList={warningList}
                                    getWarningList={getWarningList}
                                    spreadWarning={(v, source) =>
                                        setFormData({ ...formData, card2: false, source })
                                    }
                                />
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
                {formData.source === 'warningEdit' ? (
                    <Modal
                        title="告警分析记录"
                        visible={!formData.card2}
                        width={1000}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        footer={null}
                        onCancel={() => setFormData({ ...formData, card2: true })}
                    >
                        <WarningAddEdit
                            getProject={getProject}
                            projectList={projectList}
                            readyTimeList={readyTimeList}
                            global={global}
                            onOk={() => setFormData({ ...formData, card2: true })}
                            onCancel={() => setFormData({ ...formData, card2: true })}
                            addWarning={addWarning}
                            warningRecord={warningRecord}
                            warningRecordSource={warningRecordSource}
                        />
                    </Modal>
                ) : (
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
                        <WarningAnalyseRecord
                            queryWarning={queryWarning}
                            warningRecord={warningRecord}
                        />
                    </Drawer>
                )}
            </ScContent>
        </>
    );
};

Warning.propTypes = {
    getChooseProperty: PropTypes.func,
    getWarningEvent: PropTypes.func,
    addWarning: PropTypes.func,
    clearProperty: PropTypes.func,
    getWarningList: PropTypes.func,
    queryWarning: PropTypes.func,
    warningEvent: PropTypes.object,
    chooseProperty: PropTypes.array,
    warningRecordSource: PropTypes.array,
    warningList: PropTypes.object,
    warningRecord: PropTypes.object,
    global: PropTypes.object,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
    getProject: PropTypes.func,
    projectList: PropTypes.array,
};

const mapStateToProps = (state) => ({
    warningEvent: state.analysis.warningEvent,
    chooseProperty: state.analysis.chooseProperty,
    warningList: state.analysis.warningList,
    warningRecord: state.analysis.warningRecord,
    warningRecordSource: state.analysis.warningRecordSource,
    logList: state.analysis.logList,
    logRecord: state.analysis.logRecord,
    readyTimeList: state.analysis.readyTimeList,
    projectList: state.analysis.projectList,
    global: state.global,
});

const mapDispatchToProps = (dispatch) => ({
    getWarningEvent: (params) => {
        dispatch(warningEventAction(params));
    },
    addWarning: (params) => {
        dispatch(addWarningAction(params));
    },
    getChooseProperty: (params) => {
        dispatch(getChoosePropertyAction(params));
    },
    clearProperty: () => {
        dispatch(clearPropertyAction());
    },
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

export default compose(withConnect, memo)(Warning);
