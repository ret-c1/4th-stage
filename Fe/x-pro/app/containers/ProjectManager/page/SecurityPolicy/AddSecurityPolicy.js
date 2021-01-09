import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
import { getAddSecurityWay } from '../api';

// const { Option } = Select;
const { TextArea } = Input;

const AddSecurityPolicy = (props) => {
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
        getAddSecurityWay({
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
                        <Form.Item label="申请单编号" name="applyNo">
                            <Input placeholder="请输入申请单编号" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="策略类型" name="strategyType">
                            <Input placeholder="请输入策略类型" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="申请单位" name="applyOrganization">
                            <Input placeholder="请输入申请单位" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="操作人" name="operator">
                            <Input placeholder="请输入操作人" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="申请经办人" name="applyProcessor">
                            <Input placeholder="请输入申请经办人" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="申请策略个数" name="applyNum">
                            <Input placeholder="请输入申请策略个数" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="记录日期"
                            name="recordDate"
                            rules={[{ required: true, message: '请选择时间!' }]}
                        >
                            <DatePicker placeholder="请选择时间" style={{ width: '225px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="完成日期" name="finishDate">
                            <DatePicker placeholder="请选择完成日期" style={{ width: '225px' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="变更内容"
                            name="content"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <TextArea rows={4} placeholder="请输入变更内容" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="备注"
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
export default AddSecurityPolicy;
AddSecurityPolicy.propTypes = {
    handleCancel: PropTypes.func,
};
