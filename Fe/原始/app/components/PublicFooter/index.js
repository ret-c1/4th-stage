import React from 'react';
// import PropTypes from 'prop-types';
import {
    PublicFooter,
    FooterTop,
    FooterTopLeft,
    FooterTopRight,
    FooterBottom,
    SpanRight,
    SpanLeft,
    Line,
} from './styled';

const Pubfooter = () => (
    <PublicFooter>
        <FooterTop>
            <FooterTopLeft />
            <FooterTopRight>
                <SpanLeft>关于我们</SpanLeft>
                <Line></Line>
                <SpanRight>法律声明及隐私政策</SpanRight>
            </FooterTopRight>
        </FooterTop>
        <FooterBottom>1</FooterBottom>
    </PublicFooter>
);

// Pubfooter.propTypes = {
//     children: PropTypes.node,
//     level: PropTypes.number,
// };

export default Pubfooter;
