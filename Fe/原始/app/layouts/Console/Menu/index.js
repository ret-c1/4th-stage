import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
// import { MailOutlined } from '@ant-design/icons';
import { consoleRoutes } from '@routers/console';
// import styled from 'styled-components';

const { SubMenu } = Menu;

const rendermenu = (data, role, menu) =>
    data.map((item) => {
        if (item.children && item.children.length > 0 && menu && menu.indexOf(item.key) > -1) {
            return (
                <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {rendermenu(item.children, role, menu)}
                </SubMenu>
            );
        }
        // 如果有孙子组件
        if (item.offspring && item.offspring.length > 0 && item.isShow) {
            return (
                <SubMenu key={item.path} title={item.title}>
                    {rendermenu(item.offspring, role, menu)}
                </SubMenu>
            );
        }
        // 1、判断是否显示
        // 2、判断是否有角色字段
        // 3、判断该账号是否有权限
        if (item.isShow && item.role) {
            const intersect = renderintersect(item.role, role);
            if (intersect.size > 0) {
                return (
                    <Menu.Item key={item.path}>
                        <span>{item.title}</span>
                    </Menu.Item>
                );
            }
        }
        return null;
    });

const renderintersect = (val1, val2) => {
    const s1 = new Set([...val1]);
    const s2 = new Set([...val2]);
    const intersect = new Set([...s1].filter((x) => s2.has(x)));
    return intersect;
};

const ConsoleMenu = (props) => {
    const { rxRole, rxMenu } = props;
    const history = useHistory();
    const { location } = history;
    const path = `/${location.pathname.split('/')[1]}`;
    const [openkey, setOpenkey] = useState([]);
    const [selectedkey, setSelectedkey] = useState([]);

    useEffect(() => {
        setOpenkey([path]);
        setSelectedkey([location.pathname]);
    }, [path]);

    const handleOpenChange = (openKeys) => {
        setOpenkey([...openKeys]);
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
            window.open('http://1.1.1.1:27003');
            return;
        }
        history.push(select.key);
        setSelectedkey([...select.selectedKeys]);
    };

    // const handleLink = (item) => {
    //     if (item.key === '/checkconfig') {
    //         window.open('http://1.1.1.1:27003');
    //         return;
    //     }
    //     history.push(item.key);
    // };

    return (
        <Menu
            selectedKeys={[...selectedkey]}
            openKeys={[...openkey]}
            mode="inline"
            theme="dark"
            // onClick={handleLink}
            onOpenChange={handleOpenChange}
            onSelect={handleOnSelect}
        >
            {rendermenu(consoleRoutes, rxRole, rxMenu)}
        </Menu>
    );
};

ConsoleMenu.propTypes = {
    rxRole: PropTypes.array,
    rxMenu: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxMenu: state.global.menu,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ConsoleMenu);
