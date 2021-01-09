import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import FormItem from '@components/FormItem';
import { Form, Row, Col, Button, Steps, Select } from 'antd';
import { basicFormconfig } from './config';
import CmFuzzySearch from '../components/CmFuzzySearch';
import { steps } from '../config';
import { ScStepWrapper, ScEmergencySteps, ScItWrapper, ScFooterWrapper } from '../styled';
import { formAction } from '../utils';
// import { getEmployee } from '../../api';

const { Option } = Select;
const { Step } = Steps;

const SingleStep1Page = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const action = formAction.get(); // 获取localstroage的表单
    let step1 = {};
    if (action && action.step1) {
        step1 = action.step1;
    }
    const [formdata] = useState({
        ...step1,
        serviceStartTime: step1.serviceStartTime ? moment(step1.serviceStartTime) : null, // 日期类型需要转换
        serviceEndTime: step1.serviceEndTime ? moment(step1.serviceEndTime) : null, // 日期类型需要转换
        discoverTime: step1.discoverTime ? moment(step1.discoverTime) : null, // 日期类型需要转换
    });
    const handleFinish = (fieldsValue) => {
        const forms = {
            ...formdata,
            ...fieldsValue,
            engineerIds: [].concat(fieldsValue.engineerIds),
            serviceStartTime: moment(fieldsValue.serviceStartTime).format('YYYY-MM-DD'),
            serviceEndTime: moment(fieldsValue.serviceEndTime).format('YYYY-MM-DD'),
            discoverTime: moment(fieldsValue.discoverTime).format('x'),
        };
        // 记录表单
        const from = {
            ...action,
            step1: forms,
        };
        formAction.set(from);

        // 下一步
        history.push('/incident/single/step2');
    };

    // 合同类型状态变更
    const [cnoType, setCnoType] = useState('1');
    return (
        <>
            <ScStepWrapper>
                <ScEmergencySteps current={0} style={{ width: '70%', margin: '20px auto' }}>
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
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Row style={{ marginTop: '8px' }}>
                        {basicFormconfig.map((item) => {
                            if (item.label === '合同类型') {
                                return (
                                    <Col span={12}>
                                        <Form.Item
                                            shouldUpdate
                                            key={item.label}
                                            name={item.name}
                                            label={item.label}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder={item.placeholder}
                                                width="100%"
                                                onChange={(val) => {
                                                    setCnoType(val);
                                                }}
                                            >
                                                {item.options.map((val) => (
                                                    <Option key={val.value} value={val.value}>
                                                        {val.text}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.label === '合同编号' && cnoType === '1') {
                                return (
                                    <>
                                        <Col span={8}>
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
                                        <Col xl={{ span: 1, offset: 0 }}>
                                            <Button type="primary" width="100%">
                                                导入合同信息
                                            </Button>
                                        </Col>
                                    </>
                                );
                            }
                            if (item.label === '销售名字') {
                                return (
                                    <Col span={12}>
                                        <Form.Item
                                            shouldUpdate
                                            key={item.label}
                                            name={item.name}
                                            label={item.label}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入销售名字！',
                                                },
                                            ]}
                                        >
                                            <CmFuzzySearch
                                                // api={getEmployee}
                                                name={item.name}
                                                form={form}
                                                needValue="name"
                                            />
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.label === '应急人员') {
                                return (
                                    <Col span={12}>
                                        <Form.Item
                                            key={item.label}
                                            name={item.name}
                                            label={item.label}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入应急人员！',
                                                },
                                            ]}
                                        >
                                            <CmFuzzySearch
                                                // api={getEmployee}
                                                name={item.name}
                                                form={form}
                                            />
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            if (item.label === '项目经理') {
                                return (
                                    <Col span={12}>
                                        <Form.Item
                                            key={item.label}
                                            name={item.name}
                                            label={item.label}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入项目经理！',
                                                },
                                            ]}
                                        >
                                            <CmFuzzySearch
                                                // api={getEmployee}
                                                name={item.name}
                                                form={form}
                                            />
                                        </Form.Item>
                                    </Col>
                                );
                            }
                            return item.label !== '合同编号' ? (
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
                            ) : null;
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

export default SingleStep1Page;
