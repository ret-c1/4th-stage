import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Table, Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const AssetDrawer = () => {
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const getFields = () => {
        const count = expand ? 4 : 2;
        const children = [
            <Col span={8} key="资产名称">
                <Form.Item name="资产名称" label="资产名称">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
            <Col span={6} key="IP地址">
                <Form.Item name="IP地址" label="IP地址">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
            <Col span={8} key="执行人">
                <Form.Item name="执行人" label="执行人">
                    <Input placeholder="执行人" />
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    {getFields()}
                    <Col span={expand ? 24 : 10} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置
                        </Button>
                        <Button
                            type="link"
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? '收起' : '展开'}
                            {expand ? <UpOutlined /> : <DownOutlined />}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table size="small" columns={columns} dataSource={data} />
        </>
    );
};

// EnginnerPage.propTypes = {
//     rxRole: PropTypes.array,
// };

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxChecked: state.intelligence.checked,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     rxTabelcheck: (id) => {
//         dispatch(tabelcheckAction(id));
//     },
//     rxTabelcheckall: (ids) => {
//         dispatch(tabelallcheckAction(ids));
//     },
// });

const withConnect = connect(null, null);

export default compose(withConnect, memo)(AssetDrawer);
