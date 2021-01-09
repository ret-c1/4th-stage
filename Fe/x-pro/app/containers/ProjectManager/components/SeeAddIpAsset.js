import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { getIpAssetDetail } from '../page/api';

const SeeAddIpAsset = (props) => {
    const { id } = props;
    const [form] = Form.useForm();
    const [IpData, setIpData] = useState({});
    useEffect(() => {
        getIpAssetDetail({ id }).then((res) => {
            if (res.code === 200) {
                setIpData(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
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
                    <strong>项目信息</strong>
                </h4>
                <Row>
                    <Col span={12}>
                        <Form.Item label="资产名称：" name="assetName">
                            {IpData.assetName === '' ? '暂无' : IpData.assetName}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产重要性：" name="importance">
                            {IpData.importance === '' ? '暂无' : IpData.importance}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="公网IP：" name="publicIp">
                            {IpData.publicIp === '' ? '暂无' : IpData.publicIp}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="私网IP：" name="assetIp">
                            {IpData.assetIp === '' ? '暂无' : IpData.assetIp}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="接口IP：" name="interfaceIp">
                            {IpData.interfaceIp === '' ? '暂无' : IpData.interfaceIp}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="虚IP：" name="virtualIp">
                            {IpData.virtualIp === '' ? '暂无' : IpData.virtualIp}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="所属业务系统" name="belongedBusinessSystem">
                            {IpData.belongedBusinessSystem === ''
                                ? '暂无'
                                : IpData.belongedBusinessSystem}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产状态：" name="assetStatus">
                            {IpData.assetStatus === '' ? '暂无' : IpData.assetStatus}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="资产类型：" name="assetType">
                            {IpData.assetType === '' ? '暂无' : IpData.assetType}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="资产版本：" name="assetVersion">
                            {IpData.assetVersion === '' ? '暂无' : IpData.assetVersion}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="操作系统：" name="os">
                            {IpData.os === '' ? '暂无' : IpData.os}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="OS版本：" name="osVersion">
                            {IpData.osVersion === '' ? '暂无' : IpData.osVersion}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="登录端口：" name="loginPort">
                            {IpData.loginPort === '' ? '暂无' : IpData.loginPort}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="登录协议：" name="loginAgreement">
                            {IpData.loginAgreement === '' ? '暂无' : IpData.loginAgreement}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="开放端口：" name="enablePort">
                            {IpData.enablePort === '' ? '暂无' : IpData.enablePort}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="责任人：" name="personInCharge">
                            {IpData.personInCharge === '' ? '暂无' : IpData.personInCharge}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备厂商：" name="deviceManufacturer">
                            {IpData.deviceManufacturer === '' ? '暂无' : IpData.deviceManufacturer}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="设备版本" name="deviceVersion">
                            {IpData.deviceVersion === '' ? '暂无' : IpData.deviceVersion}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="设备型号：" name="deviceModel">
                            {IpData.deviceModel === '' ? '暂无' : IpData.deviceModel}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="设备存放位置：" name="storeLocation">
                            {IpData.storeLocation === '' ? '暂无' : IpData.storeLocation}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="联系电话：" name="personInChargePhone">
                            {IpData.personInChargePhone === ''
                                ? '暂无'
                                : IpData.personInChargePhone}
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
                            {IpData.description === '' ? '暂无' : IpData.description}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default SeeAddIpAsset;
SeeAddIpAsset.propTypes = {
    id: PropTypes.number,
};
