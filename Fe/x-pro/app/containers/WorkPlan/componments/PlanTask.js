import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Row, Col, Button, Drawer, Tabs, Descriptions, Tag } from 'antd';
import AssetDrawer from './AssetDrawer';

const { TabPane } = Tabs;
const PlanTask = (props) => {
    const { isShowAction = true } = props;
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <Row style={{ marginTop: 5, paddingLeft: '56px' }}>
                <Col span={7}>
                    <p>客户联系人：XXX 15100008888</p>
                    <p>客户地址：</p>
                    <p>备注：</p>
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
                    <Tag>XXX</Tag>
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
                    <Button type="link" onClick={showDrawer}>
                        详情
                    </Button>
                </Col>
                <Col span={2}>
                    <div
                        style={{
                            width: 52,
                            height: 22,
                            background: 'rgba(250, 173, 20, 0.05)',
                            borderRadius: 4,
                            border: '1px solid rgba(250, 173, 20, 0.4)',
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'rgba(250, 173, 20, 1)',
                        }}
                    >
                        执行中
                    </div>
                </Col>
                {isShowAction && (
                    <Col span={2}>
                        <Button type="primary" onClick={() => history.push('/workplan/order')}>
                            添加工单
                        </Button>
                        <Button
                            style={{ marginTop: 8 }}
                            onClick={() => history.push('/workplan/edit')}
                        >
                            编辑
                        </Button>
                        <Button style={{ marginTop: 8 }}>删除</Button>
                    </Col>
                )}
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
                <Tabs type="card">
                    <TabPane tab="主机资产" key="1">
                        <AssetDrawer />
                    </TabPane>
                    <TabPane tab="数据库资产" key="2">
                        <AssetDrawer />
                    </TabPane>
                    <TabPane tab="网站资产" key="3">
                        <AssetDrawer />
                    </TabPane>
                </Tabs>
            </Drawer>
        </>
    );
};

PlanTask.propTypes = {
    isShowAction: PropTypes.bool,
};

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

export default compose(withConnect, memo)(PlanTask);
