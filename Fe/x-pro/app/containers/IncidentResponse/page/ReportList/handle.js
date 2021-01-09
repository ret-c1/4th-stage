import React, { useState } from 'react';
import { Card, Form, DatePicker, Input, Radio, Row, Button, Col, Result } from 'antd';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ScItWrapper } from './styled';
// import { emergencyHandle } from '../api';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const EngineerHandle = () => {
    const { id } = searchParams();
    const history = useHistory();
    const [form] = Form.useForm();

    const formSubmit = () => {
        form.validateFields().then((allValues) => {
            const startHandleTime = allValues.rangeTime && moment(allValues.rangeTime[0]).valueOf();
            const endHandleTime = allValues.rangeTime && moment(allValues.rangeTime[1]).valueOf();
            const requestParam = {
                ...allValues,
                startHandleTime,
                endHandleTime,
                id,
            };
            delete requestParam.rangeTime;
            // emergencyHandle(requestParam).then((res) => {
            //     if (res.code === 200) {
            //         message.success('处置成功');
            //         setIsFinishStatus(true);
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        });
    };

    // 定义处置状态
    const [isFinishStatus] = useState(false);

    return (
        <ScItWrapper>
            <Card title="应急处置">
                {isFinishStatus ? (
                    <Result
                        status="success"
                        title="提交成功"
                        extra={[
                            <Button
                                type="primary"
                                key="continue"
                                onClick={() => {
                                    history.push(`/incident/handleCheck?id=${id}`);
                                }}
                            >
                                查看处置记录
                            </Button>,
                            <Button
                                key="buy"
                                onClick={() => {
                                    history.push('/incident/reportList');
                                }}
                            >
                                继续处置
                            </Button>,
                        ]}
                    />
                ) : (
                    <Form form={form}>
                        <div style={{ padding: '24px 32px', width: '80%', margin: '0 auto' }}>
                            <Form.Item
                                label="处置起止时间"
                                labelCol={{ span: 4 }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                name="rangeTime"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择处置起止时间',
                                    },
                                ]}
                            >
                                <RangePicker placeholder={['开始时间', '结束时间']} />
                            </Form.Item>
                            <Form.Item
                                label="处置过程"
                                labelCol={{ span: 4 }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                name="handle"
                                rules={[
                                    {
                                        required: true,
                                        message: '请填写处置过程',
                                    },
                                ]}
                            >
                                <TextArea autoSize={{ minRows: 4 }} />
                            </Form.Item>
                            <Form.Item
                                label="事件处置结果"
                                labelCol={{ span: 4 }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                name="handleResult"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择事件处置结果',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="已整改">已整改</Radio>
                                    <Radio value="已监控">已监控</Radio>
                                    <Radio value="已防护">已防护</Radio>
                                    <Radio value="未解决">未解决</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="可行性建议"
                                labelCol={{ span: 4 }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                name="feasibilityAdvice"
                            >
                                <TextArea autoSize={{ minRows: 4 }} />
                            </Form.Item>
                            <Form.Item
                                label="实施方式"
                                labelCol={{ span: 4 }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                name="handleWay"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择实施方式',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="现场">现场</Radio>
                                    <Radio value="远程">远程</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Row>
                                <Col xl={{ span: 6, offset: 4 }}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            style={{ marginRight: '8px' }}
                                            htmlType="submit"
                                            onClick={formSubmit}
                                        >
                                            提交
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                history.push('/incident/reportList');
                                            }}
                                        >
                                            取消
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )}
            </Card>
        </ScItWrapper>
    );
};

export default EngineerHandle;
