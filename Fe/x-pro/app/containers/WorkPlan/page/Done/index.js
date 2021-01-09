import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Result, Button, Popconfirm } from 'antd';
import { ScCard } from '../../styled';
import { searchParams } from '../../../../utils/searchParams';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';

const DonePage = () => {
    console.log('工程师 - 任务执行完成页');
    // 0 保存成功 1 任务完成
    const history = useHistory();
    const [status, setStatus] = useState(() => {
        const param = searchParams();
        return Number(param.status);
    });
    const onCompeleteMission = () => {
        setStatus(0);
    };
    return (
        <>
            <ScCard style={{ height: '80vh' }}>
                {status === 0 && (
                    <Result
                        status="success"
                        title="任务已完成"
                        subTitle="已提交4份报告，143个漏洞"
                        extra={[
                            <Button key="detail">查看详情</Button>,
                            <Button onClick={() => history.goBack()} key="back">
                                返回
                            </Button>,
                        ]}
                    ></Result>
                )}
                {status === 1 && (
                    <Result
                        status="success"
                        title="保存成功"
                        subTitle={
                            <p>
                                成功导入4份报告，143个漏洞
                                <br />
                                如该任务已执行完毕，请点击下方“完成任务”按钮结束任务；也可后续通过
                                <br />
                                工作计划列表或任务管理列表的操作栏“完成任务”按钮结束任务。
                            </p>
                        }
                        extra={[
                            <Popconfirm
                                key="done"
                                title={
                                    <p>
                                        点击“完成任务”后将无法再补充或修改
                                        <br />
                                        任务执行信息，确定要完成任务吗？
                                    </p>
                                }
                                okText="确定"
                                cancelText="取消"
                                onConfirm={onCompeleteMission}
                            >
                                <Button type="primary">完成任务</Button>
                            </Popconfirm>,
                            <Button onClick={() => history.goBack()} key="back">
                                返回工作台
                            </Button>,
                        ]}
                    ></Result>
                )}
            </ScCard>
        </>
    );
};

// DonePage.propTypes = {
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

export default compose(withConnect, memo)(DonePage);
