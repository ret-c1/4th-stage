import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Steps, Button } from 'antd';
import { searchParams } from '@utils/searchParams';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { ScFooterToolbar, ScSection } from '../style';
import {
    saveIdAction,
    getChooseWarningPropertyAction,
    clearWarningPropertyAction,
    gotoStepAction,
    getChoosePropertyAction,
    clearPropertyAction,
    checkPropertyDetailAction,
    changePropertyModalAction,
    situationAction,
    warningEventAction,
    addWarningAction,
    addLogAction,
    addEventAction,
    getWarningListAction,
    getLogListAction,
    getEventListAction,
    getResultListAction,
    queryWarningAction,
    queryLogAction,
    queryEventAction,
    recordReadyTimeAction,
} from '../action';

const { Step } = Steps;

class Troubleshooting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const threatId = parseInt(searchParams().threatId, 10);
        const planId = parseInt(searchParams().planId, 10);
        const projectId = parseInt(searchParams().projectId, 10);
        this.props.saveId({ threatId, planId, projectId });
        this.props.getSituation({ threatId, planId });
    }

    changeNextCurrent = (v) => {
        if (v < 4) {
            this.props.gotoStep(v + 1);
        }
    };

    changePrevCurrent = (v) => {
        if (v > 0) {
            this.props.gotoStep(v - 1);
        }
    };

    finishPage = () => {
        this.changeNextCurrent(this.props.currentStep);
        if (this.props.global.role.includes('项目经理')) {
            this.props.gotoStep(0);
        } else if (this.props.global.role.includes('工程师')) {
            window.location.href = '/';
        }
    };

    render() {
        const {
            validId,
            currentStep,
            troubleAsset,
            getSituation,
            chooseProperty,
            getChooseProperty,
            clearProperty,
            propertyModal,
            changePropertyModal,
            checkPropertyDetail,
            assetRecordSource,
            warningRecordSource,
            warningEvent,
            getWarningEvent,
            warningResult,
            getChooseWarningProperty,
            clearWarningProperty,
            chooseWarningProperty,
            warningList,
            logList,
            eventList,
            resultList,
            getWarningList,
            getLogList,
            getEventList,
            getResultList,
            warningRecord,
            logRecord,
            eventRecord,
            queryWarning,
            queryLog,
            queryEvent,
            addWarning,
            addLog,
            addEvent,
            global,
            recordReadyTime,
            readyTimeList,
        } = this.props;
        let stepComponent;
        switch (currentStep) {
            case 0:
                stepComponent = (
                    <Step1
                        validId={validId}
                        currentStep={currentStep}
                        troubleAsset={troubleAsset}
                        getSituation={getSituation}
                        getChooseProperty={getChooseProperty}
                        chooseProperty={chooseProperty}
                        clearProperty={clearProperty}
                        checkPropertyDetail={checkPropertyDetail}
                        propertyModal={propertyModal}
                        changePropertyModal={changePropertyModal}
                        getChooseWarningProperty={getChooseWarningProperty}
                        clearWarningProperty={clearWarningProperty}
                        chooseWarningProperty={chooseWarningProperty}
                        warningRecordSource={warningRecordSource}
                        assetRecordSource={assetRecordSource}
                        getWarningEvent={getWarningEvent}
                        warningEvent={warningEvent}
                        getWarningList={getWarningList}
                        warningList={warningList}
                        queryWarning={queryWarning}
                        warningRecord={warningRecord}
                        addWarning={addWarning}
                        global={global}
                        recordReadyTime={recordReadyTime}
                        readyTimeList={readyTimeList}
                    />
                );
                break;
            case 1:
                stepComponent = (
                    <Step2
                        validId={validId}
                        currentStep={currentStep}
                        getSituation={getSituation}
                        troubleAsset={troubleAsset}
                        getChooseProperty={getChooseProperty}
                        chooseProperty={chooseProperty}
                        clearProperty={clearProperty}
                        checkPropertyDetail={checkPropertyDetail}
                        propertyModal={propertyModal}
                        changePropertyModal={changePropertyModal}
                        assetRecordSource={assetRecordSource}
                        getWarningList={getWarningList}
                        warningList={warningList}
                        warningResult={warningResult}
                        warningRecord={warningRecord}
                        getLogList={getLogList}
                        logList={logList}
                        logRecord={logRecord}
                        queryWarning={queryWarning}
                        queryLog={queryLog}
                        addWarning={addWarning}
                        addLog={addLog}
                        recordReadyTime={recordReadyTime}
                        readyTimeList={readyTimeList}
                    />
                );
                break;
            case 2:
                stepComponent = (
                    <Step3
                        validId={validId}
                        getSituation={getSituation}
                        troubleAsset={troubleAsset}
                        getChooseProperty={getChooseProperty}
                        chooseProperty={chooseProperty}
                        clearProperty={clearProperty}
                        currentStep={currentStep}
                        warningResult={warningResult}
                        checkPropertyDetail={checkPropertyDetail}
                        propertyModal={propertyModal}
                        changePropertyModal={changePropertyModal}
                        logList={logList}
                        getLogList={getLogList}
                        warningList={warningList}
                        getWarningList={getWarningList}
                        eventList={eventList}
                        getEventList={getEventList}
                        warningRecord={warningRecord}
                        logRecord={logRecord}
                        eventRecord={eventRecord}
                        queryWarning={queryWarning}
                        queryLog={queryLog}
                        queryEvent={queryEvent}
                        addWarning={addWarning}
                        addLog={addLog}
                        addEvent={addEvent}
                        assetRecordSource={assetRecordSource}
                        recordReadyTime={recordReadyTime}
                        readyTimeList={readyTimeList}
                    />
                );
                break;
            default:
                stepComponent = (
                    <Step4
                        validId={validId}
                        currentStep={currentStep}
                        resultList={resultList}
                        getResultList={getResultList}
                        eventRecord={eventRecord}
                        queryEvent={queryEvent}
                    />
                );
                break;
        }
        return (
            <ScSection>
                <Card bordered={false}>
                    <Steps current={currentStep}>
                        <Step title="告警分析" />
                        <Step title="日志分析" />
                        <Step title="事件研判" />
                        <Step title="排查完成" />
                    </Steps>
                </Card>
                <div style={{ marginBottom: 80 }}>{stepComponent}</div>
                <ScFooterToolbar>
                    <div style={{ float: 'right', marginTop: '10px' }}>
                        {currentStep !== 0 && currentStep !== 3 && (
                            <>
                                <Button
                                    style={{ marginRight: '10px' }}
                                    onClick={() => this.props.gotoStep(0)}
                                >
                                    取消
                                </Button>
                                <Button
                                    style={{ marginRight: '10px' }}
                                    onClick={() => this.changePrevCurrent(currentStep)}
                                >
                                    上一步
                                </Button>
                            </>
                        )}
                        {currentStep !== 3 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.changeNextCurrent(currentStep);
                                    this.props.clearProperty();
                                }}
                            >
                                下一步
                            </Button>
                        )}
                        {currentStep === 3 && (
                            <Button type="primary" onClick={() => this.finishPage()}>
                                继续排查
                            </Button>
                        )}
                    </div>
                </ScFooterToolbar>
            </ScSection>
        );
    }
}
Troubleshooting.propTypes = {
    getSituation: PropTypes.func,
    getChooseProperty: PropTypes.func,
    getChooseWarningProperty: PropTypes.func,
    getWarningEvent: PropTypes.func,
    addWarning: PropTypes.func,
    addLog: PropTypes.func,
    addEvent: PropTypes.func,
    clearProperty: PropTypes.func,
    clearWarningProperty: PropTypes.func,
    checkPropertyDetail: PropTypes.func,
    changePropertyModal: PropTypes.func,
    getWarningList: PropTypes.func,
    getLogList: PropTypes.func,
    getEventList: PropTypes.func,
    getResultList: PropTypes.func,
    troubleAsset: PropTypes.object,
    warningEvent: PropTypes.object,
    chooseProperty: PropTypes.array,
    chooseWarningProperty: PropTypes.array,
    assetRecordSource: PropTypes.array,
    warningRecordSource: PropTypes.array,
    warningResult: PropTypes.bool,
    propertyModal: PropTypes.object,
    warningList: PropTypes.object,
    logList: PropTypes.object,
    eventList: PropTypes.object,
    resultList: PropTypes.object,
    gotoStep: PropTypes.func,
    currentStep: PropTypes.number,
    queryWarning: PropTypes.func,
    queryLog: PropTypes.func,
    queryEvent: PropTypes.func,
    warningRecord: PropTypes.object,
    logRecord: PropTypes.object,
    eventRecord: PropTypes.object,
    saveId: PropTypes.func,
    validId: PropTypes.object,
    global: PropTypes.object,
    readyTimeList: PropTypes.object,
    recordReadyTime: PropTypes.func,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxInfo: state.global.useinfo,
    validId: state.threat.validId,
    chooseProperty: state.threat.chooseProperty,
    chooseWarningProperty: state.threat.chooseWarningProperty,
    propertyModal: state.threat.propertyModal,
    currentStep: state.threat.currentStep,
    assetRecordSource: state.threat.assetRecordSource,
    warningRecordSource: state.threat.warningRecordSource,
    troubleAsset: state.threat.troubleAsset,
    warningEvent: state.threat.warningEvent,
    warningList: state.threat.warningList,
    logList: state.threat.logList,
    eventList: state.threat.eventList,
    warningRecord: state.threat.warningRecord,
    logRecord: state.threat.logRecord,
    eventRecord: state.threat.eventRecord,
    resultList: state.threat.resultList,
    readyTimeList: state.threat.readyTimeList,
    global: state.global,
});

const mapDispatchToProps = (dispatch) => ({
    saveId: (payload) => {
        dispatch(saveIdAction(payload));
    },
    gotoStep: (params) => {
        dispatch(gotoStepAction(params));
    },
    getChooseProperty: (params) => {
        dispatch(getChoosePropertyAction(params));
    },
    clearProperty: () => {
        dispatch(clearPropertyAction());
    },
    getChooseWarningProperty: (params) => {
        dispatch(getChooseWarningPropertyAction(params));
    },
    clearWarningProperty: () => {
        dispatch(clearWarningPropertyAction());
    },
    checkPropertyDetail: (id) => {
        dispatch(checkPropertyDetailAction(id));
    },
    changePropertyModal: () => {
        dispatch(changePropertyModalAction());
    },
    getSituation: (params) => {
        dispatch(situationAction(params));
    },
    getWarningEvent: (params) => {
        dispatch(warningEventAction(params));
    },
    getWarningList: (params) => {
        dispatch(getWarningListAction(params));
    },
    getLogList: (params) => {
        dispatch(getLogListAction(params));
    },
    getEventList: (params) => {
        dispatch(getEventListAction(params));
    },
    getResultList: (params) => {
        dispatch(getResultListAction(params));
    },
    queryWarning: (params) => {
        dispatch(queryWarningAction(params));
    },
    queryLog: (params) => {
        dispatch(queryLogAction(params));
    },
    queryEvent: (params) => {
        dispatch(queryEventAction(params));
    },
    addWarning: (params, step) => {
        dispatch(addWarningAction(params, step));
    },
    addLog: (params, step) => {
        dispatch(addLogAction(params, step));
    },
    addEvent: (params, step) => {
        dispatch(addEventAction(params, step));
    },
    recordReadyTime: (payload) => {
        dispatch(recordReadyTimeAction(payload));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Troubleshooting);
