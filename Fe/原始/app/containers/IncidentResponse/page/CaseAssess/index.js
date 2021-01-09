import React, { useEffect, useState } from 'react';
import { searchParams } from '@utils/searchParams';
import PubMessage from '@components/PubMessage';
import { Collapse, Card, Form, Input, Radio, Button } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { caseInfo, editCase } from '../api';
import { ScCustomStep2Collapse, ScFooterWrapper, ScItWrapper } from './styled';
import CaseCheckLists from '../../components/CaseCheckLists';

const { Panel } = Collapse;
const { TextArea } = Input;

const CaseAssess = () => {
    const { id, type } = searchParams();
    const history = useHistory();
    const [resultForm] = Form.useForm();

    const [info, setInfo] = useState({});
    // 获取id查询案例详情
    useEffect(() => {
        caseInfo({ id }).then((res) => {
            if (res.code === 200) {
                setInfo(res.data);
                resultForm.setFieldsValue({
                    result: res.data.result,
                    securityAdvice: res.data.securityAdvice,
                    way: res.data.way,
                });
            } else {
                PubMessage('error', res.message);
            }
        });
    }, []);

    const handleFormChange = (changedFields) => {
        setInfo({
            ...info,
            ...changedFields,
        });
    };

    const handleEdit = (status) => {
        const requestParam = info;
        const checkLists = requestParam.checklistDTOS;
        if (status) {
            requestParam.status = status;
        }
        // 修改传过来的ids
        const engineerIds = requestParam.emergencyPersonIds.split(',');
        requestParam.engineerIds = engineerIds;
        delete requestParam.emergencyPersonIds;
        requestParam.checkLists = checkLists;
        // 把自己创建的checkList的id删除
        requestParam.checkLists.map((item) => {
            const newItem = item;
            if (newItem.id) {
                if (newItem.id.toString().includes('_')) {
                    delete newItem.id;
                }
            }
            if (newItem.caseChecklistDetails) {
                // 去除data里自己的id
                newItem.caseChecklistDetails.map((ele) => {
                    const newEle = ele;
                    if (newEle.id) {
                        if (newEle.id.toString().includes('_')) {
                            delete newEle.id;
                        }
                    }
                    return newEle;
                });
            }
            return newItem;
        });
        delete requestParam.checklistDTOS;
        // 开始提交
        editCase(requestParam).then((res) => {
            if (res.code === 200) {
                PubMessage('success', '发布成功，即将跳转到应急案例界面');
                setTimeout(() => {
                    history.push('/incident/managerCase');
                }, 1500);
            } else {
                PubMessage('error', res.message);
            }
        });
    };

    return (
        <>
            <ScItWrapper style={{ paddingBottom: '56px' }}>
                <ScCustomStep2Collapse
                    bordered={false}
                    defaultActiveKey={['assessProgress']}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) =>
                        isActive ? (
                            <ShrinkOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        ) : (
                            <ArrowsAltOutlined
                                style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                            />
                        )
                    }
                >
                    <Panel
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
                        key="assessProgress"
                    >
                        <Form
                            onValuesChange={(fields) => {
                                handleFormChange(fields);
                            }}
                            initialValues={{
                                checkLists: info.checklistDTOS,
                            }}
                        >
                            <Form.Item>
                                <CaseCheckLists
                                    checkLists={info}
                                    isNeedEdit={type === 'edit' || type === 'mangerAssess'}
                                />
                            </Form.Item>
                        </Form>
                    </Panel>
                </ScCustomStep2Collapse>
                <Card title="排查结果">
                    <Form
                        form={resultForm}
                        onValuesChange={(fields) => {
                            handleFormChange(fields);
                        }}
                        initialValues={{
                            result: info.result,
                            securityAdvice: info.securityAdvice,
                            way: info.way,
                        }}
                    >
                        <Form.Item
                            label="结论"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="result"
                        >
                            {type === 'edit' || type === 'mangerAssess' ? (
                                <TextArea rows={4} defaultValue={info.result} />
                            ) : (
                                info.result
                            )}
                        </Form.Item>
                        <Form.Item
                            label="安全加固建议"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="securityAdvice"
                        >
                            {type === 'edit' || type === 'mangerAssess' ? (
                                <TextArea rows={4} defaultValue={info.securityAdvice} />
                            ) : (
                                info.securityAdvice
                            )}
                        </Form.Item>
                        <Form.Item
                            label="实施方式"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="way"
                        >
                            {type === 'edit' || type === 'mangerAssess' ? (
                                <Radio.Group defaultValue={info.way}>
                                    <Radio value="1">现场</Radio>
                                    <Radio value="2">远程</Radio>
                                </Radio.Group>
                            ) : (
                                info.way
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            </ScItWrapper>
            {type === 'edit' && (
                <ScFooterWrapper>
                    <div style={{ float: 'right' }}>
                        <Button
                            style={{
                                marginLeft: '10px',
                                display: 'inline-block',
                            }}
                            type="primary"
                            onClick={() => {
                                handleEdit();
                            }}
                        >
                            保存
                        </Button>
                    </div>
                </ScFooterWrapper>
            )}
            {(type === 'assess' || type === 'mangerAssess') && (
                <ScFooterWrapper>
                    <div style={{ float: 'right' }}>
                        <Button
                            style={{
                                marginLeft: '10px',
                                display: 'inline-block',
                            }}
                            onClick={() => {
                                handleEdit('未通过');
                            }}
                        >
                            不通过
                        </Button>
                        <Button
                            style={{
                                marginLeft: '10px',
                                display: 'inline-block',
                            }}
                            type="primary"
                            onClick={() => {
                                handleEdit('已通过');
                            }}
                        >
                            通过
                        </Button>
                    </div>
                </ScFooterWrapper>
            )}
        </>
    );
};

export default CaseAssess;
