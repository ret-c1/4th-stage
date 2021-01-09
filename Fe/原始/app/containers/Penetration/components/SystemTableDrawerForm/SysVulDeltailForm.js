import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Divider } from 'antd';
import { searchParams } from '@utils/searchParams';
import { getPerVulDetail } from '../../page/api';

const SysVulDeltailForm = (props) => {
    const { ids } = props;
    const [form] = Form.useForm();
    const { id } = searchParams();
    const [SysData, setSysData] = useState({});
    const [hisData, sethisData] = useState([]);
    const [historyData, sethistoryData] = useState([]);

    useEffect(() => {
        getPerVulDetail({ reportId: id, vulId: ids }).then((res) => {
            if (res.code === 200) {
                if (res.data.contentDescription) {
                    res.data.contentDescription = res.data.contentDescription
                        .substr(3)
                        .slice(0, -4);
                }
                for (let i = 0; i < res.data.histories.length; i += 1) {
                    if (res.data.histories[i].testProcess) {
                        res.data.histories[i].testProcess = res.data.histories[i].testProcess
                            .substr(3)
                            .slice(0, -4);
                    }
                    if (res.data.histories[i].advice) {
                        res.data.histories[i].advice = res.data.histories[i].advice
                            .substr(3)
                            .slice(0, -4);
                    }
                    if (res.data.histories[i].idea) {
                        res.data.histories[i].idea = res.data.histories[i].idea
                            .substr(3)
                            .slice(0, -4);
                    }
                }
                if (res.data.history) {
                    res.data.history.testProcess = res.data.history.testProcess
                        .substr(3)
                        .slice(0, -4);
                    res.data.history.idea = res.data.history.idea.substr(3).slice(0, -4);
                }
                setSysData(res.data);
                sethisData(res.data.histories);
                sethistoryData(res.data.history);
            } else {
                console.log('获取数据失败');
            }
        });
    }, [id]);

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
                            {SysData.clientName === '' ? '暂无' : SysData.clientName}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="网站域名：" name="domain">
                            {SysData.domain === '' ? '暂无' : SysData.domain}
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
                            {SysData.name === '' ? '暂无' : SysData.name}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="漏洞分类：" name="type">
                            {SysData.type ? SysData.type : '暂无'}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="根源分类：" name="template">
                            {SysData.template ? SysData.template : '暂无'}
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
                            {SysData.url === '' ? '暂无' : SysData.url}
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
                            {SysData.description === '' ? '暂无' : SysData.description}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="场景选择" name="sceneType">
                            {SysData.sceneType ? SysData.sceneType : '暂无'}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="风险程度" name="level">
                            {SysData.level === '' ? '暂无' : SysData.level}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="可利用性" name="availability">
                            {SysData.availability ? SysData.availability : '暂无'}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="场景描述" name="sceneDescription">
                            {SysData.sceneDescription ? (
                                <div
                                    dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.sceneDescription,
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
                        <Form.Item label="内容描述及危害" name="contentDescription">
                            {SysData.contentDescription ? (
                                <div
                                    dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.contentDescription,
                                    }}
                                />
                            ) : (
                                '暂无'
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Divider dashed />
                {hisData.map((item, index) => {
                    console.log(item);
                    console.log(index);
                    return (
                        <div key={item.insertReportId}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label={`第${index + 1}次渗透测试漏洞状态：`}
                                        name="bugStatus"
                                        labelCol={{ span: 14 }}
                                    >
                                        {item.bugStatus ? item.bugStatus : '暂无'}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item>
                                        {item.lastUpdateTime ? item.lastUpdateTime : '暂无'}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="验证过程" name="testProcess">
                                        {item.testProcess ? (
                                            <div
                                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                    __html: item.testProcess,
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
                                    <Form.Item label="修复建议" name="advice">
                                        {item.advice ? (
                                            <div
                                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                    __html: item.advice,
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
                                    <Form.Item label="利用思路" name="idea">
                                        {item.idea ? (
                                            <div
                                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                                    __html: item.idea,
                                                }}
                                            />
                                        ) : (
                                            '暂无'
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    );
                })}

                <Row>
                    <Col span={12}>
                        <Form.Item label="验证过程：" name="testProcess">
                            {historyData.testProcess ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: historyData.testProcess,
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
                            {SysData.request ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.request,
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
                            {SysData.response ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.response,
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
                            {SysData.vulFunc ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.vulFunc,
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
                            {SysData.vulParams ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: SysData.vulParams,
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
                            {historyData.advice ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: historyData.advice,
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
                            {historyData.idea ? (
                                <div
                                            dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                        __html: historyData.idea,
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
export default SysVulDeltailForm;
SysVulDeltailForm.propTypes = {
    ids: PropTypes.number,
};
