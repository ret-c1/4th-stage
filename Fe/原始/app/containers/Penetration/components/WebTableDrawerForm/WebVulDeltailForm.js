import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { searchParams } from '@utils/searchParams';
import { getPerVulDetail } from '../../page/api';

const WebVulDeltailForm = (props) => {
    const { ids } = props;
    const [form] = Form.useForm();
    const { id } = searchParams();
    const [PerData, setPerData] = useState({});

    useEffect(() => {
        getPerVulDetail({ reportId: id, vulId: ids }).then((res) => {
            if (res.code === 200) {
                setPerData(res.data);
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
                            {PerData.type ? PerData.type : '暂无'}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="根源分类：" name="template">
                            {PerData.template ? PerData.template : '暂无'}
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
                            {PerData.url === '' ? '暂无' : PerData.url}
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
                        >
                            {PerData.description === '' ? '暂无' : PerData.description}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="风险程度：" name="level">
                            {PerData.level === '' ? '暂无' : PerData.level}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default WebVulDeltailForm;
WebVulDeltailForm.propTypes = {
    ids: PropTypes.number,
};
