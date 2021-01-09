import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { Tabs } from 'antd';
import styled from 'styled-components';
// import { searchParams } from '@utils/searchParams';
const { TabPane } = Tabs;

const ScTabs = styled(Tabs)`
    & .ant-tabs-bar,
    .ant-tabs-nav {
        padding: 0 30px;
        background: #ffffff;
    }
`;

const CommonTabs = (props) => {
    const { keys, rightNode, tabList = [], onCallback } = props;
    const history = useHistory();

    const callback = (activeKey) => {
        tabList.forEach((item) => {
            if (item.key === activeKey) {
                if (item.pageUrl) {
                    history.push(item.pageUrl);
                }
                if (onCallback) onCallback(activeKey);
            }
        });
    };
    return (
        <ScTabs
            onChange={callback}
            activeKey={keys}
            animated={false}
            tabBarExtraContent={rightNode || false}
        >
            {tabList.map((item) => (
                <TabPane tab={item.name} key={item.key} />
            ))}
        </ScTabs>
    );
};

CommonTabs.propTypes = {
    keys: PropTypes.string,
    rightNode: PropTypes.object,
    tabList: PropTypes.array,
    onCallback: PropTypes.func,
    // rxRole: PropTypes.array,
};

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
// });
//
// const withConnect = connect(mapStateToProps, null);
//
// export default compose(withConnect, memo)(CommonTabs);
export default CommonTabs;
