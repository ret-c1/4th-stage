import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Divider } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { InfoItem } from '../InfoItem';
import FatherModal from './FatherModal';
import ChildModal from './ChildModal';

const StyledFatherWrapper = styled.div`
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0px 0px;
    padding: 24px 24px 25px 24px;
    box-sizing: border-box;
    width: 100%;
`;

const CheckLists = (props) => {
    const { checkLists, isNeedEdit } = props;
    const [isCheck] = useState(!isNeedEdit);
    const [checkListsData, setCheckListsData] = useState(checkLists);
    useEffect(() => {
        setCheckListsData(checkLists);
    }, [checkLists]);

    const [fatherVisible, setFatherVisible] = useState(false);
    const handleFatherCancel = () => setFatherVisible(false);
    const [childVisible, setChildVisible] = useState(false);
    const handleChildCancel = () => setChildVisible(false);

    return (
        <React.Fragment key="checkList">
            {checkListsData.map((item) => {
                let name = '设备名称';
                let ip = '设备ip';
                if (item.type === '操作系统') {
                    name = '操作系统类型';
                    ip = '操作系统ip';
                }
                if (item.type === '数据库') {
                    name = '数据库类型';
                    ip = '数据库ip';
                }
                return (
                    <div
                        key={item.id}
                        style={{ border: '1px solid #D9D9D9', marginBottom: '20px' }}
                    >
                        <StyledFatherWrapper>
                            <Row style={{ marginBottom: '16px' }}>
                                <Col xl={{ span: 8 }}>
                                    <InfoItem infoKey="排查类型" infoValue={item.type} />
                                </Col>
                                <Col
                                    xl={{ span: 4 }}
                                    style={{
                                        marginLeft: 'auto',
                                        textAlign: 'right',
                                    }}
                                >
                                    {!isCheck ? (
                                        <>
                                            <Button
                                                type="link"
                                                size="small"
                                                onClick={() => setFatherVisible(true)}
                                            >
                                                编辑
                                            </Button>
                                            <Divider type="vertical" />
                                            <Button type="link" size="small">
                                                删除
                                            </Button>
                                        </>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={{ span: 8 }}>
                                    <InfoItem infoKey={name} infoValue={item.name} />
                                </Col>
                                <Col xl={{ span: 10 }}>
                                    <InfoItem infoKey={ip} infoValue={item.ip} />
                                </Col>
                            </Row>
                        </StyledFatherWrapper>
                        {item.data.map((child) => (
                            <>
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
                                                infoValue={child.content}
                                            />
                                        </Col>
                                        <Col
                                            xl={{ span: 3 }}
                                            style={{
                                                marginLeft: 'auto',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {!isCheck ? (
                                                <>
                                                    <Button
                                                        type="link"
                                                        size="small"
                                                        onClick={() => setChildVisible(true)}
                                                    >
                                                        编辑
                                                    </Button>
                                                    <Divider type="vertical" />
                                                    <Button
                                                        type="link"
                                                        size="small"
                                                        onClick={() => {}}
                                                    >
                                                        删除
                                                    </Button>
                                                </>
                                            ) : null}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '12px' }}>
                                        <Col xl={{ span: 24 }}>
                                            <InfoItem
                                                infoKey="取证"
                                                infoValue={
                                                    <div
                                                        dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                            __html: child.evidence,
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
                                                infoValue={child.analysis}
                                            />
                                        </Col>
                                    </Row>
                                    <Divider style={{ width: '90%' }} />
                                </div>
                            </>
                        ))}
                        {!isCheck ? (
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    style={{
                                        width: '95%',
                                        marginBottom: 8,
                                        margin: '16px auto',
                                    }}
                                    type="dashed"
                                    onClick={() => setChildVisible(true)}
                                >
                                    <PlusOutlined />
                                    添加排查内容
                                </Button>
                            </div>
                        ) : null}
                    </div>
                );
            })}
            {!isCheck ? (
                <>
                    <Button
                        style={{
                            width: '100%',
                            marginTop: 16,
                            marginBottom: 8,
                            background: 'rgba(0, 0, 0, 0.04)',
                        }}
                        type="dashed"
                        onClick={() => setFatherVisible(true)}
                    >
                        <PlusOutlined />
                        添加排查类型
                    </Button>
                </>
            ) : null}
            <FatherModal visible={fatherVisible} handleCancel={handleFatherCancel} />
            <ChildModal visible={childVisible} handleCancel={handleChildCancel} />
        </React.Fragment>
    );
};

CheckLists.propTypes = {
    checkLists: PropTypes.array,
    isNeedEdit: PropTypes.bool,
};

export default CheckLists;
