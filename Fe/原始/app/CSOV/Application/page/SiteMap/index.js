import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Button } from 'antd';
import styled from 'styled-components';
import CTop from './CTop';
import CBottom from './CBottom';

const ScMain = styled.div`
    display: flex;
    flex: auto;
    flex-direction: row;
`;
const ScContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: auto;
    margin: 0 12px;
    font-size: 10px;
    height: calc(100vh - 100px - 34px);
`;

const SiteMapPage = () => (
    <ScMain>
        <ScContent>
            <CTop />
            <CBottom />
        </ScContent>
    </ScMain>
);

// SiteMapPage.propTypes = {
//     requestLogin: PropTypes.func,
// };

export default SiteMapPage;
