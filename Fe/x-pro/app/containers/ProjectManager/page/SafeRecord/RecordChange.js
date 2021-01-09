import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
import { Form, Input, Row, Col, Select, Button, DatePicker } from 'antd';
import { getAddSecurityRecord } from '../api';

const { Option } = Select;
const { TextArea } = Input;

const RecordChange = (props) => {
    const [form] = Form.useForm();
    const { id } = searchParams();
    const { handleCancel } = props;

    const FormFinish = (values) => {
        console.log(values.recordDate);
        const time = {
            recordDate: moment(values.recordDate).format('YYYY-MM-DD'),
            upgradeDate: moment(values.upgradeDate).format('YYYY-MM-DD'),
        };
        console.log(time);
        getAddSecurityRecord({
            ...values,
            ...time,
            projectId: id,
        }).then((res) => {
            if (res.code === 200) {
                handleCancel();
            } else {
                console.log('获取数据失败');
            }
        });
    };
    return (
        <>
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                style={{ marginTop: '20px' }}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
                onFinish={FormFinish}
            >
                <h4>
                    <strong>基本信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="产品名称：" name="prodName">
                            <Input placeholder="请输入产品名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="产品编号：" name="prodNo">
                            <Input placeholder="请输入产品编号" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="产品类型：" name="prodType">
                            <Select placeholder="请输入产品类型">
                                <Option value="安全设备">安全设备</Option>
                                <Option value="网络设备">网络设备</Option>
                                <Option value="操作系统">操作系统</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="记录日期："
                            name="recordDate"
                            rules={[{ required: true, message: '请选择时间!' }]}
                        >
                            <DatePicker placeholder="请选择时间" style={{ width: '225px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="升级日期：" name="upgradeDate">
                            <DatePicker placeholder="请选择时间" style={{ width: '225px' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="IP地址：" name="ip">
                            <Input placeholder="请输入IP地址" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="操作人：" name="operator">
                            <Input placeholder="请输入操作人" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="升级类型：" name="upgradeType">
                            <Select placeholder="请输入升级类型">
                                <Option value="软件版本">软件版本</Option>
                                <Option value="特征库">特征库</Option>
                                <Option value="病毒库">病毒库</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="升级方式：" name="upgradeWay">
                            <Select placeholder="请输入升级方式">
                                <Option value="在线(自动)">在线(自动)</Option>
                                <Option value="在线(手动)">在线(手动)</Option>
                                <Option value="离线(手动)">离线(手动)</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="当前版本：" name="oldVersion">
                            <Input placeholder="请输入当前版本" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="升级后版本：" name="upgradeVersion">
                            <Input placeholder="请输入升级后版本" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="备注："
                            name="remark"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <TextArea rows={4} placeholder="请输入备注" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} gutter={5}>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button htmlType="submit" type="primary" style={{ marginLeft: '20px' }}>
                            保存
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default RecordChange;
RecordChange.propTypes = {
    handleCancel: PropTypes.func,
};
