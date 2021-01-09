import React from 'react';
// import PropTypes from 'prop-types';
import { PublicHeader, Logo, HeaderRight, PublicContent } from './styled';

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
