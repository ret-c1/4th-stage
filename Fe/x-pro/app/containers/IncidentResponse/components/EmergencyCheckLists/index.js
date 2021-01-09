import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Divider, message } from 'antd';
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

const EmergencyCheckLists = (props) => {
    const { checkLists, isNeedEdit, form } = props;
    const [isCheck] = useState(!isNeedEdit);
    const [checkListsData, setCheckListData] = useState(checkLists);

    useEffect(() => {
        if (checkLists) {
            setCheckListData(checkLists);
        }
    }, [checkLists]);

    // 保存点击父节点编辑
    const [fatherRecord, setFatherRecord] = useState({});
    // 保存点击子节点编辑
    const [childRecord, setChildRecord] = useState({});
    // 模态框关闭，置空父节点和子节点
    const resetSave = () => {
        setFatherRecord({});
        setChildRecord({});
    };
    // 记录操作状态，新增还是编辑
    const [actionType, setActionType] = useState('add');
    // 保存点击的父节点索引和子节点索引
    const [fIndex, setFIndex] = useState(-1);
    const [cIndex, setCIndex] = useState(-1);

    // 添加模态框相关
    const [fatherVisible, setFatherVisible] = useState(false);
    const handleFatherCancel = () => setFatherVisible(false);
    const [childVisible, setChildVisible] = useState(false);
    const handleChildCancel = () => setChildVisible(false);

    // 排查记录顺序重排
    // 对父记录重排
    const checkListsSort = (newList) => {
        newList.forEach((item, index) => {
            const newObj = { ...item };
            newObj.sort = index;
            return newObj;
        });
    };

    // 对子记录重排
    const checkListsChildSort = (fatherIndex, newList) => {
        newList[fatherIndex].data.forEach((item, index) => {
            const newObj = { ...item };
            newObj.sort = index;
            return newObj;
        });
    };

    // 父节点改变相关操作
    const handleChangeFather = (fatherIndex, type, newEle) => {
        const newList = checkListsData.checklistDTOS;
        if (type === 'edit') {
            newList.splice(fatherIndex, 1, newEle);
        }
        if (type === 'delete') {
            newList.splice(fatherIndex, 1);
            // 删除后对排查记录顺序重排
            checkListsSort(newList);
        }
        if (type === 'add') {
            newList.push(newEle);
        }
        setCheckListData({ ...checkListsData, checklistDTOS: newList });

        // 创建应急 - 使用 form方法取值
        if (form) {
            form.setFieldsValue({ checkLists: newList });
        }
        // onChange({ checklistDTOS: newList });
        message.success('成功');
    };

    // 子节点改变相关操作
    const handleChangeChild = (fatherIndex, childIndex, type, newEle) => {
        const newList = checkListsData.checklistDTOS;
        if (type === 'edit') {
            newList[fatherIndex].data.splice(childIndex, 1, newEle);
        }
        if (type === 'delete') {
            newList[fatherIndex].data.splice(childIndex, 1);
            checkListsChildSort(fatherIndex, newList);
        }
        if (type === 'add') {
            newList[fatherIndex].data.push(newEle);
        }
        setCheckListData({ ...checkListsData, checklistDTOS: newList });

        // 创建应急 - 使用 form方法取值
        if (form) {
            form.setFieldsValue({ checkLists: newList });
        }
        // onChange({ checklistDTOS: newList });
        message.success('成功');
    };

    // // 向父节点暴露数据
    // useImperativeHandle(checkListRef, () => ({
    //     checkLists: checkListsData.checklistDTOS,
    // }));

    return (
        <React.Fragment key="checkList">
            {checkListsData.checklistDTOS &&
                checkListsData.checklistDTOS.map((item, fatherIndex) => {
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
                                                    onClick={() => {
                                                        setFatherRecord(
                                                            checkListsData.checklistDTOS[
                                                                fatherIndex
                                                            ],
                                                        );
                                                        setActionType('edit');
                                                        setFatherVisible(true);
                                                        setFIndex(fatherIndex);
                                                    }}
                                                >
                                                    编辑
                                                </Button>
                                                <Divider type="vertical" />
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    onClick={() => {
                                                        handleChangeFather(fatherIndex, 'delete');
                                                    }}
                                                >
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
                            {item.data &&
                                item.data.map((child, childIndex) => (
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
                                                            onClick={() => {
                                                                // const newItem = checkListsData.checklistDTOS[fatherIndex].data[childIndex];
                                                                const {
                                                                    checklistDTOS,
                                                                } = checkListsData;
                                                                const { data } = checklistDTOS[
                                                                    fatherIndex
                                                                ];
                                                                setChildVisible(true);
                                                                setActionType('edit');
                                                                setChildRecord(data[childIndex]);
                                                                setFIndex(fatherIndex);
                                                                setCIndex(childIndex);
                                                            }}
                                                        >
                                                            编辑
                                                        </Button>
                                                        <Divider type="vertical" />
                                                        <Button
                                                            type="link"
                                                            size="small"
                                                            onClick={() => {
                                                                handleChangeChild(
                                                                    fatherIndex,
                                                                    childIndex,
                                                                    'delete',
                                                                );
                                                            }}
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
                                        onClick={() => {
                                            setChildVisible(true);
                                            setActionType('add');
                                            setFIndex(fatherIndex);
                                        }}
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
                        onClick={() => {
                            setFatherVisible(true);
                            setActionType('add');
                        }}
                    >
                        <PlusOutlined />
                        添加排查类型
                    </Button>
                </>
            ) : null}
            <FatherModal
                visible={fatherVisible}
                handleCancel={handleFatherCancel}
                changeCheckList={handleChangeFather}
                checkLists={checkListsData}
                fatherRecord={fatherRecord}
                resetSave={resetSave}
                actionType={actionType}
                fatherIndex={fIndex}
            />
            <ChildModal
                visible={childVisible}
                handleCancel={handleChildCancel}
                changeCheckList={handleChangeChild}
                checkLists={checkListsData}
                childRecord={childRecord}
                actionType={actionType}
                fatherIndex={fIndex}
                childIndex={cIndex}
                resetSave={resetSave}
            />
        </React.Fragment>
    );
};

EmergencyCheckLists.propTypes = {
    checkLists: PropTypes.object,
    isNeedEdit: PropTypes.bool,
    form: PropTypes.object,
    // checkListRef: PropTypes.object,
};

export default EmergencyCheckLists;
