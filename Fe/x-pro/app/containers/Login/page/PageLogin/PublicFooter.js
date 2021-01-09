import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
const ScPublicFooter = styled.div`
    line-height: 22px;
    padding: 24px 40px 30px;
    // background: rgba(50, 91, 147, 0.1);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
`;
const FooterTop = styled.div`
    & a {
        color: rgba(255, 255, 255, 1);
    }
`;
const FooterBottom = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    padding-top: 8px;
    cursor: pointer;
`;
const FooterTopLeft = styled.div`
    float: left;
`;
const FooterTopRight = styled.div`
    float: right;
`;
const SpanRight = styled.span`
    padding-left: 16px;
    cursor: pointer;
`;
const Line = styled.div`
    display: inline-block;
    width: 1px;
    height: 22px;
    color: rgba(255, 255, 255, 1);
    font-family: PingFangSC-Regular;
    cursor: pointer;
`;
const SpanLeft = styled.span`
    padding-right: 16px;
    cursor: pointer;
`;

const Pubfooter = () => (
    <ScPublicFooter>
        <FooterTop>
            <FooterTopLeft />
            <FooterTopRight>
                <SpanLeft>关于我们</SpanLeft>
                <Line></Line>
                <SpanRight>法律声明及隐私政策</SpanRight>
            </FooterTopRight>
        </FooterTop>
        <FooterBottom> 版权所有©2007-2020</FooterBottom>
    </ScPublicFooter>
);

// Pubfooter.propTypes = {
//     children: PropTypes.node,
//     level: PropTypes.number,
// };

export default Pubfooter;
