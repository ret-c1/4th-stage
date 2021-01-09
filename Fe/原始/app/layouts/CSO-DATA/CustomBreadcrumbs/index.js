import React from 'react';
// import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { renderBreadcrumbs } from '@routers/data';

const breadcrumbMap = renderBreadcrumbs();

const CustomBreadcrumbs = () => {
    const { location } = useHistory();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
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
            <Link to="/">首页</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

// CustomBreadcrumbs.propTypes = {
//     className: PropTypes.string,
// };

export default CustomBreadcrumbs;
