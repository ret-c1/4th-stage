import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Modal } from 'antd';
import moment from 'moment';

/**
 *
 * @param {*} props
 * source 来源，区分来源跳转不同的界面
 */

const WorkModal = (props) => {
    const { handleCancel, workObj, isShow } = props;

    return (
        <Modal
            getContainer={false}
            title="查看工作量记录"
            visible={isShow}
            width={650}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="work"
                autoComplete="off"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                style={{ paddingBottom: '30px' }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label="日期">
                            {workObj &&
                                workObj.createTime &&
                                moment(workObj.createTime).format('YYYY-MM-DD')}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="执行人">{workObj && workObj.username}</Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="员工性质">{workObj && workObj.positionType}</Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="项目名">{workObj && workObj.projectName}</Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="任务类型">{workObj && workObj.planTypeName}</Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="任务名">{workObj && workObj.taskName}</Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="子任务名">{workObj && workObj.subTaskName}</Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="工时">
                            {workObj && workObj.realTime && (workObj.realTime / 3600000).toFixed(2)}
                            小时
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="工作内容" labelCol={{ span: 4 }}>
                            {workObj && workObj.content}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

WorkModal.propTypes = {
    handleCancel: PropTypes.func,
    workObj: PropTypes.object,
    isShow: PropTypes.bool,
    // rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(WorkModal);
