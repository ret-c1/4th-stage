import React, { useState, useEffect } from 'react';
import { List, Button, Upload, message, Form, Radio, Input, Row, Col, Progress } from 'antd';
import PropTypes from 'prop-types';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';

const UploadForm = (props) => {
    const [form] = Form.useForm();
    const { stage } = searchParams();
    const { detail, onCallBack } = props;
    const editStatus = stage === 'add' || stage === 'edit';
    const [checkIndex, changeCheckIndex] = useState(0); //
    const [isAddDescription, changeIsAddDescription] = useState(false); // 添加文件说明或保存状态
    const [descriptionText, setDescriptionText] = useState(''); // 新增文件说明
    const [filePercent, setFilePercent] = useState();
    const [fileLists, setFileLists] = useState([]);

    useEffect(() => {
        if (detail && detail.files && detail.files.length > 0) {
            setFileLists(detail.files);
            detail.files.forEach((item, index) => {
                form.setFieldsValue({
                    [`filestype-${index + 1}`]: item.type,
                });
            });
        }
    }, [detail]);

    const onChange = (info) => {
        if (info.file.status !== 'uploading') {
            setFilePercent(info.file.percent);
        }
        if (info.file.response) {
            if (info.file.response.code === 200) {
                setFileLists([
                    ...fileLists,
                    { name: info.file.name, url: info.file.response.data },
                ]);
                onCallBack([...fileLists, { name: info.file.name, url: info.file.response.data }]);
            } else {
                message.error(info.file.response.message);
            }
        }
    };
    if (editStatus) {
        return (
            <>
                <List
                    dataSource={fileLists}
                    renderItem={(item, index) => (
                        <>
                            <Row style={{ marginTop: '16px' }}>
                                <Col span={12}>
                                    <div>
                                        <PaperClipOutlined />
                                        {item.name}
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
                                                required: stage === 'add' && true,
                                                message: '请选择文件类型！',
                                            },
                                        ]}
                                    >
                                        <Radio.Group
                                            onChange={(e) => {
                                                const newData = fileLists;
                                                newData[index].type = e.target.value;
                                                setFileLists(newData);
                                                onCallBack(newData);
                                            }}
                                            defaultValue={item.type}
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
                                    <Button type="link" href={item.url}>
                                        下载
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            fileLists.splice(index, 1);
                                            setFileLists([...fileLists]);
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
                                            const newData = fileLists;
                                            newData[index].remark = descriptionText;
                                            changeIsAddDescription(false);
                                            setFileLists(newData);
                                            onCallBack(newData);
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
                                        {item.remark}
                                    </Form.Item>
                                </List.Item>
                            )}
                        </>
                    )}
                    header={
                        <Upload
                            name="attach"
                            action="/api/zip/upload"
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
            dataSource={fileLists}
            renderItem={(item) => (
                <List.Item>
                    <div style={{ width: '60%' }}>
                        <PaperClipOutlined />
                        <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{item.name}</span>
                        <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                            文件说明：
                            {item.remark}
                        </div>
                    </div>
                    <div>
                        文件类型：
                        {item.type}
                    </div>
                    <Button type="link" href={item.url}>
                        下载
                    </Button>
                </List.Item>
            )}
        />
    );
};
UploadForm.propTypes = {
    detail: PropTypes.object,
    onCallBack: PropTypes.func,
};
export default UploadForm;
