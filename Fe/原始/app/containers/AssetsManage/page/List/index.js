import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Divider, Form, Input, Row, Col, Radio, Table } from 'antd';
import { ScContent, ScSpan } from '../../styled';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const ListPage = () => {
    const [radioValue, setRadioValue] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const openFunc = () => {
        setIsOpen(true);
    };
    const closeFunc = () => {
        setIsOpen(false);
    };

    const onRadioChange = (e) => {
        setRadioValue(e.target.value);
    };
    return (
        <>
            <ScContent>
                <div>
                    <ScSpan>资产类型:</ScSpan>
                    <Button type="primary">全部</Button>
                    <Button type="link" style={{ color: 'black' }}>
                        主机资产
                    </Button>
                    <Button type="link" style={{ color: 'black' }}>
                        数据库资产
                    </Button>
                    <Button type="link" style={{ color: 'black' }}>
                        软件资产
                    </Button>
                    <Button type="link" style={{ color: 'black' }}>
                        网络资产
                    </Button>
                    <Button type="link" style={{ color: 'black' }}>
                        代码资产
                    </Button>
                    <Button type="link" style={{ color: 'black' }}>
                        网站资产
                    </Button>
                </div>
                <Divider dashed />
                {isOpen ? (
                    ''
                ) : (
                    <Form name="basic" initialValues={{ remember: true }} wrapperCol={{ span: 16 }}>
                        <Row gutter={150}>
                            <Col span={8}>
                                <Form.Item label="资产名称" name="username">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="资产所属部门" name="password">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" style={{ marginRight: '10px' }}>
                                    查询
                                </Button>
                                <Button>重置</Button>
                                <Button type="link" style={{ width: '46px' }} onClick={openFunc}>
                                    展开
                                </Button>
                                <div
                                    style={{
                                        height: '20px',
                                        display: 'inline-block',
                                        transform: 'rotate(90deg)',
                                        color: '#1890ff',
                                    }}
                                >
                                    >
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}
                {isOpen ? (
                    <Form name="basic" initialValues={{ remember: true }} wrapperCol={{ span: 16 }}>
                        <Row gutter={150}>
                            <Col span={8}>
                                <Form.Item label="资产名称" name="username">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="资产所属部门" name="password">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="资产状态" name="status">
                                    <Radio.Group onChange={onRadioChange} value={radioValue}>
                                        <Radio value={1}>使用中</Radio>
                                        <Radio value={2}>未使用</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={150}>
                            <Col span={8}>
                                <Form.Item label="资产所属部门" name="username">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}></Col>
                            <Col span={8}>
                                <Button type="primary" style={{ marginRight: '10px' }}>
                                    查询
                                </Button>
                                <Button>重置</Button>
                                <Button type="link" style={{ width: '46px' }} onClick={closeFunc}>
                                    收起
                                </Button>
                                <div
                                    style={{
                                        height: '20px',
                                        display: 'inline-block',
                                        transform: 'rotate(270deg)',
                                        color: '#1890ff',
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form>
                ) : (
                    ''
                )}
                <Divider dashed />
                <Row justify="space - between">
                    <Col span={12}>
                        <Button>导出资产</Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button>导入资产</Button>
                        <Button type="primary" style={{ marginLeft: '10px' }}>
                            新增资产
                        </Button>
                    </Col>
                </Row>
                <Table columns={columns} />
            </ScContent>
        </>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(ListPage);
