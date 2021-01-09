import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, BackTop, Affix, Tooltip } from 'antd';
import { SmileFilled } from '@ant-design/icons';
import styled from 'styled-components';
// import ErrorBoundary from '@components/ErrorBoundary';
import ConsoleCustomBreadcrumbs from '../../Console/CustomBreadcrumbs';
import ConsoleHeader from '../../Console/Header';
import ConsoleMenu from '../../Console/Menu';
import { getUseinfo } from '../api';
import { setGlobalConfigAction } from '../action';
import logo1 from './logo01.png';

const { Sider, Content } = Layout;

const ScContent = styled(Content)`
    min-height: calc(100vh - 64px - 48px);
`;

const ScCustom = styled.div`
    padding: 16px 24px;
    background: #fff;
    fontsize: 14px;
    line-height: 22px;
    height: 54px;
`;

const ScBackTop = styled(BackTop)`
    bottom: 100px;
    right: 25px;
`;

const ScMenu = styled.div`
    height: 100vh;
    overflow-y: scroll;
`;

const Logo = styled.div`
    width: 160px;
    height: 62px;
    background: url(${logo1});
    background-position: center;
    background-size: cover;
    margin: 30px auto;
`;

const ScFeedback = styled.div`
    position: fixed;
    z-index: 10;
    width: 40px;
    height: 40px;
    cursor: pointer;
    bottom: 160px;
    right: 25px;
`;

const Console = (props) => {
    const { children, rxGlobalConfig } = props;
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        getUseinfo().then((res) => {
            const { data } = res;
            if (res.code === 200) {
                rxGlobalConfig(data);
            }
        });
    }, []);

    return (
        <>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ position: 'fixed', zIndex: 999 }}
                >
                    <Affix>
                        <ScMenu>
                            <Logo />
                            <ConsoleMenu />
                        </ScMenu>
                    </Affix>
                </Sider>
                <Layout style={{ marginLeft: '200px' }}>
                    <ConsoleHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                    <ScCustom>
                        <ConsoleCustomBreadcrumbs />
                    </ScCustom>
                    <ScContent>{children}</ScContent>
                </Layout>
            </Layout>
            <ScBackTop />
            <ScFeedback>
                <Tooltip placement="topRight" title="意见反馈">
                    <a href="https://support.qq.com/product/146180" target="_blank">
                        <SmileFilled style={{ fontSize: '40px' }} />
                    </a>
                </Tooltip>
            </ScFeedback>
        </>
    );
};

Console.propTypes = {
    children: PropTypes.node,
    rxGlobalConfig: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    rxGlobalConfig: (obj) => {
        dispatch(setGlobalConfigAction(obj));
    },
});

export default connect(null, mapDispatchToProps)(Console);
