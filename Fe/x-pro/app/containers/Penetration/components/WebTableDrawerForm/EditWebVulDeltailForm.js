import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Input, Switch, Button } from 'antd';
import { searchParams } from '@utils/searchParams';
import Ckeditor from '@components/Ckeditor';
// import { getPerVulDetail, getEditVulList } from '../../page/api';

const { TextArea } = Input;

const EditWebVulDeltailForm = (props) => {
    const { ids, func, updateFunc } = props;
    const [form] = Form.useForm();
    const { id } = searchParams();
    const history = useHistory();
    console.log(ids, func, updateFunc);

    const [PerData] = useState({});
    const [historyData] = useState({});

    const [testHtml, setTestHtml] = useState();
    const [adviceHtml, setadviceHtml] = useState();
    const [ideaHtml, setideaHtml] = useState();

    const [yesNoDir, setYesNoDir] = useState(0);
    const [yesNo, setYesNo] = useState(0);
    console.log(testHtml, adviceHtml, ideaHtml, yesNoDir, yesNo);
    const trueorfalse = (checked) => {
        if (checked === 'false') {
            setYesNo(0);
        } else {
            setYesNo(1);
        }
    };
    const trueorfalsedir = (checked) => {
        if (checked === 'false') {
            setYesNoDir(0);
        } else {
            setYesNoDir(1);
        }
    };

    const FormFinish = (value) => {
        console.log(value);
        // getEditVulList({
        //     ...value,
        //     id: ids,
        //     reportId: id,
        //     testProcess: testHtml,
        //     advice: adviceHtml,
        //     idea: ideaHtml,
        //     clientName: PerData.clientName,
        //     domain: PerData.analysisObject,
        //     directly: yesNoDir,
        //     indirectly: yesNo,
        // }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('提交表单成功');
        //         func();
        //         updateFunc(res.data.total);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };

    useEffect(() => {
        // getPerVulDetail({ reportId: id, vulId: ids }).then((res) => {
        //     if (res.code === 200) {
        //         if (res.data.history) {
        //             res.data.history.testProcess = res.data.history.testProcess
        //                 .substr(3)
        //                 .slice(0, -4);
        //         }
        //         if (res.data.advice) {
        //             res.data.advice = res.data.advice.substr(3).slice(0, -4);
        //         }
        //         if (res.data.idea) {
        //             res.data.idea = res.data.idea.substr(3).slice(0, -4);
        //         }
        //         setPerData(res.data);
        //         if (res.data.history) {
        //             setHistoryData(res.data.history);
        //         }
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        console.log(id);
    }, [id]);

    useEffect(() => {
        form.setFieldsValue(PerData);
        form.setFieldsValue(historyData);
    }, [PerData, historyData]);

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
                        <Form.Item label="客户名称：">
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
                        >
                            <Input value={PerData.name} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="漏洞分类：">
                            <Input value={PerData.type} disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="根源分类：">
                            <Input value={PerData.template} disabled />
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
                        >
                            <Input value={PerData.url} disabled />
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
                        >
                            <TextArea value={PerData.description} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="风险程度" name="level">
                            <Input value={PerData.url} disabled />
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
                                data={historyData.testProcess}
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
                        <Form.Item label="可直接利用：" name="directly">
                            <Switch
                                onChange={trueorfalsedir}
                                checkedChildren="开"
                                unCheckedChildren="关"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="可二次利用："
                            name="indirectly"
                            labelCol={{ span: '10' }}
                            wrapperCol={{ span: '12' }}
                        >
                            <Switch
                                onChange={trueorfalse}
                                checkedChildren="开"
                                unCheckedChildren="关"
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
                            history.push('/penetration/list');
                        }}
                    >
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default EditWebVulDeltailForm;
EditWebVulDeltailForm.propTypes = {
    ids: PropTypes.number,
    func: PropTypes.func,
    updateFunc: PropTypes.func,
};
