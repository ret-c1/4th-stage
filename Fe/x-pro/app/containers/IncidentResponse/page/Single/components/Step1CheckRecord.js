import React, { useState, useEffect } from 'react';
import { Descriptions, Button, Row, Col, Tag } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { InfoItem } from '../../../components/InfoItem';
import EventCheckLists from '../../../components/EventCheckLists';

const ScListWrapper = styled.div`
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 17px;
`;

const CustomRow = styled(Row)`
    padding-top: 12px;
`;

const Step1CheckRecord = (props) => {
    // 获取传递过来的告警分析记录和日志分析记录
    const { oWarningInfo, oLogInfo } = props;
    const [warningInfo, setWarningInfo] = useState(oWarningInfo);
    const [logInfo, setLogInfo] = useState(oWarningInfo);
    // 监听props改变
    useEffect(() => {
        setWarningInfo(oWarningInfo);
    }, [oWarningInfo]);
    useEffect(() => {
        setLogInfo(oLogInfo);
    }, [oLogInfo]);
    const [basicActive, setBasicActive] = useState(true);
    const [alarmActive, setAlarmActive] = useState(true);
    const [checkRecordActive, setCheckRecordActive] = useState(true);
    return (
        <>
            {(warningInfo || logInfo) && (
                <Descriptions bordered layout="vertical" column={1}>
                    {warningInfo && (
                        <Descriptions.Item
                            label={<span style={{ fontWeight: 'bold' }}>告警分析记录</span>}
                            key={1}
                        >
                            <React.Fragment key="告警信息">
                                <ScListWrapper key={111111}>
                                    <Row key="basic">
                                        <Button
                                            type="link"
                                            onClick={() => setBasicActive(!basicActive)}
                                        >
                                            {basicActive ? <UpOutlined /> : <DownOutlined />}
                                            基础信息
                                        </Button>
                                    </Row>
                                    {basicActive && (
                                        <CustomRow key="info">
                                            <Col xl={{ span: 5, offset: 1 }}>
                                                <InfoItem
                                                    infoKey="监控人员"
                                                    infoValue={warningInfo.monitorUser}
                                                />
                                            </Col>
                                            <Col xl={{ span: 5, offset: 1 }}>
                                                <InfoItem
                                                    infoKey="设备名称"
                                                    infoValue={warningInfo.deviceName}
                                                />
                                            </Col>
                                            <Col xl={{ span: 5, offset: 1 }}>
                                                <InfoItem
                                                    infoKey="监控设备"
                                                    infoValue={warningInfo.monitorDevice}
                                                />
                                            </Col>
                                            <Col xl={{ span: 5, offset: 1 }}>
                                                <InfoItem
                                                    infoKey="监控地点"
                                                    infoValue={warningInfo.monitorAddress}
                                                />
                                            </Col>
                                        </CustomRow>
                                    )}
                                </ScListWrapper>
                                <ScListWrapper key={222222}>
                                    <Row key="warning">
                                        <Button
                                            type="link"
                                            onClick={() => setAlarmActive(!alarmActive)}
                                        >
                                            {alarmActive ? <UpOutlined /> : <DownOutlined />}
                                            告警事件信息
                                        </Button>
                                    </Row>
                                    {alarmActive && (
                                        <>
                                            <CustomRow key="warningInfo">
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="告警名称"
                                                        infoValue={warningInfo.name}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="告警级别"
                                                        infoValue={warningInfo.level}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="告警次数"
                                                        infoValue={`${warningInfo.count || 0}次`}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="发现时间"
                                                        infoValue={(() => {
                                                            const time = warningInfo.foundTime;
                                                            if (time) {
                                                                return moment(
                                                                    warningInfo.foundTime,
                                                                ).format('YYYY-MM-DD HH:mm:ss');
                                                            }
                                                            return '暂无填写';
                                                        })()}
                                                    />
                                                </Col>
                                            </CustomRow>
                                            <CustomRow key="source">
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="来源IP"
                                                        infoValue={warningInfo.sourceIps}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="目的IP"
                                                        infoValue={warningInfo.destIps}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="目的系统"
                                                        infoValue={warningInfo.destSystem}
                                                    />
                                                </Col>
                                            </CustomRow>
                                        </>
                                    )}
                                </ScListWrapper>
                                <ScListWrapper key={3333}>
                                    <div>
                                        <Button
                                            type="link"
                                            onClick={() => setCheckRecordActive(!checkRecordActive)}
                                        >
                                            {checkRecordActive ? <UpOutlined /> : <DownOutlined />}
                                            排查信息
                                        </Button>
                                    </div>
                                    {checkRecordActive && (
                                        <>
                                            {warningInfo.infos &&
                                                warningInfo.infos.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        style={{ marginBottom: '20px' }}
                                                    >
                                                        <CustomRow>
                                                            <Col xl={{ span: 12, offset: 1 }}>
                                                                <InfoItem
                                                                    infoKey="排查内容"
                                                                    infoValue={item.investContent}
                                                                />
                                                            </Col>
                                                        </CustomRow>
                                                        <CustomRow>
                                                            <Col xl={{ span: 12, offset: 1 }}>
                                                                <InfoItem
                                                                    infoKey="取证"
                                                                    infoValue={
                                                                        <div
                                                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                                                __html:
                                                                                    item.evidenceContent,
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            </Col>
                                                        </CustomRow>
                                                        <CustomRow>
                                                            <Col xl={{ span: 12, offset: 1 }}>
                                                                <InfoItem
                                                                    infoKey="结论"
                                                                    infoValue={
                                                                        item.investConclusion
                                                                    }
                                                                />
                                                            </Col>
                                                        </CustomRow>
                                                    </div>
                                                ))}
                                        </>
                                    )}
                                </ScListWrapper>
                            </React.Fragment>
                        </Descriptions.Item>
                    )}
                    {logInfo && (
                        <Descriptions.Item
                            label={<span style={{ fontWeight: 'bold' }}>日志分析记录</span>}
                            key={2}
                        >
                            <React.Fragment key="日志分析">
                                <ScListWrapper>
                                    <Row key="事件总结">
                                        <Button
                                            type="link"
                                            onClick={() => setBasicActive(!basicActive)}
                                        >
                                            {basicActive ? <UpOutlined /> : <DownOutlined />}
                                            事件总结
                                        </Button>
                                    </Row>
                                    {basicActive && (
                                        <React.Fragment key="更多信息">
                                            <CustomRow key="更多">
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="事件名称"
                                                        infoValue={logInfo.eventName}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="事件级别"
                                                        infoValue={
                                                            <Tag color="error">
                                                                {logInfo.eventLevel}
                                                            </Tag>
                                                        }
                                                    />
                                                </Col>
                                            </CustomRow>
                                            <CustomRow key="目的">
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="目的IP"
                                                        infoValue={logInfo.destIps}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="目的系统"
                                                        infoValue={logInfo.destSystem}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="来源IP"
                                                        infoValue={logInfo.sourceIps}
                                                    />
                                                </Col>
                                                <Col xl={{ span: 5, offset: 1 }}>
                                                    <InfoItem
                                                        infoKey="攻击来源"
                                                        infoValue={logInfo.attachSource}
                                                    />
                                                </Col>
                                            </CustomRow>
                                        </React.Fragment>
                                    )}
                                </ScListWrapper>
                                <ScListWrapper key={88888}>
                                    <div>
                                        <Button
                                            type="link"
                                            onClick={() => setCheckRecordActive(!checkRecordActive)}
                                        >
                                            {checkRecordActive ? <UpOutlined /> : <DownOutlined />}
                                            排查信息
                                        </Button>
                                    </div>
                                    {checkRecordActive && (
                                        <>
                                            <EventCheckLists checkLists={logInfo.infos} />
                                        </>
                                    )}
                                </ScListWrapper>
                            </React.Fragment>
                        </Descriptions.Item>
                    )}
                </Descriptions>
            )}
        </>
    );
};
Step1CheckRecord.propTypes = {
    oLogInfo: PropTypes.object,
    oWarningInfo: PropTypes.object,
};

export default Step1CheckRecord;
