import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Row, Col, Button, Modal } from 'antd';
import { DownOutlined, UpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
    ScItWrapper,
    ScAssessInfo,
    ScHeadIcon,
    ScMoreButton,
    ScDescriptions,
    ScFooterWrapper,
} from './styled';
// import { getEmergencyInfo, getEmergencyComplete } from '../api';

const { confirm } = Modal;

const HandleCheck = () => {
    const { id, type } = searchParams();
    const history = useHistory();
    // 获取应急信息
    const [info] = useState({});
    console.log(id, history);
    useEffect(() => {
        // getEmergencyInfo(id).then((res) => {
        //     if (res.code === 200) {
        //         setInfo(res.data);
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    }, []);
    const [isAssessActive, setIsAssessActive] = useState(false);

    // 结束应急
    const finishEmergency = () => {
        confirm({
            title: '应急结束',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要结束应急吗？',
            okText: '确认',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                // getEmergencyComplete({ id }).then((res) => {
                //     if (res.code === 200) {
                //         message.success('关闭成功,即将跳转到应急评审页面');
                //         setTimeout(() => {
                //             history.push('/incident/examine');
                //         }, 1500);
                //     } else {
                //         message.error(res.message);
                //     }
                // });
            },
        });
    };

    return (
        <ScItWrapper>
            <ScAssessInfo>
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
                    <Descriptions column={3} style={{ marginLeft: '43px', marginTop: '16px' }}>
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
                                    {info.contractType}
                                </Descriptions.Item>
                                <Descriptions.Item label="客户邮箱" key="客户邮箱">
                                    {info.clientEmail}
                                </Descriptions.Item>
                                <Descriptions.Item label="销售名字" key="销售名字">
                                    {info.sellerName}
                                </Descriptions.Item>
                                <Descriptions.Item label="销售联系电话" key="销售联系电话">
                                    {info.sellerPhone}
                                </Descriptions.Item>
                            </>
                        ) : null}
                    </Descriptions>
                </div>
            </ScAssessInfo>
            <Card title="应急处置记录">
                <ScDescriptions column={1} style={{ marginLeft: '200px' }}>
                    <Descriptions.Item label="处置开始时间" key="处置开始时间">
                        {info.startHandleTime
                            ? moment(info.startHandleTime).format('YYYY-MM-DD HH:mm:ss')
                            : '暂无'}
                    </Descriptions.Item>
                    <Descriptions.Item label="处置过程" key="处置过程">
                        {info.handle}
                    </Descriptions.Item>
                    <Descriptions.Item label="事件处置结果" key="事件处置结果">
                        {info.handleResult}
                    </Descriptions.Item>
                    <Descriptions.Item label="可行性建议" key="可行性建议">
                        {info.feasibilityAdvice}
                    </Descriptions.Item>
                    <Descriptions.Item label="实施方式" key="实施方式">
                        {info.way}
                    </Descriptions.Item>
                </ScDescriptions>
            </Card>
            {type === 'finish' && (
                <ScFooterWrapper>
                    <div style={{ float: 'right' }}>
                        <Button
                            onClick={finishEmergency}
                            style={{
                                marginLeft: '10px',
                                display: 'inline-block',
                            }}
                            type="primary"
                        >
                            应急结束
                        </Button>
                    </div>
                </ScFooterWrapper>
            )}
        </ScItWrapper>
    );
};

export default HandleCheck;
