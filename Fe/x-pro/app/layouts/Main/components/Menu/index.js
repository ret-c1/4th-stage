import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import iScroll from 'iscroll';
// import { MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { SubMenu } = Menu;

const ScBox = styled.div`
    position: absolute;
    z-index: 1;
    top: 120px;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow: hidden;
    ul.ant-menu-root {
        min-height: 135vh;
    }
`;

// const checkRole = (role) => role.filter((word) => /管理|负责/.test(word));

const rendermenu = (data, history) =>
    data.map((item) => {
        if (item.children && item.children.length > 0) {
            return (
                <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {rendermenu(item.children, history)}
                </SubMenu>
            );
        }
        // 如果有孙子组件
        // if (item.children && item.children.length) {
        //     return (
        //         <SubMenu key={item.path} title={item.title}>
        //             {rendermenu(item.children, history)}
        //         </SubMenu>
        //     );
        // }
        // 1、判断是否显示
        // 2、判断是否有角色字段
        // 3、判断该账号是否有权限
        return (
            <Menu.Item
                key={item.path}
                onClick={() => {
                    if (item.path === '/checkconfig/list') {
                        return;
                    }
                    history.push(item.path);
                }}
            >
                <span>{item.title}</span>
            </Menu.Item>
        );
    });

export const renderintersect = (val1, val2) => {
    const s1 = new Set([...val1]);
    const s2 = new Set([...val2]);
    const intersect = new Set([...s1].filter((x) => s2.has(x)));
    return intersect;
};

let myScroll;
const ConsoleMenu = (props) => {
    const { menuTrees } = props;
    const refWarpMenu = useRef(null);
    const history = useHistory();
    const { location } = history;
    let path = `/${location.pathname.split('/')[1]}`;
    const [openkey, setOpenkey] = useState([]);
    const [selectedkey, setSelectedkey] = useState([]);

    useEffect(() => {
        if (['/dashboad', '/desktop-intelligence'].indexOf(path) !== -1) {
            path = '/';
        }
        setOpenkey([path]);
        setSelectedkey([location.pathname]);
    }, [path]);

    const handleOpenChange = (openKeys) => {
        setOpenkey([...openKeys]);
        setTimeout(() => {
            myScroll.refresh();
        }, 500);

        // const latestOpenKey = openKeys.find((key) => openkey.indexOf(key) === -1);
        // console.log(openKeys, openkey, latestOpenKey);
        // if (latestOpenKey && latestOpenKey.split('/').length > 2) {
        //     setOpenkey([...openKeys]);
        // } else {
        //     const open = latestOpenKey ? [latestOpenKey] : [];
        //     setOpenkey([...open]);
        // }
    };

    const handleOnSelect = (select) => {
        // console.log(select);
        if (select.key === '/checkconfig/list') {
            window.open('http://192.168.19.199:27003');
            return;
        }
        // history.push(select.key);
        setSelectedkey([...select.selectedKeys]);
    };

    // const handleLink = (item) => {
    //     if (item.key === '/checkconfig') {
    //         window.open('http://192.168.19.199:27003');
    //         return;
    //     }
    //     history.push(item.key);
    // };
    useEffect(() => {
        initIScroll();
    }, []);

    const initIScroll = () => {
        myScroll = new iScroll(refWarpMenu.current, { // eslint-disable-line
            mouseWheel: true,
            click: true,
        });
    };

    return (
        <ScBox ref={refWarpMenu}>
            <div>
                <Menu
                    selectedKeys={[...selectedkey]}
                    openKeys={[...openkey]}
                    mode="inline"
                    theme="dark"
                    // onClick={handleLink}
                    onOpenChange={handleOpenChange}
                    onSelect={handleOnSelect}
                >
                    {rendermenu(menuTrees, history)}
                </Menu>
            </div>
        </ScBox>
    );
};

ConsoleMenu.propTypes = {
    menuTrees: PropTypes.array,
};

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxMenu: state.global.menu,
// });

// const withConnect = connect(mapStateToProps, null);

export default ConsoleMenu;
