import React, { useState } from 'react';
import { Card, Tabs, Modal, Button, Tag, Drawer } from 'antd';
import PropTypes from 'prop-types';
import AssetList from '../../component/AssetList';
import WarningList from '../../component/Warning/WarningList';
import WarningAnalyseRecord from '../../component/Warning/WarningAnalyseRecord';
import LogList from '../../component/Log/LogList';
import LogAnalyseRecord from '../../component/Log/LogAnalyseRecord';
import EventList from '../../component/Event/EventList';
import EventAddEdit from '../../component/Event/EventAddEdit';
import EventAnalyseRecord from '../../component/Event/EventAnalyseRecord';

import { ScContent, ScSpread, ScFullScreen, ScChanged } from '../../style';

const { TabPane } = Tabs;

const Step3 = (props) => {
    const {
        currentStep,
        troubleAsset,
        clearProperty,
        getChooseProperty,
        chooseProperty,
        checkPropertyDetail,
        propertyModal,
        changePropertyModal,
        warningList,
        logList,
        eventList,
        getWarningList,
        getLogList,
        getEventList,
        queryWarning,
        queryLog,
        queryEvent,
        warningRecord,
        logRecord,
        eventRecord,
        addEvent,
        validId,
        getSituation,
        assetRecordSource,
        recordReadyTime,
        readyTimeList,
    } = props;
    const [formData, setFormData] = useState({
        card1: false,
        card2: true,
        card3: true,
        card4: true,
        source: '',
        isFullScreen: false,
        isClear: true,
        listRecord: {},
    });

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
            getSituation(validId);
        }
        if (activeKey === '2') {
            getWarningList(validId);
        }
        if (activeKey === '3') {
            getLogList(validId);
        }
        if (activeKey === '4') {
            getEventList(validId);
        }
    };

    return (
        <>
            <ScContent>
                <Card
                    id="card1"
                    title={
                        <>
                            研判事件选择
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
                            <Button
                                type="link"
                                onClick={() => {
                                    clearProperty();
                                    setFormData({ ...formData, isClear: true });
                                }}
                            >
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
                                onClick={() => fullScreen(document.getElementById('card1'))}
                            />
                        </div>
                    }
                >
                    {!formData.card1 ? (
                        <Tabs type="card" onChange={onChangeList}>
                            <TabPane tab="隐患资产列表" key="1">
                                <AssetList
                                    currentStep={currentStep}
                                    troubleAsset={troubleAsset}
                                    getChooseProperty={getChooseProperty}
                                    chooseProperty={chooseProperty}
                                    clearProperty={clearProperty}
                                    checkPropertyDetail={checkPropertyDetail}
                                    propertyModal={propertyModal}
                                    changePropertyModal={changePropertyModal}
                                />
                            </TabPane>
                            <TabPane tab="告警记录列表" key="2">
                                <WarningList
                                    page="process"
                                    recordReadyTime={recordReadyTime}
                                    currentStep={currentStep}
                                    queryWarning={queryWarning}
                                    queryEvent={queryEvent}
                                    warningList={warningList}
                                    getWarningList={getWarningList}
                                    spreadWarning={(val, source) => {
                                        if (source.indexOf('event') !== -1) {
                                            const newVal = val;
                                            newVal.threatWarnAnalysisId = val.id;
                                            setFormData({
                                                ...formData,
                                                card4: false,
                                                source,
                                                listRecord: newVal,
                                            });
                                        } else {
                                            setFormData({ ...formData, card2: false, source });
                                        }
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="日志记录列表" key="3">
                                <LogList
                                    page="process"
                                    recordReadyTime={recordReadyTime}
                                    currentStep={currentStep}
                                    queryLog={queryLog}
                                    queryEvent={queryEvent}
                                    logList={logList}
                                    getLogList={getLogList}
                                    spreadWarning={(val, source) => {
                                        if (source.indexOf('event') !== -1) {
                                            const newVal = val;
                                            newVal.threatLogAnalysisId = val.id;
                                            setFormData({
                                                ...formData,
                                                card4: false,
                                                source,
                                                listRecord: newVal,
                                            });
                                        } else {
                                            setFormData({ ...formData, card3: false, source });
                                        }
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="研判记录列表" key="4">
                                <EventList
                                    page="process"
                                    recordReadyTime={recordReadyTime}
                                    queryEvent={queryEvent}
                                    eventList={eventList}
                                    getEventList={getEventList}
                                    spreadWarning={(val, source) =>
                                        setFormData({
                                            ...formData,
                                            card4: false,
                                            source,
                                        })
                                    }
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
                {formData.source === 'eventEdit' ? (
                    <Modal
                        title="事件研判记录"
                        visible={!formData.card4}
                        width={1000}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        footer={null}
                        onCancel={() => setFormData({ ...formData, card4: true })}
                    >
                        <EventAddEdit
                            readyTimeList={readyTimeList}
                            listRecord={formData.listRecord}
                            chooseProperty={chooseProperty}
                            assetRecordSource={assetRecordSource}
                            validId={validId}
                            addEvent={addEvent}
                            eventRecord={eventRecord}
                            onOk={() => setFormData({ ...formData, card4: true })}
                            onCancel={() => setFormData({ ...formData, card4: true })}
                        />
                    </Modal>
                ) : (
                    <Drawer
                        title="事件研判记录"
                        visible={!formData.card4}
                        width={500}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        onClose={() => setFormData({ ...formData, card4: true })}
                    >
                        <EventAnalyseRecord eventRecord={eventRecord} />
                    </Drawer>
                )}
            </ScContent>
        </>
    );
};
Step3.propTypes = {
    currentStep: PropTypes.number,
    warningList: PropTypes.object,
    logList: PropTypes.object,
    eventList: PropTypes.object,
    getWarningList: PropTypes.func,
    getLogList: PropTypes.func,
    getEventList: PropTypes.func,
    queryWarning: PropTypes.func,
    queryLog: PropTypes.func,
    queryEvent: PropTypes.func,
    addEvent: PropTypes.func,
    warningRecord: PropTypes.object,
    logRecord: PropTypes.object,
    eventRecord: PropTypes.object,
    troubleAsset: PropTypes.object,
    getChooseProperty: PropTypes.func,
    clearProperty: PropTypes.func,
    checkPropertyDetail: PropTypes.func,
    changePropertyModal: PropTypes.func,
    chooseProperty: PropTypes.array,
    propertyModal: PropTypes.object,
    validId: PropTypes.object,
    getSituation: PropTypes.func,
    assetRecordSource: PropTypes.array,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
};
export default Step3;
