import styled from 'styled-components';
import spread from '@assets/images/spread.png';
import fullScreen from '@assets/images/fullScreen.png';

export const ScContent = styled.div`
    margin: 24px 24px 0;
`;

export const ScSpread = styled.div`
    width: 16px;
    height: 16px;
    float: left;
    background: url(${spread}) no-repeat;
    margin-right: 8px;
`;

export const ScFullScreen = styled.div`
    width: 16px;
    height: 16px;
    float: right;
    background: url(${fullScreen}) no-repeat;
    margin-right: 8px;
`;
export const ScModalSubmit = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 56px;
    padding: 10px 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;
