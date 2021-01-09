import React, { useState } from 'react';
import styled from 'styled-components';
import { Tooltip, Table, Form, Input, Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
// import useTableParam from '../../hooks/useTableParam';
// import { getEmergencys } from '../api';

const ScItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;

const columns = [
    {
        title: '客户名称',
        dataIndex: 'clientName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '销售名称',
        dataIndex: 'sellerName',
    },
    {
        title: '合同类型',
        dataIndex: 'contractType',
    },
    {
        title: '事件关键字',
        dataIndex: 'keyword',
    },
    {
        title: '事件等级',
        dataIndex: 'level',
        filters: [
            { text: '一级', value: '一级', key: '一级' },
            { text: '二级', value: '二级', key: '二级' },
            { text: '三级', value: '三级', key: '三级' },
            { text: '四级', value: '四级', key: '四级' },
            { text: '五级', value: '五级', key: '五级' },
        ],
        onFilter: (text, record) => record.level.indexOf(text) === 0,
        render: (level) => {
            let node = null;
            switch (level) {
                case '一级':
                    node = <Tag color="green">{level}</Tag>;
                    break;
                case '二级':
                    node = <Tag color="blue">{level}</Tag>;
                    break;
                case '三级':
                    node = <Tag color="orange">{level}</Tag>;
                    break;
                case '四级':
                    node = <Tag color="red">{level}</Tag>;
                    break;
                case '五级':
                    node = <Tag color="purple">{level}</Tag>;
                    break;
                default:
                    break;
            }
            return node;
        },
    },
    {
        title: '应急人员',
        dataIndex: 'emergencyPerson',
    },
    {
        title: '提交对象',
        dataIndex: 'emergencyManager',
    },
    {
        title: '发生时间',
        dataIndex: 'happenTime',
    },
];

const SyncPage = () => {
    const history = useHistory();
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    // 表单数据更改
    const [form] = Form.useForm();
    const [formdata, setFormdata] = useState({ type: 3 });
    const handleFormChange = (fields) => {
        setFormdata({
            ...formdata,
            ...fields,
        });
    };
    // 获取列表数据
    // const fetchSyncList = useCallback((params) => getEmergencys(params), [searchFlag]);
    // const tableParam = useTableParam(fetchSyncList, { param: formdata });
    // const { dataSource, loading, pagination } = tableParam;
    // const { onChange: onPageChange } = pagination;
    const dataSource = [];
    const loading = false;

    // 操作
    const action = [
        {
            title: '操作',
            align: 'center',
            render: (text, record) => (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(`/incident/assess?id=${record.id}`);
                    }}
                >
                    查看
                </Button>
            ),
        },
    ];

    return (
        <>
            <ScItWrapper>
                <Form
                    layout="inline"
                    form={form}
                    style={{ marginBottom: '16px' }}
                    onValuesChange={(fields) => {
                        handleFormChange(fields);
                    }}
                >
                    <Form.Item label="客户名称" name="clientName">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="销售名称" name="sellerName">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="事件关键字" name="keyword">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 'auto' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                // 吊起查询
                                // onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            查询
                        </Button>
                        <Button
                            style={{ marginLeft: '8px' }}
                            onClick={() => {
                                form.resetFields();
                                setFormdata({ type: 3 });
                                // onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Table
                    size="small"
                    dataSource={dataSource}
                    columns={columns.concat(action)}
                    loading={loading}
                    rowKey={(record) => record.id}
                />
            </ScItWrapper>
        </>
    );
};
export default SyncPage;
