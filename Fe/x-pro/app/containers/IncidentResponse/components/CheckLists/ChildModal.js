import React from 'react';
import { Modal, Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const ChildModal = (props) => {
    const { visible, handleCancel } = props;
    const [form] = Form.useForm();

    const handleValueChange = () => {};

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
                onFinish={handleOk}
                onValuesChange={(fields) => {
                    handleValueChange(fields);
                }}
            >
                <Form.Item label="排查内容">
                    <TextArea placeholder="请填写排查内容" rows={2} />
                </Form.Item>
                <Form.Item label="取证"></Form.Item>
                <Form.Item label="分析结果">
                    <TextArea placeholder="请填写分析结果" rows={2} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

ChildModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    // changeCheckList: PropTypes.func,
};

export default ChildModal;
