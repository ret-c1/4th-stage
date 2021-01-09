import React, { useState } from 'react';
import { Tooltip, Table, Form, Input, Button, Tabs, Dropdown, Menu, Select, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { ScButton, ScDivider, ScTab, ScItWrapper } from '../styled';
// import { getEmergencys } from '../api';
// import useTableParam from '../../hooks/useTableParam';

const { TabPane } = Tabs;
const { Option } = Select;

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
        // render: (number) => moment(number).format('YYYY-MM-DD HH:mm:ss'),
    },
];

// const columns = [];

const ReportList = () => {
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    // 表单数据更改
    const [form] = Form.useForm();
    const [formdata, setFormdata] = useState({ type: 2, status: '待评审' });
    const handleFormChange = (fields) => {
        setFormdata({
            ...formdata,
            ...fields,
        });
    };

    // Tab页切换
    const [nowTab, setNowTab] = useState('待评审');
    const tabChange = (key) => {
        setFormdata({
            ...formdata,
            status: key,
        });
        setNowTab(key);
        // onPageChange(1, 10);
        // 吊起查询
        setSearchFlag(!searchFlag);
    };

    // 获取列表数据
    // const fetchSyncList = useCallback((params) => getEmergencys(params), [searchFlag]);
    // const tableParam = useTableParam(fetchSyncList, { param: formdata });
    // const { dataSource, loading, pagination } = tableParam;
    // const { onChange: onPageChange } = pagination;
    const dataSource = [];
    const loading = false;

    const history = useHistory();

    const action = [
        {
            title: '操作',
            width: 260,
            align: 'center',
            render: (text, record) => (
                <div>
                    <ScButton
                        type="link"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push(`/incident/assess?id=${record.id}`);
                        }}
                    >
                        详情
                    </ScButton>
                    <ScDivider type="vertical" />
                    {nowTab !== '待评审' && nowTab !== '未通过' && (
                        <ScButton
                            type="link"
                            size="small"
                            onClick={(e) => {
                                e.preventDefault();
                                history.push(
                                    `/incident/report?type=generator&id=${record.id}&repordId=${record.reportId}`,
                                );
                            }}
                        >
                            生成报告
                        </ScButton>
                    )}
                    <ScDivider type="vertical" />
                    <Dropdown
                        overlay={() => reportListMenu(record)}
                        style={{ display: 'inline-block' }}
                    >
                        <Button type="link" onClick={(e) => e.preventDefault()} size="small">
                            更多
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            ),
        },
    ];
    const reportListMenu = (record) => (
        <Menu style={{ textAlign: 'center' }}>
            {nowTab === '已通过' && (
                <Menu.Item
                    key="need"
                    onClick={() => {
                        history.push(`/incident/reportList/handle?id=${record.id}`);
                    }}
                >
                    处置
                </Menu.Item>
            )}
            <Menu.Item
                key="distribute"
                onClick={() => {
                    history.push(`/incident/memberList?id=${record.id}`);
                }}
            >
                查看成员
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <ScTab defaultActiveKey="待评审" onChange={tabChange}>
                <TabPane tab="待评审" key="待评审" style={{ width: '80px' }} />
                <TabPane tab="已通过" key="已通过" style={{ width: '80px' }} />
                <TabPane tab="未通过" key="未通过" style={{ width: '80px' }} />
                <TabPane tab="已处置" key="已处置" style={{ width: '80px' }} />
                <TabPane tab="已关闭" key="已关闭" style={{ width: '80px' }} />
            </ScTab>
            <ScItWrapper>
                <Form
                    layout="inline"
                    form={form}
                    style={{ marginBottom: '16px' }}
                    name="search"
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
                    <Form.Item label="合同类型" name="contractType">
                        <Select placeholder="请选择" style={{ width: '171px' }}>
                            <Option value="合同" key="合同">
                                合同
                            </Option>
                            <Option value="非合同" key="非合同">
                                非合同
                            </Option>
                            <Option value="提前实施" key="提前实施">
                                提前实施
                            </Option>
                            <Option value="合同外支持" key="合同外支持">
                                合同外支持
                            </Option>
                            <Option value="战略支持" key="战略支持">
                                战略支持
                            </Option>
                            <Option value="日常工作" key="日常工作">
                                日常工作
                            </Option>
                            <Option value="其他" key="其他">
                                其他
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 'auto' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                // onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            查询
                        </Button>
                        <Button
                            htmlType="button"
                            style={{ marginLeft: '8px' }}
                            onClick={() => {
                                form.resetFields();
                                setFormdata({ type: 2, status: nowTab });
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
export default ReportList;
