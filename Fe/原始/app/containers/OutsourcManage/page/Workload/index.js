import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Row,
    Col,
    Card,
    Tabs,
    Table,
    Form,
    Button,
    message,
    Tooltip,
    Select,
    DatePicker,
} from 'antd';
// import { searchParams } from '@utils/searchParams';
import styled from 'styled-components';
import moment from 'moment';
import XLSX from 'xlsx';
import WorkModal from './workModal';
import { getTypes, getProjectNames, getOutsourcingList, lookWorkLoad } from './api';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const ScLayout = styled(Card)`
    display: block;
    margin: 30px;
`;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const WorkloadPage = (props) => {
    const { rxRole } = props;
    const [form] = Form.useForm();
    const tableParams = {
        limit: 10,
        offset: 0,
        param: {},
    };
    const [params, setParams] = useState({
        limit: 10,
        offset: 0,
        param: {},
    });
    const [dataSource, setDataSource] = useState({});
    const [isShowWork, changeIsShowWork] = useState(false);
    const [modalSource, setModalSource] = useState('add');
    const [workObj, setWorkObj] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const cancelWork = () => {
        changeIsShowWork(false);
        getOutsourcingList(params).then((res) => {
            if (res.code === 200) {
                setDataSource(res.data);
            } else {
                message.error(res.message);
            }
        });
    };
    useEffect(() => {
        getOutsourcingList(params).then((res) => {
            if (res.code === 200) {
                setDataSource(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, [params]);
    useEffect(() => {
        getTypes({ name: '' }).then((res) => {
            if (res.code === 200) {
                setTypeList(res.data);
            }
        });
        getProjectNames({ projectName: '' }).then((res) => {
            if (res.code === 200) {
                setProjectNames(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []);
    const handleSearchName = (val) => {
        getProjectNames({ projectName: val || '' }).then((res) => {
            if (res.code === 200) {
                setProjectNames(res.data);
            } else {
                message.error(res.message);
            }
        });
    };
    const handleSearchTypes = (val) => {
        getTypes({ name: val || '' }).then((res) => {
            if (res.code === 200) {
                setTypeList(res.data);
            }
        });
    };
    const getModalDetail = (id) => {
        lookWorkLoad({ id }).then((res) => {
            if (res.code === 200) {
                setWorkObj(res.data);
            }
        });
    };
    const columns = [
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width: 172,
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '子任务名',
            dataIndex: 'subTaskName',
            key: 'subTaskName',
            width: 172,
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '项目名',
            dataIndex: 'projectName',
            key: 'projectName',
            width: 172,
            ellipsis: true,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '任务类型',
            key: 'planTypeName',
            dataIndex: 'planTypeName',
        },
        {
            title: '执行人',
            key: 'username',
            dataIndex: 'username',
        },
        {
            title: '员工性质',
            key: 'positionType',
            dataIndex: 'positionType',
        },
        {
            title: '日期',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD'),
        },
        {
            title: '工时',
            key: 'realTime',
            dataIndex: 'realTime',
            render: (text) => text && (text / 3600000).toFixed(2),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            changeIsShowWork(true);
                            setModalSource('look');
                            getModalDetail(record.id);
                        }}
                    >
                        查看
                    </Button>
                    {rxRole.indexOf('外包工程师') !== -1 && (
                        <Button
                            type="link"
                            onClick={() => {
                                changeIsShowWork(true);
                                setModalSource('edit');
                                getModalDetail(record.id);
                            }}
                        >
                            编辑
                        </Button>
                    )}
                </>
            ),
        },
    ];
    const getFields = () => {
        const count = 3;
        const children = [
            <Col span={8} key="projectId">
                <Form.Item name="projectId" label="项目名">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请输入"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={handleSearchName}
                        notFoundContent={null}
                    >
                        {projectNames.map((item) => (
                            <Option key={item.id} value={item.id}>
                                {item.projectName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8} key="planTypeId">
                <Form.Item name="planTypeId" label="任务类型">
                    <Select
                        allowClear
                        showSearch
                        placeholder="请输入"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        onSearch={handleSearchTypes}
                    >
                        {typeList.map((item) => (
                            <Option key={item.value} value={item.value}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>,
            <Col span={8} key="createTime">
                <Form.Item name="createTime" label="日期">
                    <RangePicker style={{ width: '90%' }} allowClear />
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };

    const onFinish = (values) => {
        const val = values;
        const format = {
            ...params.param,
            ...val,
            startDate:
                val.createTime &&
                val.createTime.length > 0 &&
                moment(moment(val.createTime[0]).format('YYYY-MM-DD 00:00:00')).valueOf(),
            endDate:
                val.createTime &&
                val.createTime.length > 0 &&
                moment(moment(val.createTime[1]).format('YYYY-MM-DD 23:59:59')).valueOf(),
        };
        delete format.createTime;
        setParams({
            limit: 10,
            offset: 0,
            param: { ...format },
        });
    };
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    let filename = '外包管理-工作量列表.xlsx'; // 文件名称
    // 把数据转换成二维数组
    const transform = (data) => {
        const arr = [
            [
                '序号',
                '任务名称',
                '子任务名',
                '项目名',
                '任务类型',
                '执行人',
                '员工性质',
                '日期',
                '工时',
                '工作内容',
            ],
        ];
        if (data && data.length > 0) {
            data.forEach((item, idx) => {
                arr[idx + 1] = [];
                arr[idx + 1][0] = idx + 1;
                arr[idx + 1][1] = item.taskName;
                arr[idx + 1][2] = item.subTaskName;
                arr[idx + 1][3] = item.projectName;
                arr[idx + 1][4] = item.planTypeName;
                arr[idx + 1][5] = item.username;
                arr[idx + 1][6] = item.positionType;
                arr[idx + 1][7] = item.createTime && moment(item.createTime).format('YYYY-MM-DD');
                arr[idx + 1][8] = item.realTime && (item.realTime / 3600000).toFixed(2);
                arr[idx + 1][9] = item.content;
            });
        }
        return arr;
    };
    const handleDownload = () => {
        getOutsourcingList({
            limit: dataSource && dataSource.total,
            offset: 0,
            param: params.param,
        }).then((res) => {
            if (res.code === 200) {
                // Excel第一个sheet的名称
                const wsName = 'Sheet1';
                // 新建一个工作簿
                const wb = XLSX.utils.book_new();
                const ws = XLSX.utils.aoa_to_sheet(transform(res.data.records));
                filename = `外包管理-工作量列表${moment().format('YYYY-MM-DD')}.xlsx`;
                XLSX.utils.book_append_sheet(wb, ws, wsName); // 将数据添加到工作薄
                XLSX.writeFile(wb, filename); // 导出Excel
            } else {
                message.error(res.message);
            }
        });
    };
    return (
        <ScLayout className="top">
            <Tabs defaultActiveKey="1">
                <TabPane tab="工作量列表" key="1">
                    <Form
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                        onValuesChange={(changedValues, allValues) => {
                            if (!changedValues[Object.keys(changedValues)[0]]) {
                                onFinish(allValues);
                            }
                        }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Row gutter={24}>
                            {getFields()}
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button type="primary" onClick={handleDownload}>
                                    导出
                                </Button>
                                <Button
                                    type="primary"
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                        changeIsShowWork(true);
                                        setModalSource('add');
                                    }}
                                >
                                    补充工作量
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ margin: '0 8px' }}
                                >
                                    查询
                                </Button>
                                <Button
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                        form.resetFields();
                                        setParams(tableParams);
                                    }}
                                >
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        rowKey="id"
                        style={{ marginTop: '16px' }}
                        columns={columns}
                        dataSource={dataSource.records || []}
                        pagination={{
                            pageSizeOptions: pageOptions,
                            onShowSizeChange,
                            showSizeChanger: true,
                            showTotal: () => `共 ${dataSource.total} 条`,
                            current: params.offset / params.limit + 1,
                            onChange: pageChange,
                            total: dataSource.total,
                        }}
                    />
                </TabPane>
            </Tabs>
            <WorkModal
                isShow={isShowWork}
                handleCancel={cancelWork}
                workObj={workObj}
                source={modalSource}
            />
        </ScLayout>
    );
};

WorkloadPage.propTypes = {
    rxRole: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(WorkloadPage);
