import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';
const { TabPane } = Tabs;

const ScTabs = styled(Tabs)`
    &.ant-tabs {
        .ant-tabs-nav {
            padding: 0 30px;
        }
    }
`;

const ResourceTabs = (props) => {
    const { keys, rxRole } = props;
    const history = useHistory();
    const { id } = searchParams();

    const callback = (val) => {
        if (val === '1') {
            history.push(`/project/task?id=${id}`);
        } else {
            history.push(`/project/resourcelist?id=${id}`);
        }
    };
    return (
        <ScTabs defaultActiveKey={keys} onChange={callback} animated={false}>
            <TabPane tab="工作计划" key="1" />
            {rxRole.indexOf('项目经理') > -1 ? <TabPane tab="资源排期" key="2" /> : null}
        </ScTabs>
    );
};

ResourceTabs.propTypes = {
    keys: PropTypes.string,
    rxRole: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ResourceTabs);
