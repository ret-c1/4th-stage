import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Select, Input } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const FatherModal = (props) => {
    const {
        visible,
        handleCancel,
        changeCheckList,
        checkLists,
        fatherRecord,
        resetSave,
        actionType,
        fatherIndex,
    } = props;
    const [form] = Form.useForm();

    const [deviceName, setName] = useState('设备名称');
    const [ip, setIp] = useState('设备IP');
    const [formdata, setFormdata] = useState({
        type: fatherRecord.type || '安全设备',
        name: fatherRecord.name,
        ip: fatherRecord.ip,
    });

    useEffect(() => {
        setFormdata({
            type: fatherRecord.type || '安全设备',
            name: fatherRecord.name,
            ip: fatherRecord.ip,
        });
    }, [fatherRecord]);

    const [checkListData, setCheckListData] = useState(checkLists);

    useEffect(() => {
        if (checkLists) {
            setCheckListData(checkLists);
        }
    }, [checkLists]);

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

    const handleOk = () => {
        const newEle = {
            ...formdata,
            sort: checkListData.checklistDTOS.length,
            id: `my_${checkListData.checklistDTOS.length + 1}`,
            caseChecklistDetails: [
                { id: 'my_0', content: '', contentType: '', evidence: '', analysis: '', sort: 0 },
            ],
        };
        if (actionType === 'add') {
            changeCheckList(null, 'add', newEle);
        }
        if (actionType === 'edit') {
            changeCheckList(fatherIndex, 'edit', newEle);
        }
        modalCancel();
    };

    const modalCancel = () => {
        handleCancel();
        form.resetFields();
        resetSave();
    };

    return (
        <Modal
            visible={visible}
            onCancel={modalCancel}
            title="派发排查任务"
            width={762}
            footer={[
                <Button key="back" onClick={modalCancel}>
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
                initialValues={{
                    type: '安全设备',
                }}
            >
                <Form.Item label="排查类型" name="type">
                    <Select defaultValue={formdata.type}>
                        <Option value="安全设备">安全设备</Option>
                        <Option value="操作系统">操作系统</Option>
                        <Option value="数据库">数据库</Option>
                    </Select>
                </Form.Item>
                <Form.Item label={deviceName} name="name">
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
    changeCheckList: PropTypes.func,
    checkLists: PropTypes.object,
    fatherRecord: PropTypes.object,
    resetSave: PropTypes.func,
    actionType: PropTypes.string,
    fatherIndex: PropTypes.number,
};

export default FatherModal;
