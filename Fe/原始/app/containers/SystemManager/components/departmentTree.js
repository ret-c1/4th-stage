import React, { useState, useEffect } from 'react';
import { Tree, Input, Button, Modal, Form, Radio, Table, Switch } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
import {
    addDepart,
    editDepart,
    getDepartTree,
    getUserFromDepart,
    getDepartParent,
    removeDepart,
    getDepartPeople,
} from '../api';
import { ScModalSubmit } from '../style';

const { confirm } = Modal;
const { Search } = Input;

let dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i += 1) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key, title });
        if (node.children) {
            generateList(node.children);
        }
    }
};

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i += 1) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '岗位',
        dataIndex: 'role',
        key: 'role',
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
        width: 150,
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (text) => <Switch checked={text === 0} />,
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        width: 150,
    },
];
const DepartmentTree = (props) => {
    const { isShowGroup, departId, onCallback, isRefreshTree } = props;
    const [form] = Form.useForm();
    const [exKeys, setExpandedKeys] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [pageTitle, setPageTitle] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [isShowModal, changeIsShowModal] = useState(false);
    const [whichModal, changeWhichShowModal] = useState('新增');
    const [params, changeParams] = useState({
        limit: 10,
        offset: 0,
        param: {},
    });

    const refresh = () => {
        dataList = [];
        setTreeData([]);
        // const { departId } = searchParams();
        if (departId || searchParams().departId) {
            if (isShowGroup === 0) {
                getUserFromDepart({ id: departId || searchParams().departId }).then((res) => {
                    if (res.code === 200 && res.data.length > 0) {
                        if (searchParams().departId && searchParams().pageTitle) {
                            setPageTitle(searchParams().pageTitle);
                            setDepartmentId([parseInt(searchParams().departId, 10)]);
                            // setExpandedKeys([parseInt(searchParams().departId, 10)]);
                        } else {
                            setPageTitle(res.data[0].name);
                            setDepartmentId([parseInt(res.data[0].id, 10)]);
                            setExpandedKeys([parseInt(res.data[0].id, 10)]);
                        }
                        res.data = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'title'));
                        res.data = JSON.parse(JSON.stringify(res.data).replace(/id/g, 'key'));
                        generateList(res.data);
                        setTreeData(res.data);
                    }
                });
            }
            if (isShowGroup === 1) {
                getDepartTree({
                    parentId: departId || searchParams().departId || 1000,
                }).then((res) => {
                    if (res.code === 200) {
                        if (searchParams().departId && searchParams().pageTitle) {
                            setPageTitle(searchParams().pageTitle);
                            setDepartmentId([parseInt(searchParams().departId, 10)]);
                            // setExpandedKeys([parseInt(searchParams().departId, 10)]);
                        } else {
                            setPageTitle(res.data.name);
                            setDepartmentId([parseInt(res.data.id, 10)]);
                            setExpandedKeys([parseInt(res.data.id, 10)]);
                        }
                        res.data = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'title'));
                        res.data = JSON.parse(JSON.stringify(res.data).replace(/id/g, 'key'));
                        generateList([res.data]);
                        setTreeData([res.data]);
                    }
                });
            }
        }
    };
    useEffect(() => {
        refresh();
    }, [isShowGroup, departId, searchParams().departId]);
    useEffect(() => {
        if (isRefreshTree) {
            refresh();
        }
    }, [isRefreshTree]);
    useEffect(() => {
        onCallback(pageTitle, departmentId || searchParams().departId);
    }, [pageTitle, departmentId, searchParams().departId]);

    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };
    const onChange = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, treeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(true);
        setSearchValue(value);
    };
    const onSelect = (selectedKeys, e) => {
        const title = e.node.title.props.children[0].props.children.props.children[2];
        setPageTitle(title);
        setDepartmentId(selectedKeys);
        getDepartParent({ id: selectedKeys[0] || departmentId[0] }).then((res) => {
            if (res.code === 200) {
                if (whichModal === '编辑') {
                    form.setFieldsValue({ name: title });
                }
                form.setFieldsValue({
                    departChain: `${res.data.parentDepartChain}-${res.data.departName}`,
                });
            }
        });
        // 父级部门和id获取
    };

    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };
    const removeGroup = (id) => {
        getDepartPeople({ ...params, param: { ...params.param, departId: id } }).then((res) => {
            if (res.code === 200) {
                confirm({
                    title: `确认要删除${pageTitle}吗?`,
                    icon: <ExclamationCircleOutlined />,
                    width: 800,
                    content: (
                        <>
                            <div>
                                删除组会将该组下的所有用户一并解绑，解绑后的用户信息将进入上级部门，该组内还有以下用户
                            </div>
                            <Table
                                rowKey="id"
                                columns={columns}
                                dataSource={res.data.records || []}
                                pagination={{
                                    pageSize: 10,
                                    onChange: pageChange,
                                    total: res.data.total || 0,
                                    showSizeChanger: false,
                                    showTotal: () => `共 ${res.data.total} 条`,
                                }}
                            />
                        </>
                    ),
                    okText: '删除',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        removeDepart({ id }).then((res1) => {
                            if (res1.code === 200) {
                                refresh();
                            }
                        });
                    },
                });
            }
        });
    };
    const loop = (data) =>
        data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            let title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: 'red' }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            // console.log('item', item.key);
            title = (
                <>
                    <span>{title}</span>
                    {isShowGroup === 0 && item.type === '部门' && (
                        <Button type="link" onClick={() => showModal('新增')}>
                            <PlusOutlined />
                        </Button>
                    )}
                    {isShowGroup === 0 && item.type === '组' && (
                        <>
                            <Button type="link" onClick={() => showModal('编辑')}>
                                <EditOutlined />
                            </Button>
                            <Button type="link" onClick={() => removeGroup(item.key)}>
                                <DeleteOutlined />
                            </Button>
                        </>
                    )}
                </>
            );
            if (item.children) {
                return { title, key: item.key, children: loop(item.children) };
            }
            return {
                title,
                key: item.key,
            };
        });
    const showModal = (action) => {
        changeWhichShowModal(action);
        changeIsShowModal(true);
    };
    const onCancel = () => {
        changeIsShowModal(false);
    };

    const onFinish = (values) => {
        const formParams = values;
        delete formParams.departChain;
        if (whichModal === '新增') {
            addDepart({ ...formParams, parentId: departmentId[0] }).then((res) => {
                if (res.code === 200) {
                    refresh();
                }
            });
        }
        if (whichModal === '编辑') {
            editDepart({ ...formParams, id: departmentId[0] }).then((res) => {
                if (res.code === 200) {
                    refresh();
                }
            });
        }
        onCancel();
    };
    console.log('exKeys', exKeys);
    return (
        <>
            {isShowGroup === 1 && (
                <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={onChange} />
            )}
            <Tree
                onSelect={onSelect}
                style={{ height: 600, overflow: 'auto' }}
                onExpand={onExpand}
                autoExpandParent={autoExpandParent}
                treeData={loop(treeData)}
                expandedKeys={exKeys || [parseInt(searchParams().departId, 10)]} // 设置初始展开节点不生效
                selectedKeys={departmentId || [parseInt(searchParams().departId, 10)]}
            />
            <Modal
                title={`${whichModal}组织结构`}
                visible={isShowModal}
                onCancel={onCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="application"
                    autoComplete="off"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    style={{ paddingBottom: '30px' }}
                    wrapperCol={{ span: 10, offset: 2 }}
                    initialValues={{ type: '组' }}
                >
                    <Form.Item label="上级部门" name="departChain">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="组名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入组名称！',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: '请选择类型！',
                            },
                        ]}
                    >
                        <Radio.Group name="type">
                            <Radio value="部门" disabled>
                                部门
                            </Radio>
                            <Radio value="组">组</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 12, offset: 17 }}>
                            <Button style={{ marginRight: '10px' }} onClick={onCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
        </>
    );
};

export default DepartmentTree;

DepartmentTree.propTypes = {
    onCallback: PropTypes.func,
    isRefreshTree: PropTypes.bool,
    departId: PropTypes.number,
    isShowGroup: PropTypes.number,
};
