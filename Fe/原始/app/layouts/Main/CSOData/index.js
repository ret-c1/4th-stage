import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
import styled from 'styled-components';
// import ErrorBoundary from '@components/ErrorBoundary';
import Announcement from './Announcement';
import ODataCustomBreadcrumbs from '../../CSO-DATA/CustomBreadcrumbs';
import ODataHeader from '../../CSO-DATA/Header';
import ODataMenu from '../../CSO-DATA/Menu';
import { getUseinfo } from '../api';
import { setGlobalConfigAction } from '../action';
import bgpoint from './bg-point.png';
import leftmenu from './leftmenu.png';
import togglepng from './toggle.png';

const { Sider, Content } = Layout;

const ScLayout = styled(Layout)`
    position: relative;
    z-index: 1;
    background: #112354;
    height: 100vh;
    overflow: hidden;
    background: #112354;
    .ant-layout,
    .ant-layout-sider,
    .ant-menu-dark,
    .ant-menu-submenu {
        background: transparent !important;
        position: relative;
        z-index: 99;
    }
    .ant-menu-dark .ant-menu-item:hover,
    .ant-menu-dark .ant-menu-item-active,
    .ant-menu-dark .ant-menu-submenu-active,
    .ant-menu-dark .ant-menu-submenu-open,
    .ant-menu-dark .ant-menu-submenu-selected,
    .ant-menu-dark .ant-menu-submenu-title:hover {
        color: #80d5ff;
    }
    .ant-menu-submenu-title {
        font-size: 16px;
    }
    .ant-layout.ant-layout-has-sider > .ant-layout,
    .ant-layout.ant-layout-has-sider > .ant-layout-content {
        overflow: unset !important;
    }
`;
const ScLayout2 = styled(Layout)`
    height: calc(100vh - 100px);
`;

const ScBg = styled.div`
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100vh;
    opacity: 0.7;
    transform: rotate(3deg);
    transform: scaleX(-1);
    background-image: linear-gradient(179deg, rgba(17, 35, 84, 0) 12%, #0f204d 100%);
`;

const ScPointGrain = styled.div`
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 35vh;
    background: url(${bgpoint});
    background-size: cover;
    background-repeat: no-repeat;
`;

const ScCustom = styled.div`
    padding: 6px 24px;
    font-size: 14px;
    line-height: 22px;
    a {
        height: 54px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.65);
    }
    .ant-breadcrumb > span:last-child a {
        color: #fff;
    }
    .ant-breadcrumb-separator {
        color: rgba(255, 255, 255, 0.45);
    }
`;

const ScBackTop = styled(BackTop)`
    bottom: 100px;
    right: 25px;
`;

const ScMenu = styled.div`
    padding-top: 50px;
    height: 100%;
    background: url(${leftmenu});
    background-size: auto;
    background-repeat: no-repeat;
    .ant-menu-item-selected {
        background: transparent !important;
        background-image: linear-gradient(
            270deg,
            rgba(1, 240, 255, 0) 27%,
            rgba(1, 240, 255, 0.3) 88%
        ) !important;
    }
    > ul > li > ul {
        background: transparent !important;
        position: relative;
        z-index: 1;
        > li > ul {
            background: transparent !important;
            position: relative;
            z-index: 1;
        }
        &::before {
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;
            display: block;
            width: 160px;
            height: 1px;
            background-image: linear-gradient(
                270deg,
                rgba(101, 195, 255, 0) 0%,
                rgba(53, 144, 255, 0.6) 100%
            );
            content: '';
        }
        &::after {
            position: absolute;
            z-index: 1;
            left: 0;
            bottom: 0;
            display: block;
            width: 160px;
            height: 1px;
            background-image: linear-gradient(
                270deg,
                rgba(101, 195, 255, 0) 0%,
                rgba(53, 144, 255, 0.6) 100%
            );
            content: '';
        }
    }
`;

const ScToggle = styled.div`
    position: absolute;
    z-index: 99;
    right: 0;
    top: 40%;
    width: 21px;
    height: 86px;
    background: url(${togglepng});
    background-position: center;
    background-size: cover;
    cursor: pointer;
`;

const CSOData = (props) => {
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
            <ScLayout>
                <ScPointGrain />
                <ScBg />
                <ODataHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <ScLayout2>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        width={200}
                        style={{ zIndex: 999 }}
                    >
                        <ScMenu>
                            <ODataMenu />
                            <ScToggle onClick={toggleCollapsed} style={{ display: 'none' }} />
                        </ScMenu>
                    </Sider>
                    <Layout>
                        <ScCustom>
                            <ODataCustomBreadcrumbs />
                        </ScCustom>
                        <Content>{children}</Content>
                    </Layout>
                    <Announcement />
                </ScLayout2>
            </ScLayout>
            <ScBackTop />
        </>
    );
};

CSOData.propTypes = {
    children: PropTypes.node,
    rxGlobalConfig: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    rxGlobalConfig: (obj) => {
        dispatch(setGlobalConfigAction(obj));
    },
});

export default connect(null, mapDispatchToProps)(CSOData);
