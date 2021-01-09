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
        content: childRecord.content,
        evidence: childRecord.evidence,
        analysis: childRecord.analysis,
    });

    useEffect(() => {
        setFormdata({
            content: childRecord.content,
            evidence: childRecord.evidence,
            analysis: childRecord.analysis,
        });
    }, [childRecord]);

    const [checkListData, setCheckListData] = useState(checkLists);

    useEffect(() => {
        if (checkLists) {
            setCheckListData(checkLists);
        }
    }, [checkLists]);

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (value) => {
        const newEle = {
            ...value,
            evidence: textData,
            sort: checkListData.checklistDTOS[fatherIndex].caseChecklistDetails.length,
            id: `my_${checkListData.checklistDTOS[fatherIndex].caseChecklistDetails.length + 1}`,
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
                onFinish={onFinish}
            >
                <Form.Item label="排查内容" name="content">
                    <TextArea placeholder="请填写排查内容" rows={2} />
                </Form.Item>
                <Form.Item label="分析结果" name="analysis">
                    <TextArea placeholder="请填写分析结果" rows={2} />
                </Form.Item>
                <Form.Item label="取证" name="evidence">
                    <Ckeditor
                        name="evidence"
                        data={formdata.evidence}
                        onChange={(editor) => {
                            const data = editor.getData();
                            textData = data;
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
