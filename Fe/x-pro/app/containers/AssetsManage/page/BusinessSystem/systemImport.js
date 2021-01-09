import React, { useState } from 'react';
import { Modal, Upload, Result, Button, Alert } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { dealImport } from './api';

const { Dragger } = Upload;

const SystemImport = (props) => {
    const [flag, setFlag] = useState(0);
    /* const [err, setErr] = useState(''); */
    const modalWidth = '631px';

    const reBase = () => {
        setFlag(0);
    };

    // 导入文件
    /* const uploadGetFile = (info) => {
        const reg = /^.*\.(?:xls|zip)$/;
        if (!reg.test(info.file.name)) {
            message.warning('文件格式不正确,请选择正确的文件格式');
            return;
        }
        const formd = new FormData();
        formd.append('file', info.file);
        formd.append('projectId', projectId);
        dealImport(formd).then((res) => {
            if (res.code === 200) {
                setFlag(1);
            } else {
                setFlag(2);
                setErr(res.message);
            }
        });
    }; */

    const onChange = (info) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            setFlag(1);
        } else if (status === 'error') {
            setFlag(2);
        }
    };

    const renderBase = () => (
        <>
            <Button type="link" style={{ marginLeft: '480px' }}>
                下载导入模板
            </Button>
            <Dragger
                name="file"
                action="/api/business/system/import"
                onChange={onChange}
                data={{ projectId: 551 }}
                method="post"
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    点击选择或将文件拖拽到这里上传，每次只能上传一个文件
                </p>
                <p className="ant-upload-hint">支持拓展名：.xls .zip</p>
            </Dragger>
        </>
    );

    const renderSucccess = () => (
        <Result
            status="success"
            title="导入成功"
            subTitle="成功导入86个业务系统"
            extra={[
                <Button key="console" onClick={reBase}>
                    继续导入
                </Button>,
                <Button type="primary" key="buy" onClick={props.onCancel}>
                    返回列表
                </Button>,
            ]}
        />
    );

    const renderFailed = () => (
        <>
            <Alert message="出错了!" description="错误信息" type="error" showIcon closable />
            <Button type="link" style={{ marginLeft: '480px', marginTop: '16px' }}>
                下载导入模板
            </Button>
            <Dragger
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={onChange}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    点击选择或将文件拖拽到这里上传，每次只能上传一个文件
                </p>
                <p className="ant-upload-hint">支持拓展名：.xls .zip</p>
            </Dragger>
        </>
    );

    const renderResult = () => {
        if (flag === 1) {
            return renderSucccess();
        }
        if (flag === 2) {
            return renderFailed();
        }
        return renderBase();
    };

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            width={modalWidth}
            title="导入业务系统"
            footer={null}
        >
            {renderResult()}
        </Modal>
    );
};

SystemImport.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default SystemImport;
