import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { PageHeader, Button, Form, Row, Col, Steps, Popover } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FormItem from '@components/FormItem';
import { basicFormconfigStep1, basicFormconfigStep3 } from './config';
import { ScCardDetail, ScFooterToolbar } from '../../styled';

const { Step } = Steps;

const WebsiteChangePage = () => {
    console.log('host');
    const history = useHistory();
    const [form] = Form.useForm();
    const [confidentiality, setConfidentiality] = useState(0);
    const [integrality, setIntegrality] = useState(0);
    const [availability, setAvailability] = useState(0);
    const [importance, setImportance] = useState(0);

    const finish = (values) => {
        console.log('values', values);
    };
    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );
    return (
        <Form
            form={form}
            name="change"
            labelCol={{ span: 18 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            onFinish={finish}
        >
            <PageHeader ghost={false} title="变更网站资产" />
            <div
                style={{
                    height: 'calc(100vh - 64px - 54px - 72px - 56px)',
                    marginTop: '8px',
                    overflow: 'auto',
                }}
            >
                <ScCardDetail title="网站信息" bordered={false}>
                    <Row gutter={24}>
                        {basicFormconfigStep1.map((item) => (
                            <Col span={8}>
                                <FormItem
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    options={item.options}
                                    placeholder={item.placeholder}
                                    rules={item.rules}
                                />
                            </Col>
                        ))}
                    </Row>
                </ScCardDetail>
                <ScCardDetail title="安全属性信息" bordered={false}>
                    <div
                        style={{
                            background: 'rgba(0, 0, 0, 0.04)',
                            width: '100%',
                            height: '40px',
                            marginBottom: '39px',
                            padding: '10px 0 8px 24px',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'PingFangSC-Medium',
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.85)',
                                textAlign: 'right',
                                lineHeight: '22px',
                            }}
                        >
                            资产价值：
                        </div>
                        <div
                            style={{
                                width: 41,
                                height: 22,
                                background: '#FFFFFF',
                                border: '1px solid rgba(0, 0, 0, 0.10)',
                                borderRadius: '4px',
                                textAlign: 'center',
                            }}
                        >
                            0.00
                        </div>
                    </div>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="confidentiality"
                                label="保密性(C)"
                                rules={[{ required: true, message: '请选择保密性' }]}
                            >
                                <Steps
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
                                </Steps>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="integrality"
                                label="完整性(I)"
                                rules={[{ required: true, message: '请选择保密性' }]}
                            >
                                <Steps
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
                                </Steps>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="availability"
                                label="可用性(A)"
                                rules={[{ required: true, message: '请选择保密性' }]}
                            >
                                <Steps
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
                                </Steps>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="importance"
                                label="业务重要性"
                                rules={[{ required: true, message: '请选择保密性' }]}
                            >
                                <Steps
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
                                </Steps>
                            </Form.Item>
                        </Col>
                    </Row>
                </ScCardDetail>
                <ScCardDetail title="责任人及位置信息" bordered={false}>
                    <Row gutter={24}>
                        {basicFormconfigStep3.map((item) => (
                            <Col span={8}>
                                <FormItem
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    options={item.options}
                                    placeholder={item.placeholder}
                                    rules={item.rules}
                                />
                            </Col>
                        ))}
                    </Row>
                </ScCardDetail>
            </div>
            <ScFooterToolbar>
                <Row style={{ float: 'right', marginTop: '10px' }}>
                    <Col>
                        <Button style={{ marginRight: '10px' }} onClick={() => history.go(-1)}>
                            取消
                        </Button>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ marginRight: '10px' }}
                            >
                                保存
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </ScFooterToolbar>
        </Form>
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

export default compose(withConnect, memo)(WebsiteChangePage);
