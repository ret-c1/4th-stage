import React, { useState, useEffect, memo } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Input,
    Button,
    Modal,
    Form,
    Switch,
    Tooltip,
    Radio,
    Menu,
    Dropdown,
    Tag,
    Select,
} from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import enCryptoJS from '@utils/enCryptoJS';
import { useHistory } from 'react-router-dom';
import PubModal from '@components/PubModal';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ScModalSubmit } from '../../style';
import NewStaff from '../../components/newStaff';
import DepartmentTree from '../../components/departmentTree';
import {
    getDepartPeople,
    getRole,
    getUserDetail,
    resetPassword,
    updateDepartRelateUser,
    userUnBind,
    dispatchRoles,
} from '../../api';
const { Search } = Input;
const { Option } = Select;

const { confirm } = Modal;
const SystemStaff = (props) => {
    const { rxRole, rxInfo } = props;
    const [form] = Form.useForm();
    const [formPassword] = Form.useForm();
    const history = useHistory();
    const [peopleList, setPeopleList] = useState({});
    const [pageTitle, setPageTitle] = useState('');
    const [isVisiblePwd, changeIsVisiblePwd] = useState(false);
    const [isShowRole, changeIsShowRole] = useState(false);
    const [resetPwdId, changeResetPwdId] = useState();
    const [role, setRole] = useState([]);
    const [currentRole, setCurrentRole] = useState([]);
    const [isShowGroup, changeIsShowGroup] = useState(0);
    const [userId, setUserId] = useState(0);
    // 选中的用户id
    const [staffSelectKey, setStaffSelectKey] = useState([]);
    // 设置状态
    const [visibleStaff, setVisibleStaff] = useState(false);
    const [isRefreshTree, setIsRereshTree] = useState(false);
    const [params, changeParams] = useState({
        limit: 10,
        offset: 0,
        param: {},
    });
    const getList = () => {
        getDepartPeople(params).then((res) => {
            if (res.code === 200) {
                setPeopleList(res.data);
            }
        });
    };
    useEffect(() => {
        // 所有用户列表
        if (params.param.departId) {
            getList();
        }
    }, [params]);

    // 编辑跳转
    const changePage = (action, records) => {
        history.push({
            pathname: `/system/staff/${action}`,
            query: action,
            state: {
                ...records,
                departId: params.param.departId,
                pageTitle,
            },
        });
    };

    // 定义关联用户modal回调
    const handleModelOk = () => {
        // 点击确定回调
        updateDepartRelateUser({
            userIds: staffSelectKey,
            departId: params.param.departId,
        }).then((res) => {
            if (res.code === 200) {
                setVisibleStaff(!visibleStaff);
                getList();
            }
        });
    };
    // 关联用户modal关闭
    const handleModelCancel = () => {
        // 点击遮罩层或右上角叉或取消按钮的回调
        setVisibleStaff(!visibleStaff);
    };
    // 密码重置提交
    const onFinish = (values) => {
        resetPassword({ id: resetPwdId, password: enCryptoJS(values.password) });
        changeIsVisiblePwd(false);
        getList();
    };
    // 关闭密码弹窗
    const handleCancelPwd = () => {
        changeIsVisiblePwd(false);
    };
    // 单用户解绑
    const unbind = (record) => {
        confirm({
            title: `该用户${record.name}是否解绑?`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                userUnBind({ departId: params.param.departId, users: [record.uid] }).then((res) => {
                    if (res.code === 200) {
                        getList();
                        setIsRereshTree(true);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // 关闭角色弹窗
    const handleCancelRole = () => {
        changeIsShowRole(false);
    };
    // 角色分配获取当前所有角色列表和用户角色
    const dispatchRole = (id) => {
        getRole({
            limit: 1000,
            offset: 0,
            param: {},
        }).then((res1) => {
            if (res1.code === 200) {
                setRole(res1.data.records);
                getUserDetail({ id }).then((res) => {
                    if (res.code === 200 && res.data.roleIds && res.data.roleIds.length > 0) {
                        const roleNameList = [];
                        res1.data.records.forEach((item) => {
                            res.data.roleIds.forEach((item1) => {
                                if (item.id === item1) {
                                    roleNameList.push({ id: item.id, name: item.name });
                                }
                            });
                        });
                        setCurrentRole(roleNameList);
                    }
                });
            }
        });
        setUserId(id);
        changeIsShowRole(true);
    };

    const closeRole = (v) => {
        setCurrentRole(currentRole.filter((i) => i !== v));
    };
    // 角色解绑
    const unbindRoles = () => {
        setCurrentRole([]);
    };

    // 角色分配提交
    const onFinishRole = (values) => {
        const currentId = [];
        currentRole.forEach((item) => {
            currentId.push(item.id);
        });
        if (values.newRole) {
            dispatchRoles({ id: userId, roleIds: [...currentId, ...values.newRole] }).then(
                (res) => {
                    if (res.code === 200) {
                        getList();
                    }
                },
            );
        }
        getList();
        changeIsShowRole(false);
    };

    // 表格操作栏下拉更多操作菜单
    const menu = (record) => (
        <Menu>
            <Menu.Item>
                <Button
                    type="link"
                    onClick={() => {
                        changeResetPwdId(record.uid);
                        changeIsVisiblePwd(true);
                        formPassword.resetFields();
                    }}
                >
                    密码重置
                </Button>
            </Menu.Item>
            <Menu.Item>
                {rxRole.includes('管理员') && (
                    <Button type="link" onClick={() => dispatchRole(record.id)}>
                        角色分配
                    </Button>
                )}
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={() => unbind(record)}>
                    用户解绑
                </Button>
            </Menu.Item>
        </Menu>
    );

    // const checkStatus = (record, v) => {
    //     updateDepartUser({ id: record.id, name: record.name, status: v ? 0 : 1 }).then((res) => {
    //         if (res.code === 200) {
    //             getList();
    //         }
    //     });
    // };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 90,
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            width: 90,
        },
        {
            title: '直属领导',
            key: 'leader',
            dataIndex: 'leader',
            width: 100,
        },
        {
            title: '手机',
            key: 'phone',
            dataIndex: 'phone',
            width: 130,
        },
        {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 80,
            render: (text) => <Switch checked={text === 0} />,
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
            width: 150,
        },
        {
            title: '操作',
            key: 'action',
            width: 170,
            render: (text, record) => (
                <>
                    {rxRole.includes('管理员') && (
                        <Button type="link" onClick={() => changePage('edit', record)}>
                            编辑
                        </Button>
                    )}
                    <Dropdown overlay={() => menu(record)}>
                        <Button type="link">
                            更多
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </>
            ),
        },
    ];

    // 分页
    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };

    return (
        <Card style={{ margin: 30 }}>
            <Row>
                <Col
                    span={5}
                    align="flex-start"
                    style={{
                        borderRight: '1px solid  rgba(0,0,0,0.09)',
                        transform: 'translate(0,0)',
                        paddingRight: '10px',
                    }}
                >
                    <Radio.Group
                        value={isShowGroup}
                        onChange={(e) => changeIsShowGroup(e.target.value)}
                    >
                        <Radio.Button value={0}>所属组织</Radio.Button>
                        <Radio.Button value={1}>组织架构</Radio.Button>
                    </Radio.Group>
                    <DepartmentTree
                        isRefreshTree={isRefreshTree}
                        departId={isShowGroup === 0 ? rxInfo.id : 1000}
                        isShowGroup={isShowGroup}
                        onCallback={(pageTit, departmentId) => {
                            setPageTitle(pageTit);
                            changeParams({
                                ...params,
                                param: {
                                    departId:
                                        departmentId && departmentId.length > 0 && departmentId[0],
                                },
                            });
                        }}
                    />
                </Col>
                <Col span={18} style={{ marginLeft: '16px' }}>
                    <Row justify="space-between">
                        <Col span={16}>
                            <Row justify="flex-start">
                                <Col span={7}>
                                    <Tooltip title={pageTitle} placement="topLeft">
                                        <h2
                                            style={{
                                                width: 125,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {pageTitle}
                                        </h2>
                                    </Tooltip>
                                </Col>
                                <Col span={15}>
                                    <Search
                                        placeholder="手机号/角色/用户名查询"
                                        onChange={(e) =>
                                            changeParams({
                                                limit: 10,
                                                offset: 0,
                                                param: {
                                                    ...params.param,
                                                    searchKey: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            {((rxRole.includes('管理员') && isShowGroup === 0) ||
                                (rxInfo.name === 'admin' && isShowGroup === 1)) && (
                                <>
                                    <Button onClick={() => changePage('add')}>创建用户</Button>
                                    <Button
                                        type="primary"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            setVisibleStaff(true);
                                        }}
                                    >
                                        添加用户
                                    </Button>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Table
                        tableLayout="fixed"
                        rowKey="id"
                        columns={columns}
                        dataSource={peopleList.records}
                        pagination={{
                            pageSize: 10,
                            onChange: pageChange,
                            total: peopleList.total,
                            showSizeChanger: false,
                            showTotal: () => `共 ${peopleList.total} 条`,
                        }}
                    />
                </Col>
            </Row>
            <Modal title="密码重置" visible={isVisiblePwd} onCancel={handleCancelPwd} footer={null}>
                <Form
                    form={formPassword}
                    name="application"
                    autoComplete="off"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    style={{ paddingBottom: '30px' }}
                    wrapperCol={{ span: 10, offset: 2 }}
                >
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: `密码要求：8～16位、大写字母、小写字母、数字、符号@.*=_至少包含两种`,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.*=_])([a-zA-Z0-9@.*=_]{8,16})$/,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder="密码要求：8～16位、大写字母、小写字母、数字、符号@.*=_至少包含两种"
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认2次输入密码一致!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请确认2次输入密码一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="请再次输入密码" />
                    </Form.Item>
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 12, offset: 17 }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancelPwd}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
            <Modal title="角色分配" visible={isShowRole} onCancel={handleCancelRole} footer={null}>
                <Form
                    form={form}
                    name="role"
                    autoComplete="off"
                    onFinish={onFinishRole}
                    style={{ paddingBottom: '30px' }}
                >
                    <Row>
                        <Col span={21}>
                            <Form.Item label="当前角色" labelCol={{ span: 6 }}>
                                {currentRole.map((item) => (
                                    <Tag key={item.id} closable onClose={() => closeRole(item)}>
                                        {item.name}
                                    </Tag>
                                ))}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            {currentRole.length > 0 && (
                                <Button type="link" onClick={() => unbindRoles()}>
                                    {currentRole.length > 0 && '解绑'}
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Form.Item label="新增角色" name="newRole" labelCol={{ span: 5 }}>
                        <Select mode="multiple">
                            {role.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 12, offset: 17 }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancelRole}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
            <PubModal
                title="添加用户"
                width={1000}
                visible={visibleStaff}
                onOk={handleModelOk}
                onCancel={handleModelCancel}
            >
                <NewStaff
                    departId={params.param.departId || 1000}
                    isShowGroup={1}
                    newStaffCallback={(val) => {
                        setStaffSelectKey([...val]);
                    }}
                />
            </PubModal>
        </Card>
    );
};

SystemStaff.propTypes = {
    rxRole: PropTypes.array,
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SystemStaff);
