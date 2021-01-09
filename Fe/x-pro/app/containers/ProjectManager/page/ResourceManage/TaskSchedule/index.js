import React, { useState, useEffect } from 'react';
import {
    PageHeader,
    Descriptions,
    Card,
    Row,
    Col,
    Button,
    Form,
    DatePicker,
    Input,
    Select,
    Tooltip,
    Modal,
    message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import ScheduleIcon from '@assets/images/scheduleIcon.png';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import WeekPlan from '../component/WeekPlan';
import { ScModalSubmit } from '../style';
import {
    getResourceRecord,
    getProjectDetail,
    getProjectSchedule,
    savePlan,
    getPlanType,
    getDepartAllPeople,
    getRelationPlans,
} from '../api';

const { Option } = Select;
let id = 0;
// 去重
const distinct = (arr) =>
    arr.sort().reduce((init, current) => {
        if (init.length === 0 || init[init.length - 1].name !== current.name) {
            init.push(current);
        }
        return init;
    }, []);
const TaskSchedule = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const recordId = parseInt(searchParams().id, 10);
    const projectId = parseInt(searchParams().projectId, 10);
    const departId = parseInt(searchParams().departId, 10);
    const startDate = parseInt(searchParams().startDate, 10);
    const endDate = parseInt(searchParams().endDate, 10);
    const { departName } = searchParams();
    const [isEditable, changeEditable] = useState(false);
    const [projectDetail, changeProjectDetail] = useState({});
    const [resourceRecord, changeResourceRecord] = useState({});
    const [relationDetail, getRelationDetail] = useState({});
    const [projectSchedule, changeProjectSchedule] = useState({});
    const [planType, changePlanType] = useState([]);
    const [keys, setKeys] = useState([0]);
    const [executor, setExecutor] = useState([]);
    const [scheduleParams, setScheduleParams] = useState({
        offset: 0,
        limit: 20,
        param: {
            resourceApplyId: recordId,
            projectId,
            startDate,
            endDate,
        },
    });

    useEffect(() => {
        // 根据search判断是查看还是可编辑状态
        changeEditable(history.location.search.indexOf('edit') !== -1);
        // 获取当前组织下所有人员列表，用于左侧操作栏执行人和评审人的选择
        getDepartAllPeople({
            limit: 1000,
            offset: 0,
            param: { departId },
        }).then((res) => {
            const executorList = [];
            if (res.code === 200 && res.data.records && res.data.records.length > 0) {
                res.data.records.forEach((item) => {
                    executorList.push({
                        name: item.name,
                        uid: item.uid,
                        departType: item.departType,
                        departId: item.departId,
                    });
                });
            }
            setExecutor(distinct(executorList));
        });
        // 获取任务类型，左侧操作栏选项
        getPlanType({ name: '' }).then((res) => {
            if (res.code === 200) {
                changePlanType(res.data);
            }
        });
        // 获取资源关联计划记录，查看左侧操作栏内容，展示最近一条的记录，ps：与产品确认过
        getRelationPlans({ resourceApplyId: recordId }).then((res) => {
            if (res.code === 200 && res.data.length > 0) {
                getRelationDetail(res.data[0]);
                if (history.location.search.indexOf('edit') !== -1) {
                    form.setFieldsValue({
                        type: res.data[0].type,
                        taskName: res.data[0].taskName,
                        executorId: res.data[0].executorId,
                        reviewExpertId: res.data[0].reviewExpertId,
                    });
                    if (res.data[0].startScheduleDate || res.data[0].endScheduleDate) {
                        setKeys([0, 1]);
                        form.setFieldsValue({
                            [`startScheduleDate[0]`]:
                                res.data[0].startScheduleDate ||
                                moment(res.data[0].endScheduleDate),
                            [`startSchedulePeriod[0]`]:
                                res.data[0].startSchedulePeriod || res.data[0].endSchedulePeriod,
                        });
                    }
                    if (res.data[0].startScheduleDate && res.data[0].endScheduleDate) {
                        setKeys([0, 1, 2]);
                        form.setFieldsValue({
                            [`startScheduleDate[0]`]: moment(res.data[0].startScheduleDate),
                            [`startScheduleDate[1]`]: moment(res.data[0].endScheduleDate),
                            [`startSchedulePeriod[0]`]: res.data[0].startSchedulePeriod,
                            [`startSchedulePeriod[1]`]: res.data[0].endSchedulePeriod,
                        });
                    }
                }
            }
        });
        // 获取项目详情，头部信息栏
        getProjectDetail({ id: projectId }).then((res) => {
            if (res.code === 200) {
                changeProjectDetail(res.data);
            }
        });
        return () => {
            form.resetFields();
        };
    }, []);

    useEffect(() => {
        // 资源申请记录和，排期计划表
        getResourceRecord({
            id: recordId,
        }).then((res) => {
            if (res.code === 200) {
                changeResourceRecord(res.data);
                getProjectSchedule(scheduleParams).then((res1) => {
                    if (res1.code === 200) {
                        changeProjectSchedule(res1.data);
                    }
                });
            }
        });
    }, [scheduleParams]);

    const onFinish = (values) => {
        const planResourceSchedules = [];
        let groupId;
        executor.forEach((item) => {
            if (item.uid === values.executorId) {
                groupId = item.departId;
            }
        });
        keys.forEach((item) => {
            planResourceSchedules.push({
                scheduleDate: parseInt(
                    moment(values[`startScheduleDate[${item}]`]).format('x'),
                    10,
                ),
                schedulePeriod: values[`startSchedulePeriod[${item}]`],
                groupId,
            });
        });
        const records = {
            taskName: values.taskName,
            departId: parseInt(departId, 10),
            projectId: parseInt(projectId, 10),
            type: parseInt(values.type, 10),
            executorId: values.executorId,
            reviewExpertId: values.reviewExpertId,
            managerId: projectDetail && projectDetail.managerId,
            planResourceSchedules,
        };
        savePlan(records).then((res) => {
            if (res.code === 200) {
                Modal.success({
                    content: '工作计划已提交成功',
                    onOk() {
                        form.setFieldsValue(records);
                        changeEditable(false);
                        // 提交成功之后刷新
                        // 获取项目详情，头部信息栏
                        getProjectDetail({ id: projectId }).then((res1) => {
                            if (res1.code === 200) {
                                changeProjectDetail(res1.data);
                            }
                        });
                        // 资源排期所关联的计划列表
                        getRelationPlans({ resourceApplyId: recordId }).then((res1) => {
                            if (res1.code === 200 && res1.data.length > 0) {
                                getRelationDetail(res1.data[0]);
                            }
                        });
                        // 资源申请记录和排期计划表
                        getResourceRecord({
                            id: recordId,
                        }).then((res1) => {
                            if (res1.code === 200) {
                                changeResourceRecord(res1.data);
                                getProjectSchedule(scheduleParams).then((res2) => {
                                    if (res2.code === 200) {
                                        changeProjectSchedule(res2.data);
                                    }
                                });
                            }
                        });
                    },
                });
            } else {
                message.error(res.data || res.message);
            }
        });
    };

    const pageChange = (page, pageSize) => {
        setScheduleParams({ ...scheduleParams, offset: (page - 1) * pageSize });
    };
    function disabledDate(current) {
        return (
            current < moment(resourceRecord && resourceRecord.startScheduleDate) ||
            current > moment(resourceRecord && resourceRecord.endScheduleDate).endOf('day')
        );
    }
    return (
        <>
            <PageHeader
                style={{ background: '#ffffff' }}
                title={`项目名称：${projectDetail ? projectDetail.projectName : ''}`}
                className="site-page-header"
                avatar={{ src: ScheduleIcon }}
                extra={<Button onClick={() => history.go(-1)}>返回</Button>}
            >
                <Descriptions size="small" column={5}>
                    <Descriptions.Item label="客户名称" key="clientName">
                        {projectDetail && projectDetail.clientName}
                    </Descriptions.Item>
                    <Descriptions.Item label="客户联系方式" key="clientMobilePhone">
                        {projectDetail && projectDetail.clientMobilePhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="销售姓名" key="responsibleSeller">
                        {projectDetail && projectDetail.responsibleSeller}
                    </Descriptions.Item>
                    <Descriptions.Item label="销售联系方式" key="sellerPhone">
                        {projectDetail && projectDetail.sellerPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="申请部门" key="projectManager">
                        {departName}
                    </Descriptions.Item>
                    <Descriptions.Item label="项目成员" key="users">
                        {projectDetail &&
                            projectDetail.users &&
                            projectDetail.users.length > 0 &&
                            projectDetail.users.map((item) => (
                                <span key={item.id}>{item.name}</span>
                            ))}
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Card style={{ margin: 30 }}>
                <Row>
                    <Col
                        span={6}
                        style={{
                            borderRight: '1px solid  rgba(0,0,0,0.09)',
                            paddingRight: '10px',
                            transform: 'translate(0,0)',
                        }}
                    >
                        {history.location.search.indexOf('edit') !== -1 ? (
                            <Form
                                form={form}
                                name="application"
                                autoComplete="off"
                                onFinish={onFinish}
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 20 }}
                                layout="vertical"
                            >
                                <Form.Item
                                    name="type"
                                    label="任务类型"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择任务类型!',
                                        },
                                    ]}
                                >
                                    <Select showSearch>
                                        {planType.length > 0 &&
                                            planType.map((item) => (
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
                                            message: '请输入任务名称!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="executorId"
                                    label="执行人"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入执行人!',
                                        },
                                    ]}
                                >
                                    <Select showSearch>
                                        {executor.map((item) => (
                                            <Option value={item.uid} key={item.uid}>
                                                {`${item.name}(${item.departType})`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="startScheduleDate[0]"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择执行时间!',
                                        },
                                    ]}
                                    label={
                                        <>
                                            执行时间
                                            <Tooltip
                                                title={() => (
                                                    <>
                                                        <div>上午：9:00-13:00</div>
                                                        <div>下午：13:00-18:00</div>
                                                        <div>晚上：18:00-24:00</div>
                                                    </>
                                                )}
                                            >
                                                <InfoCircleOutlined />
                                            </Tooltip>
                                        </>
                                    }
                                >
                                    {keys.map((item) => (
                                        <Row justify="space-between" key={item}>
                                            <Col span={22}>
                                                <Form.Item>
                                                    <Row justify="space-between">
                                                        <Col span={10}>
                                                            <Form.Item
                                                                name={`startScheduleDate[${item}]`}
                                                            >
                                                                <DatePicker
                                                                    locale={locale}
                                                                    disabledDate={disabledDate}
                                                                    format="YYYY-MM-DD"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={10}>
                                                            <Form.Item
                                                                name={`startSchedulePeriod[${item}]`}
                                                            >
                                                                <Select>
                                                                    <Option value="上午">
                                                                        上午
                                                                    </Option>
                                                                    <Option value="下午">
                                                                        下午
                                                                    </Option>
                                                                    <Option value="晚上">
                                                                        晚上
                                                                    </Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                {keys.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() =>
                                                            setKeys(
                                                                keys.filter((key) => key !== item),
                                                            )
                                                        }
                                                    />
                                                ) : null}
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                let newKeys = keys;
                                                newKeys = newKeys.concat((id += 1));
                                                setKeys(newKeys);
                                            }}
                                            style={{ width: '100%' }}
                                        >
                                            <PlusOutlined /> 添加执行时间
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item
                                    name="reviewExpertId"
                                    label="评审人"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请选择评审人!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        notFoundContent={null}
                                    >
                                        {executor.map((item) => (
                                            <Option value={item.uid} key={item.uid}>
                                                {`${item.name}(${item.departType})`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="remark" label="备注">
                                    <Input.TextArea
                                        placeholder="验收标准，任务目标，特殊要求等信息"
                                        style={{ marginBottom: '60px' }}
                                    />
                                </Form.Item>
                                {isEditable && (
                                    <ScModalSubmit>
                                        <Form.Item layout="inline" wrapperCol={{ offset: 8 }}>
                                            <Button
                                                style={{ marginRight: '10px' }}
                                                onClick={() => changeEditable(!isEditable)}
                                            >
                                                取消
                                            </Button>
                                            {isEditable && (
                                                <Button type="primary" htmlType="submit">
                                                    提交
                                                </Button>
                                            )}
                                        </Form.Item>
                                    </ScModalSubmit>
                                )}
                            </Form>
                        ) : (
                            <Descriptions column={1} layout="vertical">
                                <Descriptions.Item label="任务类型" key="type">
                                    {relationDetail &&
                                        relationDetail.planType &&
                                        relationDetail.planType.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="任务名称" key="taskName">
                                    {relationDetail && relationDetail.taskName}
                                </Descriptions.Item>
                                <Descriptions.Item label="执行时间" key="estimateWorkTime">
                                    {relationDetail &&
                                        relationDetail.scheduledStartDate &&
                                        moment(relationDetail.scheduledStartDate).format(
                                            'YYYY-MM-DD',
                                        )}
                                    {relationDetail && relationDetail.startSchedulePeriod}
                                    {relationDetail && relationDetail.scheduledEndDate && '~'}
                                    {relationDetail &&
                                        relationDetail.scheduledEndDate &&
                                        moment(relationDetail.scheduledEndDate).format(
                                            'YYYY-MM-DD',
                                        )}
                                    {relationDetail && relationDetail.endSchedulePeriod}
                                </Descriptions.Item>
                                <Descriptions.Item label="执行人" key="executorName">
                                    {relationDetail && relationDetail.executorName}
                                </Descriptions.Item>
                                <Descriptions.Item label="评审人" key="reviewExpertName">
                                    {relationDetail && relationDetail.reviewExpertName}
                                </Descriptions.Item>
                                <Descriptions.Item label="备注" key="remark">
                                    {relationDetail && relationDetail.remark}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                    </Col>
                    <Col span={18} style={{ paddingLeft: 10 }}>
                        <PageHeader
                            style={{ background: '#ffffff' }}
                            title="排期信息"
                            className="site-page-header"
                        >
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="预计开始时间" key="startScheduleDate">
                                    {resourceRecord &&
                                        resourceRecord.startScheduleDate &&
                                        moment(resourceRecord.startScheduleDate).format(
                                            'YYYY-MM-DD',
                                        )}
                                    {resourceRecord && resourceRecord.startSchedulePeriod}
                                </Descriptions.Item>
                                <Descriptions.Item label="预计结束时间" key="预计结束时间">
                                    {resourceRecord &&
                                        resourceRecord.endScheduleDate &&
                                        moment(resourceRecord.endScheduleDate).format('YYYY-MM-DD')}
                                    {resourceRecord && resourceRecord.endSchedulePeriod}
                                </Descriptions.Item>
                                <Descriptions.Item label="参与人数" key="参与人数">
                                    {resourceRecord && resourceRecord.requirePeoples}人
                                </Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                        <WeekPlan
                            time={scheduleParams}
                            source="task"
                            dataSource={projectSchedule.records || []}
                            pagination={{
                                pageSize: 20,
                                onChange: pageChange,
                                total: projectSchedule.total || 0,
                                showSizeChanger: false,
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
};
export default TaskSchedule;
