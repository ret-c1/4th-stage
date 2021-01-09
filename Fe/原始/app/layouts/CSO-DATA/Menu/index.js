import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
// import { MailOutlined } from '@ant-design/icons';
import { dataRoutes } from '@routers/data';
// import styled from 'styled-components';

const { SubMenu } = Menu;

const rendermenu = (data, role, menu) =>
    data.map((item) => {
        if (item.children && item.children.length > 0 && menu && menu.indexOf(item.key) > 0) {
            return (
                <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {rendermenu(item.children, role)}
                </SubMenu>
            );
        }
        // 如果有孙子组件
        if (item.offspring && item.offspring.length > 0 > 0 && item.isShow) {
            return (
                <SubMenu key={item.path} title={item.title}>
                    {rendermenu(item.offspring, role)}
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

const ODataMenu = (props) => {
    const { rxRole, rxMenu } = props;
    const history = useHistory();
    const { location } = history;
    const path = `/${location.pathname.split('/')[1]}`;
    const [openkey] = useState([path, '/csodatasv10', '/csodatasv20']);
    const [selectedkey] = useState(location.pathname);

    const handleLink = (item) => {
        history.push(item.key);
    };

    return (
        <Menu
            defaultSelectedKeys={[selectedkey]}
            defaultOpenKeys={[...openkey]}
            mode="inline"
            theme="dark"
            onClick={handleLink}
        >
            {rendermenu(dataRoutes, rxRole, rxMenu)}
        </Menu>
    );
};

ODataMenu.propTypes = {
    rxRole: PropTypes.array,
    rxMenu: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxMenu: state.global.menu,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ODataMenu);
