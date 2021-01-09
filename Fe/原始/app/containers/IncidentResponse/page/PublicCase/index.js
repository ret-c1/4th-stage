import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Table, Tabs, Select, DatePicker, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ScTableContent, ScBackground } from './styled';
import { getEngineerCases, getEmployee } from './api';
import { columns } from './config';
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
// const data = [{ keyword: 1, level: '一级', id: 1 }];

const PublicCasePage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const action = {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <>
                <Button
                    type="link"
                    onClick={() => {
                        history.push({
                            pathname: '/incident/publiccase/detail',
                            state: {
                                id: record.id,
                                source: record.source,
                            },
                        });
                    }}
                >
                    查看
                </Button>
            </>
        ),
    };
    const actionMyCase = {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <>
                <Button
                    type="link"
                    onClick={() => {
                        history.push({
                            pathname: '/incident/publiccase/detail',
                            state: {
                                id: record.id,
                                source: record.source,
                            },
                        });
                    }}
                >
                    查看
                </Button>
                <Button
                    type="link"
                    onClick={() => {
                        history.push({
                            pathname: '/incident/publiccase/import',
                            state: {
                                id: record.id,
                                source: record.source,
                                type: 'edit',
                            },
                        });
                    }}
                >
                    编辑
                </Button>
            </>
        ),
    };
    const [employeeList, setEmployeeList] = useState([]);
    const handleSearch = (val) => {
        getEmployee({ name: val }).then((res) => {
            if (res.code === 200) {
                setEmployeeList(res.data);
            }
        });
    };
    const handleReset = () => {
        form.resetFields();
        const format = {
            limit: 10,
            offset: 0,
            param: {
                searchScope: tabKey,
            },
        };
        getEngineerCases(format).then((res) => {
            setTableDataAll(res.data.records);
            setTotalAll(res.data.total);
        });
    };
    const [expand, setExpand] = useState(false);
    const checkInputSame = () => {
        const count = expand ? 4 : 3;
        const children = [
            <Col span={6} key="keyword">
                <Form.Item label="事件关键字" name="keyword">
                    <Select placeholder="请选择" allowClear>
                        <Option value="暴力破解">暴力破解</Option>
                        <Option value="蠕虫病毒">蠕虫病毒</Option>
                        <Option value="勒索病毒">勒索病毒</Option>
                        <Option value="挖矿病毒">挖矿病毒</Option>
                        <Option value="网页篡改">网页篡改</Option>
                        <Option value="钓鱼邮件">钓鱼邮件</Option>
                        <Option value="远程控制">远程控制</Option>
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={6} key="level">
                <Form.Item label="事件等级" name="level">
                    <Select placeholder="请选择" allowClear>
                        <Option value="一级">一级</Option>
                        <Option value="二级">二级</Option>
                        <Option value="三级">三级</Option>
                        <Option value="四级">四级</Option>
                        <Option value="五级">五级</Option>
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={6} key="happenTime">
                <Form.Item label="发生时间" name="happenTime">
                    <RangePicker placeholder={['开始时间', '结束时间']} allowClear />
                </Form.Item>
            </Col>,
            <Col span={6} key="emergencyUserId">
                <Form.Item label="应急人员" name="emergencyUserId">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请输入"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearch}
                        notFoundContent={null}
                    >
                        {employeeList.map((item) => (
                            <Option key={item.value} value={item.value}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };
    //  全部案例与我的案例公用的tab栏
    const checkForm = () => (
        <Form
            name="advanced_search"
            className="ant-advanced-search-form"
            wrapperCol={{ span: 18 }}
            onFinish={checkFunc}
            onValuesChange={checkFunc}
            form={form}
        >
            <Row gutter={24}>
                {checkInputSame()}
                <Col span={expand ? 24 : 6} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                    <Button style={{ margin: '0 8px' }} onClick={handleReset}>
                        重置
                    </Button>
                    <Button type="link" style={{ fontSize: 12 }} onClick={() => setExpand(!expand)}>
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
    );

    // tab栏的判断状态
    const [tabKey, setTabKey] = useState('0');
    // tab栏的切换
    const onTabChange = (key) => {
        form.resetFields();
        setTabKey(key);
        setTableDataAll([]);
        setTotalAll(0);
        setParams({
            limit: 10,
            offset: 0,
            param: {
                searchScope: Number(key),
            },
        });
    };
    //  全部案例分页参数以及查询条件参数
    const [tableDataAll, setTableDataAll] = useState([]);
    const [totalAll, setTotalAll] = useState(0);
    const [params, setParams] = useState({
        limit: 10,
        offset: 0,
        param: {
            searchScope: tabKey,
        },
    });
    // 点击查询执行的函数
    const checkFunc = (value) => {
        const startEndTime = {
            startTime: value.happenTime && value.happenTime[0].valueOf(),
            endTime: value.happenTime && value.happenTime[1].valueOf(),
        };
        setParams({
            ...params,
            param: {
                ...params.param,
                ...startEndTime,
                level: value.level,
                keyword: value.keyword,
                emergencyUserId: value.emergencyUserId,
                searchScope: tabKey,
            },
        });
    };
    // 换页调用的回调函数
    const pageChangeAll = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    useEffect(() => {
        getEngineerCases(params).then((res) => {
            setTableDataAll(res.data.records);
            setTotalAll(res.data.total);
        });
    }, [params, tabKey]);
    return (
        <>
            <ScBackground />
            <Tabs
                defaultActiveKey="0"
                onChange={onTabChange}
                style={{ margin: '0 20px' }}
                tabBarExtraContent={
                    <Button
                        type="primary"
                        onClick={() => {
                            history.push({
                                pathname: '/incident/publiccase/import',
                                state: {
                                    source: '2',
                                    type: 'add',
                                },
                            });
                        }}
                    >
                        导入案例
                    </Button>
                }
            >
                <TabPane tab="全部" key="0" style={{ backgroundColor: 'rgba(240,242,245,1)' }}>
                    <ScTableContent>
                        {checkForm()}
                        <Table
                            rowKey="id"
                            columns={columns.concat(action)}
                            pagination={{
                                total: totalAll,
                                defaultCurrent: 1,
                                pageSize: params.limit,
                                onChange: pageChangeAll,
                            }}
                            dataSource={tableDataAll}
                        />
                    </ScTableContent>
                </TabPane>
                <TabPane tab="我的案例" key="1" style={{ backgroundColor: 'rgba(240,242,245,1)' }}>
                    <ScTableContent>
                        {checkForm()}
                        <Table
                            rowKey="id"
                            columns={columns.concat(actionMyCase)}
                            pagination={{
                                total: totalAll,
                                defaultCurrent: 1,
                                pageSize: params.limit,
                                onChange: pageChangeAll,
                            }}
                            dataSource={tableDataAll}
                        />
                    </ScTableContent>
                </TabPane>
            </Tabs>
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

export default compose(withConnect, memo)(PublicCasePage);
