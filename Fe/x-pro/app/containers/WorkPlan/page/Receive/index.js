import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Card, Descriptions, Row, Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { ScCard } from '../../styled';
import { TopDescriptions } from './styled';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';
import PlanList from '../../componments/PlanList';
const ReceivePage = () => {
    console.log('工程师 - 接受工作计划');
    const history = useHistory();
    return (
        <>
            <Card>
                <TopDescriptions
                    title={
                        <>
                            <FileSearchOutlined />
                            <h1>金马教育网</h1>
                        </>
                    }
                    column={4}
                >
                    <Descriptions.Item label="客户名称">金马教育网</Descriptions.Item>
                    <Descriptions.Item label="服务名称">某某服务</Descriptions.Item>
                    <Descriptions.Item label="服务开始时间">2020-02-02</Descriptions.Item>
                    <Descriptions.Item label="服务结束">2020-02-02</Descriptions.Item>
                    <Descriptions.Item label="销售部门">金马教育网</Descriptions.Item>
                    <Descriptions.Item label="销售负责人">金马教育网</Descriptions.Item>
                    <Descriptions.Item label="销售联系电话">金马教育网</Descriptions.Item>
                </TopDescriptions>
            </Card>
            <ScCard title="任务列表">
                <PlanList />
                <Row>
                    <Button
                        onClick={() => history.push('/workplan/vulscan')}
                        style={{ width: '100%', margin: '10px 0' }}
                        type="primary"
                    >
                        开始执行
                    </Button>
                </Row>
                <Row>
                    <Button style={{ width: '100%' }}>取消</Button>
                </Row>
            </ScCard>
        </>
    );
};

// ReceivePage.propTypes = {
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

export default compose(withConnect, memo)(ReceivePage);
