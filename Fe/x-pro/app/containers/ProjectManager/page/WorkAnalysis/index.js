import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tabs, Form, Input, Select, Row, Col, DatePicker, Table, Modal, Button } from 'antd';
import { ScContent, ScForm, ScButton } from '../styled';

const EditableCell = ({ editing, dataIndex, title, children }) => (
    <td>
        {editing && dataIndex === 'realTime' ? (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        ) : (
            children
        )}
    </td>
);

const { Option } = Select;
const { TabPane } = Tabs;

const WorkAnalysis = (props) => {
    const history = useHistory();
    const [formModal] = Form.useForm();
    const { rxInfo } = props;
    const [total] = useState(0);
    const [tableData] = useState([
        {
            createTime: '1992-02-24T02:39:26.626Z',
            id: 13231199,
            planTypeId: 'esse sit ea',
            planTypeName: 'sunt Duis qui eu reprehenderit',
            projectName: 'occaec',
            realTime: -98812225,
            subTaskName: 'nostrud',
            taskName: 'amet nisi',
            userId: -40212353,
            username: 'cillum anim',
        },
    ]);
    const reportName = history.location.search.split('&&')[1].split('=')[1];

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: '子任务名',
            dataIndex: 'subTaskName',
            key: 'subTaskName',
        },
        {
            title: '项目名',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '任务类型',
            dataIndex: 'planTypeName',
            key: 'planTypeName',
        },
        {
            title: '执行人',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '日期',
            dataIndex: 'executeDate',
            key: 'executeDate',
            render: (text) => <div>{text && moment(text).format('YYYY-MM-DD')}</div>,
        },
        {
            title: '工时',
            dataIndex: 'realTime',
            key: 'realTime',
            editable: true,
            render: (text) => <div>{text && (text / 3600000).toFixed(2)}</div>,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span>
                    <Button disabled type="link">
                        编辑
                    </Button>
                    <Button disabled type="link">
                        删除
                    </Button>
                </span>
            ),
        },
    ];
    return (
        <>
            <ScContent>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="工作量列表" key="1">
                        <ScForm>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="任务名称" name="taskName">
                                        <Input placeholder="请输入任务名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label=" 任务类型" name="planTypeName">
                                        <Select placeholder="请选择">
                                            <Option value="渗透测试">渗透测试</Option>
                                            <Option value="漏洞扫描">漏洞扫描</Option>
                                            <Option value="配置检查">配置检查</Option>
                                            <Option value="漏洞处置">漏洞处置</Option>
                                            <Option value="应急">应急</Option>
                                            <Option value="代码审计">代码审计</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="执行人" name="username">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="日期" name="date">
                                        <DatePicker
                                            placeholder="请输入日期"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <ScButton type="primary" htmlType="submit">
                                        查询
                                    </ScButton>
                                    <ScButton type="primary">补充工作量</ScButton>
                                </Col>
                            </Row>
                        </ScForm>
                        <Form>
                            <Table
                                size="small"
                                columns={columns}
                                dataSource={tableData}
                                pagination={{ defaultCurrent: 1, total }}
                                rowKey={(record) => record.id}
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                rowClassName="editable-row"
                            />
                        </Form>
                    </TabPane>
                    {/* <TabPane tab="工作量分析" key="2" /> */}
                </Tabs>
                <Modal title="工作量记录" width="600px" footer={null}>
                    <Form
                        name="basic"
                        form={formModal}
                        initialValues={{ remember: true }}
                        labelCol={{ span: '8' }}
                        wrapperCol={{ span: '16' }}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="执行人" name="assetName">
                                    {rxInfo.name}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="日期"
                                    name="executeDate"
                                    rules={[{ required: true, message: '请选择日期' }]}
                                >
                                    <DatePicker
                                        placeholder="请选择日期"
                                        style={{ width: '185px' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="项目名" name="belongedBusinessSystem">
                                    {reportName}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="任务类型"
                                    name="planTypeId"
                                    rules={[{ required: true, message: '请选择任务类型' }]}
                                >
                                    <Select>
                                        <Option value="60">渗透测试</Option>
                                        <Option value="61">漏洞扫描</Option>
                                        <Option value="62">配置检查</Option>
                                        <Option value="66">等级保护</Option>
                                        <Option value="64">应急任务</Option>
                                        <Option value="63">代码审计</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="任务名"
                                    name="taskName"
                                    rules={[{ required: true, message: '请输入任务名' }]}
                                >
                                    <Input placeholder="请输入任务名" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="子任务名"
                                    name="subTaskName"
                                    rules={[{ required: true, message: '请输入子任务名' }]}
                                >
                                    <Input placeholder="请输入子任务名" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="工时"
                                    name="realTime"
                                    rules={[{ required: true, message: '请输入工时' }]}
                                >
                                    <Input placeholder="请输入工时" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Row style={{ marginLeft: '40px' }}>
                                <Col>
                                    <Button
                                        type="primary"
                                        style={{ width: '510px' }}
                                        htmlType="submit"
                                    >
                                        提交
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </ScContent>
        </>
    );
};
// export default WorkAnalysis;

EditableCell.propTypes = {
    title: PropTypes.string,
    editing: PropTypes.bool,
    children: PropTypes.node,
    dataIndex: PropTypes.string,
};
WorkAnalysis.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(WorkAnalysis);
