import React, { useEffect, useState } from 'react';
import {
    PageHeader,
    Descriptions,
    Card,
    Row,
    Col,
    Button,
    Form,
    DatePicker,
    Tooltip,
    Input,
    Select,
    Modal,
    message,
} from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import ScheduleIcon from '@assets/images/scheduleIcon.png';
import { useHistory } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import CalendarCom from '../../components/calendarCom';
import { ScModalSubmit } from '../../style';
import { saveSchedule, getProjectDetail, getScheduleDetail, getDepartAllPeople } from '../../api';

const { Option } = Select;
let id = 0;
const TaskSchedule = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { state } = history.location;
    const [isEditable, changeIsEditable] = useState(false);
    const [submitStatus, changeSubmitStatus] = useState(0);
    const [projectDetail, changeProjectDetail] = useState({});
    const [scheduleDetail, changeScheduleDetail] = useState({});
    const [formValues, setFormValues] = useState({});
    const [executor, setExecutor] = useState([]);
    const [keys, setKeys] = useState([0]);
    const [refreshSchedule, setRefreshSchedule] = useState(false);
    // 去重
    const distinct = (arr) =>
        arr.sort().reduce((init, current) => {
            if (init.length === 0 || init[init.length - 1].name !== current.name) {
                init.push(current);
            }
            return init;
        }, []);

    useEffect(() => {
        if (state) {
            if (state.edit) {
                changeIsEditable(true);
            } else {
                changeIsEditable(false);
            }
            getProjectDetail({ id: state.projectId }).then((res) => {
                if (res.code === 200) {
                    changeProjectDetail(res.data);
                }
            });
            getDepartAllPeople({
                limit: 1000,
                offset: 0,
                param: { departId: state.departId },
            }).then((res) => {
                const executorList = [];
                if (res.code === 200) {
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

            getScheduleDetail({ id: state && state.id }).then((res) => {
                if (res.code === 200) {
                    changeScheduleDetail(res.data[0]);
                }
            });
        }
    }, [state]);

    useEffect(() => {
        if (isEditable && scheduleDetail) {
            // 备注过多暂时不加
            form.setFieldsValue({
                clientPlace: scheduleDetail.clientPlace,
                [`executeDate[0]`]:
                    scheduleDetail.executeDate && moment(scheduleDetail.executeDate),
                [`executePeriod[0]`]: scheduleDetail.executePeriod,
                executors: [scheduleDetail.executorUid],
            });
            if (scheduleDetail.executorUid) {
                const executorInfos = [];
                executor.forEach((item) => {
                    if (item.uid === scheduleDetail.executorUid) {
                        executorInfos.push({
                            executorName: item.name,
                            executorUid: scheduleDetail.executorUid,
                        });
                    }
                });
                setFormValues({
                    executeDates: [
                        scheduleDetail.executeDate && moment(scheduleDetail.executeDate),
                    ],
                    executePeriods: [scheduleDetail.executePeriod],
                    executorInfos,
                });
            }
        }
        return () => {
            form.resetFields();
        };
    }, [isEditable, scheduleDetail]);

    const onFinish = (values) => {
        const executors = [];
        const executorDates = [];

        values.executors.forEach((item) => {
            executor.forEach((item1) => {
                if (item1.uid === item) {
                    executors.push({
                        groupId: item1.departId,
                        executorUid: item,
                    });
                }
            });
        });
        keys.forEach((item) => {
            executorDates.push({
                executeDate: parseInt(moment(values[`executeDate[${item}]`]).format('x'), 10),
                executePeriod: values[`executePeriod[${item}]`],
            });
        });
        const basicParam = {
            resourceApplyId: parseInt(state.id, 10),
            departId: parseInt(state.departId, 10),
            projectId: parseInt(state.projectId, 10),
            clientPlace: values.clientPlace,
            remark: values.remark,
            executors,
            executorDates,
        };
        // 调配时间--项目排期提交时间 moment().format('x')
        saveSchedule({ ...basicParam }).then((res1) => {
            if (res1.code === 200) {
                Modal.success({
                    content: '工作计划已提交成功',
                    onOk() {
                        form.resetFields();
                        // 提交刷新
                        setRefreshSchedule(true);
                        changeSubmitStatus(0);
                        changeIsEditable(false);
                    },
                });
            } else {
                message.error(res1.data || res1.message);
            }
        });
    };
    const setManDay = (changedValues, allValues) => {
        const executorInfos = [];
        if (allValues.executors) {
            allValues.executors.forEach((item) => {
                executor.forEach((item1) => {
                    if (item1.uid === item) {
                        executorInfos.push({
                            executorName: item1.name,
                            executorUid: item,
                        });
                    }
                });
            });
        }
        const newFields = {
            executeDates: [],
            executePeriods: [],
        };
        if (allValues[`executeDate[0]`]) {
            keys.forEach((item) => {
                newFields.executeDates.push(allValues[`executeDate[${item}]`]);
                newFields.executePeriods.push(allValues[`executePeriod[${item}]`]);
            });
        }
        setFormValues({ ...newFields, executorInfos });
    };

    return (
        <>
            <PageHeader
                style={{ background: '#ffffff' }}
                title={`项目名称：${projectDetail.projectName || ''}`}
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
                        {state && state.departName}
                    </Descriptions.Item>
                    <Descriptions.Item label="项目成员" key="users">
                        {projectDetail &&
                            projectDetail.users &&
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
                            borderRight: '1px solid rgba(0,0,0,0.09)',
                            transform: 'translate(0,0)',
                        }}
                    >
                        <Form
                            form={form}
                            name="application"
                            autoComplete="off"
                            onFinish={onFinish}
                            layout="vertical"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 20 }}
                            onValuesChange={(changedValues, allValues) =>
                                setManDay(changedValues, allValues)
                            }
                        >
                            <Form.Item name="startScheduleTime" label="预计开始时间">
                                {state && moment(state.startScheduleDate).format('YYYY-MM-DD')}
                                {state && state.startSchedulePeriod}
                            </Form.Item>
                            <Form.Item name="endScheduleTime" label="预计结束时间">
                                {state && moment(state.endScheduleDate).format('YYYY-MM-DD')}
                                {state && state.endSchedulePeriod}
                            </Form.Item>
                            <Form.Item name="requirePeoples" label="预计人数">
                                {state && state.requirePeoples}
                            </Form.Item>
                            <Form.Item name="requireDays" label="预计天数">
                                {state && state.requireDays}
                            </Form.Item>
                            <Form.Item
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
                                {isEditable ? (
                                    <>
                                        {keys.map((item) => (
                                            <Form.Item key={item}>
                                                <Row justify="space-between">
                                                    <Col span={22}>
                                                        <Row justify="space-between">
                                                            <Col span={10}>
                                                                <Form.Item
                                                                    name={`executeDate[${item}]`}
                                                                >
                                                                    <DatePicker
                                                                        locale={locale}
                                                                        format="YYYY-MM-DD"
                                                                    />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={10}>
                                                                <Form.Item
                                                                    name={`executePeriod[${item}]`}
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
                                                    </Col>
                                                    <Col span={2}>
                                                        {keys.length > 1 ? (
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() =>
                                                                    setKeys(
                                                                        keys.filter(
                                                                            (key) => key !== item,
                                                                        ),
                                                                    )
                                                                }
                                                            />
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                            </Form.Item>
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
                                    </>
                                ) : (
                                    <span>
                                        {scheduleDetail &&
                                            moment(scheduleDetail.executeDate).format('YYYY-MM-DD')}
                                        {scheduleDetail && scheduleDetail.executePeriod}
                                    </span>
                                )}
                            </Form.Item>
                            <Form.Item name="executors" label="执行人">
                                {isEditable ? (
                                    <Select showSearch mode="tags">
                                        {executor.map((item) => (
                                            <Option value={item.uid} key={item.uid}>
                                                {`${item.name}(${item.departType})`}
                                            </Option>
                                        ))}
                                    </Select>
                                ) : (
                                    <span>{scheduleDetail && scheduleDetail.executorName}</span>
                                )}
                            </Form.Item>
                            <Form.Item name="clientPlace" label="客户地点">
                                {isEditable ? (
                                    <Input />
                                ) : (
                                    <span>{scheduleDetail && scheduleDetail.clientPlace}</span>
                                )}
                            </Form.Item>
                            <Form.Item name="remark" label="备注">
                                {isEditable ? (
                                    <Input.TextArea
                                        placeholder="验收标准，任务目标，特殊要求等信息"
                                        style={{ marginBottom: '60px' }}
                                    />
                                ) : (
                                    <span style={{ marginBottom: '60px' }}>
                                        {scheduleDetail && scheduleDetail.remark}
                                    </span>
                                )}
                            </Form.Item>
                            {isEditable && submitStatus === 0 && (
                                <ScModalSubmit>
                                    <Form.Item layout="inline" wrapperCol={{ offset: 8 }}>
                                        <Button
                                            style={{ marginRight: '10px' }}
                                            onClick={() => {
                                                changeIsEditable(!isEditable);
                                                changeSubmitStatus(1);
                                            }}
                                        >
                                            取消
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Form.Item>
                                </ScModalSubmit>
                            )}
                            {!isEditable && submitStatus === 1 && (
                                <ScModalSubmit>
                                    <Form.Item layout="inline" wrapperCol={{ offset: 8 }}>
                                        <Button
                                            style={{ marginRight: '10px' }}
                                            onClick={() => {
                                                changeSubmitStatus(0);
                                                changeIsEditable(true);
                                            }}
                                        >
                                            撤销
                                        </Button>
                                        <Button type="primary" onClick={() => history.go(-1)}>
                                            继续排期
                                        </Button>
                                    </Form.Item>
                                </ScModalSubmit>
                            )}
                        </Form>
                    </Col>
                    <Col span={18}>
                        <CalendarCom
                            source="task"
                            formValues={formValues}
                            state={state}
                            refreshSchedule={refreshSchedule}
                            refreshCallback={(v) => setRefreshSchedule(v)}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
};
export default TaskSchedule;
