import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Radio, Row, Col, Divider, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Ckeditor from '@components/Ckeditor';
import { ScModalSubmit } from '../../style';

const { Option } = Select;
let id = 1;
let idChild = 1;

const LogAddEdit = (props) => {
    const {
        logRecord,
        assetRecordSource,
        validId,
        listRecord,
        readyTimeList,
        addLog,
        onOk,
        onCancel,
    } = props;
    const [form] = Form.useForm();
    const [html, setHtml] = useState({});
    const [assetIds, setAssetIds] = useState([]);
    const [formData, setFormData] = useState({
        keys: [1],
        keysChild: [1],
    });
    useEffect(() => {
        const assetId = [];
        if (assetRecordSource && assetRecordSource.length > 0) {
            assetRecordSource.forEach((item) => {
                assetId.push(item.id);
            });
            setAssetIds(assetId);
        }
    }, [assetRecordSource]);
    useEffect(() => {
        const initialValues = logRecord;
        if (logRecord && Object.keys(logRecord).length > 0) {
            logRecord.infos.forEach((item, index) => {
                if (item.monitorType || item.monitorDevice || item.monitorAddress) {
                    setFormData({ ...formData, keys: formData.keys.concat((id += 1)) });
                }
                initialValues[`monitorType${index}`] = item.monitorType;
                initialValues[`monitorDevice${index}`] = item.monitorDevice;
                initialValues[`monitorAddress${index}`] = item.monitorAddress;
                if (item.content && item.content.length > 0) {
                    item.content.forEach((item1, index1) => {
                        if (
                            item1.investContent ||
                            item1.evidenceContent ||
                            item1.investConclusion
                        ) {
                            setFormData({
                                ...formData,
                                keysChild: formData.keysChild.concat((idChild += 1)),
                            });
                        }
                        initialValues[`investContent$${index1}`] = item1.investContent;
                        initialValues[`evidenceContent$${index1}`] = item1.evidenceContent;
                        initialValues[`investConclusion$${index1}`] = item1.investConclusion;
                    });
                }
            });
        }
        form.setFieldsValue({
            ...initialValues,
            projectName: listRecord.projectName,
            destIps: listRecord.destIps,
            destSystem: listRecord.destSystem,
        });
        return () => {
            form.resetFields();
        };
    }, [logRecord, listRecord]);
    const onFinish = (values) => {
        const params = values;
        const infosSubmit = [];
        formData.keys.forEach((item) => {
            infosSubmit.push({
                monitorType: values[`monitorType${item}`],
                monitorDevice: values[`monitorDevice${item}`],
                monitorAddress: values[`monitorAddress${item}`],
            });
            formData.keysChild.forEach(() => {
                infosSubmit[item - 1].contents = [];
            });
            formData.keysChild.forEach((item2) => {
                infosSubmit[item - 1].contents.push({
                    investContent: values[`investContent${item2}`],
                    evidenceContent: html[`evidenceContent${item2}`],
                    investConclusion: values[`investConclusion${item2}`],
                });
            });
        });
        params.infos = infosSubmit;
        params.submitTime = new Date().getTime();
        params.readyTime = parseInt(readyTimeList.logReadyTime, 10);
        if (assetIds.length > 0) {
            params.relateThreatAnalysisIds = assetIds.join(',');
        }
        formData.keys.forEach((item) => {
            delete params[`monitorType${item}`];
            delete params[`monitorDevice1${item}`];
            delete params[`monitorAddress${item}`];
            delete params[`monitorDevice${item}`];
            formData.keysChild.forEach((item2) => {
                delete params[`investContent${item2}`];
                delete params[`evidenceContent${item2}`];
                delete params[`investConclusion${item2}`];
                delete params[`investContentType${item2}`];
            });
        });
        if (logRecord && Object.keys(logRecord).length > 0) {
            addLog({ ...params, id: logRecord.id, ...validId }, true);
        } else {
            delete listRecord.id;
            addLog(
                {
                    ...listRecord,
                    ...params,
                    ...validId,
                    threatWarnAnalysisId: listRecord.threatWarnAnalysisId,
                },
                true,
            );
        }
        onOk();
    };

    const add = () => {
        const nextKeys = formData.keys.concat((id += 1));
        setFormData({ ...formData, keys: nextKeys });
    };

    const addChild = () => {
        const nextKeysChild = formData.keysChild.concat((idChild += 1));
        setFormData({ ...formData, keysChild: nextKeysChild });
    };
    return (
        <Form
            style={{ height: 600, overflow: 'auto', marginBottom: '30px' }}
            name="add"
            autoComplete="off"
            labelCol={{ offset: 1 }}
            wrapperCol={{ span: 12 }}
            form={form}
            onFinish={onFinish}
        >
            <Descriptions title="排查信息" />
            {formData.keys.map((k) => (
                <div
                    style={{
                        border: '1px solid #D9D9D9',
                        padding: '29px 24px 12px 29px',
                        marginLeft: '50px',
                    }}
                    key={k}
                >
                    <Form.Item name={`monitorType${k}`} label="监控类型">
                        <Select defaultValue={k.monitorType}>
                            <Option value={0} key={0}>
                                操作系统
                            </Option>
                            <Option value={1} key={1}>
                                数据库
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={`monitorDevice${k}`} label="监控设备">
                        <Input defaultValue={k.monitorDevice} />
                    </Form.Item>
                    <Form.Item name={`monitorAddress${k}`} label="监控地点">
                        <Input defaultValue={k.monitorAddress} />
                    </Form.Item>
                    <Divider />
                    {formData.keysChild.map((k1) => (
                        <div key={k1}>
                            <Form.Item name={`investContentType${k1}`} label="排查内容类型">
                                <Select style={{ width: 120 }} defaultValue={k1.investContentType}>
                                    <Option value={0} key={0}>
                                        文件排查
                                    </Option>
                                    <Option value={1} key={1}>
                                        进程排查
                                    </Option>
                                    <Option value={2} key={2}>
                                        系统信息排查
                                    </Option>
                                    <Option value={3} key={3}>
                                        工具排查
                                    </Option>
                                    <Option value={4} key={4}>
                                        日志排查
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={`investContent${k1}`} style={{ marginLeft: '105px' }}>
                                <Input.TextArea
                                    style={{ width: '800px' }}
                                    defaultValue={k1.investContent}
                                />
                            </Form.Item>
                            <Form.Item name={`evidenceContent${k1}`} label="截图取证">
                                <Ckeditor
                                    name={`evidenceContent${k1}`}
                                    data={k1.evidenceContent || html[`evidenceContent${k1}`]}
                                    onChange={(editor) => {
                                        const data = editor.getData();
                                        const html1 = {
                                            [`evidenceContent${k1}`]: '',
                                        };
                                        html1[`evidenceContent${k1}`] = data;
                                        setHtml({ ...html1, ...html });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name={`investConclusion${k1}`} label="排查结果">
                                <Input.TextArea
                                    style={{ width: '800px' }}
                                    defaultValue={k1.investConclusion}
                                />
                            </Form.Item>
                            <Divider />
                        </div>
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            style={{
                                width: '180%',
                                marginLeft: '20px',
                            }}
                            onClick={addChild}
                        >
                            <PlusOutlined /> 添加排查类型
                        </Button>
                    </Form.Item>
                </div>
            ))}
            <Form.Item>
                <Button
                    type="dashed"
                    style={{
                        width: '189%',
                        marginLeft: '50px',
                        marginTop: '20px',
                    }}
                    onClick={add}
                >
                    <PlusOutlined /> 添加排查类型
                </Button>
            </Form.Item>
            <Descriptions title="分析结论" />
            <Form.Item
                name="conclusion"
                label="分析结论"
                style={{ paddingLeft: 50 }}
                rules={[
                    {
                        required: true,
                        message: '请选择分析结论!',
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value={0}>有效攻击</Radio>
                    <Radio value={1}>隐患</Radio>
                    <Radio value={2}>误报</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="分析结果" name="result" style={{ paddingLeft: 50 }}>
                <Input.TextArea style={{ width: '800px' }} />
            </Form.Item>
            <Form.Item name="suggestion" label="处置建议" style={{ paddingLeft: 50 }}>
                <Input.TextArea style={{ width: '800px' }} />
            </Form.Item>
            <Descriptions title="事件总结" />
            <Row>
                <Col span={12}>
                    <Form.Item
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
                    <Form.Item
                        name="destIps"
                        label="目的IP"
                        wrapperCol={{ span: 13 }}
                        rules={[
                            {
                                required: true,
                                message: '请输入目的IP!',
                            },
                        ]}
                    >
                        <Input
                            style={{ marginLeft: '10px' }}
                            placeholder="可输入多个ip，以；分割"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="destSystem" label="目的系统">
                        <Input style={{ marginLeft: '10px' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sourceIps"
                        label="来源IP"
                        wrapperCol={{ span: 13 }}
                        rules={[
                            {
                                required: true,
                                message: '请输入来源IP!',
                            },
                        ]}
                    >
                        <Input
                            style={{ marginLeft: '10px' }}
                            placeholder="可输入多个ip，以；分割"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item name="attachSource" label="攻击来源">
                        <Input
                            style={{ marginLeft: '10px' }}
                            placeholder="可输入多个ip，以；分割"
                        />
                    </Form.Item>
                </Col>
            </Row>
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

LogAddEdit.propTypes = {
    addLog: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    logRecord: PropTypes.object,
    assetRecordSource: PropTypes.array,
    validId: PropTypes.object,
    listRecord: PropTypes.object,
    readyTimeList: PropTypes.object,
};

export default LogAddEdit;
