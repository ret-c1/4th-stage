import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Select, Input } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const FatherModal = (props) => {
    const { visible, handleCancel } = props;
    const [form] = Form.useForm();

    const [name, setName] = useState('设备名称');
    const [ip, setIp] = useState('设备IP');
    const [formdata, setFormdata] = useState({ type: '安全设备' });

    useEffect(() => {
        if (formdata.type === '安全设备') {
            setName('设备名称');
            setIp('设备IP');
        }
        if (formdata.type === '操作系统') {
            setName('操作系统类型');
            setIp('操作系统IP');
        }
        if (formdata.type === '数据库') {
            setName('数据库类型');
            setIp('数据库IP');
        }
    }, [formdata.type]);

    const handleValueChange = (fields) => {
        setFormdata({
            ...formdata,
            ...fields,
        });
    };

    const handleOk = () => {};

    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            title="派发排查任务"
            width={762}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    添加
                </Button>,
            ]}
        >
            <Form
                wrapperCol={{
                    span: 15,
                }}
                labelCol={{ span: 5, offset: 1 }}
                autoComplete="off"
                form={form}
                layout="horizontal"
                onValuesChange={(fields) => {
                    handleValueChange(fields);
                }}
            >
                <Form.Item label="排查类型" name="type">
                    <Select defaultValue={formdata.type}>
                        <Option value="安全设备">安全设备</Option>
                        <Option value="操作系统">操作系统</Option>
                        <Option value="数据库">数据库</Option>
                    </Select>
                </Form.Item>
                <Form.Item label={name} name="name">
                    <Input />
                </Form.Item>
                <Form.Item label={ip} name="ip">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

FatherModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    // changeCheckList: PropTypes.func,
};

export default FatherModal;
