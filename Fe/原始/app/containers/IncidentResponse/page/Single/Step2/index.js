import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import FormItem from '@components/FormItem';
import { Form, Row, Col, Button, Steps } from 'antd';
import { emergencyFormConfig } from './config';
import { steps } from '../config';
import { formAction } from '../utils';
import { ScStepWrapper, ScEmergencySteps, ScItWrapper, ScFooterWrapper } from '../styled';

const { Step } = Steps;

const SingleStep2Page = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const action = formAction.get(); // 获取localstroage的表单
    let step2 = {};
    if (action && action.step2) {
        step2 = action.step2;
    }
    const [formdata] = useState({
        ...step2,
        happenTime: step2.happenTime ? moment(step2.happenTime) : null, // 日期类型需要转换
        realDiscoverTime: step2.realDiscoverTime ? moment(step2.realDiscoverTime) : null, // 日期类型需要转换
    });
    const handleFinish = (fieldsValue) => {
        const froms = {
            ...formdata,
            ...fieldsValue,
            happenTime: fieldsValue.happenTime.format('x'),
            realDiscoverTime: fieldsValue.realDiscoverTime.format('x'),
        };
        // 记录form
        const from = {
            ...action,
            step2: froms,
        };
        formAction.set(from);

        // 第三部
        history.push('/incident/single/step3');
    };
    return (
        <>
            <ScStepWrapper>
                <ScEmergencySteps current={1} style={{ width: '70%', margin: '20px auto' }}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </ScEmergencySteps>
            </ScStepWrapper>
            <ScItWrapper>
                <Form
                    form={form}
                    name="basicInfo"
                    initialValues={formdata}
                    onFinish={handleFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Row style={{ marginTop: '8px' }}>
                        {emergencyFormConfig.map((item, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <Col span={12} key={item.label}>
                                        <FormItem
                                            key={item.label}
                                            label={item.label}
                                            name={item.name}
                                            type={item.type}
                                            options={item.options}
                                            placeholder={item.placeholder}
                                            rules={item.rules}
                                            labelCol={item.labelCol}
                                            wrapperCol={item.wrapperCol}
                                        />
                                    </Col>
                                );
                            }
                            if (item.label === '事件描述') {
                                return (
                                    <Col span={24} key={item.label}>
                                        <FormItem
                                            key={item.label}
                                            label={item.label}
                                            name={item.name}
                                            type={item.type}
                                            options={item.options}
                                            placeholder={item.placeholder}
                                            rules={item.rules}
                                            labelCol={{ span: 2 }}
                                            wrapperCol={{ span: 18 }}
                                        />
                                    </Col>
                                );
                            }
                            return (
                                <Col span={12} key={item.label}>
                                    <FormItem
                                        key={item.label}
                                        label={item.label}
                                        name={item.name}
                                        type={item.type}
                                        options={item.options}
                                        placeholder={item.placeholder}
                                        rules={item.rules}
                                        labelCol={item.labelCol}
                                        wrapperCol={item.wrapperCol}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <ScFooterWrapper>
                        <div className="steps-action" style={{ float: 'right' }}>
                            <Button
                                onClick={() => {
                                    history.push('/incident/event');
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                onClick={() => {
                                    history.push('/incident/single/step1');
                                }}
                                style={{ marginLeft: 8 }}
                            >
                                保存并返回上一步
                            </Button>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                                下一步
                            </Button>
                        </div>
                    </ScFooterWrapper>
                </Form>
            </ScItWrapper>
        </>
    );
};

export default SingleStep2Page;
