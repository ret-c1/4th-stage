import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { Collapse, Card, Form, Input, Radio, Row, Col } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import FormItem from '@components/FormItem';
import moment from 'moment';
import { ScCustomStep2Collapse } from './styled';
import EmergencyCheckLists from '../../components/EmergencyCheckLists';
import { emergencyFormConfig } from './step2fomconfig';

const { Panel } = Collapse;
const { TextArea } = Input;

const Step2 = (props) => {
    // setFieldsValue
    const [form] = Form.useForm();
    const { info, formInfoRef } = props;
    const checkListRef = useRef(null);
    // 监听数据变化
    const [nInfo, setNInfo] = useState(info);
    useEffect(() => {
        setNInfo(info);
        form.setFieldsValue({
            name: info.name,
            type: info.type,
            keyword: info.keyword,
            level: info.level,
            urgency: info.urgency,
            targetIp: info.targetIp,
            attack: info.attack,
            intranetSystem: info.intranetSystem,
            aimIp: info.aimIp,
            aimSecurityDomain: info.aimSecurityDomain,
            internetSystem: info.internetSystem,
            happenTime: moment(info.happenTime),
            realDiscoverTime: info.realDiscoverTime ? moment(info.realDiscoverTime) : '',
            description: info.description,
        });
    }, [info]);

    // useEffect(() => {
    //     setChecklistDTOS({ checkLists: nInfo.checklistDTOS });
    // }, [checklistDTOS.checkLists]);

    const handleFormChange = (changedFields) => {
        setNInfo({
            ...nInfo,
            ...changedFields,
        });
    };

    // 向父节点暴露数据
    useImperativeHandle(formInfoRef, () => ({
        formInfo: nInfo,
    }));

    return (
        <div style={{ paddingBottom: '56px', background: '#fff' }}>
            <Form.Provider>
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
                                应急信息
                            </span>
                        }
                        key="assessProgress"
                    >
                        <Form
                            form={form}
                            name="basicInfo"
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'emergencyBasicInfo');
                            }}
                        >
                            <Row style={{ marginTop: '8px' }}>
                                {emergencyFormConfig.map((item, index) => {
                                    if (item.label === '事件描述') {
                                        return (
                                            <Col xl={{ span: 24 }} key={item.label}>
                                                <FormItem
                                                    key={item.label}
                                                    label={item.label}
                                                    name={item.name}
                                                    type={item.type}
                                                    options={item.options}
                                                    placeholder={item.placeholder}
                                                    rules={item.rules}
                                                    labelCol={item.labelCol}
                                                    wrapperCol={item.wrapperCol}
                                                />
                                            </Col>
                                        );
                                    }
                                    if (index % 3 === 0) {
                                        return (
                                            <Col xl={{ span: 6 }} key={item.label}>
                                                <FormItem
                                                    key={item.label}
                                                    label={item.label}
                                                    name={item.name}
                                                    type={item.type}
                                                    options={item.options}
                                                    placeholder={item.placeholder}
                                                    rules={item.rules}
                                                    labelCol={item.labelCol}
                                                    wrapperCol={item.wrapperCol}
                                                />
                                            </Col>
                                        );
                                    }
                                    return (
                                        <Col xl={{ span: 6, offset: 3 }} key={item.label}>
                                            <FormItem
                                                key={item.label}
                                                label={item.label}
                                                name={item.name}
                                                type={item.type}
                                                options={item.options}
                                                placeholder={item.placeholder}
                                                rules={item.rules}
                                                labelCol={item.labelCol}
                                                wrapperCol={item.wrapperCol}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Form>
                    </Panel>
                </ScCustomStep2Collapse>
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
                            name="checkPart"
                            onValuesChange={(fields) => {
                                handleFormChange(fields);
                            }}
                            initialValues={{
                                checkLists: nInfo.checklistDTOS,
                            }}
                        >
                            <Form.Item name="checklistDTOS">
                                <EmergencyCheckLists
                                    checkLists={info}
                                    isNeedEdit
                                    checkListRef={checkListRef}
                                />
                            </Form.Item>
                        </Form>
                    </Panel>
                </ScCustomStep2Collapse>
                <Card title="排查结果">
                    <Form
                        name="checkResult"
                        onValuesChange={(fields) => {
                            handleFormChange(fields, 'checkResult');
                        }}
                        initialValues={{
                            result: nInfo.result,
                            securityAdvice: nInfo.securityAdvice,
                            way: nInfo.way,
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
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="安全加固建议"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="securityAdvice"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="实施方式"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="way"
                        >
                            <Radio.Group>
                                <Radio value="现场">现场</Radio>
                                <Radio value="远程">远程</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Card>
            </Form.Provider>
        </div>
    );
};

Step2.propTypes = {
    // id: PropTypes.string,
    info: PropTypes.object,
    formInfoRef: PropTypes.object,
};

export default Step2;
