import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Divider,
    Form,
    Input,
    Row,
    Col,
    Radio,
    Table,
    Space,
    Menu,
    Dropdown,
    Alert,
    // message,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import AicsoImportModal from './components/AicsoImportModal';
import PeinImportModal from './components/PeinImportModal';
import CircleDot from '../../components/CircleDot';
import { ScContent, ScSpan } from '../../styled';
import { RoundBtn } from './styled';
// import { getAssetList } from './api';
import { switchAsset } from '../../utils';
import { datajson } from './data';

const ListPage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { id } = searchParams();
    const [expand, setExpand] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 点击多选对应显示
    const [clearVisible, setClearVisible] = useState(false);
    // 点击多选对应显示已选择的数字
    const [clearNumber, setClearNumber] = useState(0);
    const [isAicsoModalVisible, setIsAicsoModalVisible] = useState(false);
    // 导入佩恩资产的模态框
    const [isPeinModalVisible, setIsPeinModalVisible] = useState(false);
    // 资产列表
    const [tableData, setTableData] = useState([]);
    // 查询条件
    const [params, setParams] = useState({
        offset: 0,
        limit: 10,
        param: {
            projectId: id,
        },
    });
    const getAssetListFunc = () => {
        setTableData(datajson.data);
    };
    useEffect(() => {
        getAssetListFunc();
    }, [params]);
    // 改变页数方法
    const pageChange = (page, pageSize) => {
        setParams({ ...params, offset: (page - 1) * pageSize });
    };
    // 提交表单
    const onFinish = (values) => {
        setParams({
            offset: 0,
            limit: 10,
            param: {
                projectId: id,
                ...values,
            },
        });
    };

    const onBusinessTypeChange = (e) => {
        const type = e.target.value;
        const data = {
            ...params,
        };
        if (Number(type) === -1) {
            delete data.param.businessType;
        } else {
            data.param.businessType = Number(type);
        }
        setParams(data);
    };
    // 列表多选对应的对象
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
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

            setSelectedRowKeys(selectedKeys);
        },
    };
    const AssetMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => history.push('/project/assets/website')}>
                网页资产
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push('/project/assets/computingdevice')}>
                主机资产
            </Menu.Item>
            <Menu.Item key="3" onClick={() => history.push('/project/assets/database')}>
                数据库资产
            </Menu.Item>
            <Menu.Item key="4" onClick={() => history.push('/project/assets/software')}>
                软件资产
            </Menu.Item>
            <Menu.Item key="5" onClick={() => history.push('/project/assets/network')}>
                网络资产
            </Menu.Item>
            <Menu.Item key="6" onClick={() => history.push('/project/assets/scm')}>
                代码资产
            </Menu.Item>
        </Menu>
    );
    const ImportMenu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => setIsAicsoModalVisible(true)}
                style={{ display: 'none' }}
            >
                资产模板
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setIsPeinModalVisible(true)}>
                佩恩平台资产
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: '序号',
            dataIndex: 'order',
            key: 'order',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: '资产状态',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
            ],
            render: (text) => {
                if (text === 0) {
                    return (
                        <div>
                            <CircleDot size={8} backgroundColor="rgba(0,0,0,0.45)" />
                            <span style={{ marginLeft: '8px' }}>未使用</span>
                        </div>
                    );
                }
                return (
                    <div>
                        <CircleDot size={8} backgroundColor="#2FC25B" />
                        <span style={{ marginLeft: '8px' }}>使用中</span>
                    </div>
                );
            },
        },
        {
            title: '资产名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '资产所属部门',
            dataIndex: 'organizationName',
            key: 'organizationName',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
            ],
        },
        {
            title: '资产负责人',
            dataIndex: 'personName',
            key: 'personName',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'operate',
            render: (text) => (
                <>
                    <Button
                        onClick={() => {
                            const name = switchAsset(text.businessType);
                            history.push(`/project/assets/${name}/detail?id=${text.id}`);
                        }}
                        type="link"
                    >
                        详情
                    </Button>
                    <Button type="link">变更</Button>
                    <Button type="link">报废</Button>
                    <Button type="link">注销</Button>
                </>
            ),
        },
    ];
    return (
        <>
            <ScContent>
                <Space>
                    <ScSpan>资产类型:</ScSpan>
                    <Radio.Group
                        onChange={onBusinessTypeChange}
                        defaultValue="-1"
                        buttonStyle="solid"
                    >
                        <RoundBtn value="-1">全部</RoundBtn>
                        <RoundBtn value="2">主机资产</RoundBtn>
                        <RoundBtn value="3">数据库资产</RoundBtn>
                        <RoundBtn value="4">软件资产</RoundBtn>
                        <RoundBtn value="5">网络资产</RoundBtn>
                        <RoundBtn value="6">代码资产</RoundBtn>
                        <RoundBtn value="1">网站资产</RoundBtn>
                        <RoundBtn value="7">APP资产</RoundBtn>
                        <RoundBtn value="8">Wechat资产</RoundBtn>
                        <RoundBtn value="9">邮箱资产</RoundBtn>
                    </Radio.Group>
                </Space>
                <Divider dashed />

                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                >
                    <Row gutter={50}>
                        <Col span={8}>
                            <Form.Item label="资产名称" name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={16} style={{ textAlign: 'right' }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ marginRight: '10px' }}
                            >
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setParams(params);
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                type="link"
                                style={{ width: '46px' }}
                                onClick={() => setExpand(!expand)}
                            ></Button>
                        </Col>
                    </Row>
                </Form>
                <Divider dashed />
                <Row style={{ margin: '16px 0' }} justify="space-between">
                    <Col span={12}>
                        <Button>导出资产</Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Dropdown overlay={ImportMenu}>
                            <Button style={{ marginLeft: '10px' }}>
                                导入 <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={AssetMenu}>
                            <Button type="primary" style={{ marginLeft: '10px' }}>
                                新增资产 <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
                {clearVisible && (
                    <div style={{ position: 'relative' }}>
                        <Alert
                            message={`已选择${clearNumber}条资产`}
                            type="info"
                            showIcon
                            onClose={() => setClearVisible(false)}
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
                <Table
                    size="small"
                    rowKey="id"
                    dataSource={tableData.records}
                    columns={columns}
                    rowSelection={rowSelection}
                    pagination={{
                        pageSize: 10,
                        onChange: pageChange,
                        total: tableData.total,
                        showSizeChanger: false,
                    }}
                />
            </ScContent>
            <AicsoImportModal
                id={id}
                modalVisibleState={isAicsoModalVisible}
                setModalVisibleState={setIsAicsoModalVisible}
            />
            <PeinImportModal
                id={id}
                modalVisibleState={isPeinModalVisible}
                setModalVisibleState={setIsPeinModalVisible}
                getAssetListFunc={getAssetListFunc}
            />
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

export default compose(withConnect, memo)(ListPage);
