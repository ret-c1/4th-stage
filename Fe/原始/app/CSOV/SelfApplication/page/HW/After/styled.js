import { Radio } from 'antd';
import styled from 'styled-components';
import tooltip from './img/tooltip.svg';
import tab from './img/tab.svg';
import side from './img/side.svg';
import purple from './img/purple.png';
import blue from './img/blue.png';
import right from './img/right.svg';
import top from './img/top.svg';

export const ScContent = styled.div`
    width: 100%;
    height: 100%;
    font-size: 10px;
    padding: 0 24px;
    @media (max-width: 1441px) {
        font-size: 8px;
    }
`;

export const ScChart = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
export const ScRightChart = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;
export const ScTitleLeft = styled.div`
    position: relative;
    padding: 0 80px 0 16px;
    font-size: 18px;
    letter-spacing: 4px;
    font-family: PingFangSC-Regular;
    color: #fff;
    background-image: linear-gradient(
        270deg,
        rgba(24, 144, 255, 0) 0%,
        rgba(24, 144, 255, 0.1) 100%
    );
    box-shadow: inset 10px 3px 10px 0 rgba(53, 144, 255, 0.3);
    border-radius: 0 22px 0 0;
    &::after {
        position: absolute;
        top: 0;
        left: -8px;
        width: 4px;
        height: 28px;
        content: '';
        background: #24b6ff;
    }
`;
export const ScTopLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        left: -16px;
        width: 70%;
        height: 2px;
        content: '';
        background-image: radial-gradient(50% 50%, #3590ff 50%, rgba(53, 144, 255, 0) 100%);
    }
`;
export const ScBottomLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        left: -16px;
        width: 100%;
        height: 2px;
        content: '';
        background-image: linear-gradient(270deg, rgba(101, 195, 255, 0) 0%, #3590ff 100%);
    }
`;
export const ScTitleRight = styled.div`
    position: relative;
    padding: 0 16px 0 80px;
    font-size: 18px;
    letter-spacing: 4px;
    text-align: right;
    font-family: PingFangSC-Regular;
    color: #fff;
    background-image: linear-gradient(
        270deg,
        rgba(24, 144, 255, 0) 0%,
        rgba(24, 144, 255, 0.1) 100%
    );
    box-shadow: inset -10px -3px 10px 0 rgba(53, 144, 255, 0.3);
    border-radius: 22px 0 0 0;
    &::after {
        position: absolute;
        top: 0;
        right: -8px;
        width: 4px;
        height: 28px;
        content: '';
        background: #24b6ff;
    }
`;

export const ScRightTopLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        right: -16px;
        width: 70%;
        height: 2px;
        content: '';
        background-image: radial-gradient(50% 50%, #3590ff 50%, rgba(53, 144, 255, 0) 100%);
    }
`;
export const ScRightBottomLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        right: -16px;
        width: 100%;
        height: 2px;
        content: '';
        background-image: linear-gradient(90deg, rgba(101, 195, 255, 0) 0%, #3590ff 100%);
    }
`;

export const ScEmergency = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
export const ScSummary = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #80d5ff;
    letter-spacing: 0;
    margin: 24px 0 21px 0;
`;
export const ScDetail = styled.div`
    font-family: PingFangSC-Regular;
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 40px;
    margin-top: -10px;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0;
    background: url(${tooltip}) no-repeat;
    padding-left: 50px;
    border-radius: 100px 100px 100px 100px;
`;

export const ScName = styled.span`
    margin-right: 20px;
`;

export const ScGroup = styled(Radio.Group)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    background: url(${tab}) no-repeat;
    width: 148px;
    height: 26px;
    margin: 0 0 5px 6px;
    padding: 0 10px;
    color: rgba(255, 255, 255, 0.45);
`;
export const ScButton = styled(Radio.Button)`
    color: #ffffff;
    width: 55%;
    border: none;
    font-size: 13px;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0);
    &.ant-radio-button-wrapper:first-child {
        border-left: none;
    }
    &.ant-radio-button-wrapper:not(:first-child)::before {
        width: 0;
    }
    &.ant-radio-button-wrapper {
        display: flex;
        justify-content: flex-start;
        height: 20px;
    }
    &.ant-radio-button-wrapper-checked {
        display: flex;
        justify-content: flex-start;
        color: #01f0ff;
        background: rgba(24, 144, 255, 0.2);
        box-shadow: inset 0 0 2px 0 #1890ff;
        outline: none;
        height: 20px;
    }
`;

export const ScMiddle = styled.div`
    display: flex;
    margin-top: -15px;
`;
export const ScMiddleInner = styled.div`
    position: absolute;
    z-index: 2;
    left: 6px;
    top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.level1 {
        width: 36px;
        height: 480px;
        background: url(${side});
    }
    &.level2 {
        width: 36px;
        height: 480px;
        background: url(${purple});
    }
    &.level3 {
        width: 36px;
        height: 480px;
        background: url(${blue});
    }
    &.level4 {
        width: 36px;
        height: 480px;
        background: url(${blue});
    }
`;

export const FlowChartLineRow = styled.div`
    display: none;
    position: absolute;
    z-index: 1;
    width: 1px;
    border-left: 2px solid #56554f;
    left: 20px;
    &.level1 {
        display: block;
        height: 95px;
        bottom: -80px;
    }
    &.level2 {
        display: block;
        height: 140px;
        bottom: -125px;
    }
    &.level3 {
        display: block;
        height: 185px;
        bottom: -170px;
    }
    &.level4 {
        display: block;
        height: 230px;
        bottom: -215px;
    }
`;
export const FlowChartLineCol = styled.div`
    display: none;
    position: absolute;
    z-index: 1;
    width: 29px;
    border-bottom: 2px solid #56554f;
    height: 1px;
    left: 20px;
    &.level1 {
        display: block;
        bottom: -80px;
    }
    &.level2 {
        display: block;
        bottom: -125px;
    }
    &.level3 {
        display: block;
        bottom: -170px;
    }
    &.level4 {
        display: block;
        bottom: -215px;
    }
`;
export const ScTop = styled.div`
    width: 390px;
    height: 40px;
    display: flex;
    justify-content: center;
    margin-left: 35px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #01f0ff;
    text-align: center;
    background: url(${top}) no-repeat;
`;
export const ScRight = styled.div`
    width: 200px;
    height: 40px;
    margin-left: 30px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #01f0ff;
    text-align: center;
    background: url(${right}) no-repeat;
`;
export const ScTopInner = styled.div`
    width: 200px;
    height: 40px;
`;
export const ScFont = styled.div`
    width: 23px;
    height: 253px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #face49;
    text-align: center;
    word-wrap: break-word;
    &.level1 {
        color: #face49;
    }
    &.level2 {
        color: #bf79ff;
    }
    &.level3 {
        color: #1890ff;
    }
    &.level4 {
        color: #db5b84;
    }
`;
