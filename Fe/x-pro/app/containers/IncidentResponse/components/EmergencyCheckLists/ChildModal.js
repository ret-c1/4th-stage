import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import Ckeditor from '@components/Ckeditor';

const { TextArea } = Input;

let textData;
const ChildModal = (props) => {
    const {
        visible,
        handleCancel,
        changeCheckList,
        childRecord,
        actionType,
        checkLists,
        resetSave,
        fatherIndex,
        childIndex,
    } = props;
    const [form] = Form.useForm();
    const [formdata, setFormdata] = useState({
        content: '',
        evidence: '',
        analysis: '',
    });

    const [checkListData, setCheckListData] = useState(checkLists);

    useEffect(() => {
        if (childRecord.content !== '') {
            setFormdata({
                content: childRecord.content,
                evidence: childRecord.evidence,
                analysis: childRecord.analysis,
            });
        }
        if (checkLists) {
            setCheckListData(checkLists);
        }
        // 0416 遗留一个bug，关于编辑器销毁的问题
        return () => {
            setFormdata({
                content: '',
                evidence: '',
                analysis: '',
            });
        };
    }, [childRecord, checkLists]);

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (value) => {
        const newEle = {
            ...value,
            evidence: textData || formdata.evidence,
            sort: checkListData.checklistDTOS[fatherIndex].data
                ? checkListData.checklistDTOS[fatherIndex].data.length
                : 0,
            id: `my_${
                (checkListData.checklistDTOS[fatherIndex].data
                    ? checkListData.checklistDTOS[fatherIndex].data.length
                    : 0) + 1
            }`,
        };
        if (actionType === 'add') {
            changeCheckList(fatherIndex, null, 'add', newEle);
        }
        if (actionType === 'edit') {
            changeCheckList(fatherIndex, childIndex, 'edit', newEle);
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
            title="排查内容"
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
                initialValues={formdata}
                onFinish={onFinish}
            >
                <Form.Item label="分析结果" name="analysis">
                    <TextArea placeholder="请填写分析结果" rows={2} />
                </Form.Item>
                <Form.Item label="排查内容" name="content">
                    <TextArea placeholder="请填写排查内容" rows={2} />
                </Form.Item>
                <Form.Item label="取证">
                    <Ckeditor
                        name="evidence"
                        data={formdata.evidence}
                        onChange={(editor) => {
                            textData = editor.getData();
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

ChildModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    changeCheckList: PropTypes.func,
    childRecord: PropTypes.object,
    actionType: PropTypes.string,
    checkLists: PropTypes.object,
    resetSave: PropTypes.func,
    fatherIndex: PropTypes.number,
    childIndex: PropTypes.number,
};

export default ChildModal;
