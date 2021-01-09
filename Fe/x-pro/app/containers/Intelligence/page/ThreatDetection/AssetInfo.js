import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import styled from 'styled-components';

const StyledDescriptions = styled(Descriptions)`
    .ant-descriptions-row > th,
    .ant-descriptions-row > td {
        padding-bottom: 46px;
        padding-left: 30px;
    }
`;

const AssetInfo = (props) => {
    const { assetInfo } = props;
    return (
        <StyledDescriptions title="基本信息" column={2}>
            <Descriptions.Item label="资产名称" key="资产名称">
                {assetInfo.assetName || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产重要性" key="资产重要性">
                {assetInfo.importance || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="所属业务系统" key="所属业务系统">
                {assetInfo.belongedBusinessSystem || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产状态" key="资产状态">
                {assetInfo.assetStatus || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产重要性" key="资产重要性">
                {assetInfo.importance || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产类型" key="资产类型">
                {assetInfo.assetType || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产编号" key="资产编号">
                {assetInfo.assetCode || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="资产版本" key="资产版本">
                {assetInfo.assetVersion || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="操作系统" key="操作系统">
                {assetInfo.os || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="OS版本" key="OS版本">
                {assetInfo.osVersion || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="登录端口" key="登录端口">
                {assetInfo.loginPort || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="登录协议" key="登录协议">
                {assetInfo.loginAgreement || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="开放端口" key="开放端口">
                {assetInfo.enablePort || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="设备存放位置" key="设备存放位置">
                {assetInfo.storeLocation || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="设备厂商" key="设备厂商">
                {assetInfo.deviceManufacturer || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="设备版本" key="设备版本">
                {assetInfo.deviceVersion || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="设备型号" key="设备型号">
                {assetInfo.deviceModel || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="责任人" key="责任人">
                {assetInfo.personInCharge || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="联系电话" key="联系电话">
                {assetInfo.personInChargePhone || '暂无'}
            </Descriptions.Item>
            <Descriptions.Item label="描述" key="描述">
                {assetInfo.description || '暂无'}
            </Descriptions.Item>
        </StyledDescriptions>
    );
};

export default AssetInfo;

AssetInfo.propTypes = {
    assetInfo: PropTypes.object,
};
