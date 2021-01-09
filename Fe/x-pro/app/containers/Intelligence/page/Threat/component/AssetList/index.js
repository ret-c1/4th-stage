import React from 'react';
import { Button, Table, Drawer, Descriptions, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import CircleDot from '../CircleDot';

const AssetList = (props) => {
    const { loading, dataSource } = props.troubleAsset;
    const columns = [
        {
            title: '告警分析情况',
            dataIndex: 'warnStatus',
            key: 'warnStatus',
            width: 120,
            render: (text) => {
                switch (text) {
                    case 1:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="#52C41A"
                                />
                                <span>已完成</span>
                            </div>
                        );
                    case 0:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="rgba(0,0,0,0.25)"
                                />
                                <span>未完成</span>
                            </div>
                        );
                    default:
                        return null;
                }
            },
        },
        {
            title: '资产IP',
            dataIndex: 'assetIp',
            key: 'assetIp',
            width: 170,
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '资产名称',
            dataIndex: 'assetName',
            key: 'assetName',
        },
        {
            title: '资产版本',
            dataIndex: 'assetVersion',
            key: 'assetVersion',
        },
        {
            title: '客户名称',
            dataIndex: 'clientName',
            key: 'clientName',
            width: 170,
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '所属业务系统',
            dataIndex: 'businessSystem',
            key: 'businessSystem',
            width: 120,
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => showModal({ id: record.ipAssetId })}>
                    查看
                </Button>
            ),
        },
    ];
    if (props.currentStep === 1) {
        columns.unshift({
            title: '日志分析',
            dataIndex: 'logStatus',
            key: 'logStatus',
            render: (text) => {
                switch (text) {
                    case 1:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="#52C41A"
                                />
                                <span>已完成</span>
                            </div>
                        );
                    case 0:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="rgba(0,0,0,0.25)"
                                />
                                <span>未完成</span>
                            </div>
                        );
                    default:
                        return null;
                }
            },
        });
    }
    if (props.currentStep === 2) {
        columns.unshift({
            title: '日志分析',
            dataIndex: 'logStatus',
            key: 'logStatus',
            render: (text) => {
                switch (text) {
                    case 1:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="#52C41A"
                                />
                                <span>已完成</span>
                            </div>
                        );
                    case 0:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="rgba(0,0,0,0.25)"
                                />
                                <span>未完成</span>
                            </div>
                        );
                    default:
                        return null;
                }
            },
        });
        columns.unshift({
            title: '事件研判情况',
            dataIndex: 'eventStatus',
            key: 'eventStatus',
            width: 120,
            render: (text) => {
                switch (text) {
                    case 1:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="#52C41A"
                                />
                                <span>已完成</span>
                            </div>
                        );
                    case 0:
                        return (
                            <div>
                                <CircleDot
                                    size={8}
                                    style={{ marginRight: '8px' }}
                                    backgroundColor="rgba(0,0,0,0.25)"
                                />
                                <span>未完成</span>
                            </div>
                        );
                    default:
                        return null;
                }
            },
        });
    }
    const rowSelection = {
        selectedRowKeys: props.chooseProperty.length === 0 && [],
        onChange: (selectedRowKeys, selectedRows) => {
            const propertyParams = [];
            selectedRows.forEach((item) => {
                if (item) {
                    propertyParams.push(item.assetIp);
                }
            });
            if (props.warningEvent) {
                props.getWarningEvent({
                    ...props.warningEvent.params,
                    param: { destIps: propertyParams },
                });
            }
            props.getChooseProperty({ propertyParams, selectedRows });
        },
    };

    const showModal = (ip) => {
        props.checkPropertyDetail(ip);
    };
    const handleCancel = () => {
        props.changePropertyModal();
    };
    const { propertyModal } = props;
    const { visible, modalData } = propertyModal;
    return (
        <>
            <Table
                size="small"
                tableLayout="fixed"
                rowKey="id"
                columns={columns}
                loading={loading}
                rowSelection={props.currentStep !== 2 && rowSelection}
                dataSource={dataSource || []}
                pagination={false}
            />
            <Drawer
                width={500}
                title="隐患资产详情"
                visible={visible}
                onClose={() => handleCancel()}
            >
                <Descriptions title="基本信息" column={{ md: 2 }}>
                    <Descriptions.Item label="资产名称" key="资产名称">
                        {modalData.assetName}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产重要性" key="资产重要性">
                        {modalData.importance}
                    </Descriptions.Item>
                    <Descriptions.Item label="公网IP" key="公网IP">
                        {modalData.publicIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="内网IP" key="内网IP">
                        {modalData.assetIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="接口IP" key="接口IP">
                        {modalData.interfaceIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="虚IP" key="虚IP">
                        {modalData.virtualIp}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属业务系统" key="所属业务系统">
                        {modalData.belongedBusinessSystem}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产状态" key="资产状态">
                        {modalData.assetStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产类型" key="资产类型">
                        {modalData.assetType}
                    </Descriptions.Item>
                    <Descriptions.Item label="资产版本" key="资产版本">
                        {modalData.assetVersion}
                    </Descriptions.Item>
                    <Descriptions.Item label="OS版本" key="OS版本">
                        {modalData.osVersion}
                    </Descriptions.Item>
                    <Descriptions.Item label="操作系统" key="操作系统">
                        {modalData.os}
                    </Descriptions.Item>
                    <Descriptions.Item label="登录协议" key="登录协议">
                        {modalData.loginAgreement}
                    </Descriptions.Item>
                    <Descriptions.Item label="登录端口" key="登录端口">
                        {modalData.loginPort}
                    </Descriptions.Item>
                    <Descriptions.Item label="开放端口" key="开放端口">
                        {modalData.enablePort}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="设备信息" column={{ md: 2 }}>
                    <Descriptions.Item label="设备存放位置" key="设备存放位置">
                        {modalData.storeLocation}
                    </Descriptions.Item>
                    <Descriptions.Item label="设备厂商" key="设备厂商">
                        {modalData.deviceManufacturer}
                    </Descriptions.Item>
                    <Descriptions.Item label="设备版本" key="设备版本">
                        {modalData.deviceVersion}
                    </Descriptions.Item>
                    <Descriptions.Item label="设备型号" key="设备型号">
                        {modalData.deviceModel}
                    </Descriptions.Item>
                    <Descriptions.Item label="责任人" key="责任人">
                        {modalData.personInCharge}
                    </Descriptions.Item>
                    <Descriptions.Item label="联系电话" key="联系电话">
                        {modalData.personInChargePhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="描述" key="描述">
                        {modalData.description}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};

AssetList.propTypes = {
    troubleAsset: PropTypes.object,
    getWarningEvent: PropTypes.func,
    warningEvent: PropTypes.object,
    getChooseProperty: PropTypes.func,
    checkPropertyDetail: PropTypes.func,
    changePropertyModal: PropTypes.func,
    propertyModal: PropTypes.object,
    currentStep: PropTypes.number,
    chooseProperty: PropTypes.array,
};

export default AssetList;
