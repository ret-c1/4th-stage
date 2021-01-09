import React, { useState } from 'react';
import {
    Input,
    DatePicker,
    Select,
    Tabs,
    Divider,
    Row,
    Col,
    Pagination,
    Form,
    Tooltip,
    Typography,
    Button,
    Popconfirm,
} from 'antd';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { ScContent, ScButton, ScForm, ScCard } from '../styled';
import { returnProStatus } from '../utils';

const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const ProjectPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const [data] = useState([
        {
            highVulnerability: 0,
            middleVulnerability: 0,
            lowVulnerability: 0,
            valid: 0,
            invalid: 0,
            miss: 0,
            doubt: 0,
            id: 568,
            projectName: 'test0810',
            serviceStartTime: '2020-08-09',
            serviceEndTime: '2020-08-30',
            clientName: 'test0810',
            planName: '',
            remainDate: -72,
            users: [
                {
                    id: 180,
                    name: '2',
                    img: '//192.168.19.199/api/img/icon/default/boy.png',
                },
                {
                    id: 15,
                    name: '1',
                    img: '',
                },
            ],
            type: 1,
            plans: [],
            status: 4,
            ahMasterServiceProvider: 0,
            deleteFlag: true,
            reportNum: 0,
        },
    ]);
    const [total] = useState(1);

    const returnOperations = (
        <>
            <Select defaultValue="0" style={{ width: 120 }}>
                <Option value="0">全部</Option>
                <Option value="1">未启动</Option>
                <Option value="2">执行中</Option>
                <Option value="3">暂停中</Option>
                <Option value="4">已关闭</Option>
            </Select>
            <ScButton
                onClick={() => {
                    history.push('/project/add?stage=add');
                }}
            >
                新建项目
            </ScButton>
        </>
    );

    const delConfirm = (e) => {
        e.stopPropagation();
    };

    return (
        <ScContent>
            <ScForm form={form} className="ant-advanced-search-form">
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="项目名称" name="projectName">
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="客户名称" name="clientName">
                            <Input placeholder="请输入客户名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="起止时间" name="rangeTime">
                            <RangePicker placeholder={['开始时间', '结束时间']} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="合同编号" name="contractNo">
                            <Input placeholder="请输入合同编号" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <ScButton type="primary" htmlType="submit">
                            查询
                        </ScButton>
                        <ScButton
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置
                        </ScButton>
                    </Col>
                </Row>
            </ScForm>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
            <Tabs defaultActiveKey="0" tabBarExtraContent={returnOperations}>
                <TabPane tab="我创建的项目" key="0" />
                <TabPane tab="我参与的项目" key="1" />
            </Tabs>
            <Row gutter={4} style={{ marginBottom: 30 }}>
                {data.map((item) => (
                    <Col key={`my-${item.id}`} span={8}>
                        <ScCard
                            onClick={() => {
                                history.push(
                                    `/project/detail?id=${item.id}&name=${item.clientName}&type=1`,
                                );
                            }}
                        >
                            <Tooltip title={item.projectName}>
                                <h1 role="presentation">{item.projectName}</h1>
                            </Tooltip>
                            <p
                                role="presentation"
                                onClick={() => {
                                    history.push(
                                        `/project/detail?id=${item.id}&name=${item.clientName}&type=1`,
                                    );
                                }}
                            >
                                {item.clientName}
                            </p>
                            <p>项目状态:{returnProStatus(item.status)}</p>
                            <p>项目报告数量:{item.reportNum}</p>
                            <p>启动时间:{item.serviceStartTime}</p>
                            {(item.status === 2 || item.status === 3) && item.remainDate > 0 ? (
                                <p>
                                    截止时间:{item.serviceEndTime}
                                    <span style={{ color: '#1890ff', marginLeft: '5px' }}>
                                        剩余时间{item.remainDate}天
                                    </span>
                                </p>
                            ) : null}
                            <div>
                                {item.users.map((list) => (
                                    <Text code key={list.id}>
                                        {list.name}
                                    </Text>
                                ))}
                            </div>
                            {item.deleteFlag ? (
                                <Popconfirm
                                    title="确定要删除这个项目嘛？"
                                    onConfirm={(e) => delConfirm(e, item.id)}
                                    okText="确定"
                                    cancelText="取消"
                                    onCancel={(e) => e.stopPropagation()}
                                >
                                    <Button type="link" onClick={(e) => e.stopPropagation()}>
                                        删除
                                    </Button>
                                </Popconfirm>
                            ) : null}
                        </ScCard>
                    </Col>
                ))}
            </Row>
            <Pagination
                style={{ textAlign: 'right' }}
                current={1}
                total={total}
                pageSize={6}
                showSizeChanger={false}
            />
        </ScContent>
    );
};

export default ProjectPage;
