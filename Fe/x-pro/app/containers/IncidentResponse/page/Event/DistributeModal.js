import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal, Button, Descriptions, Form, Select, Row, Col, message } from 'antd';
import FormItem from '@components/FormItem';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { modalFormConfig } from './formconfig';
import useAllPersonRemoteSelect from '../../hooks/useAllPersonRemoteSelect';
// import { emergencyDistribute, allUser, queryRecord } from '../api';

const { Option } = Select;

const CustomModal = styled(Modal)`
    & .ant-modal-body {
        padding: 0;
    }
`;
const BasicInfoWrapper = styled.div`
    width: 558px;
    margin: 40px auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    text-align: 'center';
`;
const GrayDiv = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    box-sizing: border-box;
`;

let options = [];

const DistributeModal = (props) => {
    const { visible, handleCancel, event, rxInfo } = props;
    const history = useHistory();
    // 表单操作
    const [form] = Form.useForm();
    // 定义表单内容
    const [formData, setFormData] = useState({});
    const handleFormChange = (fields) => {
        setFormData({
            ...formData,
            ...fields,
        });
    };
    const handleOk = () => {
        form.validateFields().then((allValue) => {
            let planStartTime;
            let planEndTime;
            let serviceStartTime;
            let serviceEndTime;
            let engineerIds;
            if (allValue.exetime) {
                planStartTime = moment(formData.exetime[0]).format('YYYY-MM-DD');
                planEndTime = moment(formData.exetime[1]).format('YYYY-MM-DD');
            }
            if (allValue.serviceTime) {
                serviceStartTime = moment(formData.serviceTime[0]).format('YYYY-MM-DD');
                serviceEndTime = moment(formData.serviceTime[1]).format('YYYY-MM-DD');
            }
            let requestParam;
            if (!allValue.engineerIds) {
                engineerIds = [rxInfo.id];
                requestParam = {
                    ...allValue,
                    planStartTime,
                    planEndTime,
                    threatEventAnalysisId: event.id,
                    projectId: 63,
                    managerId: rxInfo.id,
                    engineerIds,
                    serviceStartTime,
                    serviceEndTime,
                };
            } else {
                requestParam = {
                    ...allValue,
                    planStartTime,
                    planEndTime,
                    threatEventAnalysisId: event.id,
                    projectId: 63,
                    managerId: rxInfo.id,
                    serviceStartTime,
                    serviceEndTime,
                };
            }
            delete requestParam.exetime;
            delete requestParam.serviceTime;
            // emergencyDistribute(requestParam).then((res) => {
            //     if (res.code === 200) {
            //         // 如果是项目经理派发，提示成功后关闭模态框
            //         if (event.type === 'distribute') {
            //             message.success('派发成功');
            //             handleCancel();
            //         } else {
            //             history.push(`/incident/emergency?id=${res.data}&eventId=${event.id}`);
            //         }
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        });
    };

    // 查询所有用户
    // const remoteSelectParam = useAllPersonRemoteSelect(allUser);
    // const { remoteData, handleSearch } = remoteSelectParam;
    // const optionsId = options.map((item) => item.key);
    options = [];

    // 查询事件信息
    const [info, setInfo] = useState({});
    useEffect(() => {
        // queryRecord({ id: event.id }).then((res) => {
        //     if (res.code === 200) {
        //         setInfo(res.data);
        //     }
        // });
    }, []);
    console.log(setInfo, history, useAllPersonRemoteSelect, message);
    return (
        <CustomModal
            visible={visible}
            title="派发应急任务"
            onOk={handleOk}
            onCancel={handleCancel}
            width={762}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    派发
                </Button>,
            ]}
        >
            <Descriptions
                style={{ background: 'rgba(0,0,0,0.04)', padding: '12px 0px 0px 88px' }}
                column={{ xl: 2 }}
            >
                <Descriptions.Item label="事件名称" key="事件名称">
                    {info.eventName}
                </Descriptions.Item>
                <Descriptions.Item label="事件类型" key="事件类型">
                    {info.eventType}
                </Descriptions.Item>
                <Descriptions.Item label="事件等级" key="事件等级">
                    {info.eventLevel}
                </Descriptions.Item>
                <Descriptions.Item label="紧急程度" key="紧急程度">
                    {info.eventEmergencyLevel}
                </Descriptions.Item>
                <Descriptions.Item label="发现时间" key="发现时间">
                    {info.eventFoundTime
                        ? moment(info.eventFoundTime).format('YYYY-MM-DD HH:mm:ss')
                        : '暂无填写'}
                </Descriptions.Item>
                <Descriptions.Item label="发生时间" key="发生时间">
                    {info.eventAppearTime
                        ? moment(info.eventAppearTime).format('YYYY-MM-DD HH:mm:ss')
                        : '暂无填写'}
                </Descriptions.Item>
            </Descriptions>

            <BasicInfoWrapper>
                <Form
                    wrapperCol={{
                        span: 18,
                    }}
                    form={form}
                    labelCol={{ span: 4, offset: 1 }}
                    autoComplete="off"
                    layout="horizontal"
                    onValuesChange={(fields) => {
                        handleFormChange(fields);
                    }}
                >
                    {modalFormConfig.map((item) => {
                        if (item.label === '执行者') {
                            return (
                                event.type === 'distribute' && (
                                    <Form.Item
                                        key={item.label}
                                        label={item.label}
                                        name={item.name}
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择执行人',
                                            },
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="请选择"
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            notFoundContent={null}
                                            mode="multiple"
                                        >
                                            {options}
                                        </Select>
                                    </Form.Item>
                                )
                            );
                        }
                        return (
                            <FormItem
                                key={item.label}
                                label={item.label}
                                name={item.name}
                                type={item.type}
                                options={item.options}
                                placeholder={item.placeholder}
                                rules={item.rules}
                            />
                        );
                    })}
                </Form>
            </BasicInfoWrapper>
            <BasicInfoWrapper style={{ borderBottom: 'none' }}>
                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>任务模版:</Col>
                    <Col xl={{ span: 18 }}>
                        <Select
                            placeholder="请选择"
                            disabled
                            style={{ width: '100%' }}
                            defaultValue={1}
                        >
                            <Option key={1} value={1}>
                                预警排查
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>项目分组:</Col>
                    <Col xl={{ span: 18 }}>
                        <Select
                            placeholder="请选择"
                            disabled
                            style={{ width: '100%' }}
                            defaultValue={event.projectId}
                        >
                            <Option key={event.projectId} value={event.projectId}>
                                {event.projectName}
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row xl={{ span: 24 }} style={{ marginBottom: '24px' }}>
                    <Col xl={{ span: 3, offset: 1 }}>任务列表:</Col>
                    <Col xl={{ span: 18 }}>
                        <GrayDiv
                            style={{ padding: '13px 32px', height: '48px', textAlign: 'center' }}
                        >
                            <p style={{ color: 'rgba(0,0,0,0.65)' }}>
                                创建应急 &nbsp;<span style={{ color: 'rgba(0,0,0,0.15)' }}>——</span>
                                &nbsp; 应急排查&nbsp;{' '}
                                <span style={{ color: 'rgba(0,0,0,0.15)' }}>——</span> &nbsp;完成排查
                                &nbsp;
                            </p>
                        </GrayDiv>
                    </Col>
                </Row>
            </BasicInfoWrapper>
        </CustomModal>
    );
};

DistributeModal.propTypes = {
    visible: PropTypes.bool,
    handleCancel: PropTypes.func,
    event: PropTypes.object,
    rxInfo: PropTypes.object,
};

export default DistributeModal;
