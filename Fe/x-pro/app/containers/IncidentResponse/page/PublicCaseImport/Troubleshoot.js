import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { compose } from 'redux';
import { Divider, Form, Row, Col, Input, DatePicker, Radio } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';
import EmergencyCheckLists from '@containers/IncidentResponse/components/EmergencyCheckLists';
import { ScContent } from '../styled';

const { TextArea } = Input;

const TroubleshootComponent = (props) => {
    const { form } = props;
    const [isOpen, setIsOpen] = useState({
        card1: true,
        card2: true,
        card3: true,
        card4: true,
        card5: true,
    });

    const shrinkFunc = (val) => {
        setIsOpen({
            ...isOpen,
            [`card${val}`]: !isOpen[`card${val}`],
        });
    };
    const [formdata] = useState([]);

    return (
        <>
            <ScContent>
                <Row>
                    <Col span={4}>
                        <h3 style={{ paddingLeft: '50px' }}>排查结果</h3>
                    </Col>
                    <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                        <ShrinkOutlined onClick={() => shrinkFunc(3)} />
                    </Col>
                </Row>
                <Divider />
                {isOpen.card3 ? (
                    <Form.Item
                        name="checkLists"
                        labelCol={{ span: 0 }}
                        wrapperCol={{ span: 20, offset: 2 }}
                    >
                        <EmergencyCheckLists
                            checkLists={{
                                checklistDTOS: formdata,
                            }}
                            isNeedEdit
                            form={form}
                        />
                    </Form.Item>
                ) : null}
            </ScContent>
            <ScContent>
                <Row>
                    <Col span={4}>
                        <h3 style={{ paddingLeft: '50px' }}>排查结果</h3>
                    </Col>
                    <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                        <ShrinkOutlined onClick={() => shrinkFunc(4)} />
                    </Col>
                </Row>
                <Divider />
                {isOpen.card4 ? (
                    <div style={{ padding: '0 40px' }}>
                        <Form.Item
                            label="分析结果"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="result1"
                        >
                            <Radio.Group>
                                <Radio value="1">有效事件</Radio>
                                <Radio value="2">隐患时间</Radio>
                                <Radio value="3">无效事件</Radio>
                            </Radio.Group>
                        </Form.Item>
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
                                <Radio value="1">现场</Radio>
                                <Radio value="2">远程</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                ) : null}
            </ScContent>
            <ScContent>
                <Row>
                    <Col span={4}>
                        <h3 style={{ paddingLeft: '50px' }}>处置记录</h3>
                    </Col>
                    <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                        <ShrinkOutlined onClick={() => shrinkFunc(5)} />
                    </Col>
                </Row>
                <Divider />
                {isOpen.card5 ? (
                    <div style={{ padding: '0 40px' }}>
                        <Form.Item
                            label="处置开始时间"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 5,
                            }}
                            name="startHandleTime"
                        >
                            <DatePicker
                                showTime
                                // format="YYYY-MM-DD HH:mm"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                            />
                        </Form.Item>
                        <Form.Item
                            label="处置过程"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="handle"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="事件处置结果"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="handleResult"
                        >
                            <Radio.Group>
                                <Radio value="1">已整改</Radio>
                                <Radio value="2">已监控</Radio>
                                <Radio value="3">已防护</Radio>
                                <Radio value="4">未解决</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="可行性建议"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="feasibilityAdvice"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="实施方式"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 22,
                            }}
                            name="hanleWay"
                        >
                            <Radio.Group>
                                <Radio value="1">现场</Radio>
                                <Radio value="2">远程</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                ) : null}
            </ScContent>
        </>
    );
};

TroubleshootComponent.propTypes = {
    form: PropTypes.object,
};
export default TroubleshootComponent;
