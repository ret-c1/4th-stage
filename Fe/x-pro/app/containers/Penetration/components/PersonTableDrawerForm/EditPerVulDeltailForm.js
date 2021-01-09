import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Input, Switch, Button, Select } from 'antd';
import { searchParams } from '@utils/searchParams';
import Ckeditor from '@components/Ckeditor';
// import { getPerVulDetail, getEditVulList, getVulScene } from '../../page/api';

const { TextArea } = Input;
const { Option } = Select;

const EditPerVulDeltailForm = (props) => {
    const { ids, func, updateFunc } = props;
    console.log(ids, func, updateFunc);
    const [form] = Form.useForm();
    const { id } = searchParams();
    // const history = useHistory();

    const [PerData] = useState({});
    const [historyData] = useState({});

    const [html, setHtml] = useState();
    console.log(html);
    const [testHtml, setTestHtml] = useState();
    const [requestHtml, setRequestHtml] = useState();
    const [responseHtml, setResponseHtml] = useState();
    const [vulFuncHtml, setvulFuncHtml] = useState();
    const [vulParamsHtml, setvulParamsHtml] = useState();
    const [adviceHtml, setadviceHtml] = useState();
    const [ideaHtml, setideaHtml] = useState();
    console.log(
        testHtml,
        requestHtml,
        responseHtml,
        vulFuncHtml,
        vulParamsHtml,
        adviceHtml,
        ideaHtml,
    );

    // const [yesNoDir, setYesNoDir] = useState(0);
    // const [yesNo, setYesNo] = useState(0);
    const trueorfalse = (checked) => {
        if (checked === 'false') {
            // setYesNo(0);
        } else {
            // setYesNo(1);
        }
    };
    const trueorfalsedir = (checked) => {
        if (checked === 'false') {
            // setYesNoDir(0);
        } else {
            // setYesNoDir(1);
        }
    };

    const FormFinish = (value) => {
        console.log(value);
        // getEditVulList({
        //     ...value,
        //     id: ids,
        //     reportId: id,
        //     contentDescription: html,
        //     testProcess: testHtml,
        //     request: requestHtml,
        //     response: responseHtml,
        //     vulFunc: vulFuncHtml,
        //     vulParams: vulParamsHtml,
        //     advice: adviceHtml,
        //     idea: ideaHtml,
        //     clientName: PerData.clientName,
        //     domain: PerData.analysisObject,
        //     directly: yesNoDir,
        //     indirectly: yesNo,
        // }).then((res) => {
        //     if (res.code === 200) {
        //         func();
        //         updateFunc();
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };

    useEffect(() => {
        // getPerVulDetail({ reportId: id, vulId: ids }).then((res) => {
        //     if (res.code === 200) {
        //         setPerData(res.data);
        //         if (res.data.history) {
        //             setHistoryData(res.data.history);
        //         }
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, [id]);
    useEffect(() => {
        form.setFieldsValue(PerData);
        form.setFieldsValue(historyData);
    }, [PerData, historyData]);
    const [vulScene] = useState([
        {
            vlevel: '',
            vscene: '其它',
        },
    ]);
    useEffect(() => {
        // getVulScene({}).then((res) => {
        //     if (res.code === 200) {
        //         if (res.data && res.data.length > 0) {
        //             res.data.push({
        //                 vlevel: '',
        //                 vscene: '其它',
        //             });
        //             setVulScene(res.data);
        //         }
        //     }
        // });
    }, []);
    return (
        <>
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                style={{ marginTop: '20px' }}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
                onFinish={FormFinish}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="客户名称：" name="clientName">
                            <Input disabled value={PerData.clientName} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="网站域名：" name="domain">
                            <Input disabled value={PerData.domain} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="漏洞名称："
                            name="name"
                            labelCol={{ span: '12' }}
                            wrapperCol={{ span: '12' }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入漏洞名称！',
                                },
                            ]}
                        >
                            <Input value={PerData.name} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="漏洞分类：" name="type">
                            <Input value={PerData.type} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="根源分类：" name="template">
                            <Select value={PerData.template}>
                                <Option value="web应用类" key="1">
                                    web应用类
                                </Option>
                                <Option value="第三方组件类" key="2">
                                    第三方组件类
                                </Option>
                                <Option value=" web框架类" key="3">
                                    web框架类
                                </Option>
                                <Option value="web中间件配置类" key="4">
                                    web中间件配置类
                                </Option>
                                <Option value=" web中间件类" key="5">
                                    web中间件类
                                </Option>
                                <Option value="系统通信类" key="6">
                                    系统通信类
                                </Option>
                                <Option value="系统配置类" key="7">
                                    系统配置类
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="问题链接："
                            name="url"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入问题链接！',
                                },
                            ]}
                        >
                            <Input value={PerData.url} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="漏洞描述"
                            name="description"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入漏洞描述！',
                                },
                            ]}
                        >
                            <TextArea value={PerData.description} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="场景选择"
                            name="sceneType"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Select>
                                {vulScene.map((item, index) => (
                                    <Option key={index.toString()} value={item.vscene}>
                                        {item.vscene}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="风险程度："
                            name="level"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入风险程度！',
                                },
                            ]}
                        >
                            <Select value={PerData.level}>
                                <Option value="高危" key="1">
                                    高危
                                </Option>
                                <Option value="中危" key="2">
                                    中危
                                </Option>
                                <Option value="低危" key="3">
                                    低危
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="可利用性："
                            name="availability"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入可利用性！',
                                },
                            ]}
                        >
                            <Select value={PerData.availability}>
                                <Option value="困难" key="1">
                                    困难
                                </Option>
                                <Option value="中等" key="2">
                                    中等
                                </Option>
                                <Option value="容易" key="3">
                                    容易
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="场景描述："
                            name="sceneDescription"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <TextArea value={PerData.sceneDescription} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="内容描述及危害："
                            name="contentDescription"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证过程！',
                                },
                            ]}
                        >
                            <Ckeditor
                                name="contentDescription"
                                data={PerData.contentDescription || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="验证过程："
                            name="testProcess"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证过程！',
                                },
                            ]}
                        >
                            <Ckeditor
                                name="testProcess"
                                data={historyData.testProcess || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setTestHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Request："
                            name="request"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="request"
                                data={PerData.request || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setRequestHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Response："
                            name="response"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="response"
                                data={PerData.response || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setResponseHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="漏洞功能点："
                            name="vulFunc"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="vulFunc"
                                data={PerData.vulFunc || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setvulFuncHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="漏洞参数："
                            name="vulParams"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="vulParams"
                                data={PerData.vulParams || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setvulParamsHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="修复建议："
                            name="advice"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="advice"
                                data={historyData.advice || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setadviceHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="利用思路："
                            name="idea"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '20' }}
                        >
                            <Ckeditor
                                name="idea"
                                data={historyData.idea || ''}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    setideaHtml(data);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="可直接利用：" name="directly" valuePropName="checked">
                            <Switch
                                onChange={trueorfalsedir}
                                checkedChildren="开"
                                unCheckedChildren="关"
                                defaultChecked={PerData.directly === 0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="可二次利用："
                            name="indirectly"
                            labelCol={{ span: '10' }}
                            wrapperCol={{ span: '12' }}
                            valuePropName="checked"
                        >
                            <Switch
                                onChange={trueorfalse}
                                checkedChildren="开"
                                unCheckedChildren="关"
                                defaultChecked={PerData.indirectly === 0}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item style={{ marginLeft: '50px' }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            func();
                        }}
                    >
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default EditPerVulDeltailForm;
EditPerVulDeltailForm.propTypes = {
    ids: PropTypes.number,
    func: PropTypes.func,
    updateFunc: PropTypes.func,
};
