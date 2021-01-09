import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchParams } from '@utils/searchParams';
// import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Input, Select, Button, Switch, Layout, Tree } from 'antd';
import Ckeditor from '@components/Ckeditor';
// import { getNewPerVul, getDetailReport, getVulScene } from '../page/api';

const { Option } = Select;
const { TextArea } = Input;
const { Sider, Content } = Layout;

const NewVulForm = (props) => {
    const { closefunc, treeDetail, treeKey } = props;
    const { id } = searchParams();
    // const history = useHistory();
    const [form] = Form.useForm();

    const [reportData] = useState({});
    const [yesNo, setYesNo] = useState(0);

    // 编辑器状态数据
    const [html, setHtml] = useState();
    const [testHtml, setTestHtml] = useState();
    const [requestHtml, setRequestHtml] = useState();
    const [responseHtml, setResponseHtml] = useState();
    const [vulFuncHtml, setvulFuncHtml] = useState();
    const [vulParamsHtml, setvulParamsHtml] = useState();
    const [adviceHtml, setadviceHtml] = useState();
    const [ideaHtml, setideaHtml] = useState();
    console.log(
        id,
        yesNo,
        html,
        testHtml,
        requestHtml,
        responseHtml,
        vulFuncHtml,
        vulParamsHtml,
        adviceHtml,
        ideaHtml,
    );

    // 可二次利用开关状态
    const trueorfalse = (checked) => {
        if (checked === 'false') {
            setYesNo(0);
        } else {
            setYesNo(1);
        }
    };

    const handleFinish = (value) => {
        console.log(value);
        // getNewPerVul({
        //     ...value,
        //     // sceneDescription: defaultData.vdescription,
        //     // name: defaultData.vname,
        //     // type: defaultData.vtype,
        //     reportId: id,
        //     contentDescription: html,
        //     testProcess: testHtml,
        //     request: requestHtml,
        //     response: responseHtml,
        //     vulFunc: vulFuncHtml,
        //     vulParams: vulParamsHtml,
        //     advice: adviceHtml,
        //     idea: ideaHtml,
        //     clientName: reportData.clientName,
        //     domain: reportData.analysisObject,
        //     directly: 0,
        //     indirectly: yesNo,
        // }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('提交表单成功');
        //         closefunc();
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };

    // 左侧导航渲染数据
    const onCheck = (checkedKeys, info) => {
        // setDefaultData(info.node);
        const { vname, vtype, vdescription } = info.node;
        form.setFieldsValue({ description: vdescription });
        form.setFieldsValue({ name: vname });
        form.setFieldsValue({ type: vtype });
    };
    const [vulScene] = useState([
        {
            vlevel: '',
            vscene: '其它',
        },
    ]);
    useEffect(() => {
        // getDetailReport({ id }).then((res) => {
        //     if (res.code === 200) {
        //         setReportData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
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
            <Layout style={{ marginTop: '20px' }}>
                <Sider theme="light" width="250px" style={{ height: '100vh', overflow: 'scroll' }}>
                    <Tree
                        treeData={treeDetail}
                        defaultExpandAll
                        expandedKeys={treeKey}
                        onSelect={onCheck}
                    />
                </Sider>
                <Content style={{ height: '100vh', overflow: 'scroll', background: '#fff' }}>
                    <Form
                        labelCol={{ span: '6' }}
                        wrapperCol={{ span: '18' }}
                        form={form}
                        onFinish={handleFinish}
                    >
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="客户名称："
                                    labelCol={{ span: '12' }}
                                    wrapperCol={{ span: '12' }}
                                >
                                    <Input disabled value={reportData.clientName} />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="网站域名：">
                                    <Input disabled value={reportData.analysisObject} />
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
                                    rules={[{ required: true, message: '请输入问题链接!' }]}
                                >
                                    <Input placeholder="请选择左侧漏洞名称" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="漏洞分类："
                                    name="type"
                                    labelCol={{ span: '10' }}
                                    wrapperCol={{ span: '14' }}
                                >
                                    <Input placeholder="请选择左侧漏洞分类" />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    label="根源分类："
                                    name="template"
                                    labelCol={{ span: '10' }}
                                    wrapperCol={{ span: '14' }}
                                >
                                    <Select>
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
                                    rules={[{ required: true, message: '请输入问题链接!' }]}
                                >
                                    <Input placeholder="请输入链接全拼" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="漏洞描述："
                                    name="description"
                                    labelCol={{ span: '4' }}
                                    wrapperCol={{ span: '20' }}
                                    rules={[{ required: true, message: '请输入问题链接!' }]}
                                >
                                    <TextArea rows={4} placeholder="请输入漏洞描述：" />
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
                            <Col span={8}>
                                <Form.Item
                                    label="风险程度："
                                    name="level"
                                    labelCol={{ span: '12' }}
                                    wrapperCol={{ span: '12' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择！',
                                        },
                                    ]}
                                >
                                    <Select>
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
                                    labelCol={{ span: '6' }}
                                    wrapperCol={{ span: '18' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择！',
                                        },
                                    ]}
                                >
                                    <Select>
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
                                    <TextArea rows={4} placeholder="请输入漏洞描述：" />
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
                                            message: '请选择！',
                                        },
                                    ]}
                                >
                                    <Ckeditor
                                        name="contentDescription"
                                        data=""
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
                                            message: '请选择！',
                                        },
                                    ]}
                                >
                                    <Ckeditor
                                        name="testProcess"
                                        data=""
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
                                        data=""
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
                                        data=""
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
                                        data=""
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
                                        data=""
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
                                        data=""
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
                                        data=""
                                        onChange={(editor) => {
                                            const data = editor.getData();
                                            setideaHtml(data);
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>{' '}
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="可直接利用："
                                    name="directly"
                                    labelCol={{ span: '10' }}
                                    wrapperCol={{ span: '12' }}
                                >
                                    否
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="可二次利用："
                                    name="indirectly"
                                    labelCol={{ span: '10' }}
                                    wrapperCol={{ span: '12' }}
                                >
                                    <Switch
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        onChange={trueorfalse}
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
                                    closefunc();
                                }}
                            >
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    );
};
export default NewVulForm;
NewVulForm.propTypes = {
    closefunc: PropTypes.func,
    treeDetail: PropTypes.array,
    treeKey: PropTypes.array,
};
