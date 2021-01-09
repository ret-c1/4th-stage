import React, { useState, useCallback } from 'react';
import { Tooltip, Table, Form, Input, Button, Tabs, Select, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { ScTab, ScItWrapper } from '../styled';
import useTableParam from '../../hooks/useTableParam';
import { getEmergencys } from '../api';

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
        render: (text) => {
            let contractType = '';
            switch (text) {
                case '1':
                    contractType = '合同';
                    break;
                case '2':
                    contractType = '非合同';
                    break;
                case '3':
                    contractType = '提前实施';
                    break;
                case '4':
                    contractType = '合同外支持';
                    break;
                case '5':
                    contractType = '战略支持';
                    break;
                case '6':
                    contractType = '日常工作';
                    break;
                case '7':
                    contractType = '其他';
                    break;
                default:
                    contractType = '';
                    break;
            }
            return contractType;
        },
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

// const columns = [];

const ExaminePage = () => {
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    // 表单数据更改
    const [form] = Form.useForm();
    const [formdata, setFormdata] = useState({ type: 1, status: '待评审' });
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
        onPageChange(1, 10);
        // 吊起查询
        setSearchFlag(!searchFlag);
    };

    // 获取列表数据
    const fetchSyncList = useCallback((params) => getEmergencys(params), [searchFlag]);
    const tableParam = useTableParam(fetchSyncList, { param: formdata });
    const { dataSource, loading, pagination } = tableParam;
    const { onChange: onPageChange } = pagination;

    const history = useHistory();

    const action = [
        {
            title: '操作',
            width: 260,
            align: 'center',
            render: (text, record) => (
                <div>
                    {nowTab === '待评审' ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(`/incident/assess?id=${record.id}&type=assess`);
                            }}
                        >
                            评审
                        </Button>
                    ) : null}
                    {nowTab === '已通过' || nowTab === '已处置' || nowTab === '已关闭' ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(
                                    `/incident/report?type=generator&id=${record.id}&repordId=${record.reportId}`,
                                );
                            }}
                        >
                            生成报告
                        </Button>
                    ) : null}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            history.push(`/incident/memberList?id=${record.id}`);
                        }}
                    >
                        查看成员
                    </Button>
                    {nowTab === '已处置' ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(`/incident/handleCheck?id=${record.id}&type=finish`);
                            }}
                        >
                            查看处置
                        </Button>
                    ) : null}
                    {nowTab === '已关闭' ? (
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                history.push(`/incident/handleCheck?id=${record.id}`);
                            }}
                        >
                            查看处置
                        </Button>
                    ) : null}
                </div>
            ),
        },
    ];

    // Tab页创建应急按钮
    const createButton = (
        <Button
            type="primary"
            style={{ marginRight: '32px' }}
            onClick={() => history.push('/incident/single/step1')}
        >
            创建应急
        </Button>
    );
    return (
        <>
            <ScTab defaultActiveKey="1" onChange={tabChange} tabBarExtraContent={createButton}>
                <TabPane tab="待评审" key="待评审" />
                <TabPane tab="已通过" key="已通过" />
                <TabPane tab="未通过" key="未通过" />
                <TabPane tab="已处置" key="已处置" />
                <TabPane tab="已关闭" key="已关闭" />
            </ScTab>
            <ScItWrapper>
                <Form
                    form={form}
                    layout="inline"
                    style={{ marginBottom: '16px' }}
                    onValuesChange={(fields) => {
                        handleFormChange(fields);
                    }}
                >
                    <Form.Item label="客户名称">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="销售名称">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="事件关键字">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="合同类型" name="contractType">
                        <Select placeholder="请选择" style={{ width: '171px' }}>
                            <Option value="1" key="合同">
                                合同
                            </Option>
                            <Option value="2" key="非合同">
                                非合同
                            </Option>
                            <Option value="3" key="提前实施">
                                提前实施
                            </Option>
                            <Option value="4" key="合同外支持">
                                合同外支持
                            </Option>
                            <Option value="5" key="战略支持">
                                战略支持
                            </Option>
                            <Option value="6" key="日常工作">
                                日常工作
                            </Option>
                            <Option value="7" key="其他">
                                其他
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 'auto' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            查询
                        </Button>
                        <Button
                            style={{ marginLeft: '8px' }}
                            onClick={() => {
                                form.resetFields();
                                setFormdata({ type: 2, status: nowTab });
                                onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={columns.concat(action)}
                    pagination={pagination}
                    loading={loading}
                    rowKey={(record) => record.id}
                />
            </ScItWrapper>
        </>
    );
};
export default ExaminePage;
