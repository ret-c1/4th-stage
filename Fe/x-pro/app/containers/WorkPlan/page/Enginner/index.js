import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
// import { Form } from 'antd';
import { ScCard } from '../../styled';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';

const EnginnerPage = () => {
    console.log('工程师 - 工作计划');
    return <ScCard>工程师 - 工作计划</ScCard>;
};

// EnginnerPage.propTypes = {
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

export default compose(withConnect, memo)(EnginnerPage);
