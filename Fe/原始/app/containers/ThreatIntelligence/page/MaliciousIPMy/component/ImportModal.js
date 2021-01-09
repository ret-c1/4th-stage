import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Form, Alert, Upload, Button, Result } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const MaliciousIPPage = (props) => {
    const [form] = Form.useForm();
    // 导入状态，未导入1，以及成功2或者失败3
    const [uploadStatus, setUploadStatus] = useState(1);
    const [uploadResult, setUploadResult] = useState({});
    const onChange = (info) => {
        if (info.file.response && info.file.response.code === 200) {
            setUploadStatus(2);
            setUploadResult(info.file.response.data);
        }
        if (info.file.response && info.file.response.code !== 200) {
            setUploadStatus(3);
            setUploadResult(info.file.response.message);
        }
    };
    const handleCancel = () => {
        props.setModalVisibleState(false);
        form.resetFields();
        setUploadStatus(1);
    };
    return (
        <>
            <Modal
                title="导入恶意IP"
                width="760px"
                bodyStyle={{
                    width: '760px',
                    height: `${setUploadStatus !== 3 ? 477 : 620}px`,
                }}
                visible={props.modalVisibleState}
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    {uploadStatus === 3 && (
                        <Alert
                            message="出错了"
                            description={`${uploadResult}。 本平台采用快速检测方法，此问题仅为当前检测到的第一个问题，为避免反复报错，请排查其他数据格式是否都已正确填写。`}
                            type="error"
                            showIcon
                        />
                    )}
                    {(uploadStatus === 1 || uploadStatus === 3) && (
                        <div
                            style={{
                                marginTop: 24,
                                padding: '0 56px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="link"
                                href="/minio/%E6%83%85%E6%8A%A5%E7%AE%A1%E7%90%86-%E6%81%B6%E6%84%8Fip%E5%88%97%E8%A1%A8%E5%AF%BC%E5%85%A5-%E6%A8%A1%E7%89%88.xlsx"
                            >
                                下载导入模板
                            </Button>
                            <div style={{ width: 600, height: 206, textAlign: 'center' }}>
                                <Dragger
                                    name="file"
                                    action="/api/threat/evil/ip/import"
                                    method="post"
                                    progress={{
                                        strokeColor: `${
                                            uploadStatus === 1 ? '#1890FF' : '#FF4D4F'
                                        }`,
                                        strokeWidth: 3,
                                    }}
                                    onChange={onChange}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        点击选择或将文件拖拽到这里上传，每次只能上传一个文件
                                    </p>
                                    <p className="ant-upload-hint">支持扩展名：.xls .zip</p>
                                </Dragger>
                            </div>
                        </div>
                    )}
                </Form>
                {uploadStatus === 2 && (
                    <Result
                        status="success"
                        title="导入成功"
                        subTitle={`成功导入 ${uploadResult && uploadResult.successCount}条 恶意IP`}
                        extra={[
                            <Button type="primary" key="console" onClick={handleCancel}>
                                返回列表
                            </Button>,
                            <Button key="buy" onClick={() => setUploadStatus(1)}>
                                继续导入
                            </Button>,
                        ]}
                    />
                )}
            </Modal>
        </>
    );
};

MaliciousIPPage.propTypes = {
    modalVisibleState: PropTypes.bool,
    setModalVisibleState: PropTypes.func,
};
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(MaliciousIPPage);
