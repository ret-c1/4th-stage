import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Row, Col } from 'antd';

// 面包屑
const renderBreadcrumbs = (data) => {
    const obj = {};
    data.forEach((item) => {
        obj[item.path] = item.title;
    });
    return obj;
};

const CustomBreadcrumbs = (props) => {
    const { location, breadcrumbs } = props;
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbMap = renderBreadcrumbs(breadcrumbs);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/dashboad">首页</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <Row>
            <Col span={23}>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </Col>
        </Row>
    );
};

CustomBreadcrumbs.propTypes = {
    location: PropTypes.object,
    breadcrumbs: PropTypes.array,
};

export default CustomBreadcrumbs;
