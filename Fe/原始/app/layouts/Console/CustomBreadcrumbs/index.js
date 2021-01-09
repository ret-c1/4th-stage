import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb, Button, Row, Col } from 'antd';
import { renderBreadcrumbs } from '@routers/console';

const breadcrumbMap = renderBreadcrumbs();

const czcArr = [];
const CustomBreadcrumbs = () => {
    const { location, go } = useHistory();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        czcArr.push(breadcrumbMap[url]);
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

    useEffect(() => {
        if (window._czc) { // eslint-disable-line
            const title = czcArr.join('/');
            window._czc.push(['_trackPageview', title, 'https://console.x.com']);  // eslint-disable-line
        }
    }, [location.pathname]);
    let showButton = false;
    if (location.pathname.indexOf('approved') !== -1 && location.search.indexOf('detail') === -1) {
        showButton = true;
    }
    return (
        <Row>
            <Col span={23}>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </Col>
            {showButton && (
                <Col span={1}>
                    <Button onClick={() => go(-1)}>返回</Button>
                </Col>
            )}
        </Row>
    );
};

// CustomBreadcrumbs.propTypes = {
//     className: PropTypes.string,
// };

export default CustomBreadcrumbs;
