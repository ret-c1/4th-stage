import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Table, Input, Button, Tag, Divider, Row, Col, Radio, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
// import { getMaintenance } from './api';

const { Column, ColumnGroup } = Table;

const MaintenancePage = () => {
    let queryName;
    let queryPerson;
    const [mes] = useState([]);
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const [params, setParams] = useState({
        offset: 0,
        limit: 90,
        param: {
            projectId: 551,
        },
    });
    // 请求资产维护接口
    const fetchMaintenance = () => {
        // getMaintenance(params).then((res) => {
        //     if (res.code === 200) {
        //         console.log('执行');
        //         const temp = res.data.records.map((record) => {
        //             count += 1;
        //             const obj = {
        //                 ...record,
        //                 no: count,
        //             };
        //             return obj;
        //         });
        //         setMes(temp);
        //     }
        // });
    };

    useEffect(() => {
        fetchMaintenance();
    }, [params]);

    const nameChange = (e) => {
        queryName = e.target.value;
    };

    const personChange = (e) => {
        queryPerson = e.target.value;
    };

    const queryAsset = () => {
        setParams({
            ...params,
            // 该接口似乎存在问题，资产责任人查询应该是personId字段，参数类型应该是数字
            param: {
                projectId: 551,
                name: queryName,
                personName: queryPerson,
            },
        });
    };

    const resetAsset = () => {
        setParams({
            ...params,
            param: {
                projectId: 551,
            },
        });
    };

    const colors = ['purple', 'red', 'gold', 'blue', 'green'];
    return (
        <>
            <div style={{ background: '#FFF', padding: '24px 32px 0 32px' }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    onFinish={queryAsset}
                >
                    <Row gutter={50}>
                        <Col span={8}>
                            <Form.Item label="业务系统名称" name="name">
                                <Input onChange={nameChange} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="资产责任人" name="personName">
                                <Input onChange={personChange} />
                            </Form.Item>
                        </Col>
                        {expand ? (
                            <>
                                <Col span={8}>
                                    <Form.Item label="资产状态" name="status">
                                        <Radio.Group>
                                            <Radio value={1}>使用中</Radio>
                                            <Radio value={2}>未使用</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="资产所属部门" name="organizationName">
                                        <Select>
                                            <Select.Option value="1">某部门1</Select.Option>
                                            <Select.Option value="2">某部门2</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </>
                        ) : (
                            <></>
                        )}
                        <Col span={expand ? 16 : 8}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '10px' }}
                            >
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    resetAsset();
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                type="link"
                                style={{ width: '46px' }}
                                onClick={() => setExpand(!expand)}
                            >
                                {expand ? (
                                    <>
                                        <UpOutlined />
                                        收起
                                    </>
                                ) : (
                                    <>
                                        <DownOutlined />
                                        展开
                                    </>
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Divider style={{ marginBottom: '8.5px' }} />
                <Table size="small" dataSource={mes} rowKey="id">
                    <Column title="序号" dataIndex="no" />
                    <ColumnGroup title="资产价值">
                        <Column
                            title="资产价值"
                            dataIndex="score"
                            key="score"
                            render={(text, record, index) => {
                                const cl = colors[index % 5];
                                return (
                                    <Tag color={cl} style={{ borderRadius: 4 }}>
                                        {text}
                                    </Tag>
                                );
                            }}
                        />
                        <Column title="保密性" dataIndex="confidentiality" />
                        <Column title="完整性" dataIndex="integrality" />
                        <Column title="可用性" dataIndex="availability" />
                        <Column title="业务重关性" dataIndex="importance" />
                    </ColumnGroup>
                    <Column title="资产名称" dataIndex="name" />
                    <Column
                        title="资产所属部门"
                        dataIndex="organizationName"
                        key="organizationName"
                    />
                    <Column title="资产责任人" dataIndex="personName" />
                    <Column
                        title="操作"
                        dataIndex="operation"
                        render={() => (
                            <Button type="link" style={{ paddingLeft: '0' }}>
                                详情
                            </Button>
                        )}
                    />
                </Table>
            </div>
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

export default compose(withConnect, memo)(MaintenancePage);
