import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import styled from 'styled-components';
import { Layout, Avatar, Menu, Dropdown, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { logoutAction } from '@containers/Login/action';

const { Header } = Layout;

const ScHeader = styled(Header)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
    z-index: 9;
`;

const ScHRight = styled.div`
    margin: 0 16px;
    & > span {
        display: inline-block;
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
        transition: all 0.3s;
    }
    & > span:hover {
        background: rgba(0, 0, 0, 0.025);
    }
`;

const ScName = styled.span`
    display: inline-block;
    vertical-align: middle;
    padding-left: 4px;
`;

const ConsoleHeader = (props) => {
    const { rxInfo, rxRole } = props;
    const history = useHistory();

    const handleLogout = () => {
        history.push('/login');
    };

    const handleCutover = () => {
        window.location.href = `${window.location.origin}/digitiz/csovapp/sitemap`;
    };
    console.log(rxInfo);
    return (
        <ScHeader>
            <div />
            <ScHRight>
                {rxRole.includes('情报专家') || rxRole.includes('运营专家') ? (
                    <Button onClick={handleCutover} icon={<SwapOutlined />}>
                        运营服务地图
                    </Button>
                ) : null}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={handleLogout}>登出</Menu.Item>
                        </Menu>
                    }
                >
                    <span>
                        <Avatar size="small" src={rxInfo.img} />
                        <ScName>{rxInfo.name}</ScName>
                    </span>
                </Dropdown>
            </ScHRight>
        </ScHeader>
    );
};

ConsoleHeader.propTypes = {
    // dispatchLogout: PropTypes.func,
    rxInfo: PropTypes.object,
    rxRole: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
    rxRole: state.global.role,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: (playload) => {
        dispatch(logoutAction(playload));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ConsoleHeader);
