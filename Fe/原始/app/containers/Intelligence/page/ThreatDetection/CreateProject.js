import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, DatePicker, Upload, Input, Row, Col } from 'antd';
import PubMessage from '@components/PubMessage';
import FormItem from '@components/FormItem';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { createFormConfig } from './formconfig';
import { CustomModal, BasicInfoWrapper } from './modalStyle';
import { createProject, IPImport } from '../api';

const { RangePicker } = DatePicker;

const CreateProject = (props) => {
    const history = useHistory();
    const { handleCancel, visible, changeProjectIds, handleProjectSearch, id, projectIds } = props;
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);

    const handleUpload = (fileInfo) => {
        setFileName(fileInfo.name);
        setFile(fileInfo);
        return false;
    };

    // 定义表单内容
    const [formData, setFormData] = useState({});
    // 提交
    const handleOk = () => {
        form.validateFields()
            .then((allValue) => {
                const rReviewEndTime = moment(formData.reviewEndTime).format('YYYY-MM-DD');
                const serviceStartTime = moment(formData.serveTime[0]).format('YYYY-MM-DD');
                const serviceEndTime = moment(formData.serveTime[1]).format('YYYY-MM-DD');
                const requestParam = {
                    ...allValue,
                    serviceStartTime,
                    serviceEndTime,
                    reviewEndTime: rReviewEndTime,
                };
                delete requestParam.serveTime;
                if (fileName !== '') {
                    // let reg = /^.*\.(?:xls|xl|xla|xlt|xlm|xlc|xlw|xlsx)$/
                    const reg = /^.*\.(?:xlsx|xls)$/;
                    if (!reg.test(fileName)) {
                        PubMessage('warning', '文件格式不正确,请选择正确的文件格式。');
                        return;
                    }
                    createProject(requestParam).then((res) => {
                        if (res.code === 200) {
                            changeProjectIds(res.data.id);
                            setLoading(true);
                            const formFile = new FormData();
                            formFile.append('file', file);
                            formFile.append('id', res.data.id);
                            IPImport(formFile).then((ipRes) => {
                                if (ipRes.code === 200) {
                                    setLoading(false);
                                    history.replace(
                                        `/intelligence/threatdetection?id=${id}&project=${projectIds.concat(
                                            parseInt(res.data.id, 10),
                                        )}`,
                                    );
                                    handleProjectSearch();
                                    PubMessage('success', '添加成功');
                                    handleCancel();
                                    // reloadProject();
                                } else {
                                    PubMessage('error', '导入失败');
                                }
                            });
                        } else {
                            PubMessage('error', res.message);
                        }
                    });
                } else {
                    createProject(requestParam).then((res) => {
                        if (res.code === 200) {
                            changeProjectIds(res.data.id);
                            history.replace(
                                `/intelligence/threatdetection?id=${id}&project=${projectIds.concat(
                                    parseInt(res.data.id, 10),
                                )}`,
                            );
                            PubMessage('success', '添加成功');
                            handleCancel();
                            handleProjectSearch();
                            setLoading(false);
                            // reloadProject();
                        }
                    });
                }
            })
            .catch(() => {
                PubMessage('error', '请填写完整的表单数据');
            });
    };
    // 表单参数修改
    const handleFormChange = (fields) => {
        setFormData({
            ...formData,
            ...fields,
        });
    };

    return (
        <CustomModal
            visible={visible}
            title="派发排查任务"
            onCancel={handleCancel}
            width={762}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk} loading={loading}>
                    导入
                </Button>,
            ]}
        >
            <BasicInfoWrapper style={{ borderBottom: 'none' }}>
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
                        handleFormChange(fields);
                    }}
                >
                    {createFormConfig.map((item) => (
                        <FormItem
                            key={item.label}
                            label={item.label}
                            name={item.name}
                            type={item.type}
                            options={item.options}
                            placeholder={item.placeholder}
                            rules={item.rules}
                        />
                    ))}
                    <Form.Item
                        label="服务时间"
                        name="serveTime"
                        rules={[
                            {
                                required: true,
                                message: '请选择服务时间',
                            },
                        ]}
                    >
                        <RangePicker
                            placeholder={['请输入服务开始时间', '请输入服务结束时间']}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
                <Row>
                    <Col xl={{ span: 5, offset: 1 }} style={{ textAlign: 'right' }}>
                        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>导入资产：</span>
                    </Col>
                    <Col
                        xl={{
                            span: 18,
                        }}
                    >
                        <Input
                            placeholder="未选择任何文件"
                            value={fileName}
                            style={{ width: '200px', marginRight: '8px' }}
                        ></Input>
                        <div style={{ display: 'inline-block', marginRight: '8px' }}>
                            <Upload action="" beforeUpload={handleUpload} showUploadList={false}>
                                <Button type="ghost">选择文件</Button>
                            </Upload>
                        </div>
                        <a
                            style={{
                                textDecoration: 'underline',
                                display: 'inline-block',
                            }}
                            href="/api/template/IP资产模版.xlsx"
                        >
                            模版下载
                        </a>
                    </Col>
                </Row>
            </BasicInfoWrapper>
        </CustomModal>
    );
};
CreateProject.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    changeProjectIds: PropTypes.func,
    handleProjectSearch: PropTypes.func,
    // reloadProject: PropTypes.func,
    id: PropTypes.string,
    projectIds: PropTypes.array,
};
export default CreateProject;
