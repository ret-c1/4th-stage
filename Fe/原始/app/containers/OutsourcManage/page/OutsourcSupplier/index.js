import React, { useEffect, memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
import { Row, Col, Card, Table, Input, Tooltip, Switch, Menu, Button, Form } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { getDepartPeople, getDepartTree } from './api';

const ScLayout = styled(Card)`
    display: block;
    margin: 30px;
`;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const { Search } = Input;
const OutsourcSupplierPage = () => {
    // const { rxInfo } = props;
    const [form] = Form.useForm();
    const [peopleList, setPeopleList] = useState({});
    const [departList, setDepartList] = useState([]);
    const [pageTitle, setPageTitle] = useState('');
    const [defaultKeys, setDefaultKeys] = useState('');

    const [params, changeParams] = useState({
        limit: 10,
        offset: 0,
        param: {},
    });
    useEffect(() => {
        getDepartPeople(params).then((res) => {
            if (res.code === 200) {
                setPeopleList(res.data);
            }
        });
    }, [params]);
    useEffect(() => {
        getDepartTree({ name: '' }).then((res) => {
            if (res.code === 200) {
                setDepartList(res.data);
                setPageTitle(res.data[0].name);
                setDefaultKeys(`${res.data[0].name}-${res.data[0].id}`);
                changeParams({
                    ...params,
                    param: {
                        ...params.param,
                        outsourcingId: res.data[0].id,
                    },
                });
            }
        });
    }, []);
    const onSelect = ({ key }) => {
        setDefaultKeys(key);
        setPageTitle(key.split('-')[0]);
        changeParams({ limit: 10, offset: 0, param: { outsourcingId: key.split('-')[1] } });
    };
    const onChange = (e) => {
        const { value } = e.target;
        getDepartTree({ name: value }).then((res) => {
            if (res.code === 200) {
                setDepartList(res.data);
            }
        });
    };
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '手机',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '员工性质',
            key: 'positionType',
            dataIndex: 'positionType',
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: (text) => <Switch checked={text === 0} />,
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    // 分页
    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        changeParams({ ...params, limit: pageSize, offset: 0 });
    };
    // 重置
    const onReset = () => {
        form.resetFields();
        changeParams({
            limit: 10,
            offset: 0,
            param: {
                outsourcingId: params.param.outsourcingId,
            },
        });
    };
    // 查询
    const onFinish = (values) => {
        changeParams({
            limit: 10,
            offset: 0,
            param: { ...params.param, ...values },
        });
    };
    return (
        <ScLayout className="top">
            <Row>
                <Col
                    span={5}
                    align="flex-start"
                    style={{
                        borderRight: '1px solid  rgba(0,0,0,0.09)',
                        transform: 'translate(0,0)',
                        paddingRight: '10px',
                    }}
                >
                    <Button value={1} style={{ width: '100%' }}>
                        外包供应商
                    </Button>
                    <Search style={{ margin: '8px 0' }} placeholder="搜索" onChange={onChange} />
                    <Menu
                        inlineCollapsed={false}
                        mode="inline"
                        onSelect={onSelect}
                        selectedKeys={[defaultKeys]}
                    >
                        {departList.map((item) => (
                            <Menu.Item key={`${item.name}-${item.id}`}>{item.name}</Menu.Item>
                        ))}
                    </Menu>
                </Col>
                <Col span={18} style={{ marginLeft: '16px' }}>
                    <Form
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                        wrapperCol={{ span: 18 }}
                    >
                        <Row gutter={24}>
                            <Col span={6}>
                                <Tooltip title={pageTitle} placement="topLeft">
                                    <h2
                                        style={{
                                            width: 125,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {pageTitle}
                                    </h2>
                                </Tooltip>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="phone" label="手机号">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="name" label="姓名">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ margin: '0 8px' }}
                                >
                                    查询
                                </Button>
                                <Button style={{ margin: '0 8px' }} onClick={onReset}>
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        tableLayout="fixed"
                        rowKey="id"
                        columns={columns}
                        dataSource={peopleList.records}
                        pagination={{
                            pageSizeOptions: pageOptions,
                            pageSize: 10,
                            onChange: pageChange,
                            total: peopleList.total,
                            current: params.offset / params.limit + 1,
                            onShowSizeChange,
                            showSizeChanger: true,
                            showTotal: () => `共 ${peopleList.total} 条`,
                        }}
                    />
                </Col>
            </Row>
        </ScLayout>
    );
};

OutsourcSupplierPage.propTypes = {
    // rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(OutsourcSupplierPage);
