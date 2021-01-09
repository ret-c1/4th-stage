import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Button, Modal, Input, message, Select, DatePicker } from 'antd';
import moment from 'moment';
import { addWorkLoad, getTypes, getProjectNames, editWorkLoad } from './api';
import { ScModalSubmit } from '../../styled';

/**
 *
 * @param {*} props
 * source 来源，区分来源跳转不同的界面
 */
const { Option } = Select;
const { TextArea } = Input;
const WorkModal = (props) => {
    const [form] = Form.useForm();
    const { handleCancel, workObj, isShow, source, rxInfo, rxRole } = props;

    useEffect(() => {
        if (source === 'edit') {
            form.setFieldsValue({
                ...workObj,
                createTime: moment(workObj.createTime),
                realTime: workObj.realTime && (workObj.realTime / 3600000).toFixed(2),
            });
        }
        return () => {
            form.resetFields();
        };
    }, [workObj]);

    useEffect(() => {
        getProjectNames({ projectName: '' }).then((res) => {
            if (res.code === 200) {
                setProjectNames(res.data);
            }
        });
        getTypes({ name: '' }).then((res) => {
            if (res.code === 200) {
                setTypeList(res.data);
            }
        });
    }, []);
    const [typeList, setTypeList] = useState([]);
    const [projectNames, setProjectNames] = useState([]);
    const handleSearchName = (val) => {
        getProjectNames({ projectName: val || '' }).then((res) => {
            if (res.code === 200) {
                setProjectNames(res.data);
            }
        });
    };
    const handleSearchTypes = (val) => {
        getTypes({ name: val || '' }).then((res) => {
            if (res.code === 200) {
                setTypeList(res.data);
            }
        });
    };
    const onFinish = (values) => {
        const formParams = {
            ...values,
            createTime: values.createTime.valueOf(),
            realTime: values.realTime * 3600000,
        };
        if (source === 'edit') {
            editWorkLoad({ ...workObj, ...formParams }).then((res) => {
                if (res.code === 200) {
                    message.success('提交成功');
                    handleCancel();
                }
            });
        } else {
            addWorkLoad(formParams).then((res) => {
                if (res.code === 200) {
                    message.success('提交成功');
                    handleCancel();
                }
            });
        }
    };
    return (
        <Modal
            getContainer={false}
            title="工作量记录"
            visible={isShow}
            width={650}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                name="work"
                autoComplete="off"
                onFinish={onFinish}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                style={{ paddingBottom: '30px' }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="日期"
                            name="createTime"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择日期！',
                                },
                            ]}
                        >
                            {source === 'look' ? (
                                <>
                                    {workObj &&
                                        workObj.createTime &&
                                        moment(workObj.createTime).format('YYYY-MM-DD')}
                                </>
                            ) : (
                                <DatePicker placeholder="请选择日期" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="执行人">
                            {workObj && workObj.username ? workObj.username : rxInfo.name}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="员工性质">
                            {workObj && workObj.positionType
                                ? workObj.positionType
                                : rxRole.join(',')}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="项目名"
                            name="projectId"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入项目名！',
                                },
                            ]}
                        >
                            {source === 'look' ? (
                                <>{workObj && workObj.projectName}</>
                            ) : (
                                <Select
                                    allowClear
                                    showSearch
                                    placeholder="请输入"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    onSearch={handleSearchName}
                                    notFoundContent={null}
                                >
                                    {projectNames.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.projectName}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="任务类型" name="planTypeId">
                            {source === 'look' ? (
                                <>{workObj && workObj.planTypeName}</>
                            ) : (
                                <Select
                                    allowClear
                                    showSearch
                                    placeholder="请输入"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    notFoundContent={null}
                                    onSearch={handleSearchTypes}
                                >
                                    {typeList.map((item) => (
                                        <Option key={item.value} value={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="任务名" name="taskName">
                            {source === 'look' ? (
                                <>{workObj && workObj.taskName}</>
                            ) : (
                                <Input placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="子任务名" name="subTaskName">
                            {source === 'look' ? (
                                <>{workObj && workObj.subTaskName}</>
                            ) : (
                                <Input placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="realTime"
                            label="工时"
                            rules={[
                                {
                                    required: true,
                                    message: '工时将是体现你工作报表的重要维度',
                                },
                            ]}
                        >
                            {source === 'look' ? (
                                <>
                                    {workObj &&
                                        workObj.realTime &&
                                        (workObj.realTime / 3600000).toFixed(2)}
                                    小时
                                </>
                            ) : (
                                <Input addonAfter="小时" placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="content"
                            label="工作内容"
                            labelCol={{ span: 4 }}
                            rules={[
                                {
                                    required: true,
                                    message: '请填写工作内容',
                                },
                            ]}
                        >
                            {source === 'look' ? <>{workObj && workObj.content}</> : <TextArea />}
                        </Form.Item>
                    </Col>
                </Row>
                {source !== 'look' && (
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 20 }}>
                            <Button type="primary" htmlType="submit" style={{ width: '120%' }}>
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                )}
            </Form>
        </Modal>
    );
};

WorkModal.propTypes = {
    handleCancel: PropTypes.func,
    workObj: PropTypes.object,
    isShow: PropTypes.bool,
    rxInfo: PropTypes.object,
    source: PropTypes.string,
    rxRole: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
    rxRole: state.global.role,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(WorkModal);
