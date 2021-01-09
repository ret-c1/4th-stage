import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import PropTypes from 'prop-types';
// import { addSystem } from './api';

const { Option } = Select;

const inputWidth = {
    width: '332px',
};

const AddSystemPage = (props) => {
    const { visible, onCancel } = props;
    const [data, setData] = useState({
        name: '',
        type: 0,
        description: '',
        scopeOfServices: 0,
        serviceObject: 0,
        coverageArea: 0,
        network: 0,
        systemInterconnected: 0,
        remark: '',
    });

    // 提交业务系统信息
    const handleFinish = () => {
        if (!data.name) {
            message.warn('业务系统名称不能为空');
            return;
        }
        const params = {
            ...data,
            projectId: 551,
        };
        console.log(params);
        // addSystem(params).then((res) => {
        //     if (res.code === 200) {
        //         onOk();
        //     } else {
        //         message.warn(res.message);
        //     }
        // });
    };

    // 下列函数对应表单各项输入时触发的事件
    const nameChange = (e) => {
        setData({
            ...data,
            name: e.target.value,
        });
    };

    const typeSelect = (v) => {
        setData({
            ...data,
            type: v,
        });
    };

    const descChange = (e) => {
        setData({
            ...data,
            description: e.target.value,
        });
    };

    const scopeSelect = (v) => {
        setData({
            ...data,
            scopeOfServices: v,
        });
    };

    const serviceSelect = (v) => {
        setData({
            ...data,
            serviceObject: v,
        });
    };

    const coverageSelect = (v) => {
        setData({
            ...data,
            coverageArea: v,
        });
    };

    const netSelect = (v) => {
        setData({
            ...data,
            network: v,
        });
    };

    const connectSelect = (v) => {
        setData({
            ...data,
            systemInterconnected: v,
        });
    };

    const remarkChange = (e) => {
        setData({
            ...data,
            remark: e.target.value,
        });
    };

    return (
        <Modal
            title="新增业务系统"
            visible={visible}
            onOk={handleFinish}
            okText="提交"
            cancelText="取消"
            onCancel={onCancel}
            width="880px"
        >
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item name="name" label="业务系统名称" rules={[{ required: true }]}>
                    <Input style={inputWidth} onChange={nameChange} />
                </Form.Item>
                <Form.Item label="业务类型">
                    <Select
                        placeholder="请选择"
                        style={inputWidth}
                        allowClear
                        onSelect={typeSelect}
                    >
                        <Option value={1}>生成作业</Option>
                        <Option value={2}>指挥调度</Option>
                        <Option value={3}>管理控制</Option>
                        <Option value={4}>内部办公</Option>
                        <Option value={5}>公众服务</Option>
                        <Option value={6}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="业务描述">
                    <Input.TextArea
                        style={inputWidth}
                        placeholder="请输入对此业务系统的简要说明……"
                        onChange={descChange}
                    />
                </Form.Item>
                <Form.Item label="服务范围">
                    <Select
                        placeholder="请选择"
                        style={inputWidth}
                        allowClear
                        onSelect={scopeSelect}
                    >
                        <Option value={1}>全国</Option>
                        <Option value={2}>跨省</Option>
                        <Option value={3}>全省</Option>
                        <Option value={4}>跨地</Option>
                        <Option value={5}>地（市、区）内</Option>
                        <Option value={6}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="服务对象">
                    <Select
                        placeholder="请选择"
                        style={inputWidth}
                        allowClear
                        onSelect={serviceSelect}
                    >
                        <Option value={1}>单位内部人员</Option>
                        <Option value={2}>社会公众人员</Option>
                        <Option value={3}>两者均包括</Option>
                        <Option value={4}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="覆盖范围">
                    <Select
                        placeholder="请选择"
                        style={inputWidth}
                        allowClear
                        onSelect={coverageSelect}
                    >
                        <Option value={1}>局域网</Option>
                        <Option value={2}>城域网</Option>
                        <Option value={3}>广域网</Option>
                        <Option value={4}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="网络性质">
                    <Select placeholder="请选择" style={inputWidth} allowClear onSelect={netSelect}>
                        <Option value={1}>业务专网</Option>
                        <Option value={2}>互联网</Option>
                        <Option value={3}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="系统互联情况">
                    <Select
                        placeholder="请选择"
                        style={inputWidth}
                        allowClear
                        onSelect={connectSelect}
                    >
                        <Option value={1}>与其他行业系统连接</Option>
                        <Option value={2}>与本行业其他单位系统连接</Option>
                        <Option value={3}>与本单位其他系统连接</Option>
                        <Option value={4}>其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="备注">
                    <Input.TextArea
                        style={inputWidth}
                        placeholder="请输入"
                        onChange={remarkChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

AddSystemPage.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default AddSystemPage;
