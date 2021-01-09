import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
const ScPublicFooter = styled.div`
    line-height: 22px;
    padding: 24px 40px 30px;
    background: rgba(50, 91, 147, 0.1);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(0, 0, 0, 0.65);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
`;
const FooterTop = styled.div`
    & a {
        color: rgba(0, 0, 0, 0.45);
    }
`;
const FooterBottom = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    padding-top: 8px;
`;
const FooterTopLeft = styled.div`
    float: left;
`;
const FooterTopRight = styled.div`
    float: right;
`;
const SpanRight = styled.span`
    padding-left: 16px;
`;
const Line = styled.div`
    display: inline-block;
    width: 1px;
    height: 22px;
    background: rgba(0, 0, 0, 0.15);
`;
const SpanLeft = styled.span`
    padding-right: 16px;
`;

const Pubfooter = () => (
    <ScPublicFooter>
        <FooterTop>
            <FooterTopLeft>
                <a href="http://www.beian.miit.gov.cn/" target="_blank">
                    浙ICP备09102757-19号&nbsp;
                </a>
                <a href="http://www.beian.gov.cn/portal/index/" target="_blank">
                    浙公网安备33010802008282号
                </a>
            </FooterTopLeft>
            <FooterTopRight>
                <SpanLeft>关于我们</SpanLeft>
                <Line></Line>
                <SpanRight>法律声明及隐私政策</SpanRight>
            </FooterTopRight>
        </FooterTop>
        <FooterBottom>1</FooterBottom>
    </ScPublicFooter>
);

// Pubfooter.propTypes = {
//     children: PropTypes.node,
//     level: PropTypes.number,
// };

export default Pubfooter;
