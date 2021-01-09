import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Row, Col, Card, Button, Drawer, Descriptions } from 'antd';
import AssetDrawer from './AssetDrawer';

const PlanSubTask = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <Card style={{ background: 'rgba(0,0,0,0.02)' }}>
            <Row style={{ paddingLeft: '56px' }}>
                <Col span={7}>
                    <p style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 16 }}>主机扫描</p>
                    <p style={{ marginTop: 24 }}>备注：</p>
                </Col>
                <Col span={4}>
                    <p>2020-06-01 12：00</p>
                    <p>~</p>
                    <p>2020-06-02 12：00</p>
                </Col>
                <Col
                    span={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    <Button type="text">XXX</Button>
                    <Button type="link">全部4人</Button>
                </Col>
                <Col span={2}>2人日</Col>
                <Col
                    span={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Button type="text">534个</Button>
                    <Button type="link">详情</Button>
                </Col>
                <Col span={2}>已完成</Col>
                <Col span={3}>
                    <Button onClick={showDrawer}>查看</Button>
                </Col>
            </Row>
            <Drawer
                title="关联资产"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={800}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={onClose} type="primary">
                            提交
                        </Button>
                    </div>
                }
            >
                <div
                    style={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        margin: '-25px 0 10px 0',
                        padding: '0 -20px',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Descriptions column={2}>
                        <Descriptions.Item label="任务类型">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="任务编号">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="执行人">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="执行起始时间">Zhou Maomao</Descriptions.Item>
                    </Descriptions>
                    <Button type="link">收起</Button>
                </div>
                <AssetDrawer />
            </Drawer>
        </Card>
    );
};

// IndexPage.propTypes = {
//     rxRole: PropTypes.array,
// };

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxChecked: state.intelligence.checked,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     rxTabelcheck: (id) => {
//         dispatch(tabelcheckAction(id));
//     },
//     rxTabelcheckall: (ids) => {
//         dispatch(tabelallcheckAction(ids));
//     },
// });

const withConnect = connect(null, null);

export default compose(withConnect, memo)(PlanSubTask);
