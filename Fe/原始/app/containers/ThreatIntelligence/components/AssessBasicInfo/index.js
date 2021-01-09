import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Card, Collapse, Col, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import SoftWareTable from './SoftWareTable';
import { InfoItem } from './InfoItem';
import RejectInside from '../../assets/reject-inside.png';
import RejectNoPublish from '../../assets/reject-nopublish.png';
import Pending from '../../assets/pending.png';
import PassInside from '../../assets/pass_Inside.png';
import PassOutside from '../../assets/pass_outside.png';

const { Panel } = Collapse;

const CustomCard = styled(Card)`
    margin-bottom: 16px;
    .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
        width: 100%;
    }
`;

const CustomChildCollapse = styled(Collapse)`
    margin-bottom: 12px;
    background: #fff;
    overflow: hidden;
    & .ant-collapse-header {
        border-bottom: 1px solid #d9d9d9;
        background: #fafafa;
    }
    & .ant-collapse-item-active {
        border-bottom: 1px solid #e8e8e8;
    }
    & .ant-collapse-content-inactive {
        border-bottom: 0;
    }
    & .ant-collapse-content {
        padding-left: 24px;
    }
`;

const ExtraButton = styled(Button)`
    border: none;
`;

const CustomChildPanel = styled(Panel)`
    margin-bottom: 12px;
    background: #fff;
    overflow: hidden;
    border: 1px solid #e9e9e9;
`;

const Title = styled.span`
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
`;

const AssessConclusion = styled.div`
    width: 120px;
    height: 125px;
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 0;
    background: ${(props) => {
        const { status, publishStatus } = props;
        // 未通过
        if (status === 3 && publishStatus !== 1) {
            return `url(${RejectNoPublish}) no-repeat left top / contain`;
        }
        // 未通过
        if (status === 3 && publishStatus === 1) {
            return `url(${RejectInside}) no-repeat left top / contain`;
        }
        // 运营专家通过&对内
        if (status === 4 && publishStatus === 1) {
            return `url(${PassInside}) no-repeat left top / contain`;
        }
        // 通过&对外
        if (status === 4 && publishStatus === 2) {
            return `url(${PassOutside}) no-repeat left top / contain`;
        }
        // 情报专家通过&对内
        if (status === 2 && publishStatus === 1) {
            return `url(${PassInside}) no-repeat left top / contain`;
        }
        // 情报专家通过&对外
        if (status === 2 && publishStatus === 2) {
            return `url(${PassInside}) no-repeat left top / contain`;
        }
        // 待审核
        if (status < 2) {
            return `url(${Pending}) no-repeat left top / contain`;
        }
        return `url(${Pending}) no-repeat left top / contain`;
    }};
`;

const AssessBasicInfo = ({ allInfo }) => {
    const [cardActive, setActive] = useState(false);

    const handleActive = () => {
        setActive(!cardActive);
    };
    return (
        <CustomCard
            title="情报信息"
            bordered={false}
            extra={
                <ExtraButton onClick={handleActive} type="link">
                    {cardActive ? '收起' : '更多'}
                    {cardActive ? (
                        <UpOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                    ) : (
                        <DownOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                    )}
                </ExtraButton>
            }
        >
            <React.Fragment key="basicInfo">
                <div style={{ position: 'relative', left: 0, top: 0 }}>
                    <Row>
                        <Col xl={{ span: 24 }}>
                            <Title>漏洞信息</Title>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '16px' }}>
                        <Col xl={{ span: 6 }}>
                            <InfoItem infoKey="漏洞名称" infoValue={allInfo.name} />
                        </Col>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <InfoItem infoKey="CVE编号" infoValue={allInfo.cve} />
                        </Col>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <InfoItem infoKey="漏洞等级" infoValue={allInfo.vulLevel} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '16px' }}>
                        <Col xl={{ span: 6 }}>
                            <InfoItem infoKey="漏洞类型" infoValue={allInfo.vulType} />
                        </Col>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <InfoItem infoKey="CNNVD编号" infoValue={allInfo.cnnvd} />
                        </Col>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <InfoItem infoKey="相关链接" infoValue={allInfo.url} />
                        </Col>
                    </Row>
                    {/* 待修改 */}
                    <AssessConclusion
                        status={allInfo.status}
                        publishStatus={allInfo.publishStatus}
                    />
                </div>
            </React.Fragment>
            {cardActive && (
                <>
                    <React.Fragment key="softWareInfo">
                        <Row style={{ marginTop: '36px', marginBottom: '16px' }}>
                            <Title>软件信息</Title>
                        </Row>
                        <SoftWareTable data={allInfo.threatSoftwares} />
                    </React.Fragment>
                    <React.Fragment key="noticeInfo">
                        <Row style={{ marginTop: '36px', marginBottom: '12px' }}>
                            <Title>公告信息</Title>
                        </Row>
                        <CustomChildCollapse
                            bordered={false}
                            defaultActiveKey={['allInfo', '漏洞公告']}
                            expandIconPosition="right"
                            expandIcon={({ isActive }) =>
                                isActive ? (
                                    <Button type="link">
                                        <span
                                            style={{
                                                marginRight: 5,
                                                color: '#1890FF',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {isActive ? '收起' : '展开'}
                                        </span>
                                        <UpOutlined
                                            style={{ color: '#1890FF', fontSize: '14px' }}
                                        />
                                    </Button>
                                ) : (
                                    <Button type="link">
                                        <span
                                            style={{
                                                marginRight: 5,
                                                color: '#1890FF',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {isActive ? '收起' : '展开'}
                                        </span>
                                        <DownOutlined
                                            style={{ color: '#1890FF', fontSize: '14px' }}
                                        />
                                    </Button>
                                )
                            }
                        >
                            <CustomChildPanel
                                header={
                                    <span
                                        style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 12px' }}
                                    >
                                        漏洞公告
                                    </span>
                                }
                                key="漏洞公告"
                            >
                                <p>{allInfo.notice}</p>
                            </CustomChildPanel>
                            <CustomChildPanel
                                header={
                                    <span
                                        style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 12px' }}
                                    >
                                        影响范围
                                    </span>
                                }
                                key="影响范围"
                            >
                                <p>{allInfo.scope}</p>
                            </CustomChildPanel>
                            <CustomChildPanel
                                header={
                                    <span
                                        style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 12px' }}
                                    >
                                        漏洞描述
                                    </span>
                                }
                                key="漏洞描述"
                            >
                                <p>{allInfo.description}</p>
                            </CustomChildPanel>
                            <CustomChildPanel
                                header={
                                    <span
                                        style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 12px' }}
                                    >
                                        缓解措施
                                    </span>
                                }
                                key="缓解措施"
                            >
                                <p>{allInfo.solution}</p>
                            </CustomChildPanel>
                            <CustomChildPanel
                                header={
                                    <span
                                        style={{ color: 'rgba(0, 0, 0, 0.85)', margin: '0 12px' }}
                                    >
                                        友情提示
                                    </span>
                                }
                                key="友情提示"
                            >
                                <p>{allInfo.tips}</p>
                            </CustomChildPanel>
                        </CustomChildCollapse>
                    </React.Fragment>
                </>
            )}
        </CustomCard>
    );
};

AssessBasicInfo.propTypes = {
    allInfo: PropTypes.object,
};

export default AssessBasicInfo;
