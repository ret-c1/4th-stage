import React, { useEffect, useState } from 'react';
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
import { pubModalTips } from '@components/PubModal';
import { getList, delProject, getReportAuthor } from '../api';
import { ScContent, ScButton, ScForm, ScCard } from '../styled';
import { returnProStatus } from '../utils';

const { Option } = Select;
const { TabPane } = Tabs;
const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const ProjectPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const returnOperations = (
        <>
            <Select
                defaultValue="0"
                style={{ width: 120 }}
                onSelect={(val) => {
                    setParams({
                        ...params,
                        param: {
                            ...params.param,
                            status: Number(val),
                        },
                    });
                }}
            >
                <Option value="0">全部</Option>
                <Option value="1">未启动</Option>
                <Option value="2">执行中</Option>
                <Option value="3">暂停中</Option>
                <Option value="4">已关闭</Option>
            </Select>
            <ScButton
                onClick={() => {
                    history.push('/project/add');
                }}
            >
                新建项目
            </ScButton>
        </>
    );

    const [current, setCurrent] = useState(1);
    const [params, setParams] = useState({
        limit: 6,
        offset: 0,
        param: { type: 0, status: 0 },
    });
    const handlePagechange = (page, pageSize) => {
        setCurrent(page);
        setParams({ ...params, offset: (page - 1) * pageSize });
    };

    const handleTabChange = (key) => {
        setParams({ limit: 6, offset: 0, param: { type: key, status: 0 } });
        setCurrent(1);
    };

    // const [formdata, setFormdata] = useState({
    //     projectName: '', // 项目名称
    //     clientName: '', // 客户名称
    //     serviceStartTime: '', // 服务开始时间
    //     serviceEndTime: '', // 服务结束时间
    //     contractNo: '', // 合约号
    //     status: '0', // 状态
    //     type: '0', // 用户项目类型 0我创建 1我参与
    // });
    const formFinish = (value) => {
        const formdata = { ...value };
        if (value.rangeTime) {
            formdata.serviceStartTime = value.rangeTime[0].format(dateFormat);
            formdata.serviceEndTime = value.rangeTime[1].format(dateFormat);
        }
        setParams({
            limit: 6,
            offset: 0,
            param: {
                ...params.param,
                ...formdata,
            },
        });
    };

    const fetchDetail = () => {
        getList(params).then((res) => {
            if (res.code === 200) {
                setData(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };

    useEffect(() => {
        fetchDetail();
    }, [params]);

    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        getReportAuthor({}).then((res) => {
            if (res.code === 200) {
                setEmployeeList(res.data);
            }
        });
    }, []);

    const delConfirm = (e, id) => {
        e.stopPropagation();
        delProject({ id }).then((res) => {
            if (res.code === 200) {
                pubModalTips('success', '提示', '你已成功删除项目', 5);
                fetchDetail();
            } else {
                pubModalTips('warning', '提示', res.message, 5);
            }
        });
    };

    return (
        <ScContent>
            <ScForm form={form} className="ant-advanced-search-form" onFinish={formFinish}>
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
                    <Col span={6}>
                        <Form.Item label="项目经理" name="managerId">
                            <Select
                                placeholder="请选择项目经理"
                                showSearch
                                optionFilterProp="children"
                            >
                                {employeeList.map((item) => (
                                    <Option key={item.value} value={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="工程师" name="engineerId">
                            <Select
                                placeholder="请选择工程师"
                                showSearch
                                optionFilterProp="children"
                            >
                                {employeeList.map((item) => (
                                    <Option key={item.value} value={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
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
                                setParams({
                                    limit: 6,
                                    offset: 0,
                                    param: { type: 0, status: 0 },
                                });
                            }}
                        >
                            重置
                        </ScButton>
                    </Col>
                </Row>
            </ScForm>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
            <Tabs
                defaultActiveKey="0"
                onChange={handleTabChange}
                tabBarExtraContent={returnOperations}
            >
                <TabPane tab="我创建的项目" key="0" />
                <TabPane tab="我参与的项目" key="1" />
            </Tabs>
            <Row gutter={4} style={{ marginBottom: 30 }}>
                {data.map((item) => (
                    <Col key={`my-${item.id}`} span={8}>
                        <ScCard
                            onClick={() => {
                                history.push(
                                    `/project/detail?id=${item.id}&name=${item.clientName}`,
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
                                        `/project/detail?id=${item.id}&name=${item.clientName}`,
                                    );
                                }}
                            >
                                {item.clientName}
                            </p>
                            <p>项目状态:{returnProStatus(item.status)}</p>
                            <p>项目报告数量:{item.reportNum}</p>
                            <p>启动时间:{item.serviceStartTime}</p>
                            <p>
                                截止时间:{item.serviceEndTime}
                                <span style={{ color: '#1890ff', marginLeft: '5px' }}>
                                    剩余时间{item.remainDate}天
                                </span>
                            </p>
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
                current={current}
                total={total}
                pageSize={6}
                showSizeChanger={false}
                onChange={handlePagechange}
            />
        </ScContent>
    );
};

export default ProjectPage;
