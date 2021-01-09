import React from 'react';
import PropTypes from 'prop-types';
import { searchParams } from '@utils/searchParams';
import { Form, Input, Row, Col, Select, Cascader, Button } from 'antd';
import { getAddIpAsset } from '../page/api';

const { Option } = Select;
const { TextArea } = Input;

const AddIpasset = (props) => {
    const [form] = Form.useForm();
    const { id } = searchParams();
    const { iptype, handleCancel } = props;

    const FormFinish = (values) => {
        const data = String(values.assetType);
        const datatwo = { ...values, assetType: data, projectId: Number(id) };
        getAddIpAsset({
            ...datatwo,
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
                    <strong>项目信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="资产名称：" name="assetName">
                            <Input placeholder="请输入服务联系人" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产重要性：" name="importance">
                            <Select>
                                <Option value="1">普通</Option>
                                <Option value="2">重要</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="公网IP：" name="publicIp">
                            <Input placeholder="请输入公网IP" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="私网IP："
                            name="assetIp"
                            rules={[{ required: true, message: '请输入私网IP!' }]}
                        >
                            <Input placeholder="请输入私网IP" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="接口IP：" name="interfaceIp">
                            <Input placeholder="请输入接口IP" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="虚IP：" name="virtualIp">
                            <Input placeholder="请输入虚IP" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="所属业务系统"
                            name="belongedBusinessSystem"
                            rules={[{ required: true, message: '请输入所属业务系统!' }]}
                        >
                            <Input placeholder="请输入所属业务系统" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产状态：" name="assetStatus">
                            <Select>
                                <Option value="1">已安装</Option>
                                <Option value="2">测试中</Option>
                                <Option value="3">使用中</Option>
                                <Option value="4">维护中</Option>
                                <Option value="5">报废</Option>
                                <Option value="6">备用</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="资产类型："
                            name="assetType"
                            rules={[{ required: true, message: '请输入资产类型!' }]}
                        >
                            <Cascader options={iptype || []} placeholder="请选择" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产版本：" name="assetVersion">
                            <Input placeholder="请输入资产版本" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="操作系统：" name="os">
                            <Input placeholder="请输入操作系统" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="OS版本：" name="osVersion">
                            <Input placeholder="请输入OS版本" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="登录端口：" name="loginPort">
                            <Input placeholder="请输入登录端口" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="登录协议：" name="loginAgreement">
                            <Input placeholder="请输入登录协议" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="开放端口：" name="enablePort">
                            <Input placeholder="请输入开放端口" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="责任人：" name="personInCharge">
                            <Input placeholder="请输入责任人" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备厂商：" name="deviceManufacturer">
                            <Input placeholder="请输入设备厂商" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="设备版本" name="deviceVersion">
                            <Input placeholder="请输入设备版本" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备型号：" name="deviceModel">
                            <Input placeholder="请输入设备型号" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="设备存放位置：" name="storeLocation">
                            <Input placeholder="请输入设备存放位置" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="联系电话：" name="personInChargePhone">
                            <Input placeholder="请输入联系电话" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="描述："
                            name="description"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} gutter={5}>
                        <Button>取消</Button>
                        <Button htmlType="submit" type="primary" style={{ marginLeft: '20px' }}>
                            保存
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default AddIpasset;
AddIpasset.propTypes = {
    iptype: PropTypes.array,
    handleCancel: PropTypes.func,
};
