import React, { useEffect } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    Radio,
    Row,
    Col,
    Descriptions,
    Modal,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ScModalSubmit } from '../../style';

const { Option } = Select;
const { confirm } = Modal;
const EventAddEdit = (props) => {
    const {
        eventRecord,
        validId,
        listRecord,
        readyTimeList,
        addEvent,
        onOk,
        currentStep,
        gotoStep,
        onCancel,
    } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        const initialValues = eventRecord;
        if (eventRecord && Object.keys(eventRecord).length > 0) {
            initialValues.eventFoundTime =
                eventRecord.eventFoundTime && moment(eventRecord.eventFoundTime);
            initialValues.eventAppearTime =
                eventRecord.eventAppearTime && moment(eventRecord.eventAppearTime);
        }
        form.setFieldsValue({
            ...initialValues,
            eventName: listRecord.eventName,
            destIps: listRecord.destIps,
            destSystem: listRecord.destSystem,
            projectId: listRecord.projectId,
            eventLevel: listRecord.eventLevel,
            eventKeyword: listRecord.eventKeyword,
        });
        return () => {
            form.resetFields();
        };
    }, [eventRecord]);
    const onFinish = (values) => {
        const params = values;
        params.eventFoundTime = values.eventFoundTime && moment(values.eventFoundTime).valueOf();
        params.eventAppearTime = values.eventAppearTime && moment(values.eventAppearTime).valueOf();
        params.submitTime = new Date().getTime();
        params.readyTime = parseInt(readyTimeList.eventReadyTime, 10);
        if (eventRecord && Object.keys(eventRecord).length > 0) {
            addEvent(
                {
                    ...params,
                    ...validId,
                    id: eventRecord.id,
                },
                true,
            );
        } else {
            delete listRecord.id;
            addEvent(
                {
                    ...listRecord,
                    ...params,
                    ...validId,
                    threatWarnAnalysisId: listRecord.threatWarnAnalysisId,
                    threatLogAnalysisId: listRecord.threatLogAnalysisId,
                },
                true,
            );
        }
        onOk();
        if (currentStep) {
            gotoStep(3);
        }
    };
    const showConfirm = () => {
        confirm({
            title: '确认要研判为隐患事件吗?',
            icon: <ExclamationCircleOutlined />,
            content: '隐患事件需持续跟踪一周，以确保隐患消除，无新的有效事件发生。',
            onOk() {},
            onCancel() {},
        });
    };
    return (
        <Form
            style={{ height: 600, overflow: 'auto', marginBottom: '30px' }}
            name="add"
            autoComplete="off"
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
        >
            <Descriptions title="事件信息" />
            <Form.Item
                labelCol={{ span: 3 }}
                name="eventName"
                label="事件名称"
                rules={[
                    {
                        required: true,
                        message: '请输入事件名称!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item labelCol={{ span: 3 }} name="eventDescription" label="事件描述">
                <Input.TextArea />
            </Form.Item>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="eventType"
                        label="事件类型"
                        rules={[
                            {
                                required: true,
                                message: '请选择事件类型!',
                            },
                        ]}
                    >
                        <Select>
                            <Option key="有害程序事件" value="有害程序事件">
                                有害程序事件
                            </Option>
                            <Option key="网络攻击事件" value="网络攻击事件">
                                网络攻击事件
                            </Option>
                            <Option key="信息破坏事件" value="信息破坏事件">
                                信息破坏事件
                            </Option>
                            <Option key="信息内容安全事件" value="信息内容安全事件">
                                信息内容安全事件
                            </Option>
                            <Option key="设备设施故障" value="设备设施故障">
                                设备设施故障
                            </Option>
                            <Option key="灾害性事件" value="灾害性事件">
                                灾害性事件
                            </Option>
                            <Option key="其他事件" value="其他事件">
                                其他事件
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="eventKeyword"
                        label="事件关键字"
                        rules={[
                            {
                                required: true,
                                message: '请选择事件关键字!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}
                        >
                            <Option key="暴力破解" value="暴力破解">
                                暴力破解
                            </Option>
                            <Option key="蠕虫病毒" value="蠕虫病毒">
                                蠕虫病毒
                            </Option>
                            <Option key="勒索病毒" value="勒索病毒">
                                勒索病毒
                            </Option>
                            <Option key="挖矿病毒" value="挖矿病毒">
                                挖矿病毒
                            </Option>
                            <Option key="钓鱼邮件" value="钓鱼邮件">
                                钓鱼邮件
                            </Option>
                            <Option key="网页篡改" value="网页篡改">
                                网页篡改
                            </Option>
                            <Option key="远程控制" value="远程控制">
                                远程控制
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="eventLevel"
                        label="事件级别"
                        rules={[
                            {
                                required: true,
                                message: '请选择事件级别!',
                            },
                        ]}
                    >
                        <Select>
                            <Option value="一级" key="一级">
                                一级
                            </Option>
                            <Option value="二级" key="二级">
                                二级
                            </Option>
                            <Option value="三级" key="三级">
                                三级
                            </Option>
                            <Option value="四级" key="四级">
                                四级
                            </Option>
                            <Option value="五级" key="五级">
                                五级
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="eventEmergencyLevel" label="紧急程度">
                        <Select>
                            <Option value="低" key="低">
                                低
                            </Option>
                            <Option value="中" key="中">
                                中
                            </Option>
                            <Option value="高" key="高">
                                高
                            </Option>
                            <Option value="紧急" key="紧急">
                                紧急
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="eventFoundTime" label="发现时间">
                        <DatePicker style={{ width: 320 }} showTime />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="eventAppearTime"
                        label="发生时间"
                        rules={[
                            {
                                required: true,
                                message: '请选择发生时间!',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: 320 }} showTime />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="sourceIps" label="来源IP">
                        <Input placeholder="可输入多个ip，以,分割" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="destIps"
                        label="目的IP"
                        rules={[
                            {
                                required: true,
                                message: '请输入目的IP!',
                            },
                        ]}
                    >
                        <Input placeholder="可输入多个ip，以,分割" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="attachSource" label="攻击来源">
                        <Input placeholder="可输入多个ip，以,分割" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="destSource" label="目的来源">
                        <Input placeholder="可输入多个ip，以,分割" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="sourceSystem" label="来源系统">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="destSystem"
                        label="目的系统"
                        rules={[
                            {
                                required: true,
                                message: '请输入目的系统!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="account" label="账号">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="password" label="密码">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Descriptions title="研判结论" />
            <Form.Item
                name="result"
                label="分析结果"
                labelCol={{ span: 3 }}
                rules={[
                    {
                        required: true,
                        message: '请选择分析结果!',
                    },
                ]}
            >
                <Radio.Group
                    onChange={(v) => {
                        if (v === 2) {
                            showConfirm();
                        }
                    }}
                >
                    <Radio value={0}>有效攻击</Radio>
                    <Radio value={1}>隐患</Radio>
                    <Radio value={2}>误报</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="分析结果" labelCol={{ span: 3 }} name="conclusion">
                <Input.TextArea style={{ width: '800px' }} />
            </Form.Item>
            <Form.Item name="suggestion" labelCol={{ span: 3 }} label="处置建议">
                <Input.TextArea style={{ width: '800px' }} />
            </Form.Item>
            <ScModalSubmit>
                <Form.Item wrapperCol={{ span: 12, offset: 20 }}>
                    <Button style={{ marginRight: '10px' }} onClick={() => onCancel()}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </ScModalSubmit>
        </Form>
    );
};

EventAddEdit.propTypes = {
    addEvent: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    eventRecord: PropTypes.object,
    gotoStep: PropTypes.func,
    currentStep: PropTypes.number,
    validId: PropTypes.object,
    listRecord: PropTypes.object,
    readyTimeList: PropTypes.object,
};

export default EventAddEdit;
