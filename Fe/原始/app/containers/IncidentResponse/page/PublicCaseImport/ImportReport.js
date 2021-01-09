import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider, Row, Col, Form, Alert, Upload, Button, Popconfirm, message } from 'antd';
import { ShrinkOutlined, InboxOutlined } from '@ant-design/icons';
import { ScContent, ScImport, ScImportInner } from '../styled';
import { getUploadFile } from './api';

const { Dragger } = Upload;

const ImportReportComponent = (props) => {
    const { form, reportUrl } = props;
    const history = useHistory();
    const { location } = history;
    const [type] = useState(location.state.type);
    const [isOpen, setIsOpen] = useState({
        card1: true,
        card2: true,
        card3: true,
        card4: true,
        card5: true,
    });

    const [isEditable, setIsEditable] = useState(type !== 'add');

    const shrinkFunc = (val) => {
        setIsOpen({
            ...isOpen,
            [`card${val}`]: !isOpen[`card${val}`],
        });
    };
    const uploadGetFile = (info) => {
        const reg = /^.*\.(?:rar|zip|doc|docx|pdf|jpg|)$/;
        if (!reg.test(info.file.name)) {
            message.warning('文件格式不正确,请选择正确的文件格式');
            return;
        }
        const formd = new FormData();
        formd.append('attach', info.file);
        getUploadFile(formd).then((res) => {
            if (res.code === 200) {
                form.setFieldsValue({ reportUrl: res.data });
                setFileList([info.file]);
            }
        });
    };

    const [fileList, setFileList] = useState([]);

    return (
        <ScContent>
            <Row>
                <Col span={4}>
                    <h3 style={{ paddingLeft: '20px' }}>应急报告</h3>
                </Col>
                <Col style={{ textAlign: 'right', paddingRight: '50px' }} span={20}>
                    <Popconfirm
                        title="重新导入会覆盖当前报告，确定要重新导入？"
                        onConfirm={() => {
                            setFileList([]);
                            setIsEditable(false);
                            form.setFieldsValue({ reportUrl: null });
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="link">重新导入</Button>
                    </Popconfirm>
                    <ShrinkOutlined
                        onClick={() => {
                            shrinkFunc(2);
                        }}
                    />
                </Col>
            </Row>
            <Divider />
            {isOpen.card2 ? (
                <ScImport>
                    {!isEditable ? (
                        <ScImportInner>
                            <Alert
                                message="应急案例导入成功可通过“查看”预览上传的报告内容。"
                                type="info"
                                showIcon
                                closable
                                style={{ marginBottom: '10px' }}
                            />
                            <Form.Item name="reportUrl" noStyle>
                                <Dragger
                                    onChange={uploadGetFile}
                                    beforeUpload={() => false}
                                    fileList={fileList}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p>点击或将文件拖拽到这里上传</p>
                                    <p>支持扩展名：.rar .zip .doc .docx .pdf .jpg</p>
                                </Dragger>
                            </Form.Item>
                        </ScImportInner>
                    ) : (
                        <iframe
                            title="bar"
                            src={`${window.location.origin}/kkfileview/onlinePreview?url=${window.location.origin}${reportUrl}`}
                            frameBorder="0"
                            width="100%"
                            height="1000"
                        />
                    )}
                </ScImport>
            ) : null}
        </ScContent>
    );
};

ImportReportComponent.propTypes = {
    form: PropTypes.object,
    reportUrl: PropTypes.string,
};
export default ImportReportComponent;
