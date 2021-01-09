import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '@assets/images/logo.png';

const PublicHeader = styled.div`
    font: 16px/100px PingFangSC-Regular;
    padding: 0 40px;
    background-color: #fff;
`;
const PublicContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Logo = styled.div`
    width: 376px;
    height: 33px;
    background: url(${logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;
const HeaderRight = styled.div`
    text-align: right;
`;

const PubHeader = () => (
    <PublicHeader>
        <PublicContent>
            <Logo />
            <HeaderRight>中国</HeaderRight>
        </PublicContent>
    </PublicHeader>
);

// PubHeader.propTypes = {
//     children: PropTypes.node,
//     level: PropTypes.number,
// };

export default PubHeader;
