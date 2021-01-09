import React, { useState, useEffect } from 'react';
import { List, Button, Upload, message, Form, Radio, Input, Row, Col, Progress } from 'antd';
import PropTypes from 'prop-types';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';

let files = [];
const UploadFormBackup = (props) => {
    const [form] = Form.useForm();
    const { stage } = searchParams();
    const { detail, onCallBack } = props;
    const editStatus = stage === 'add' || stage === 'edit';
    const [checkIndex, changeCheckIndex] = useState(0); //
    const [isAddDescription, changeIsAddDescription] = useState(false); // 添加文件说明或报存状态
    const [descriptionText, setDescriptionText] = useState(''); // 新增文件说明
    const [uploadFile, setUploadFile] = useState([]); // 文件名称列表
    const [filePercent, setFilePercent] = useState();
    const [description, setDescriptionList] = useState([]); // 文件说明列表
    const [fileType, setFileType] = useState([]); // 文件类型
    const [url, setUrl] = useState([]); // 文件url

    useEffect(() => {
        files = detail && detail.files && detail.files.length > 0 ? detail.files : [];
        const initialDescription = [];
        const initialUploadFile = [];
        const initialFileType = [];
        const initialUrl = [];
        if (detail && detail.files && detail.files.length > 0) {
            detail.files.forEach((item, index) => {
                initialDescription.push(item.remark);
                initialUploadFile.push(item.name);
                initialUrl.push(item.url);
                initialFileType.push(item.type);
                form.setFieldsValue({
                    [`filestype-${index}`]: item.type,
                });
            });
            setUploadFile([...initialUploadFile]);
            setDescriptionList([...initialDescription]);
            setFileType([...initialFileType]);
            setUrl([...initialUrl]);
        }
    }, [detail]);

    const joinFiles = (index, val) => {
        uploadFile.forEach((item) => {
            if (index || index === 0) {
                files[index] = {
                    remark: description.length > 0 ? description[index] : '',
                    url: url.length > 0 ? url[index] : '',
                    name: item,
                    type: val,
                };
            } else {
                files.forEach((item1) => {
                    if (item1.name !== item) {
                        files.push({
                            name: item,
                            remark: '',
                            type: '',
                            url: '',
                        });
                    }
                });
            }
        });
        onCallBack(files);
    };
    const [fileList, setFileList] = useState([]);
    const onChange = (info) => {
        if (info.file.status !== 'uploading') {
            setFilePercent(info.file.percent);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        if (info.file.response && info.file.response.code === 200) {
            const newData = uploadFile;
            newData.push(info.file.response.data);
            setUploadFile([...newData]);
            setUrl([...url, info.file.response.data]);
            joinFiles();
        }
    };
    if (editStatus) {
        return (
            <>
                <List
                    dataSource={uploadFile}
                    renderItem={(item, index) => (
                        <>
                            <Row style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <div>
                                        <PaperClipOutlined />
                                        {item}
                                    </div>
                                    {filePercent && filePercent !== 100 && (
                                        <Progress
                                            strokeWidth={3}
                                            showInfo={false}
                                            strokeColor="#1890ff"
                                            percent={filePercent}
                                        />
                                    )}
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="文件类型"
                                        name={`filestype-${index}`}
                                        labelCol={{ span: 8 }}
                                        style={{ marginBottom: '-24px' }}
                                        rules={[
                                            {
                                                required: editStatus && true,
                                                message: '请选择文件类型！',
                                            },
                                        ]}
                                    >
                                        <Radio.Group
                                            onChange={(e) => {
                                                joinFiles(index, e.target.value);
                                                const newFileType = fileType;
                                                newFileType[index] = e.target.value;
                                                setFileType(newFileType);
                                            }}
                                            defaultValue={fileType.length > 0 && fileType[index]}
                                        >
                                            <Radio value="POC">POC</Radio>
                                            <Radio value="EXP">EXP</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Button
                                        type="link"
                                        disabled={checkIndex === index && isAddDescription}
                                        onClick={() => {
                                            changeIsAddDescription(true);
                                            changeCheckIndex(index);
                                        }}
                                    >
                                        添加文件说明
                                    </Button>
                                    <Button type="link" href={url.length > 0 && url[index]}>
                                        下载
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            uploadFile.splice(index, 1);
                                            description.splice(index, 1);
                                            fileType.splice(index, 1);
                                            url.splice(index, 1);
                                            setUploadFile([...uploadFile]);
                                            setDescriptionList([...description]);
                                            setFileType([...fileType]);
                                            setUrl([...url]);
                                        }}
                                    >
                                        删除
                                    </Button>
                                </Col>
                            </Row>
                            {checkIndex === index && isAddDescription ? (
                                <List.Item>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 400,
                                            color: 'rgba(0, 0, 0, 0.85)',
                                        }}
                                    >
                                        文件说明：
                                    </div>
                                    <Input
                                        placeholder="例如备注该poc工具可验证该漏洞是否存在等情况"
                                        style={{ width: '80%' }}
                                        onChange={(e) => setDescriptionText(e.target.value)}
                                    />
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            const newDescription = description;
                                            newDescription[index] = descriptionText;
                                            setDescriptionList(newDescription);
                                            changeIsAddDescription(false);
                                            joinFiles(index);
                                        }}
                                    >
                                        保存
                                    </Button>
                                </List.Item>
                            ) : (
                                <List.Item
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        color: 'rgba(0, 0, 0, 0.45)',
                                    }}
                                >
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        labelCol={{ span: 2 }}
                                        wrapperCol={{ span: 22 }}
                                        label="文件说明"
                                    >
                                        {description.length > 0 && description[index]}
                                    </Form.Item>
                                </List.Item>
                            )}
                        </>
                    )}
                    header={
                        <Upload
                            name="attach"
                            action="/api/zip/upload"
                            beforeUpload={(file) => {
                                setFileList([...fileList, file]);
                            }}
                            showUploadList={false}
                            onChange={onChange}
                        >
                            <Button>
                                <UploadOutlined /> 上传文件
                            </Button>
                        </Upload>
                    }
                />
            </>
        );
    }
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={uploadFile}
            renderItem={(item, index) => (
                <List.Item>
                    <div style={{ width: '60%' }}>
                        <PaperClipOutlined />
                        <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{item}</span>
                        <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                            文件说明：
                            {description.length > 0 && description[index]}
                        </div>
                    </div>
                    <div>
                        文件类型：
                        {fileType.length > 0 && fileType[index]}
                    </div>
                    <Button type="link" href={url.length > 0 && url[index]}>
                        下载
                    </Button>
                </List.Item>
            )}
        />
    );
};
UploadFormBackup.propTypes = {
    detail: PropTypes.object,
    onCallBack: PropTypes.func,
};
export default UploadFormBackup;
