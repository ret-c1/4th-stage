import React, { useState } from 'react';
import { Card, Button, Tag, Tabs, Modal, Drawer } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import AssetList from '../../component/AssetList';
import WarningList from '../../component/Warning/WarningList';
import WarningAnalyseRecord from '../../component/Warning/WarningAnalyseRecord';
import LogList from '../../component/Log/LogList';
import LogAnalyseRecord from '../../component/Log/LogAnalyseRecord';
import LogAddEdit from '../../component/Log/LogAddEdit';

import { ScContent, ScChanged, ScSpread, ScFullScreen } from '../../style';

const { TabPane } = Tabs;

const Step2 = (props) => {
    const {
        troubleAsset,
        getChooseProperty,
        chooseProperty,
        clearProperty,
        checkPropertyDetail,
        propertyModal,
        changePropertyModal,
        assetRecordSource,
        currentStep,
        warningList,
        getWarningList,
        logList,
        getLogList,
        queryWarning,
        queryLog,
        warningRecord,
        logRecord,
        addLog,
        validId,
        getSituation,
        recordReadyTime,
        readyTimeList,
    } = props;

    const [formData, setFormData] = useState({
        keys: [1],
        keysChild: [1],
        card1: false,
        card2: true,
        card3: true,
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
    };
    return (
        <>
            <ScContent>
                <Card
                    id="card1"
                    title={
                        <>
                            排查内容选择
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
                                <Button
                                    type="primary"
                                    style={{ marginBottom: 16 }}
                                    onClick={() => {
                                        recordReadyTime({ logReadyTime: moment().format('x') });
                                        setFormData({
                                            ...formData,
                                            card3: false,
                                            source: 'logEdit',
                                        });
                                    }}
                                >
                                    添加日志分析记录
                                </Button>
                                <AssetList
                                    currentStep={currentStep}
                                    troubleAsset={troubleAsset}
                                    getChooseProperty={getChooseProperty}
                                    chooseProperty={chooseProperty}
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
                                    queryLog={queryLog}
                                    warningList={warningList}
                                    getWarningList={getWarningList}
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
                                />
                            </TabPane>
                            <TabPane tab="日志记录列表" key="3">
                                <LogList
                                    page="process"
                                    recordReadyTime={recordReadyTime}
                                    currentStep={currentStep}
                                    queryLog={queryLog}
                                    logList={logList}
                                    getLogList={getLogList}
                                    spreadWarning={(val, source) =>
                                        setFormData({ ...formData, card3: false, source })
                                    }
                                />
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
                <Drawer
                    title="告警分析记录"
                    width={500}
                    style={{
                        fontFamily: 'PingFangSC-Regular',
                        fontSize: '14px',
                    }}
                    visible={!formData.card2}
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
                            readyTimeList={readyTimeList}
                            validId={validId}
                            listRecord={formData.listRecord}
                            chooseProperty={chooseProperty}
                            assetRecordSource={assetRecordSource}
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
Step2.propTypes = {
    currentStep: PropTypes.number,
    troubleAsset: PropTypes.object,
    getChooseProperty: PropTypes.func,
    clearProperty: PropTypes.func,
    checkPropertyDetail: PropTypes.func,
    changePropertyModal: PropTypes.func,
    chooseProperty: PropTypes.array,
    propertyModal: PropTypes.object,
    getWarningList: PropTypes.func,
    warningList: PropTypes.object,
    getLogList: PropTypes.func,
    logList: PropTypes.object,
    queryWarning: PropTypes.func,
    queryLog: PropTypes.func,
    addLog: PropTypes.func,
    warningRecord: PropTypes.object,
    logRecord: PropTypes.object,
    assetRecordSource: PropTypes.array,
    validId: PropTypes.object,
    getSituation: PropTypes.func,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
};
export default Step2;
