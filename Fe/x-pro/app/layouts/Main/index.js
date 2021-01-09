import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout, BackTop, Affix } from 'antd';
// import { SmileFilled } from '@ant-design/icons';
import styled from 'styled-components';
// import ErrorBoundary from '@components/ErrorBoundary';
import { refactorMenuTree, refactorRouterTree } from '@routers';
import ConsoleCustomBreadcrumbs from './components/CustomBreadcrumbs';
// import PlatformSwitch from './components/PlatformSwitch';
import ConsoleHeader from './components/Header';
import ConsoleMenu from './components/Menu';
import { setGlobalConfigAction, setGlobalRouteTree } from './action';
import { userinfojson, menutree } from './userinfo';

const { Sider, Content } = Layout;

const ScContent = styled(Content)`
    min-height: calc(100vh - 64px - 54px);
`;

const ScCustom = styled.div`
    padding: 16px 24px;
    background: #fff;
    font-size: 14px;
    line-height: 22px;
    height: 54px;
`;

const ScBackTop = styled(BackTop)`
    bottom: 100px;
    right: 25px;
`;

const ScMenu = styled.div`
    height: 100vh;
`;

const Logo = styled.div`
    width: 180px;
    height: 66px;
    padding-top: 40px;
    font-size: 24px;
    text-align: center;
    color: #fff;
`;
// const ScFeedback = styled.div`
//     position: fixed;
//     z-index: 10;
//     cursor: pointer;
//     bottom: 63px;
//     right: 63px;
// `;
const Main = (props) => {
    const { children, rxGlobalConfig, rxGlobalRouteTree } = props;
    const { location } = useHistory();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // 菜单树
    const [menuTrees, setMenuTrees] = useState([]);
    // 面包屑
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    useEffect(() => {
        const { data } = userinfojson;
        rxGlobalConfig(data);

        const initial = JSON.stringify(menutree.data).replace(/permissionUri/g, 'path');
        const structure = JSON.parse(initial) || [];
        // 设置菜单树
        setMenuTrees([...refactorMenuTree(structure)]);
        // 重构路由树
        const routeTree = refactorRouterTree(structure);
        // 面包屑
        setBreadcrumbs([...routeTree]);
        // 用redux把路由树传给APP
        rxGlobalRouteTree({
            routes: [...routeTree],
        });
    }, []);

    return (
        <>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ position: 'fixed', zIndex: 999, minHeight: '100%' }}
                >
                    <Affix>
                        <ScMenu>
                            <Logo>安全运营</Logo>
                            <ConsoleMenu menuTrees={menuTrees} />
                        </ScMenu>
                    </Affix>
                </Sider>
                <Layout style={{ marginLeft: '200px' }}>
                    <ConsoleHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                    <ScCustom>
                        <ConsoleCustomBreadcrumbs breadcrumbs={breadcrumbs} location={location} />
                    </ScCustom>
                    <ScContent>{children}</ScContent>
                </Layout>
            </Layout>
            <ScBackTop />
            {/* <PlatformSwitch /> */}
            {/* <ScFeedback> */}
            {/*    <Tooltip placement="topRight" title="意见反馈"> */}
            {/*        <a href="https://support.qq.com/product/146180" target="_blank"> */}
            {/*            <SmileFilled style={{ fontSize: '40px' }} /> */}
            {/*        </a> */}
            {/*    </Tooltip> */}
            {/* </ScFeedback> */}
        </>
    );
};

Main.propTypes = {
    children: PropTypes.node,
    rxGlobalConfig: PropTypes.func,
    rxGlobalRouteTree: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    rxGlobalConfig: (obj) => {
        dispatch(setGlobalConfigAction(obj));
    },
    rxGlobalRouteTree: (obj) => {
        dispatch(setGlobalRouteTree(obj));
    },
});

export default connect(null, mapDispatchToProps)(Main);
