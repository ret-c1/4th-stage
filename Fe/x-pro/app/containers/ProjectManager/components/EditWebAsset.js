import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { searchParams } from '@utils/searchParams';
import { getWebAssetEdit, getWebAssetDetail } from '../page/api';

const { Option } = Select;
const { TextArea } = Input;

const EditWebAsset = (props) => {
    const { id } = searchParams();
    const { handleCancelWeb, idWeb } = props;
    const [form] = Form.useForm();
    const [webData, setWebData] = useState({});

    const FormFinish = (values) => {
        const datatwo = { ...values, projectId: Number(id), id: idWeb, applicationTags: '' };
        getWebAssetEdit({
            ...datatwo,
        }).then((res) => {
            if (res.code === 200) {
                handleCancelWeb();
            } else {
                console.log('获取数据失败');
            }
        });
    };
    useEffect(() => {
        getWebAssetDetail({ id: idWeb }).then((res) => {
            if (res.code === 200) {
                setWebData(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);
    useEffect(() => {
        form.setFieldsValue(webData);
    }, [webData]);
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
                        <Form.Item label="应用编号：" name="domainCode">
                            <Input placeholder="请输入应用编号" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="系统名称："
                            name="applicationName"
                            rules={[{ required: true, message: '请输入系统名称!' }]}
                        >
                            <Input placeholder="请输入系统名称" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="域名："
                            name="domain"
                            rules={[{ required: true, message: '请输入域名，url或IP端口!' }]}
                        >
                            <Input placeholder="请输入域名，url或IP端口" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="应用类型：" name="applicationType">
                            <Input placeholder="请输入应用类型" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="应用重要性：" name="importance">
                            <Select defaultValue="1">
                                <Option value="1">普通</Option>
                                <Option value="2">重要</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="开发厂商全称：" name="developerAllName">
                            <Input placeholder="请输入开发厂商全称" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="开发厂商简称：" name="developerEasyName">
                            <Input placeholder="请输入开发厂商简称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="版本：" name="domainVersion">
                            <Input placeholder="请输入版本" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="技术架构：" name="techFramework">
                            <Input placeholder="请输入技术架构" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Web容器名称：" name="domainContainer">
                            <Input placeholder="请输入Web容器名称" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Web容器版本：" name="domainContainerVersion">
                            <Input placeholder="请输入Web容器版本" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="责任人：" name="personInCharge">
                            <Input placeholder="请输入责任人" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="联系电话：" name="personInChargePhone">
                            <Input placeholder="请输入联系电话：" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="应用状态：" name="applicationStatus">
                            <Select defaultValue="3">
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
                        <Form.Item label="服务器网段：" name="serviceSegment">
                            <Select defaultValue="1" style={{ width: '150px' }}>
                                <Option value="1">IP地址</Option>
                                <Option value="2">IP区间</Option>
                                <Option value="3">子网掩码</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="serviceSegment">
                            <Input
                                placeholder="请输入IP,格式：xxx.xxx.xxx.xxx多个以.号间隔"
                                style={{ width: '325px' }}
                            />
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
                <h4>
                    <strong>更多信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="应用标签：" name="username">
                            <Input placeholder="请输入应用标签" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="所属业务系统：" name="belongedBusinessSystem">
                            <Input placeholder="请输入所属业务系统" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="安全域：" name="securityZone">
                            <Input placeholder="请输入安全域" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="组织架构：" name="groupFramework">
                            <Input placeholder="请输入组织架构" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="机密性：" name="confidentiality">
                            <Select placeholder="请输入机密性">
                                <Option value="1">非常高</Option>
                                <Option value="2">高</Option>
                                <Option value="3">中</Option>
                                <Option value="4">低</Option>
                                <Option value="5">可忽略</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="完整性：" name="integrity">
                            <Select placeholder="请输入完整性">
                                <Option value="1">非常高</Option>
                                <Option value="2">高</Option>
                                <Option value="3">中</Option>
                                <Option value="4">低</Option>
                                <Option value="5">可忽略</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="可用性：" name="availability">
                            <Select placeholder="请输入可用性">
                                <Option value="1">非常高</Option>
                                <Option value="2">高</Option>
                                <Option value="3">中</Option>
                                <Option value="4">低</Option>
                                <Option value="5">可忽略</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="是否是等保资产：" name="isHierarchyProtection">
                            <Select placeholder="是否是等保资产">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="地理位置：" name="location">
                            <Input placeholder="地理位置" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="使用人：" name="domainUser">
                            <Input placeholder="请输入使用人" />
                        </Form.Item>
                    </Col>
                </Row>
                <h4>
                    <strong>操作系统信息</strong>
                </h4>
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
                        <Form.Item label="MAC地址：" name="macAddress">
                            <Input placeholder="请输入MAC地址：" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="开放端口：" name="enablePort">
                            <Input placeholder="请输入开放端口" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} gutter={5}>
                        <Button
                            onClick={() => {
                                handleCancelWeb();
                            }}
                        >
                            取消
                        </Button>
                        <Button htmlType="submit" type="primary" style={{ marginLeft: '20px' }}>
                            保存
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default EditWebAsset;
EditWebAsset.propTypes = {
    handleCancelWeb: PropTypes.func,
    idWeb: PropTypes.number,
};
