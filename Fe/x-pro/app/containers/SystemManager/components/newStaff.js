import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Button, Tag, Form, Tooltip, Switch } from 'antd';
import PropTypes from 'prop-types';
// import { getAllpeople, freezeUser, thawUser } from '../api';
import DepartmentTree from './departmentTree';

const NewStaff = (props) => {
    const { departId, isShowGroup, newStaffCallback } = props;
    const [form] = Form.useForm();
    const [tableList] = useState({ records: [], total: 0 });
    const [pageTitle, setPageTitle] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [clear, changeClear] = useState(false);
    const [params, changeParams] = useState({
        limit: 8,
        offset: 0,
        param: {
            account: '',
            phone: '',
            name: '',
        },
    });
    const changeStatus = (checked, id) => {
        console.log(id);
        if (checked) {
            // thawUser({ id }).then((res1) => {
            //     if (res1.code === 200) {
            //         getAllpeople(params).then((res) => {
            //             if (res.code === 200) {
            //                 setTableList(res.data);
            //             }
            //         });
            //     }
            // });
        } else {
            // freezeUser({ id }).then((res1) => {
            //     if (res1.code === 200) {
            //         getAllpeople(params).then((res) => {
            //             if (res.code === 200) {
            //                 setTableList(res.data);
            //             }
            //         });
            //     }
            // });
        }
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 120,
        },
        {
            title: '角色',
            dataIndex: 'roleNames',
            key: 'roleNames',
        },
        {
            title: '手机',
            key: 'phone',
            dataIndex: 'phone',
            width: 150,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            render: (text, record) => (
                <Switch
                    checked={text === 0}
                    onChange={(checked) => changeStatus(checked, record.id)}
                />
            ),
        },
    ];
    useEffect(() => {
        // getAllpeople(params).then((res) => {
        //     if (res.code === 200) {
        //         setTableList(res.data);
        //     }
        // });
        console.log(params);
    }, [params]);

    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };

    const rowSelection = {
        selectedRowKeys: clear ? [] : selectedRowKeys,
        onChange: (keys, rows) => {
            const newRows = [...selectedRows, ...rows].filter(
                (item1) => typeof item1 !== 'undefined' && keys.includes(item1.id),
            );
            setSelectedRows(Array.from(new Set(newRows)));
            // 把选中的key返回
            newStaffCallback(keys);
            changeClear(false);
            setSelectedRowKeys(keys);
        },
    };
    return (
        <Form
            form={form}
            name="application"
            autoComplete="off"
            onFinish={(values) => {
                changeParams({
                    limit: 8,
                    offset: 0,
                    param: {
                        ...params.param,
                        phone: values.phone,
                        name: values.name,
                    },
                });
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
        >
            <Row>
                <Col
                    span={7}
                    align="flex-start"
                    style={{
                        borderRight: '1px solid  rgba(0,0,0,0.09)',
                        transform: 'translate(0,0)',
                        paddingRight: 10,
                    }}
                >
                    <DepartmentTree
                        isShowGroup={isShowGroup}
                        departId={departId}
                        onCallback={(pageTit, departmentId) => {
                            console.log(departmentId);
                            setPageTitle(pageTit);
                        }}
                    />
                </Col>
                <Col span={16} style={{ marginLeft: 20 }}>
                    <Row justify="space-between">
                        <Col span={24}>
                            <Row justify="flex-start">
                                <Col span={5}>
                                    <Tooltip title={pageTitle} placement="topLeft">
                                        <h2
                                            style={{
                                                width: 125,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {pageTitle}
                                        </h2>
                                    </Tooltip>
                                </Col>
                                <Col span={9}>
                                    <Form.Item name="name" label="姓名">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="phone" label="手机号">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <span>已选{selectedRowKeys.length}项：</span>
                        {selectedRows.map((item) => (
                            <Tag closable key={item && item.id}>
                                {item && item.name}
                            </Tag>
                        ))}
                        <Button
                            type="link"
                            style={{ marginTop: '-6px' }}
                            onClick={() => {
                                newStaffCallback([]);
                                setSelectedRowKeys([]);
                                setSelectedRows([]);
                                changeClear(true);
                            }}
                        >
                            清空
                        </Button>
                    </Row>
                    {tableList && tableList.records && tableList.records.length > 0 && (
                        <Table
                            size="small"
                            rowKey="id"
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={tableList.records || []}
                            pagination={{
                                pageSize: 8,
                                onChange: pageChange,
                                total: tableList.total || 0,
                                showSizeChanger: false,
                                current: params.offset / params.limit + 1,
                                showTotal: () => `共 ${tableList.total} 条`,
                            }}
                        />
                    )}
                    {tableList && tableList.records && tableList.records.length === 0 && (
                        <Table
                            size="small"
                            rowKey="id"
                            columns={columns}
                            dataSource={[]}
                            pagination={false}
                        />
                    )}
                </Col>
            </Row>
        </Form>
    );
};

NewStaff.propTypes = {
    newStaffCallback: PropTypes.func,
    departId: PropTypes.number,
    isShowGroup: PropTypes.number,
};

export default NewStaff;
