import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { PageHeader, Select } from 'antd';
import { ScCard } from '../../styled';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';
import PM from '../PM';

const { Option } = Select;
const IndexPage = (props) => {
    const { rxRole } = props;
    return (
        <>
            <PageHeader
                ghost={false}
                title="工作计划"
                extra={
                    rxRole.includes('项目经理') && [
                        <Select key="派发任务" defaultValue="派发任务">
                            <Option value="派发任务">派发任务</Option>
                        </Select>,
                    ]
                }
            />
            <ScCard>{rxRole.includes('项目经理') && <PM />}</ScCard>
        </>
    );
};

IndexPage.propTypes = {
    rxRole: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(IndexPage);
