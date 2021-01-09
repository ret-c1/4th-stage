import styled from 'styled-components';
import logo from '@assets/images/logo.png';

export const PublicHeader = styled.div`
    font: 16px/100px PingFangSC-Regular;
    padding: 0 40px;
    background-color: #fff;
`;
export const PublicContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Logo = styled.div`
    width: 328px;
    height: 33px;
    background: url(${logo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;
export const HeaderRight = styled.div`
    text-align: right;
`;
