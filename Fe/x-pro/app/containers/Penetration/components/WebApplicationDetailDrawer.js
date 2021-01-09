import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
// import { getWebDrawerDetail } from '../page/api';

const WebApplicationDetailDrawer = (props) => {
    const { id } = props;
    const [form] = Form.useForm();
    const [webData, setWebData] = useState({});
    useEffect(() => {
        // getWebDrawerDetail({ id }).then((res) => {
        //     if (res.code === 200) {
        //         setWebData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        console.log(id, setWebData);
    }, [id]);

    return (
        <>
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                style={{ marginTop: '20px' }}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
            >
                <h4>
                    <strong>基本信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="应用编号：" name="domainCode">
                            {webData.domainCode === '' ? '暂无' : webData.domainCode}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="系统名称：" name="applicationName">
                            {webData.applicationName === '' ? '暂无' : webData.applicationName}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="域名：" name="domain">
                            {webData.domain === '' ? '暂无' : webData.domain}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="应用类型：" name="applicationType">
                            {webData.applicationType === '' ? '暂无' : webData.applicationType}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="应用重要性：" name="importance">
                            {webData.importance === '' ? '暂无' : webData.importance}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="开发厂商全称：" name="developerAllName">
                            {webData.developerAllName === '' ? '暂无' : webData.developerAllName}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="开发厂商简称：" name="developerEasyName">
                            {webData.developerEasyName === '' ? '暂无' : webData.developerEasyName}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="版本：" name="domainVersion">
                            {webData.domainVersion === '' ? '暂无' : webData.domainVersion}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="技术架构：" name="techFramework">
                            {webData.techFramework === '' ? '暂无' : webData.techFramework}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Web容器名称：" name="domainContainer">
                            {webData.domainContainer === '' ? '暂无' : webData.domainContainer}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Web容器版本：" name="domainContainerVersion">
                            {webData.domainContainerVersion === ''
                                ? '暂无'
                                : webData.domainContainerVersion}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="责任人：" name="personInCharge">
                            {webData.personInCharge === '' ? '暂无' : webData.personInCharge}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="联系电话：" name="personInChargePhone">
                            {webData.personInChargePhone === ''
                                ? '暂无'
                                : webData.personInChargePhone}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="应用状态：" name="applicationStatus">
                            {webData.applicationStatus === '' ? '暂无' : webData.applicationStatus}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="服务器网段：" name="serviceSegment">
                            {webData.serviceSegment === '' ? '暂无' : webData.serviceSegment}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="描述：" name="description">
                            {webData.description === '' ? '暂无' : webData.description}
                        </Form.Item>
                    </Col>
                </Row>
                <h4>
                    <strong>更多信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="应用标签：" name="applicationTags">
                            {webData.applicationTags === '' ? '暂无' : webData.applicationTags}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="所属业务系统：" name="belongedBusinessSystem">
                            {webData.belongedBusinessSystem === ''
                                ? '暂无'
                                : webData.belongedBusinessSystem}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="安全域：" name="securityZone">
                            {webData.securityZone === '' ? '暂无' : webData.securityZone}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="组织架构：" name="groupFramework">
                            {webData.groupFramework === '' ? '暂无' : webData.groupFramework}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="机密性：" name="confidentiality">
                            {webData.confidentiality === '' ? '暂无' : webData.confidentiality}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="完整性：" name="integrity">
                            {webData.integrity === '' ? '暂无' : webData.integrity}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="可用性：" name="availability">
                            {webData.availability === '' ? '暂无' : webData.availability}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="是否是等保资产：" name="isHierarchyProtection">
                            {webData.isHierarchyProtection === ''
                                ? '暂无'
                                : webData.isHierarchyProtection}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="地理位置：" name="location">
                            {webData.location === '' ? '暂无' : webData.location}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="使用人：" name="domainUser">
                            {webData.domainUser === '' ? '暂无' : webData.domainUser}
                        </Form.Item>
                    </Col>
                </Row>
                <h4>
                    <strong>操作系统信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="操作系统：" name="os">
                            {webData.os === '' ? '暂无' : webData.os}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="OS版本：" name="osVersion">
                            {webData.osVersion === '' ? '暂无' : webData.osVersion}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="MAC地址：" name="macAddress">
                            {webData.macAddress === '' ? '暂无' : webData.macAddress}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="开放端口：" name="enablePort">
                            {webData.enablePort === '' ? '暂无' : webData.enablePort}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default WebApplicationDetailDrawer;
WebApplicationDetailDrawer.propTypes = {
    id: PropTypes.number,
};
