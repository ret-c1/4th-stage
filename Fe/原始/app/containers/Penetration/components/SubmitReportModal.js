import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Input, Form, Button, Row, Col } from 'antd';
import { getAddWork } from '../page/api';

const SubmitReportModal = (props) => {
    const { itemData, func } = props;
    const history = useHistory();
    const reportStatu = history.location.search.split('&&')[0].split('=')[1];
    const time = moment(new Date().valueOf()).format('YYYY-MM-DD hh:mm:ss');
    const formFinish = (value) => {
        const formdata = {
            projectId: itemData.id,
            planTypeId: 60,
            planTypeName: '渗透测试',
            date: time,
            projectName: itemData.projectName,
            taskName: '渗透测试任务',
            subTaskName: '测试及报告编写',
            name: itemData.projectManager,
            realTime: value.realTime * 3600000,
        };
        getAddWork({ ...value, ...formdata }).then((res) => {
            if (res.code === 200) {
                console.log('添加工作量成功');
                func();
                if (reportStatu === 'edit') {
                    history.push('/penetration/list');
                }
            } else {
                console.log('获取数据失败');
            }
        });
    };

    return (
        <>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
                onFinish={formFinish}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="执行人：" name="name">
                            {itemData.projectManager}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="记录日期：" name="createTime">
                            {time}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="项目名：" name="taskName">
                            {itemData.projectName}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="任务类型：" name="planTypeName">
                            <span>渗透测试</span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="任务名：" name="taskName">
                            <span>渗透测试任务</span>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="子任务名：" name="subTaskName">
                            <span>测试及报告编写</span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="工时："
                            name="realTime"
                            rules={[{ required: true, message: '请输入工时!' }]}
                        >
                            <Input placeholder="请输入时间" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Row style={{ marginLeft: '40px' }}>
                        <Col>
                            <Button type="primary" style={{ width: '510px' }} htmlType="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
};
export default SubmitReportModal;
SubmitReportModal.propTypes = {
    itemData: PropTypes.object,
    func: PropTypes.func,
};
