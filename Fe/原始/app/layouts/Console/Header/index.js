import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Avatar, Menu, Dropdown, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { logoutAction } from '@containers/Login/action';
import { logout } from '@layouts/Main/api';

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
    const { dispatchLogout, rxInfo } = props;
    const history = useHistory();

    const handleLogout = () => {
        logout().then((res) => {
            if (res.code === 200) {
                dispatchLogout();
            }
        });
    };

    const handleCutover = () => {
        history.push('/csovapp/sitemap');
    };

    return (
        <ScHeader>
            <div />
            <ScHRight>
                <Button onClick={handleCutover} icon={<SwapOutlined />}>
                    运营服务地图
                </Button>
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
    dispatchLogout: PropTypes.func,
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLogout: (playload) => {
        dispatch(logoutAction(playload));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ConsoleHeader);
