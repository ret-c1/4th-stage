import styled from 'styled-components';

export const PublicFooter = styled.div`
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
export const FooterTop = styled.div`
    & a {
        color: rgba(0, 0, 0, 0.45);
    }
`;
export const FooterBottom = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    padding-top: 8px;
`;
export const FooterTopLeft = styled.div`
    float: left;
`;
export const FooterTopRight = styled.div`
    float: right;
`;
export const SpanRight = styled.span`
    padding-left: 16px;
`;
export const Line = styled.div`
    display: inline-block;
    width: 1px;
    height: 22px;
    background: rgba(0, 0, 0, 0.15);
`;
export const SpanLeft = styled.span`
    padding-right: 16px;
`;
