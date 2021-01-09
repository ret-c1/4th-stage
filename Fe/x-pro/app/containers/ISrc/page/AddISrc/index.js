import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
import { Form, Row, Col, Input, Button, DatePicker, Select, message } from 'antd';
// import { getISrcDetail, getAddISrc } from '../api';
import { ScContent, ScForm } from '../styled';

const { TextArea } = Input;
const { Option } = Select;
const ISrcPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { id } = searchParams();
    const type = history.location.search.split('&&')[1].split('=')[1];
    const [detailData, setDetailData] = useState([]);
    const handleFinish = (value) => {
        const data = {
            startTime: value.startTime.valueOf(),
            endTime: value.endTime.valueOf(),
        };
        getAddISrc({ ...value, ...data }).then((res) => {
            if (res.code === 200) {
                history.go(-1);
            } else {
                message.error(res.message);
            }
        });
    };
    useEffect(() => {
        if (id) {
            getISrcDetail(id).then((res) => {
                if (res.code === 200) {
                    res.data.type = '众测任务';
                    res.data.startTime = moment(res.data.startTime);
                    res.data.endTime = moment(res.data.endTime);
                    setDetailData(res.data);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id) {
            detailData.name = detailData.name ? detailData.name : '暂无';
            form.setFieldsValue(detailData);
        }
    }, [detailData]);

    return (
        <>
            <ScContent>
                <h3>项目信息</h3>
                <ScForm
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{ marginTop: '20px' }}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={handleFinish}
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="原始需求方的公司名称或公司ID"
                                name="companyName"
                                rules={[{ required: true, message: '请填写公司名称!' }]}
                            >
                                {type === 'add' ? <Input /> : <Input disabled />}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="计划类型" name="type">
                                {type === 'add' ? <Input /> : <Input disabled />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="漏洞定级标准" name="ratingStandard">
                                {type === 'add' ? <Input /> : <Input disabled />}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="服务形式"
                                name="serverType"
                                rules={[{ required: true }]}
                            >
                                {type === 'add' ? (
                                    <Select>
                                        <Option value="1">公司</Option>
                                        <Option value="2">远程</Option>
                                        <Option value="3">值守保障</Option>
                                        <Option value="4">驻场服务</Option>
                                        <Option value="5">外包服务</Option>
                                        <Option value="6">其他</Option>
                                    </Select>
                                ) : (
                                    <Input disabled />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="本次预计开始时间"
                                name="startTime"
                                rules={[{ required: true, message: '请填写开始日期!' }]}
                            >
                                {type === 'add' ? (
                                    <DatePicker
                                        placeholder="请选择开始日期"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <DatePicker
                                        placeholder="请选择开始日期"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="本次预计结束时间"
                                name="endTime"
                                rules={[{ required: true, message: '请填写结束日期!' }]}
                            >
                                {type === 'add' ? (
                                    <DatePicker
                                        placeholder="请选择结束日期"
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <DatePicker
                                        placeholder="请选择结束日期"
                                        style={{ width: '100%' }}
                                        disabled
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                label="本次任务概要描述"
                                name="name"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 19 }}
                            >
                                {type === 'add' ? (
                                    <TextArea rows={4} />
                                ) : (
                                    <TextArea rows={4} disabled />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                label="本次测试任务的测试范围、服务要求(测试时要避免的问题或者注意事项)"
                                name="testScope"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 19 }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请填写本次任务的测试范围、服务要求!',
                                    },
                                ]}
                            >
                                {type === 'add' ? (
                                    <TextArea rows={4} />
                                ) : (
                                    <TextArea rows={4} disabled />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                label="合同约定之外的其他服务要求"
                                name="testRequirement"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 19 }}
                            >
                                {type === 'add' ? (
                                    <TextArea rows={4} />
                                ) : (
                                    <TextArea rows={4} disabled />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                label="避免的问题/注意事项"
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 19 }}
                            >
                                {type === 'add' ? (
                                    <TextArea rows={4} />
                                ) : (
                                    <TextArea rows={4} disabled />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'right' }}>
                        <Col span={16}>
                            {type === 'add' ? (
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                >
                                    创建
                                </Button>
                            ) : (
                                ''
                            )}
                            <Button
                                onClick={() => {
                                    history.push('/isrc/list');
                                }}
                            >
                                返回
                            </Button>
                        </Col>
                    </Row>
                </ScForm>
            </ScContent>
        </>
    );
};

export default ISrcPage;
