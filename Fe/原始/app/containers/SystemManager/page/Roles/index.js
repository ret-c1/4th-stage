import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Input, Tree, Menu, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { getRole, getRolePermissions, delRole, editRole, addRole } from '../../api';
import { ScMenu } from '../../style';
const { Search } = Input;
const { confirm } = Modal;

const dataList = [];
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
const SystemRoles = () => {
    const [form] = Form.useForm();
    const [expandedKey, setExpandedKeys] = useState([]);
    const [checkedKey, setCheckedKeys] = useState([]);
    const [selectedKey, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [isShowSubmit, changeSubmit] = useState(false);
    const [roleTreeData, setRoleTreeData] = useState([]);
    const [role, setRole] = useState([]);
    const [inputRole, setInputRole] = useState('');
    const [chooseRole, setChooseRole] = useState([]);

    const queryRoleTree = () => {
        getRolePermissions().then((res) => {
            if (res.code === 200) {
                getRole({ limit: 1000, offset: 0, param: {} }).then((res1) => {
                    if (res1.code === 200 && res1.data.records && res1.data.records.length > 0) {
                        setRole(res1.data.records || []);
                        if (chooseRole.name) {
                            res1.data.records.forEach((item) => {
                                if (item.name === chooseRole.name) {
                                    setCheckedKeys(item.permissionIds);
                                    // setChooseRole(item);
                                }
                            });
                        } else {
                            setCheckedKeys(res1.data.records[0].permissionIds);
                            // setChooseRole(res1.data.records[0]);
                        }
                    }
                });
                res.data = JSON.parse(JSON.stringify(res.data).replace(/name/g, 'title'));
                res.data = JSON.parse(JSON.stringify(res.data).replace(/id/g, 'key'));
                setRoleTreeData(res.data.root);
                generateList(res.data.root);
            }
        });
    };
    useEffect(() => {
        queryRoleTree();
    }, []);

    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeys) => {
        setCheckedKeys(checkedKeys);
    };

    const onSelect = (selectedKeys) => {
        setSelectedKeys(selectedKeys);
    };
    const onChange = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, roleTreeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(true);
        setSearchValue(value);
    };
    const loop = (data) =>
        data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title1 =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: 'red' }}>{searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item.title}</span>
                );
            if (item.children) {
                return { title: title1, key: item.key, children: loop(item.children) };
            }

            return {
                title: title1,
                key: item.key,
            };
        });
    // 编辑角色权限
    const onFinishMenu = () => {
        const params = {
            id: chooseRole.id,
            name: chooseRole.name,
            permissions: checkedKey,
        };
        editRole(params).then((res) => {
            if (res.code === 200) {
                message.success('角色权限保存成功');
                queryRoleTree();
            }
        });
        setCheckedKeys([]);
    };
    // 新增角色
    const onFinishNewRole = () => {
        addRole({ name: inputRole, permissions: [] }).then((res1) => {
            if (res1.code === 200) {
                queryRoleTree();
            } else {
                message.error(res1.message);
            }
        });
        changeSubmit(!isShowSubmit);
    };
    // 删除角色
    const deleteRoles = (key) => {
        confirm({
            title: '确认要删除该角色吗？',
            icon: <ExclamationCircleOutlined />,
            content: '删除该角色会将关联该角色的用户一并删除。',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                delRole({ id: key }).then((res1) => {
                    if (res1.code === 200) {
                        queryRoleTree();
                    }
                });
            },
            onCancel() {},
        });
    };
    // 当前左侧选中角色权限树
    const searchPermissionIds = (key) => {
        role.forEach((item) => {
            if (item.id === parseInt(key, 10)) {
                setCheckedKeys(item.permissionIds);
                setChooseRole(item);
            }
        });
    };

    return (
        <Card style={{ margin: 30 }}>
            <Row justify="space-between">
                <Col
                    span={5}
                    style={{
                        borderRight: '1px solid  rgba(0,0,0,0.09)',
                        transform: 'translate(0,0)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.85)',
                            fontFamily: 'PingFangSC-Medium',
                            borderBottom: '1px solid  rgba(0,0,0,0.09)',
                            padding: '0 0 32px 24px',
                        }}
                    >
                        角色管理
                    </div>
                    <Row>
                        <Col span={18}>
                            <ScMenu mode="inline" defaultSelectedKeys={['1']}>
                                {role.map((item1) => (
                                    <Menu.Item
                                        key={item1.id}
                                        onClick={({ key }) => searchPermissionIds(key)}
                                    >
                                        {item1.name}
                                    </Menu.Item>
                                ))}
                            </ScMenu>
                        </Col>
                        <Col span={3}>
                            <ScMenu mode="inline">
                                {role.map((item1) => (
                                    <Menu.Item
                                        key={item1.id}
                                        onClick={({ key }) => deleteRoles(key)}
                                    >
                                        <DeleteOutlined />
                                    </Menu.Item>
                                ))}
                            </ScMenu>
                        </Col>
                    </Row>
                    {isShowSubmit && <Input onChange={(e) => setInputRole(e.target.value)} />}
                    {!isShowSubmit && (
                        <div style={{ marginLeft: '20px' }}>
                            <Button type="dashed" onClick={() => changeSubmit(!isShowSubmit)}>
                                <PlusOutlined /> 添加新角色
                            </Button>
                        </div>
                    )}
                    {isShowSubmit && (
                        <div style={{ marginTop: '10px' }}>
                            <Button
                                style={{ marginRight: '10px' }}
                                type="primary"
                                onClick={() => onFinishNewRole()}
                            >
                                保存
                            </Button>
                            <Button onClick={() => changeSubmit(!isShowSubmit)}>取消</Button>
                        </div>
                    )}
                </Col>
                <Col span={19}>
                    <Form form={form} name="application" autoComplete="off" onFinish={onFinishMenu}>
                        <Row
                            justify="space-between"
                            style={{
                                borderBottom: '1px solid rgba(0,0,0,0.09)',
                                paddingBottom: '32px',
                            }}
                        >
                            <Col span={5} offset={1}>
                                <span
                                    style={{
                                        fontSize: 16,
                                        color: 'rgba(0,0,0,0.85)',
                                        fontFamily: 'PingFangSC-Medium',
                                    }}
                                >
                                    {chooseRole.name}
                                </span>
                            </Col>
                        </Row>
                        <Row justify="center" style={{ margin: '12px 0' }}>
                            <Col span={23}>
                                <Card title="菜单权限">
                                    <Search
                                        style={{ marginBottom: 8, marginTop: 12 }}
                                        placeholder="Search"
                                        onChange={onChange}
                                    />
                                    <Form.Item>
                                        <Tree
                                            style={{ height: 500, overflow: 'auto' }}
                                            checkable
                                            onExpand={onExpand}
                                            expandedKeys={expandedKey}
                                            autoExpandParent={autoExpandParent}
                                            onCheck={onCheck}
                                            checkedKeys={checkedKey}
                                            onSelect={onSelect}
                                            selectedKeys={selectedKey}
                                            treeData={loop(roleTreeData)}
                                        />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>
                        <Row
                            justify="flex-end"
                            style={{
                                borderTop: '1px solid  rgba(0,0,0,0.09)',
                                padding: '9px 0',
                            }}
                        >
                            <Col span={4} offset={20}>
                                <Form.Item>
                                    <Button onClick={() => setCheckedKeys([])}>取消</Button>
                                    <Button type="primary" htmlType="submit">
                                        保存
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default SystemRoles;
