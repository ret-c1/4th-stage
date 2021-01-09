import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Table, Button, Input, Select, Divider, Popconfirm, message } from 'antd';

const { Option } = Select;
let clickedCancel = false;
const cacheOriginData = {};
/**
 * 自定义表头
 * @param  {...any} params 所有参数
 */
const CustomHeadTitle = (...params) => (
    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.65)', lineHeight: '22px' }}>
        <span style={{ color: 'red' }}>*</span>
        {params[1]}
    </div>
);

// 定义添加软件信息索引，作为key
let id = 0;
const TableForm = ({ value = [], onChange }) => {
    // 定义受控表单列
    const columns = [
        {
            title: CustomHeadTitle(null, '软件类型'),
            dataIndex: 'softwareType',
            key: 'softwareType',
            width: 172,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Select
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'softwareType', record.key)}
                        >
                            <Option key="网络设备" value="网络设备">
                                网络设备
                            </Option>
                            <Option key="安全设备" value="安全设备">
                                安全设备
                            </Option>
                            <Option key="主机" value="主机">
                                主机
                            </Option>
                            <Option key="数据库" value="数据库">
                                数据库
                            </Option>
                            <Option key="应用" value="应用">
                                应用
                            </Option>
                            <Option key="代码" value="代码">
                                代码
                            </Option>
                            <Option key="终端" value="终端">
                                终端
                            </Option>
                            <Option key="中间件" value="中间件">
                                中间件
                            </Option>
                        </Select>
                    );
                }

                return text;
            },
        },
        {
            title: CustomHeadTitle(null, '软件信息'),
            dataIndex: 'softwareMessage',
            key: 'softwareMessage',
            width: 172,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'softwareMessage', record.key)}
                            placeholder="如NX-OS"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: CustomHeadTitle(null, '受影响版本'),
            dataIndex: 'affectedVersion',
            key: 'affectedVersion',
            width: 352,
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'affectedVersion', record.key)}
                            placeholder="请输入版本号，不同版本间请以分号;为分隔符"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: CustomHeadTitle(null, '不受影响版本'),
            dataIndex: 'unaffectedVersion',
            key: 'unaffectedVersion',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={(e) => handleFieldChange(e, 'unaffectedVersion', record.key)}
                            placeholder="请输入版本号，不同版本间请以分号;为分隔符"
                        />
                    );
                }

                return text;
            },
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                if (!!record.editable && loading) {
                    return null;
                }

                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <Button type="link" onClick={(e) => saveRow(e, record.key)}>
                                    添加
                                </Button>
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="是否要删除此行？"
                                    onConfirm={() => remove(record.key)}
                                >
                                    <Button type="link">删除</Button>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <Button type="link" onClick={(e) => saveRow(e, record.key)}>
                                保存
                            </Button>
                            <Divider type="vertical" />
                            <Button type="link" onClick={(e) => cancel(e, record.key)}>
                                取消
                            </Button>
                        </span>
                    );
                }

                return (
                    <span>
                        <Button type="link" onClick={(e) => toggleEditable(e, record.key)}>
                            编辑
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    /**
     * 移除
     */
    const remove = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);

        if (onChange) {
            onChange(newData);
        }
    };

    const toggleEditable = (e, key) => {
        e.preventDefault();
        const newData = data.map((item) => ({ ...item }));
        const target = getRowByKey(key, newData);

        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                cacheOriginData[key] = { ...target };
            }

            target.editable = !target.editable;
            setData(newData);
        }
    };

    const cancel = (e, key) => {
        clickedCancel = true;
        e.preventDefault();
        const newData = [...data]; // 编辑前的原始数据

        let newCacheOriginData = [];
        newCacheOriginData = newData.map((item) => {
            if (item.key === key) {
                if (cacheOriginData[key]) {
                    const originItem = { ...item, ...cacheOriginData[key], editable: false };
                    delete cacheOriginData[key];
                    return originItem;
                }
            }

            return item;
        });
        setData(newCacheOriginData);
        clickedCancel = false;
    };

    const saveRow = (e, key) => {
        e.persist();
        setLoading(true);
        setTimeout(() => {
            if (clickedCancel) {
                clickedCancel = false;
                return;
            }

            const target = getRowByKey(key) || {};

            if (
                !target.affectedVersion ||
                !target.unaffectedVersion ||
                !target.softwareType ||
                !target.softwareMessage
            ) {
                message.error('请填写完整软件信息');
                e.target.focus();
                setLoading(false);
                return;
            }

            delete target.isNew;
            toggleEditable(e, key);
            if (onChange) {
                onChange(data);
            }
            setLoading(false);
        }, 500);
    };

    /**
     * 行内表单数据改变
     * @param {*} e 输入框为事件对象，下拉框为数据
     * @param {*} fieldName 修改的字段
     * @param {*} key 修改的目标对象(通过key去获取)
     */
    const handleFieldChange = (e, fieldName, key) => {
        const newData = [...data];
        const target = getRowByKey(key, newData);
        if (target) {
            target[fieldName] = e.target ? e.target.value : e;
            setData(newData);
        }
    };
    /**
     * 通过key去获取对应的数据
     * @param {*} key key
     * @param {*} newData 数据列表
     */
    const getRowByKey = (key, newData) => (newData || data).filter((item) => item.key === key)[0];

    // 定义表格加载状态
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(value);
    // 添加一条新纪录
    const newSoftWare = () => {
        const newData = data.map((item) => ({ ...item }));
        newData.push({
            id: `${id}`,
            key: `${id}`,
            softwareType: '',
            softwareMessage: '',
            affectedVersion: '',
            unaffectedVersion: '',
            editable: true,
            isNew: true,
        });
        id += 1;
        setData(newData);
    };
    return (
        <React.Fragment key="IntelligenceTableForm">
            <Table loading={loading} columns={columns} dataSource={data} pagination={false} />
            <Button
                style={{
                    width: '100%',
                    marginTop: 16,
                    marginBottom: 8,
                }}
                type="dashed"
                onClick={newSoftWare}
            >
                <PlusOutlined />
                添加
            </Button>
        </React.Fragment>
    );
};

TableForm.propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
};

export default TableForm;
