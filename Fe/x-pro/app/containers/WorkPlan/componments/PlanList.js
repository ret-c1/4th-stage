import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Divider, Row, Col, Card, Button } from 'antd';
import {
    PlusSquareOutlined,
    MinusSquareOutlined,
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons';
import PlanTask from './PlanTask';
import PlanSubTask from './PlanSubTask';
const PlanList = (props) => {
    const { isShowAction = true } = props;
    const [isShowSub, changeIsShowSub] = useState(!isShowAction);
    const [isShowTask, changeIsShowTask] = useState(true);
    return (
        <>
            <Divider />
            <Row style={{ paddingLeft: '80px' }}>
                <Col span={7}>基本信息</Col>
                <Col span={4}>预计起止时间</Col>
                <Col span={2}>执行人</Col>
                <Col span={3}>预计工作量</Col>
                <Col span={3}>资产信息</Col>
                <Col span={2}>状态</Col>
                <Col span={3}>操作</Col>
            </Row>
            <div style={{ marginBottom: 12 }}>
                <div
                    style={{
                        position: 'relative',
                        top: '45px',
                        left: '0px',
                        zIndex: 10,
                        width: 32,
                        height: 17,
                        background: 'rgba(24, 144, 255, 1)',
                        // background: 'rgba(47, 194, 91, 1)', // 复测
                        textAlign: 'center',
                        fontSize: 12,
                        color: 'rgba(255, 255, 255, 1)',
                    }}
                >
                    初测
                </div>
                <Card>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: 48 }}>
                            {isShowAction && (
                                <Button
                                    style={{ marginTop: '-5px' }}
                                    type="link"
                                    onClick={() => changeIsShowSub(!isShowSub)}
                                >
                                    {isShowSub ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                                </Button>
                            )}
                        </div>
                        <div
                            style={{
                                margin: '-1px 0 0 8px',
                                color: 'rgba(0, 0, 0, 0.85)',
                                fontSize: 16,
                            }}
                        >
                            主机扫描
                        </div>
                        {isShowAction && (
                            <Button
                                style={{ marginTop: '-5px' }}
                                type="link"
                                onClick={() => changeIsShowTask(!isShowTask)}
                            >
                                {isShowTask ? '收起' : '展开'}
                                {isShowTask ? <UpOutlined /> : <DownOutlined />}
                            </Button>
                        )}
                    </div>
                    {isShowTask && <PlanTask isShowAction={isShowAction} />}
                </Card>
                {isShowSub && <PlanSubTask />}
                {isShowSub && isShowAction && (
                    <div
                        style={{
                            position: 'relative',
                            top: '-32px',
                            left: '40%',
                            zIndex: 10,
                            width: 142,
                            height: 32,
                            // background: 'rgba(0, 0, 0, 0.02)',
                            // border: '1px solid rgba(0, 0, 0, 0.09)',
                            // borderTop: '16px solid transparent',
                            borderBottom: '27px solid rgba(0, 0, 0, 0.03)',
                            borderLeft: '16px solid transparent',
                            borderRight: '16px solid transparent',
                            paddingTop: '6px',
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'rgba(0, 0, 0, 0.65)',
                        }}
                    >
                        所有子任务
                    </div>
                )}
            </div>
        </>
    );
};

PlanList.propTypes = {
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

export default compose(withConnect, memo)(PlanList);
