import React, { useState, useEffect } from 'react';
import { Input, Radio, DatePicker, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import PubModal, { pubModalTips } from '@components/PubModal';
import CmFuzzySearch from '@components/CmFuzzySearch';
import moment from 'moment';
import { searchParams } from '@utils/searchParams';
// import useAllPersonRemoteSelect from '../../hooks/useAllPersonRemoteSelect';
import { changePlan, planTypes } from '../api';

const { Option } = Select;

// let options = [];
// let executorOptions = [];
const AddTaskModal = ({ visible, cancel, nowRecord, type, rxInfo, refresh }) => {
    const { id: projectId } = searchParams();
    const [form] = Form.useForm();
    const [typelist, setTypeList] = useState([]);
    useEffect(() => {
        if (type === 'edit') {
            const editData = { ...nowRecord };
            // if (editData.executorId) {
            //     executorOptions = [
            //         <Option value={editData.executorId} key={editData.executorId}>
            //             {editData.executorName}
            //         </Option>,
            //     ];
            // }
            // if (editData.reviewExpertId) {
            //     options = [
            //         <Option value={editData.reviewExpertId} key={editData.reviewExpertId}>
            //             {editData.reviewExpertName}
            //         </Option>,
            //     ];
            // }
            form.setFieldsValue({
                ...editData,
                scheduledStartDate: moment(editData.scheduledStartDate || new Date().valueOf()),
                scheduledEndDate: moment(editData.scheduledEndDate || new Date().valueOf()),
            });
        }
        return () => form.resetFields();
    }, []);
    // 获取工作计划类型
    useEffect(() => {
        planTypes({ name: '' }).then((res) => {
            if (res.code === 200) {
                setTypeList(res.data);
            } else {
                pubModalTips('error', '操作失败', res.message, 2);
            }
        });
    }, []);

    // 模态框确认
    const onOk = () => {
        const requestParam = { ...form.getFieldsValue() };
        requestParam.scheduledStartDate = moment(requestParam.scheduledStartDate).format(
            'YYYY/MM/DD',
        );
        requestParam.scheduledEndDate = moment(requestParam.scheduledEndDate).format('YYYY/MM/DD');
        if (nowRecord) {
            requestParam.id = nowRecord.id;
        }
        requestParam.projectId = projectId;
        requestParam.managerId = rxInfo.id;
        form.validateFields().then(() => {
            changePlan(requestParam).then((res) => {
                if (res.code === 200) {
                    cancel();
                    pubModalTips(
                        'success',
                        '添加成功',
                        `当前工作计划${type === 'add' ? '新增' : '编辑'}成功`,
                        2,
                        refresh,
                    );
                }
            });
        });
    };

    // 模糊匹配平台所有用户
    // 查询所有用户
    // const remoteSelectParam = useAllPersonRemoteSelect(allUser);
    // const { remoteData, handleSearch } = remoteSelectParam;
    // const optionsId = options.map((item) => item.key);
    // options = options.concat(
    //     remoteData
    //         .filter((item) => !optionsId.includes(`${item.value}`))
    //         .map((d) => (
    //             <Option key={d.id} value={d.value}>
    //                 {d.text}
    //             </Option>
    //         )),
    // );

    // 模糊匹配平台所有用户(执行人)
    // const executorParam = useAllPersonRemoteSelect(allUser);
    // const { remoteData: executorData, handleSearch: handleExeSearch } = executorParam;
    // const exeOptionsId = options.map((item) => item.key);
    // executorOptions = executorOptions.concat(
    //     executorData
    //         .filter((item) => !exeOptionsId.includes(`${item.value}`))
    //         .map((d) => (
    //             <Option key={d.id} value={d.value}>
    //                 {d.text}
    //             </Option>
    //         )),
    // );
    return (
        <PubModal
            title={type === 'add' ? '新增' : '编辑'}
            visible={visible}
            onOk={onOk}
            onCancel={cancel}
        >
            <Form
                form={form}
                wrapperCol={{
                    span: 11,
                }}
                labelCol={{
                    span: 5,
                    offset: 3,
                }}
            >
                <Form.Item
                    name="type"
                    label="任务类型"
                    rules={[
                        {
                            required: true,
                            message: '请选择任务类型',
                        },
                    ]}
                >
                    <Select>
                        {typelist.map((item) => (
                            <Option value={item.value} key={item.value}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="taskName"
                    label="任务名称"
                    rules={[
                        {
                            required: true,
                            message: '请填写任务名称',
                        },
                    ]}
                >
                    <Input placeholder="请输入任务名称" />
                </Form.Item>
                <Form.Item
                    name="priority"
                    label="任务优先级"
                    rules={[
                        {
                            required: true,
                            message: '请选择任务优先级',
                        },
                    ]}
                >
                    <Select>
                        <Option value="重要且紧急" key="重要且紧急">
                            重要且紧急
                        </Option>
                        <Option value="不重要且紧急" key="不重要且紧急">
                            不重要且紧急
                        </Option>
                        <Option value="重要且不紧急" key="重要且不紧急">
                            重要且不紧急
                        </Option>
                        <Option value="不重要且不紧急" key="不重要且不紧急">
                            不重要且不紧急
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="scheduledStartDate"
                    label="预计开始时间"
                    style={{ marginBottom: 0 }}
                    rules={[
                        {
                            required: true,
                            message: '请选择预计开始时间',
                        },
                    ]}
                >
                    <Form.Item
                        name="scheduledStartDate"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <DatePicker placeholder="开始时间" format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        name="startSchedulePeriod"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            marginLeft: '16px',
                        }}
                    >
                        <Select>
                            <Option value="上午" key="上午">
                                上午
                            </Option>
                            <Option value="下午" key="下午">
                                下午
                            </Option>
                            <Option value="晚上" key="晚上">
                                晚上
                            </Option>
                        </Select>
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    label="预计结束时间"
                    name="scheduledEndDate"
                    style={{ marginBottom: 0 }}
                    rules={[
                        {
                            required: true,
                            message: '请选择预计结束时间',
                        },
                    ]}
                >
                    <Form.Item
                        name="scheduledEndDate"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <DatePicker placeholder="结束时间" format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        name="endSchedulePeriod"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            marginLeft: '16px',
                        }}
                    >
                        <Select>
                            <Option value="上午" key="上午">
                                上午
                            </Option>
                            <Option value="下午" key="下午">
                                下午
                            </Option>
                            <Option value="晚上" key="晚上">
                                晚上
                            </Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    label="计划工作量"
                    name="estimateWorkTime"
                    rules={[
                        {
                            required: true,
                            message: '请填写计划工作量',
                        },
                    ]}
                >
                    <Input suffix="人日" />
                </Form.Item>
                <Form.Item
                    name="executorId"
                    label="执行人"
                    rules={[
                        {
                            required: true,
                            message: '请填写执行人',
                        },
                    ]}
                >
                    <CmFuzzySearch
                        name="executorId"
                        form={form}
                        showValue={type === 'edit' ? nowRecord.executorId.toString() : ''}
                        showLabel={type === 'edit' ? nowRecord.executorName : ''}
                    />
                </Form.Item>
                <Form.Item
                    name="review"
                    label="是否专家评审"
                    rules={[
                        {
                            required: true,
                            message: '请选择是否专家评审',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="reviewExpertId" label="专家评审人">
                    <CmFuzzySearch
                        name="reviewExpertId"
                        form={form}
                        showValue={type === 'edit' ? nowRecord.reviewExpertId.toString() : ''}
                        showLabel={type === 'edit' ? nowRecord.reviewExpertName : ''}
                    />
                </Form.Item>
            </Form>
        </PubModal>
    );
};
AddTaskModal.propTypes = {
    visible: PropTypes.bool,
    cancel: PropTypes.func,
    nowRecord: PropTypes.object,
    type: PropTypes.string,
    rxInfo: PropTypes.object,
    refresh: PropTypes.func,
};

export default AddTaskModal;
