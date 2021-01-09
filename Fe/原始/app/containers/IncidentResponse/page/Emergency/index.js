import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Steps, Button } from 'antd';
import { searchParams } from '@utils/searchParams';
import PubMessage from '@components/PubMessage';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { ScStepWrapper, ScEmergencySteps, ScItWrapper, ScFooterWrapper } from './styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { getEmergencyInfo, editEmergency, commitEmergency } from '../api';

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

const EmergencyPage = ({ rxInfo }) => {
    const { id, eventId } = searchParams();
    const history = useHistory();
    // 获取应急信息
    const [info, setInfo] = useState({});
    // 获取报告信息
    const [reportInfo, setReportInfo] = useState({});
    const [reportId, setReportId] = useState(0);
    // 当提交或者保存过后需要重新获取
    const [isSave, setIsSave] = useState(false);
    useEffect(() => {
        getEmergencyInfo(id).then((res) => {
            if (res.code === 200) {
                const reportData = { ...res.data };
                // 以下为一些报告字段
                reportData.相关说明 = `本文档是由“”于${moment(
                    reportData.realDiscoverTime,
                ).format('YYYY-MM-DD')}针对${reportData.clientName ||
                    ''}${reportData.intranetSystem || ''}进行应急响应工作所提交的报告资料`;
                reportData.事件概述 = `${moment(reportData.realDiscoverTime).format(
                    'YYYY-MM-DD',
                )},“”接到${reportData.clientName ||
                    ''}相关工作人员电话，告知${reportData.introduction ||
                    ''}，请求对该系统进行应急响应，项目经理${reportData.emergencyManager ||
                    ''}派安全工程师${
                    reportData.emergencyPerson
                        ? reportData.emergencyPerson.split(',').join('、')
                        : ''
                }进行远程应急，通过对服务器相关信息进行分析基本还原了大概过程。`;
                // 设置到报告信息
                setReportInfo({ ...reportInfo, ...reportData });
                setReportId(res.data.reportId);
                setInfo(res.data);
                // // 请求成功获取报告Id，然后获取报告信息
                // getReportDetail({ id: res.data.reportId }).then((reportRes) => {
                //     if (reportRes.code === 200) {
                //         setReportInfo({ ...reportInfo, ...reportRes.data });
                //     } else {
                //         PubMessage('error', res.message);
                //     }
                // });
            } else {
                PubMessage('error', res.message);
            }
        });
    }, [isSave]);

    // 进度条控制
    const currentStep = eventId ? 0 : 1;
    const [current, setCurrent] = useState(currentStep);
    const next = () => {
        setCurrent((prevCurrent) => prevCurrent + 1);
    };

    const prev = () => {
        setCurrent((prevCurrent) => prevCurrent - 1);
    };
    let stepComponent;
    const formInfoRef = useRef(null);
    switch (current) {
        case 0:
            stepComponent = <Step1 id={id} eventId={eventId} emergencyInfo={info} />;
            break;
        case 1:
            stepComponent = (
                <Step2 id={id} info={info} eventId={eventId} formInfoRef={formInfoRef} />
            );
            break;
        case 2:
            stepComponent = <Step3 info={reportInfo} manager={rxInfo.name} />;
            break;
        case 3:
            stepComponent = <Step4 prev={prev} id={id} reportId={reportId} />;
            break;
        default:
            stepComponent = <Step1 id={id} eventId={eventId} />;
            break;
    }

    // 点击创建，创建一条应急
    const createEmergency = () => {
        setCurrent((prevCurrent) => prevCurrent + 1);
    };

    // 提交表单数据
    const submitForm = () => {
        const requestParam = formInfoRef.current.formInfo;
        const checkLists = requestParam.checklistDTOS;
        // 修改传过来的ids
        const engineerIds = requestParam.emergencyPersonIds.split(',');
        requestParam.engineerIds = engineerIds;
        delete requestParam.emergencyPersonIds;
        requestParam.checkLists = checkLists;
        // 把自己创建的checkList的id删除
        requestParam.checkLists.map((item) => {
            const newItem = item;
            if (newItem.id) {
                if (newItem.id.toString().includes('_')) {
                    delete newItem.id;
                }
            }
            if (newItem.data) {
                // 去除data里自己的id
                newItem.data.map((ele) => {
                    const newEle = ele;
                    if (newEle.id) {
                        if (newEle.id.toString().includes('_')) {
                            delete newEle.id;
                        }
                    }
                    return newEle;
                });
            }
            return newItem;
        });
        delete requestParam.checklistDTOS;
        // 开始提交
        editEmergency(requestParam).then((res) => {
            if (res.code === 200) {
                PubMessage('success', '保存成功');
                setIsSave(!isSave);
            } else {
                PubMessage('error', res.message);
            }
        });
    };

    return (
        <div>
            <ScStepWrapper>
                <ScEmergencySteps current={current} style={{ width: '70%', margin: '20px auto' }}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </ScEmergencySteps>
            </ScStepWrapper>
            <ScItWrapper>
                <div className="steps-content">{stepComponent}</div>
            </ScItWrapper>
            {current !== steps.length - 1 && (
                <ScFooterWrapper>
                    <div className="steps-action" style={{ float: 'right' }}>
                        {current >= 0 && (
                            <Button
                                onClick={() => {
                                    history.go(-1);
                                }}
                            >
                                取消
                            </Button>
                        )}
                        {/* 等于1 有事件的时候 有返回上一步 (等于1 没有事件的时候 没有返回上一步) 等于2 有返回上一步 */}
                        {current === 2 || (current === 1 && eventId) ? (
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
                        ) : null}
                        {current < steps.length - 1 && current !== 0 && (
                            <Button
                                type="primary"
                                onClick={() => {
                                    if (current === 1) {
                                        submitForm();
                                        next();
                                    }
                                    if (current === 2) {
                                        // 提交应急
                                        commitEmergency({ id }).then((res) => {
                                            if (res.code === 200) {
                                                PubMessage('success', '提交成功');
                                                next();
                                            } else {
                                                PubMessage('error', res.message);
                                            }
                                        });
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
                                    createEmergency();
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                创建
                            </Button>
                        )}
                    </div>
                </ScFooterWrapper>
            )}
        </div>
    );
};

EmergencyPage.propTypes = {
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(EmergencyPage);
