import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { searchParams } from '@utils/searchParams';
// import { getPerVulDetail } from '../../page/api';

const PerVulDeltailForm = (props) => {
    const { ids } = props;
    const [form] = Form.useForm();
    const { id } = searchParams();
    const [PerData] = useState({});
    const [historyData] = useState({});

    useEffect(() => {
        // getPerVulDetail({ reportId: id, vulId: ids }).then((res) => {
        //     if (res.code === 200) {
        //         setPerData(res.data);
        //         setHistoryData(res.data.history);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        console.log(id, ids);
    }, [id, ids]);

    return (
        <>
            <Form
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                style={{ marginTop: '20px' }}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="客户名称：" name="clientName">
                            {PerData.clientName === '' ? '暂无' : PerData.clientName}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="网站域名：" name="domain">
                            {PerData.domain === '' ? '暂无' : PerData.domain}
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
                            {PerData.name === '' ? '暂无' : PerData.name}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="漏洞分类：" name="type">
                            {PerData.type === '' ? '暂无' : PerData.type}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="根源分类：" name="template">
                            {PerData.template === '' ? '暂无' : PerData.template}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="问题链接：" name="url">
                            {PerData.url === '' ? '暂无' : PerData.url}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="漏洞描述：" name="description">
                            {PerData.description === '' ? '暂无' : PerData.description}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="场景选择：" name="sceneType">
                            {PerData.sceneType === '' ? '暂无' : PerData.sceneType}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="风险程度：" name="level">
                            {PerData.level === '' ? '暂无' : PerData.level}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="可利用性：" name="availability">
                            {PerData.availability === '' ? '暂无' : PerData.availability}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="场景描述：" name="sceneDescription">
                            {PerData.sceneDescription ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.sceneDescription, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="内容描述及危害：" name="contentDescription">
                            {PerData.contentDescription ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.contentDescription, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="验证过程：" name="testProcess">
                            {PerData.history && PerData.history.testProcess ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.history.testProcess, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Request：" name="request">
                            {PerData.request ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.request, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Response：" name="response">
                            {PerData.response ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.response, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="漏洞功能点：" name="vulFunc">
                            {PerData.vulFunc ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.vulFunc, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="漏洞参数：" name="vulParams">
                            {PerData.vulParams ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.vulParams, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="修复建议：" name="advice">
                            {PerData.history && PerData.history.advice ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.history.advice, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="利用思路：" name="idea">
                            {PerData.history && PerData.history.idea ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: PerData.history.idea, /* eslint-disable-line */
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="可直接利用：" name="directly">
                            {historyData.directly === 1 ? '是' : '否'}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="可二次利用：" name="indirectly">
                            {historyData.indirectly === 1 ? '是' : '否'}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default PerVulDeltailForm;
PerVulDeltailForm.propTypes = {
    ids: PropTypes.number,
};
