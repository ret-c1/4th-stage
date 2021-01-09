import React, { useState, useEffect } from 'react';
import {
    DownOutlined,
    UpOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Row, Col, Button, Descriptions, Modal } from 'antd';
import { searchParams } from '@utils/searchParams';
import PubMessage from '@components/PubMessage';
import { useHistory } from 'react-router-dom';
import EmergencyBasicInfo from '../../components/EmergencyBasicInfo';
import EmergencyCheckLists from '../../components/EmergencyCheckLists';
import { getEmergencyInfo, caseInfo, getEmergencyPass, getEmergencyRefuse } from '../api';
import { renderContrackType } from '../utils';
import {
    ScAssessInfo,
    ScHeadIcon,
    ScButton,
    ScMoreButton,
    ScCustomPanel,
    ScCustomCollapse,
    ScDescriptions,
} from './style';

const { confirm } = Modal;

const Assess = () => {
    const { type, id, source } = searchParams();
    const history = useHistory();
    // 获取应急信息
    const [info, setInfo] = useState({});
    useEffect(() => {
        if (source) {
            caseInfo({ id: parseInt(id, 10) }).then((res) => {
                if (res.code === 200) {
                    setInfo(res.data);
                } else {
                    PubMessage('error', res.message);
                }
            });
        } else {
            getEmergencyInfo(parseInt(id, 10)).then((res) => {
                if (res.code === 200) {
                    setInfo(res.data);
                } else {
                    PubMessage('error', res.message);
                }
            });
        }
    }, []);

    // 是否查看更多
    const [isAssessActive, setIsAssessActive] = useState(false);

    const handlePass = () => {
        confirm({
            title: '评审',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要通过评审吗？',
            okText: '确认',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                getEmergencyPass({ id }).then((res) => {
                    if (res.code === 200) {
                        PubMessage('success', '评审已通过，即将跳转到评审列表');
                        setTimeout(() => {
                            history.push('/incident/examine');
                        }, 1500);
                    } else {
                        PubMessage('error', res.message);
                    }
                });
            },
        });
    };
    const handleRefuse = () => {
        confirm({
            title: '评审',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要拒绝评审吗？',
            okText: '确认',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                getEmergencyRefuse({ id }).then((res) => {
                    if (res.code === 200) {
                        PubMessage('success', '评审已拒绝，即将跳转到评审列表');
                        setTimeout(() => {
                            history.push('/incident/examine');
                        }, 1500);
                    } else {
                        PubMessage('error', res.message);
                    }
                });
            },
        });
    };
    return (
        <>
            <ScAssessInfo>
                {(!source || source !== 'engineer') && (
                    <>
                        <Row>
                            <ScHeadIcon />
                            <Col>
                                <span
                                    style={{
                                        fontSize: '20px',
                                        color: 'rgba(0, 0, 0, 0.85)',
                                        lineHeight: '28px',
                                        marginLeft: '16px',
                                    }}
                                >
                                    客户名称：{info.clientName}
                                </span>
                            </Col>
                            {type === 'assess' && (
                                <Col style={{ marginLeft: 'auto' }}>
                                    <ScButton
                                        onClick={() => {
                                            history.push('/incident/examine');
                                        }}
                                    >
                                        取消
                                    </ScButton>
                                    <ScButton onClick={handleRefuse}>不通过</ScButton>
                                    <Button type="primary" onClick={handlePass}>
                                        通过
                                    </Button>
                                </Col>
                            )}
                        </Row>
                        <div style={{ position: 'relative' }}>
                            <ScMoreButton
                                type="link"
                                onClick={() => {
                                    setIsAssessActive(!isAssessActive);
                                }}
                            >
                                {!isAssessActive ? `更多` : `收起`}
                                {!isAssessActive ? <DownOutlined /> : <UpOutlined />}
                            </ScMoreButton>
                            <Descriptions style={{ marginLeft: '43px', marginTop: '16px' }}>
                                <Descriptions.Item label="客户联系人" key="客户联系人">
                                    {info.clientAttention}
                                </Descriptions.Item>
                                <Descriptions.Item label="联系电话" key="联系电话">
                                    {info.clientMobilePhone}
                                </Descriptions.Item>
                                <Descriptions.Item label="客户地址" key="客户地址">
                                    {info.clientAddress}
                                </Descriptions.Item>
                                <Descriptions.Item label="项目经理" key="项目经理">
                                    {info.emergencyManager}
                                </Descriptions.Item>
                                <Descriptions.Item label="应急人员" key="应急人员">
                                    {info.emergencyPerson}
                                </Descriptions.Item>
                                <Descriptions.Item label="实施方式" key="实施方式">
                                    {info.way}
                                </Descriptions.Item>
                                <Descriptions.Item label="问题概述" span={3} key="问题概述">
                                    {info.introduction}
                                </Descriptions.Item>
                                {isAssessActive ? (
                                    <>
                                        <Descriptions.Item label="合同类型" key="合同类型">
                                            {renderContrackType(info.contractType)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="客户邮箱" key="客户邮箱">
                                            {info.clientEmail}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="销售名字" key="销售名字">
                                            {info.sellerName}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            label="销售联系电话"
                                            key="销售联系电话"
                                            span={3}
                                        >
                                            {info.sellerPhone}
                                        </Descriptions.Item>
                                    </>
                                ) : null}
                            </Descriptions>
                        </div>
                    </>
                )}
            </ScAssessInfo>
            <ScCustomCollapse
                bordered={false}
                defaultActiveKey={['basicInfo', 'checkRecord', 'judgement']}
                expandIconPosition="right"
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <ShrinkOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }} />
                    ) : (
                        <ArrowsAltOutlined
                            style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                        />
                    )
                }
            >
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            应急事件信息
                        </span>
                    }
                    key="basicInfo"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <EmergencyBasicInfo info={info} />
                    </div>
                </ScCustomPanel>
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            排查记录
                        </span>
                    }
                    key="checkRecord"
                >
                    <div style={{ padding: '16px 32px 32px' }}>
                        <EmergencyCheckLists checkLists={info} />
                    </div>
                </ScCustomPanel>
                <ScCustomPanel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            排查结果
                        </span>
                    }
                    key="judgement"
                >
                    <div style={{ padding: '16px 32px' }}>
                        <ScDescriptions column={2}>
                            <Descriptions.Item label="结论" span={2} key="结论">
                                {info.result}
                            </Descriptions.Item>
                            <Descriptions.Item label="安全加固建议" span={2} key="安全加固建议">
                                {info.securityAdvice}
                            </Descriptions.Item>
                            <Descriptions.Item label="实施方式" key="实施方式">
                                {info.way}
                            </Descriptions.Item>
                        </ScDescriptions>
                    </div>
                </ScCustomPanel>
            </ScCustomCollapse>
        </>
    );
};

export default Assess;
