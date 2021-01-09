import React, { useState } from 'react';
import { Card, Button, Tag, Tabs, Modal, Upload, message, Drawer } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import AssetList from '../../component/AssetList';
import WarningEventRecord from '../../component/WarningEventRecord';
import WarningList from '../../component/Warning/WarningList';
import WarningAnalyseRecord from '../../component/Warning/WarningAnalyseRecord';
import WarningAddEdit from '../../component/Warning/WarningAddEdit';
import { ScContent, ScChanged, ScSpread, ScFullScreen } from '../../style';

const { TabPane } = Tabs;

const Step1 = (props) => {
    const {
        currentStep,
        troubleAsset,
        getChooseProperty,
        chooseProperty,
        clearProperty,
        checkPropertyDetail,
        propertyModal,
        changePropertyModal,
        getChooseWarningProperty,
        clearWarningProperty,
        chooseWarningProperty,
        assetRecordSource,
        getWarningEvent,
        warningEvent,
        warningList,
        getWarningList,
        addWarning,
        queryWarning,
        warningRecord,
        global,
        validId,
        getSituation,
        warningRecordSource,
        recordReadyTime,
        readyTimeList,
    } = props;
    const [formData, setFormData] = useState({
        card1: false,
        card2: true,
        card3: true,
        source: 'warningEdit',
        isFullScreen: false,
        isClear: true,
        isClearEvent: false,
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
                                    // disabled={!chooseProperty.length > 0}
                                    style={{ marginBottom: 16 }}
                                    onClick={() => {
                                        getWarningEvent({
                                            ...warningEvent.params,
                                            param: {
                                                ...warningEvent.params.param,
                                                destIps: chooseProperty,
                                            },
                                        });
                                        setFormData({ ...formData, card1: true, card2: false });
                                    }}
                                >
                                    查询告警事件
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ margin: '0 0 16px 20px' }}
                                    // disabled={!chooseWarningProperty.length > 0}
                                    onClick={() => {
                                        recordReadyTime({ warningReadyTime: moment().format('x') });
                                        setFormData({
                                            ...formData,
                                            card3: false,
                                            source: 'warningEdit',
                                        });
                                    }}
                                >
                                    添加告警分析记录
                                </Button>
                                <AssetList
                                    chooseProperty={chooseProperty}
                                    currentStep={currentStep}
                                    troubleAsset={troubleAsset}
                                    getWarningEvent={getWarningEvent}
                                    warningEvent={warningEvent}
                                    getChooseProperty={getChooseProperty}
                                    checkPropertyDetail={checkPropertyDetail}
                                    propertyModal={propertyModal}
                                    changePropertyModal={changePropertyModal}
                                />
                            </TabPane>
                            <TabPane tab="告警记录列表" key="2">
                                <WarningList
                                    recordReadyTime={recordReadyTime}
                                    readyTimeList={readyTimeList}
                                    currentStep={currentStep}
                                    queryWarning={queryWarning}
                                    warningList={warningList}
                                    getWarningList={getWarningList}
                                    spreadWarning={(val, source) =>
                                        setFormData({ ...formData, card3: false, source })
                                    }
                                />
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
                <Card
                    id="card2"
                    title={
                        <>
                            告警事件选择
                            <ScChanged>
                                已选
                                <Button type="link">
                                    {chooseWarningProperty ? chooseWarningProperty.length : 0}
                                </Button>
                                项
                            </ScChanged>
                            <span>
                                {chooseWarningProperty &&
                                    chooseWarningProperty.length > 0 &&
                                    chooseWarningProperty.map((item, index) => (
                                        <Tag closable key={`${item}-${index.toString()}`}>
                                            {item}
                                        </Tag>
                                    ))}
                            </span>
                            <Button
                                type="link"
                                onClick={() => {
                                    clearWarningProperty();
                                    setFormData({ ...formData, isClearEvent: true });
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
                                onClick={() => setFormData({ ...formData, card2: !formData.card2 })}
                            />
                            <ScFullScreen
                                onClick={() => fullScreen(document.getElementById('card2'))}
                            />
                        </div>
                    }
                >
                    {!formData.card2 ? (
                        <>
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
                                        getWarningEvent({
                                            ...warningEvent.params,
                                            param: {
                                                ...warningEvent.params.param,
                                                destIps: chooseProperty,
                                            },
                                        });
                                    } else if (info.file.status === 'error') {
                                        message.error(`${info.file.name} file upload failed.`);
                                    }
                                }}
                            >
                                <Button style={{ marginBottom: 16 }}>导入</Button>
                            </Upload>
                            <WarningEventRecord
                                chooseWarningProperty={chooseWarningProperty}
                                getChooseWarningProperty={getChooseWarningProperty}
                                getWarningEvent={getWarningEvent}
                                warningEvent={warningEvent}
                            />
                        </>
                    ) : null}
                </Card>
                {formData.source === 'warningEdit' ? (
                    <Modal
                        title="告警分析记录"
                        width={1000}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        visible={!formData.card3}
                        footer={null}
                        onCancel={() => setFormData({ ...formData, card3: true })}
                    >
                        <WarningAddEdit
                            readyTimeList={readyTimeList}
                            validId={validId}
                            global={global}
                            addWarning={addWarning}
                            warningRecord={warningRecord}
                            chooseProperty={chooseProperty}
                            assetRecordSource={assetRecordSource}
                            warningRecordSource={warningRecordSource}
                            onOk={() => setFormData({ ...formData, card3: true })}
                            onCancel={() => setFormData({ ...formData, card3: true })}
                        />
                    </Modal>
                ) : (
                    <Drawer
                        title="告警分析记录"
                        width={500}
                        style={{
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: '14px',
                        }}
                        visible={!formData.card3}
                        onClose={() => setFormData({ ...formData, card3: true })}
                    >
                        <WarningAnalyseRecord warningRecord={warningRecord} />
                    </Drawer>
                )}
            </ScContent>
        </>
    );
};
Step1.propTypes = {
    currentStep: PropTypes.number,
    troubleAsset: PropTypes.object,
    chooseProperty: PropTypes.array,
    getChooseProperty: PropTypes.func,
    clearProperty: PropTypes.func,
    propertyModal: PropTypes.object,
    checkPropertyDetail: PropTypes.func,
    changePropertyModal: PropTypes.func,
    getChooseWarningProperty: PropTypes.func,
    clearWarningProperty: PropTypes.func,
    chooseWarningProperty: PropTypes.array,
    assetRecordSource: PropTypes.array,
    warningRecordSource: PropTypes.array,
    warningEvent: PropTypes.object,
    getWarningEvent: PropTypes.func,
    addWarning: PropTypes.func,
    getWarningList: PropTypes.func,
    warningList: PropTypes.object,
    queryWarning: PropTypes.func,
    warningRecord: PropTypes.object,
    global: PropTypes.object,
    validId: PropTypes.object,
    getSituation: PropTypes.func,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
};
export default Step1;
