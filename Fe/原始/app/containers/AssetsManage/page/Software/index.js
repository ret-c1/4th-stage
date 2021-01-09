import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { Steps, Button, PageHeader, Form } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { ScFooterToolbar, ScCard, ScSteps } from '../../styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

const SoftwarePage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [isSubmit, changeIsSubmit] = useState(false);
    const [currentStep, changeStep] = useState(0);
    const changePage = (type) => {
        if (type === 'back') {
            if (currentStep === 0) {
                history.push('/project/assets');
            } else {
                changeStep(currentStep - 1);
            }
        } else {
            changeStep(currentStep + 1);
        }
    };
    const onFinish = (values) => {
        if (isSubmit) {
            console.log(values);
        }
        changePage('go');
    };

    return (
        <>
            <PageHeader ghost={false} title="新增软件资产">
                <ScSteps>
                    <Steps current={currentStep}>
                        <Step title="软件信息" />
                        <Step title="责任人信息" />
                        <Step title="完成" />
                    </Steps>
                </ScSteps>
            </PageHeader>
            <Form form={form} name="stepForm" onFinish={onFinish}>
                <ScCard>
                    <div style={{ width: '70%', margin: '0 auto' }}>
                        {currentStep === 0 && <Step1 />}
                        {currentStep === 1 && <Step2 />}
                        {currentStep === 2 && <Step3 />}
                    </div>
                </ScCard>
                {currentStep !== 2 && (
                    <ScFooterToolbar>
                        <div style={{ float: 'right', marginTop: '10px' }}>
                            <Button
                                style={{ marginRight: '10px' }}
                                onClick={() => changePage('back')}
                            >
                                取消
                            </Button>
                            {currentStep === 1 ? (
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                    onClick={() => changeIsSubmit(true)}
                                >
                                    提交
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                    onClick={() => changeIsSubmit(false)}
                                >
                                    下一步
                                </Button>
                            )}
                        </div>
                    </ScFooterToolbar>
                )}
            </Form>
        </>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(SoftwarePage);
