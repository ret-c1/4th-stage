import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
    Row,
    Col,
    Form,
    Button,
    Table,
    Tabs,
    Divider,
    Alert,
    Input,
    Select,
    Tag,
    Popconfirm,
} from 'antd';
import { ScTableContent, ScBackground } from './styled';
import AddMaliciousIPModal from './component/AddMaliciousIPModal';
import ImportModal from './component/ImportModal';
import { getMaliciousIPMy, removeThreat, getMyMaliciousExport, getLabelsPage } from './api';

const { TabPane } = Tabs;
const { Option } = Select;
const pageOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const MaliciousIPMyPage = () => {
    const history = useHistory();
    // const location = useLocation();
    const [form] = Form.useForm();
    // 新增模态框的是否显示
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 导入模态框的是否显示
    const [isImportModalVisible, setIsImportModalVisible] = useState(false);
    // 点击新增与编辑模态框的区别，数字1对应新增模态框，数字2对应编辑模态框
    const [IsAddorEdit, setIsAddorEdit] = useState(1);
    // 点击多选对应显示 “已选择个恶意IP”
    const [clearVisible, setClearVisible] = useState(false);
    // 点击多选对应显示已选择的数字
    const [clearNumber, setClearNumber] = useState(0);
    // 导出数量
    const [exportNumber, setExportNumber] = useState(0);
    const [isExportSuccess, changeIsExportSuccess] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const checkFunc = () => {
        setParams(tableParams);
    };

    const tableParams = {
        offset: 0,
        limit: 10,
        param: {},
    };
    // 查询条件
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {},
    });
    // 全部恶意IP表格数据
    const [tableData, setTableData] = useState([]);
    // 全部恶意IP总数
    const [total, setTotal] = useState(0);

    const tabChange = (value) => {
        if (value === '1') {
            history.push('/intelligence/maliciousip');
        }
    };
    const [labelsData, setLabelsData] = useState({});
    const handleInputChange = (e) => {
        getLabelsPage({
            limit: 100,
            offset: 0,
            param: {
                name: e,
            },
        }).then((res) => {
            if (res.code === 200) {
                setLabelsData(res.data);
            }
        });
    };

    const [isShowTags, changeIsShowTags] = useState({});
    const columnsMy = [
        {
            title: '名称',
            dataIndex: 'unitName',
            key: 'unitName',
        },
        {
            title: 'IP数量',
            dataIndex: 'ipCount',
            key: 'ipCount',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render: (text, record) => {
                const tags = [...(text || []), ...(record.tiTags || []), ...(record.hwTags || [])];
                return (
                    <>
                        {tags &&
                            tags.length > 5 &&
                            !isShowTags[`${record.value}`] &&
                            tags.slice(0, 5).map((item) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
                                ) {
                                    return (
                                        <Tag color="green" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                }
                                if (
                                    record.hwTags &&
                                    record.hwTags.length > 0 &&
                                    record.hwTags.includes(item)
                                ) {
                                    return (
                                        <Tag color="red" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag color="blue" key={item}>
                                        {item}
                                    </Tag>
                                );
                            })}
                        {tags &&
                            (tags.length <= 5 ||
                                (tags.length > 5 && isShowTags[`${record.value}`])) &&
                            tags.map((item) => {
                                if (
                                    record.tiTags &&
                                    record.tiTags.length > 0 &&
                                    record.tiTags.includes(item)
                                ) {
                                    return (
                                        <Tag color="green" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                }
                                if (
                                    record.hwTags &&
                                    record.hwTags.length > 0 &&
                                    record.hwTags.includes(item)
                                ) {
                                    return (
                                        <Tag color="red" key={item}>
                                            {item}
                                        </Tag>
                                    );
                                }
                                return (
                                    <Tag color="blue" key={item}>
                                        {item}
                                    </Tag>
                                );
                            })}
                        {tags && tags.length > 5 && (
                            <Button
                                type="link"
                                style={{ fontSize: 12 }}
                                onClick={() => {
                                    changeIsShowTags({
                                        ...isShowTags,
                                        [`${record.value}`]: !isShowTags[`${record.value}`],
                                    });
                                }}
                            >
                                {isShowTags[`${record.value}`] ? (
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
                        )}
                    </>
                );
            },
        },
        {
            title: '发布时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];
    const getMaliciousIPMyFunc = (info) => {
        getMaliciousIPMy(info).then((res) => {
            if (res.code === 200) {
                setTableData(res.data.records);
                setTotal(res.data.total);
            }
        });
    };

    useEffect(() => {
        getMaliciousIPMyFunc(params);
    }, [params]);

    // 列表多选发生改变时对应的函数
    const onSelectChange = (selectedKeys) => {
        changeIsExportSuccess(false);
        if (selectedKeys && selectedKeys.length >= 0) {
            setSelectedRowKeys(selectedKeys);
            setClearVisible(true);
            setClearNumber(selectedKeys.length);
            if (selectedKeys && selectedKeys.length === 0) {
                setClearVisible(false);
            }
        } else {
            setClearVisible(false);
        }
    };
    // 列表多选对应的对象
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            onSelectChange(selectedKeys);
        },
    };

    const remove = (threatId) => {
        removeThreat({ id: threatId }).then((res) => {
            if (res.code === 200) {
                getMaliciousIPMyFunc(tableParams);
            }
        });
    };

    const action = {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
            <>
                <Button
                    type="link"
                    onClick={() =>
                        history.push(
                            `/intelligence/maliciousip/use/detail?threatId=${record.id}&unitName=${record.unitName}`,
                        )
                    }
                >
                    查看
                </Button>
                <Popconfirm title="是否确认删除?" onConfirm={() => remove(record.id)}>
                    <Button type="link">删除</Button>
                </Popconfirm>
            </>
        ),
    };

    const formCheck = (value) => {
        setParams({ limit: 10, offset: 0, param: { ...params.param, ...value } });
    };
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    const onShowSizeChange = (current, pageSize) => {
        setSelectedRowKeys([]);
        setClearVisible(false);
        setClearNumber(0);
        setParams({ ...params, limit: pageSize, offset: 0 });
    };
    // 点击导出对应的函数
    const exportIp = (type) => {
        getMyMaliciousExport({ threatIds: type === 'part' ? selectedRowKeys : [] }).then((res) => {
            if (res.code === 200) {
                const a = document.createElement('a');
                a.setAttribute('href', res.data);
                a.setAttribute('referrerpolicy', 'origin');
                a.click();
                changeIsExportSuccess(true);
                setExportNumber(type === 'part' ? selectedRowKeys.length : total);
            }
        });
    };
    return (
        <>
            <ScBackground />
            <Tabs activeKey="2" style={{ margin: '0 20px' }} onChange={tabChange}>
                <TabPane tab="全部" key="1" style={{ backgroundColor: 'rgba(240,242,245,1)' }} />
                <TabPane
                    tab="我新增/导入的"
                    key="2"
                    style={{ backgroundColor: 'rgba(240,242,245,1)' }}
                >
                    <ScTableContent>
                        <Form
                            form={form}
                            name="advanced_search"
                            className="ant-advanced-search-form"
                            onFinish={formCheck}
                            wrapperCol={{ span: 18 }}
                        >
                            <Row gutter={24}>
                                <Col span={8}>
                                    <Form.Item label="名称" name="unitName">
                                        <Input placeholder="导入文件名/新增名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="标签" name="labels">
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="请输入关键词"
                                            onSearch={handleInputChange}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            notFoundContent={null}
                                        >
                                            {labelsData &&
                                                labelsData.records &&
                                                labelsData.records.length > 0 &&
                                                labelsData.records.map((item) => (
                                                    <Option key={item.id} value={item.name}>
                                                        {item.name}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">
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
                        <Divider dashed />
                        <Row style={{ marginBottom: '10px' }}>
                            <Col span={4}>
                                <Button
                                    disabled={
                                        selectedRowKeys.length === 0 || tableData.length === 0
                                    }
                                    onClick={() => exportIp('part')}
                                >
                                    导出
                                </Button>
                                <Button
                                    disabled={tableData.length === 0}
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => exportIp('all')}
                                >
                                    导出全部
                                </Button>
                            </Col>
                            <Col span={20} style={{ textAlign: 'right' }}>
                                <Button onClick={() => setIsImportModalVisible(true)}>导入</Button>
                                <Button
                                    type="primary"
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        setIsModalVisible(true);
                                        setIsAddorEdit(1);
                                    }}
                                >
                                    新增
                                </Button>
                            </Col>
                        </Row>
                        {clearVisible && (
                            <div style={{ position: 'relative' }}>
                                <Alert
                                    message={`已选择${clearNumber}个恶意IP`}
                                    type="info"
                                    showIcon
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: '1000',
                                        top: '4px',
                                        left: '140px',
                                    }}
                                >
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setSelectedRowKeys([]);
                                            setClearNumber(0);
                                            setClearVisible(false);
                                        }}
                                    >
                                        清空
                                    </Button>
                                </div>
                            </div>
                        )}
                        {isExportSuccess && (
                            <Alert
                                message={<>成功导出{exportNumber}个 恶意IP</>}
                                type="success"
                                closable
                                onClose={() => changeIsExportSuccess(false)}
                            />
                        )}
                        <Table
                            rowKey="id"
                            columns={columnsMy.concat(action)}
                            pagination={{
                                pageSizeOptions: pageOptions,
                                onShowSizeChange,
                                showSizeChanger: true,
                                showTotal: () => `共 ${total} 条`,
                                total,
                                current: params.offset / params.limit + 1,
                                onChange: pageChange,
                            }}
                            rowSelection={rowSelection}
                            dataSource={tableData}
                        />
                    </ScTableContent>
                </TabPane>
            </Tabs>
            <AddMaliciousIPModal
                buttonState={IsAddorEdit}
                modalVisibleState={isModalVisible}
                setModalVisibleState={setIsModalVisible}
                checkFunc={checkFunc}
            />
            <ImportModal
                modalVisibleState={isImportModalVisible}
                setModalVisibleState={setIsImportModalVisible}
            />
        </>
    );
};

const withConnect = connect(null, null);

export default compose(withConnect, memo)(MaliciousIPMyPage);
