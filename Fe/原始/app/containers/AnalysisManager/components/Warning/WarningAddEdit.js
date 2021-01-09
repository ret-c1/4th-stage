import React, { useState, useEffect } from 'react';
import {
    Descriptions,
    Form,
    Input,
    Select,
    DatePicker,
    Radio,
    Button,
    Divider,
    Row,
    Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import debounce from 'lodash.debounce';
import Ckeditor from '@components/Ckeditor';
import { ScModalSubmit } from '../../style';

const { Option } = Select;
let id = 0;
let id2 = 1;

const WarningAddEdit = (props) => {
    const {
        warningRecord,
        global,
        addWarning,
        validId,
        warningRecordSource,
        readyTimeList,
        projectList,
        getProject,
        onOk,
        onCancel,
    } = props;
    const monitorUser = global && global.useinfo && global.useinfo.name;
    const [form] = Form.useForm();
    const [html, setHtml] = useState({});
    const [nameList, setNameList] = useState([]);
    const [warningCount, setWarningCount] = useState(0);
    const [formData, setFormData] = useState({
        keys: [],
        keys2: [1],
    });
    useEffect(() => {
        getProject({ limit: 1000, offset: 0, param: {} });
    }, []);
    // initialValues的来源：编辑的时候warningRecord；
    // 选择隐患资产assetRecordSource或者选择告警事件warningRecordSource
    // 此时告警名称，来源IP，告警次数来源自告警事件对象; 目的IP,目的系统源自于所选隐患资产，但是从分析管理进入只有事件列表没有隐患
    useEffect(() => {
        const initialValues = { monitorUser };
        const names = [];
        console.log('warningRecordSource', warningRecordSource.length);
        if (warningRecordSource && warningRecordSource.length > 0) {
            setWarningCount(warningRecordSource.length);
            initialValues.count = warningRecordSource.length;
            warningRecordSource.forEach((item) => {
                names.push(item.name);
                if (item.sourceIp) {
                    setFormData({ ...formData, keys: formData.keys.concat((id += 1)) });
                }
            });
            warningRecordSource.forEach((item, index) => {
                if (item.sourceIp) {
                    initialValues[`sourceIp${index}`] = item.sourceIp;
                    initialValues[`sourceAddress${index}`] = item.sourceAddress;
                }
            });
        }
        setNameList(names);
        form.setFieldsValue({
            ...initialValues,
            name: names[0],
        });
        return () => {
            form.resetFields();
        };
    }, [warningRecordSource]);

    useEffect(() => {
        const initialValues = warningRecord;
        const names = [];
        if (warningRecord && Object.keys(warningRecord).length > 0) {
            if (warningRecord.sourceIps) {
                for (let i = 0; i < warningRecord.sourceIps.split(',').length - 1; i += 1) {
                    setFormData({ ...formData, keys: formData.keys.concat((id += 1)) });
                }
                warningRecord.sourceIps.split(',').forEach((item, index) => {
                    initialValues[`sourceIp${index}`] = item;
                });
            }
            if (warningRecord.name) {
                names.push(warningRecord.name);
            }
            setNameList(names);
            if (warningRecord.foundTime) {
                initialValues.foundTime = moment(warningRecord.foundTime);
            }
            if (warningRecord.info) {
                for (let i = 0; i < warningRecord.infos.length; i += 1) {
                    setFormData({ ...formData, keys2: formData.keys2.concat((id += 1)) });
                }
                warningRecord.infos.forEach((item, index) => {
                    initialValues[`investContent$${index}`] = item.investContent$;
                    initialValues[`evidenceContent$${index}`] = item.evidenceContent$;
                    initialValues[`investConclusion$${index}`] = item.investConclusion$;
                });
            }
        }
        form.setFieldsValue({
            ...initialValues,
            name: names[0],
        });
        return () => {
            form.resetFields();
        };
    }, [warningRecord]);
    const onFinish = debounce((values) => {
        const params = values;
        const infos = [];
        const sourceIps = [];
        formData.keys2.forEach((item) => {
            infos.push({
                investContent: values[`investContent${item}`],
                evidenceContent: html[`evidenceContent${item}`],
                investConclusion: values[`investConclusion${item}`],
            });
        });
        formData.keys.forEach((item) => {
            sourceIps.push(values[`sourceIp${item}`]);
        });
        if (infos.length > 0) {
            params.infos = infos;
        }
        if (sourceIps.length > 0) {
            params.sourceIps = sourceIps.toString();
        }
        params.monitorUser = monitorUser;
        params.count = warningCount;
        params.foundTime = moment(values.foundTime).valueOf();
        params.name = values.name.toString();
        params.submitTime = new Date().getTime();
        params.readyTime = parseInt(readyTimeList.warningReadyTime, 10);
        formData.keys2.forEach((item) => {
            delete params[`investContentType${item}`];
            delete params[`investContent${item}`];
            delete params[`evidenceContent${item}`];
            delete params[`investConclusion${item}`];
        });
        delete params.sourceIp;
        formData.keys.forEach((item) => {
            delete params[`sourceIp${item}`];
            delete params[`sourceAddress${item}`];
        });
        if (warningRecord && Object.keys(warningRecord).length > 0) {
            addWarning({ ...params, ...validId, id: warningRecord.id }, true);
        } else {
            addWarning({ ...params, ...validId }, true);
        }
        onOk();
    }, 1000);

    const add = () => {
        const nextKeys = formData.keys.concat((id += 1));
        setFormData({ ...formData, keys: nextKeys });
    };
    const remove = (k) => {
        setFormData({ ...formData, keys: formData.keys.filter((key) => key !== k) });
    };
    const add2 = () => {
        const nextKeys2 = formData.keys2.concat((id2 += 1));
        setFormData({ ...formData, keys2: nextKeys2 });
    };
    return (
        <Form
            style={{ height: 600, overflow: 'auto', marginBottom: '30px' }}
            name="add"
            autoComplete="off"
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
        >
            <Descriptions title="基本信息" />
            <Row>
                <Col span={6}>
                    <Form.Item
                        name="projectId"
                        label="项目名称"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请选择项目名称!',
                            },
                        ]}
                    >
                        <Select>
                            {projectList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.projectName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item name="monitorUser" label="监控人员" labelCol={{ span: 10 }}>
                        {monitorUser}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="deviceName" label="设备名称" labelCol={{ span: 10 }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="monitorDevice" label="监控设备" labelCol={{ span: 10 }}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="monitorAddress" label="监控地点" labelCol={{ span: 10 }}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Descriptions layout="vertical" title="告警事件" style={{ marginTop: 30 }} />
            <Row>
                <Col span={6}>
                    <Form.Item
                        name="name"
                        label="告警名称"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请输入告警名称!',
                            },
                        ]}
                    >
                        <Select mode="tags">
                            {nameList.length > 0 &&
                                nameList.map((item) => (
                                    <Option value={item} key={item}>
                                        {item}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="warnKeyword"
                        label="告警关键字"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请输入告警关键字!',
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
                <Col span={6}>
                    <Form.Item
                        name="level"
                        label="告警级别"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请选择告警级别!',
                            },
                        ]}
                    >
                        <Select>
                            <Option value="高" key="高">
                                高
                            </Option>
                            <Option value="中" key="中">
                                中
                            </Option>
                            <Option value="低" key="低">
                                低
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="foundTime"
                        label="发现时间"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请选择发现时间!',
                            },
                        ]}
                    >
                        <DatePicker showTime locale={locale} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item
                        label="来源IP"
                        name="sourceIp"
                        rules={[
                            {
                                required: true,
                                message: '请输入来源IP!',
                            },
                        ]}
                        labelCol={{ span: 7 }}
                    >
                        {formData.keys.map((k) => (
                            <Row key={`Ip${k}`}>
                                <Col span={19}>
                                    <Form.Item name={`sourceIp${k}`}>
                                        <Input
                                            onChange={() => form.setFieldsValue({ sourceIp: true })}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item>
                                        <Button type="link" onClick={() => remove(k)}>
                                            删除
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ))}
                        <Form.Item>
                            <Button type="dashed" style={{ width: '165px' }} onClick={add}>
                                <PlusOutlined /> 添加
                            </Button>
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="destIps"
                        label="目的IP"
                        labelCol={{ span: 10 }}
                        rules={[
                            {
                                required: true,
                                message: '请输入目的IP!',
                            },
                        ]}
                    >
                        <Form.Item name="destIps">
                            <Input placeholder="可输入多个ip，以；分割" />
                        </Form.Item>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="count" label="告警次数" labelCol={{ span: 10 }}>
                        {warningCount}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="destSystem" label="目的系统" labelCol={{ span: 10 }} />
                </Col>
            </Row>
            <Descriptions title="排查信息" style={{ marginTop: 30 }} />
            {formData.keys2.map((k2) => (
                <div key={`infos${k2}`}>
                    <Form.Item name={`investContentType${k2}`} label="排查内容类型">
                        <Select style={{ width: 120 }} defaultValue={k2.investContentType}>
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
                    <Form.Item name={`investContent${k2}`} style={{ marginLeft: 120 }}>
                        <Input.TextArea
                            style={{ width: '800px' }}
                            defaultValue={k2.investContent}
                        />
                    </Form.Item>
                    <Form.Item label="截图取证">
                        <Ckeditor
                            name={`evidenceContent${k2}`}
                            data={k2.evidenceContent || html[`evidenceContent${k2}`]}
                            onChange={(editor) => {
                                const data = editor.getData();
                                const html1 = { [`evidenceContent${k2}`]: '' };
                                html1[`evidenceContent${k2}`] = data;
                                setHtml({ ...html1, ...html });
                            }}
                        />
                    </Form.Item>
                    <Form.Item name={`investConclusion${k2}`} label="排查结果">
                        <Input.TextArea
                            style={{ width: '800px' }}
                            defaultValue={k2.investConclusion}
                        />
                    </Form.Item>
                </div>
            ))}
            <Divider />
            <Form.Item>
                <Button
                    type="dashed"
                    style={{
                        marginLeft: 150,
                        width: '80%',
                    }}
                    onClick={add2}
                >
                    <PlusOutlined /> 添加
                </Button>
            </Form.Item>
            <Descriptions title="分析结论" style={{ marginBottom: 32, marginTop: 30 }} />
            <Form.Item
                name="result"
                label="分析结果"
                rules={[
                    {
                        required: true,
                        message: '请选择分析结果!',
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value={0}>有效攻击</Radio>
                    <Radio value={1}>隐患</Radio>
                    <Radio value={2}>误报</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="conclusion"
                label="结论描述"
                rules={[
                    {
                        required: '请输入分析结论描述!',
                    },
                ]}
            >
                <Input.TextArea style={{ width: '800px' }} />
            </Form.Item>
            <Form.Item name="suggestion" label="处置建议">
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

WarningAddEdit.propTypes = {
    addWarning: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    // assetRecordSource: PropTypes.array,
    warningRecordSource: PropTypes.array,
    warningRecord: PropTypes.object,
    global: PropTypes.object,
    validId: PropTypes.object,
    readyTimeList: PropTypes.object,
    projectList: PropTypes.array,
    getProject: PropTypes.func,
};
export default WarningAddEdit;
