import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InfoItem } from '../InfoItem';

const ScFatherWrapper = styled.div`
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0px 0px;
    padding: 24px 24px 25px 24px;
    box-sizing: border-box;
    width: 100%;
`;

const EventCheckLists = (props) => {
    const { checkLists } = props;
    const [checkListsData, setCheckListsData] = useState(checkLists);
    useEffect(() => {
        setCheckListsData(checkLists);
    }, [checkLists]);

    return (
        <React.Fragment key="checkList">
            {checkListsData &&
                checkListsData.map((item) => {
                    let checkType = '';
                    switch (item.monitorType) {
                        case 0:
                            checkType = '安全设备';
                            break;
                        case 1:
                            checkType = '操作系统';
                            break;
                        case 2:
                            checkType = '数据库';
                            break;
                        default:
                            checkType = '暂无';
                            break;
                    }
                    return (
                        <div
                            key={item.id}
                            style={{ border: '1px solid #D9D9D9', marginBottom: '20px' }}
                        >
                            <ScFatherWrapper>
                                <Row style={{ marginBottom: '16px' }}>
                                    <Col xl={{ span: 8 }}>
                                        <InfoItem infoKey="排查类型" infoValue={checkType} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={{ span: 8 }}>
                                        <InfoItem infoKey="监控设备" infoValue={item.monitorName} />
                                    </Col>
                                    <Col xl={{ span: 10 }}>
                                        <InfoItem
                                            infoKey="监控地址"
                                            infoValue={item.monitorAddress}
                                        />
                                    </Col>
                                </Row>
                            </ScFatherWrapper>
                            {item.contents.map((child) => {
                                let investType = '';
                                switch (child.investContentType) {
                                    case 0:
                                        investType = '安全设备';
                                        break;
                                    case 1:
                                        investType = '操作系统';
                                        break;
                                    case 2:
                                        investType = '数据库';
                                        break;
                                    default:
                                        investType = '暂无';
                                        break;
                                }
                                return (
                                    <div
                                        style={{
                                            padding: '24px 24px 12px 24px',
                                        }}
                                        key={child.id}
                                    >
                                        <Row style={{ marginBottom: '12px' }}>
                                            <Col xl={{ span: 20 }}>
                                                <InfoItem
                                                    infoKey="排查内容"
                                                    infoValue={
                                                        <>
                                                            <div>{investType}</div>
                                                            <div>{child.investContent}</div>
                                                        </>
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: '12px' }}>
                                            <Col xl={{ span: 24 }}>
                                                <InfoItem
                                                    infoKey="取证"
                                                    infoValue={
                                                        <div
                                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                                __html: child.evidenceContent,
                                                            }}
                                                        />
                                                    }
                                                    style={{ textIndent: '2em' }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={{ span: 24 }}>
                                                <InfoItem
                                                    infoKey="分析结果"
                                                    infoValue={child.investConclusion}
                                                />
                                            </Col>
                                        </Row>
                                        <Divider style={{ width: '90%' }} />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
        </React.Fragment>
    );
};

EventCheckLists.propTypes = {
    checkLists: PropTypes.array,
};

export default EventCheckLists;
