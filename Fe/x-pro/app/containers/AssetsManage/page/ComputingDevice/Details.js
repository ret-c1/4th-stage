import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { PageHeader, Button, Descriptions, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import IconDetail from '@assets/images/icon-detail.png';
import { searchParams } from '@utils/searchParams';
import { ScCardDetail } from '../../styled';
// import { getAssetInfo } from './api';
export const ScCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px #1890ff solid;
`;

const ComputingDeviceDetailsPage = () => {
    const history = useHistory();
    const { id } = searchParams();
    const [assetInfo] = useState({});
    console.log(id);
    useEffect(() => {
        // getAssetInfo({ id }).then((res) => {
        //     if (res.code === 200) {
        //         setAssetInfo(res.data);
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    }, []);
    return (
        <>
            <PageHeader
                ghost={false}
                title="资产详情"
                avatar={{ src: `${IconDetail}` }}
                subTitle={
                    <span
                        style={{
                            background: 'rgba(0, 0, 0, 0.04)',
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 0.65)',
                            borderRadius: 2,
                        }}
                    >
                        资产来源：导入
                    </span>
                }
                extra={[
                    <Button key="3" onClick={() => history.go(-1)}>
                        返回
                    </Button>,
                    <Button key="2" type="primary">
                        下载
                    </Button>,
                ]}
            >
                <Row style={{ marginLeft: '44px' }} align="middle">
                    <Col>
                        <ScCircle />
                    </Col>
                    <Col style={{ marginLeft: '7px' }}>2020年4月29日 xxx导入了该资产</Col>
                </Row>
            </PageHeader>
            <ScCardDetail title="主机信息" bordered={false}>
                <Descriptions>
                    <Descriptions.Item label="业务系统名称" key="业务系统名称">
                        {assetInfo.businessSystems && assetInfo.businessSystems.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="主机名称" key="主机名称">
                        {assetInfo.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产状态" key="资产状态">
                        {(assetInfo.status === 1 && '使用中') ||
                            (assetInfo.status === 2 && '未使用') ||
                            (assetInfo.status === 3 && '注销') ||
                            (assetInfo.status === 4 && '报废')}
                    </Descriptions.Item>
                    <Descriptions.Item label="内网IP地址" key="内网IP地址">
                        {assetInfo.computingDevice && assetInfo.computingDevice.intranetIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="互联网IP地址" key="互联网IP地址" span={2}>
                        {assetInfo.computingDevice && assetInfo.computingDevice.internetIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="内网远程管理端口号" key="内网远程管理端口号">
                        {assetInfo.computingDevice && assetInfo.computingDevice.intranetManagePort}
                    </Descriptions.Item>
                    <Descriptions.Item label="互联网远程管理端口号" key="互联网远程管理端口号">
                        {assetInfo.computingDevice && assetInfo.computingDevice.internetManagePort}
                    </Descriptions.Item>
                    <Descriptions.Item label="主要开放服务端口号" key="主要开放服务端口号">
                        {assetInfo.computingDevice && assetInfo.computingDevice.ports}
                    </Descriptions.Item>
                    <Descriptions.Item label="操作系统类型" key="操作系统类型">
                        {assetInfo.computingDevice && assetInfo.computingDevice.product}
                    </Descriptions.Item>
                    <Descriptions.Item label="操作系统版本" key="操作系统版本">
                        {assetInfo.computingDevice && assetInfo.computingDevice.version}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否安装杀毒软件" key="是否安装杀毒软件">
                        {assetInfo.computingDevice &&
                            (assetInfo.computingDevice.antivirus === 0 ? '未安装' : '安装')}
                    </Descriptions.Item>
                    <Descriptions.Item label="远程管理方式" key="远程管理方式">
                        {assetInfo.computingDevice && assetInfo.computingDevice.managerType}
                    </Descriptions.Item>
                    <Descriptions.Item label="服务器业务功能描述" key="服务器业务功能描述">
                        服务器业务功能描述
                    </Descriptions.Item>
                    <Descriptions.Item label="备注" key="备注">
                        {assetInfo.computingDevice && assetInfo.computingDevice.remark}
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
            <ScCardDetail title="安全属性信息" bordered={false}>
                <div>
                    <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)' }}>资产价值：</span>
                    6.55
                </div>
                <Descriptions
                    style={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: 2,
                        width: '100%',
                        height: '70px',
                        marginTop: 12,
                        padding: '24px 48px',
                    }}
                    column={4}
                >
                    <Descriptions.Item label="保密性" key="保密性">
                        {assetInfo.confidentiality}
                    </Descriptions.Item>
                    <Descriptions.Item label="完整性" key="完整性">
                        {assetInfo.integrality}
                    </Descriptions.Item>
                    <Descriptions.Item label="可用性" key="可用性">
                        {assetInfo.availability}
                    </Descriptions.Item>
                    <Descriptions.Item label="业务相关性" key="业务相关性">
                        {assetInfo.importance}
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
            <ScCardDetail title="责任人及位置信息" bordered={false}>
                <Descriptions>
                    <Descriptions.Item label="资产所属部门" key="资产所属部门">
                        {assetInfo.organizationName}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产负责人" key="资产负责人">
                        {assetInfo.personName}
                    </Descriptions.Item>
                    <Descriptions.Item label="责任人联系电话" key="责任人联系电话">
                        电话
                    </Descriptions.Item>
                    <Descriptions.Item label="部署物理位置" key="部署物理位置">
                        {assetInfo.locations && assetInfo.locations.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="部署逻辑位置" key="部署逻辑位置">
                        {assetInfo.locations && assetInfo.locations.region}
                    </Descriptions.Item>
                </Descriptions>
            </ScCardDetail>
        </>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(ComputingDeviceDetailsPage);
