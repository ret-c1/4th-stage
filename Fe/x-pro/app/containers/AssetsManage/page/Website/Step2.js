import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Steps, Form } from 'antd';
import { customDot } from '../../components/StepsDot/index';
import { AssetsValueSteps } from '../../styled';
const { Step } = Steps;

const WebsiteStep2Page = () => {
    const [form] = Form.useForm();
    const [confidentiality, setConfidentiality] = useState(0);
    const [integrality, setIntegrality] = useState(0);
    const [availability, setAvailability] = useState(0);
    const [importance, setImportance] = useState(0);
    return (
        <>
            <div
                style={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    width: '591px',
                    height: '40px',
                    marginBottom: '39px',
                    padding: '10px 0 8px 54px',
                }}
            >
                <span
                    style={{
                        fontFamily: 'PingFangSC-Medium',
                        fontSize: 14,
                        color: 'rgba(0, 0, 0, 0.85)',
                        textAlign: 'right',
                        lineHeight: '22px',
                    }}
                >
                    资产价值：
                </span>
                <span
                    style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.10)',
                        borderRadius: '4px',
                        color: 'rgba(0,0,0,0.25)',
                        padding: '1px 8px',
                    }}
                >
                    0.00
                </span>
            </div>
            <Form.Item
                name="confidentiality"
                label="保密性(C)"
                rules={[{ required: true, message: '请选择保密性' }]}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
            >
                <AssetsValueSteps
                    current={confidentiality}
                    progressDot={customDot}
                    onChange={(e) => {
                        setConfidentiality(e);
                        form.setFieldsValue({ confidentiality: e });
                    }}
                    size="small"
                >
                    <Step title="很低" />
                    <Step title="低" />
                    <Step title="中等" />
                    <Step title="高" />
                    <Step title="很高" />
                </AssetsValueSteps>
            </Form.Item>
            <Form.Item
                name="integrality"
                label="完整性(I)"
                rules={[{ required: true, message: '请选择保密性' }]}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
            >
                <AssetsValueSteps
                    current={integrality}
                    progressDot={customDot}
                    onChange={(e) => {
                        setIntegrality(e);
                        form.setFieldsValue({ integrality: e });
                    }}
                    size="small"
                >
                    <Step title="很低" />
                    <Step title="低" />
                    <Step title="中等" />
                    <Step title="高" />
                    <Step title="很高" />
                </AssetsValueSteps>
            </Form.Item>
            <Form.Item
                name="availability"
                label="可用性(A)"
                rules={[{ required: true, message: '请选择保密性' }]}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
            >
                <AssetsValueSteps
                    current={availability}
                    progressDot={customDot}
                    onChange={(e) => {
                        setAvailability(e);
                        form.setFieldsValue({ availability: e });
                    }}
                    size="small"
                >
                    <Step title="很低" />
                    <Step title="低" />
                    <Step title="中等" />
                    <Step title="高" />
                    <Step title="很高" />
                </AssetsValueSteps>
            </Form.Item>
            <Form.Item
                name="importance"
                label="业务重要性"
                rules={[{ required: true, message: '请选择保密性' }]}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 10 }}
            >
                <AssetsValueSteps
                    current={importance}
                    progressDot={customDot}
                    onChange={(e) => {
                        setImportance(e);
                        form.setFieldsValue({ importance: e });
                    }}
                    size="small"
                >
                    <Step title="1级" />
                    <Step title="2级" />
                    <Step title="3级" />
                    <Step title="4级" />
                    <Step title="5级" />
                </AssetsValueSteps>
            </Form.Item>
        </>
    );
};

// ComputingDeviceStep2Page.propTypes = {
//     getFormStatus: PropTypes.func,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(WebsiteStep2Page);
