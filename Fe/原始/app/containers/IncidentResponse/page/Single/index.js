import React, { useState, memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Steps, Button } from 'antd';
// import PubMessage from '@components/PubMessage';
// import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { StepWrapper, EmergencyStyledSteps, ItWrapper, FooterWrapper } from './styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
// import { getEmergencyInfo, editEmergency, commitEmergency } from '../api';

const { Step } = Steps;

const steps = [
    {
        title: '创建应急',
    },
    {
        title: '应急排查',
    },
    {
        title: '提交应急',
    },
    {
        title: '应急完成',
    },
];

const EmergencyPage = () => {
    const history = useHistory();
    // 进度条控制
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent((prevCurrent) => prevCurrent + 1);
    };

    const prev = () => {
        setCurrent((prevCurrent) => prevCurrent - 1);
    };
    let stepComponent;
    // const formInfoRef = useRef(null);
    switch (current) {
        case 0:
            stepComponent = <Step1 />;
            break;
        case 1:
            stepComponent = <Step2 />;
            break;
        case 2:
            stepComponent = <Step3 />;
            break;
        case 3:
            stepComponent = <Step4 prev={prev} />;
            break;
        default:
            stepComponent = <Step1 />;
            break;
    }

    // 提交表单数据
    const submitForm = () => {
        // const requestParam = formInfoRef.current.formInfo;
        // const checkLists = requestParam.checklistDTOS;
        // // 修改传过来的ids
        // const engineerIds = requestParam.emergencyPersonIds.split(',');
        // requestParam.engineerIds = engineerIds;
        // delete requestParam.emergencyPersonIds;
        // requestParam.checkLists = checkLists;
        // // 把自己创建的checkList的id删除
        // requestParam.checkLists.map((item) => {
        //     const newItem = item;
        //     if (newItem.id) {
        //         if (newItem.id.toString().includes('_')) {
        //             delete newItem.id;
        //         }
        //     }
        //     if (newItem.data) {
        //         // 去除data里自己的id
        //         newItem.data.map((ele) => {
        //             const newEle = ele;
        //             if (newEle.id) {
        //                 if (newEle.id.toString().includes('_')) {
        //                     delete newEle.id;
        //                 }
        //             }
        //             return newEle;
        //         });
        //     }
        //     return newItem;
        // });
        // delete requestParam.checklistDTOS;
        // // 开始提交
        // editEmergency(requestParam).then((res) => {
        //     if (res.code === 200) {
        //         PubMessage('success', '保存成功');
        //         setIsSave(!isSave);
        //     } else {
        //         PubMessage('error', res.message);
        //     }
        // });
    };

    return (
        <div>
            <StepWrapper>
                <EmergencyStyledSteps
                    current={current}
                    style={{ width: '70%', margin: '20px auto' }}
                >
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </EmergencyStyledSteps>
            </StepWrapper>
            <ItWrapper>
                <div className="steps-content">{stepComponent}</div>
            </ItWrapper>
            {current !== steps.length - 1 && (
                <FooterWrapper style={{ display: 'none' }}>
                    <div className="steps-action" style={{ float: 'right' }}>
                        {current >= 0 && (
                            <Button
                                onClick={() => {
                                    history.push('/incident/event');
                                }}
                            >
                                取消
                            </Button>
                        )}
                        {current < steps.length - 1 && current > 0 && (
                            <Button
                                onClick={() => {
                                    if (current === 1) {
                                        submitForm();
                                        prev();
                                    }
                                    if (current === 2) {
                                        // 提交应急
                                        prev();
                                    }
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                保存并返回上一步
                            </Button>
                        )}
                        {current < steps.length - 1 && current !== 0 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    if (current === 1) {
                                        // submitForm();
                                        next();
                                    }
                                    if (current === 2) {
                                        // 提交应急
                                        // commitEmergency({ id }).then((res) => {
                                        //     if (res.code === 200) {
                                        //         PubMessage('success', '提交成功');
                                        //         next();
                                        //     } else {
                                        //         PubMessage('error', res.message);
                                        //     }
                                        // });
                                    }
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                {current === 2 ? '提交' : '下一步'}
                            </Button>
                        )}
                        {current === 0 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    next();
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                创建
                            </Button>
                        )}
                    </div>
                </FooterWrapper>
            )}
        </div>
    );
};

EmergencyPage.propTypes = {
    // rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(EmergencyPage);
