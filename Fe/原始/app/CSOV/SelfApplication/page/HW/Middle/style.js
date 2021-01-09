import styled from 'styled-components';
import IconExample from './img/icon_example.svg';

const ScContent = styled.div`
    font-size: 10px;
    width: 100%;
    padding: 0 24px;
    height: calc(100vh - 100px - 34px - 65px);
    @media (max-width: 1441px) {
        font-size: 8px;
    }
`;
const ScCenter = styled.div`
    padding: 18px 0;
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: space-around;
`;
const ScColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 10px;
`;
const ScChart = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
const ScRightChart = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
`;
const ScTitleLeft = styled.div`
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
    border-radius: 0px 22px 0px 0px;
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
const ScTopLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        left: -16px;
        width: 40%;
        height: 2px;
        content: '';
        background-image: radial-gradient(50% 50%, #3590ff 50%, rgba(53, 144, 255, 0) 100%);
    }
`;
const ScBottomLine = styled.div`
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        left: -16px;
        width: 80%;
        height: 2px;
        content: '';
        background-image: linear-gradient(270deg, rgba(101, 195, 255, 0) 0%, #3590ff 100%);
    }
`;
const ScTitleRight = styled.div`
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

const ScRightTopLine = styled.div`
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
const ScRightBottomLine = styled.div`
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
const ScHeader = styled.div`
    text-align: center;
    width: 100%;
    height: 36px;
    color: #ffffff;
    font-size: 18px;
    position: relative;
    &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-image: radial-gradient(50% 50%, #3590ff 50%, rgba(53, 144, 255, 0) 100%);
    }
    &::before {
        position: absolute;
        top: 0;
        left: 245px;
        right: 0;
        width: 208px;
        height: 2px;
        content: '';
        background-image: radial-gradient(50% 50%, #3590ff 50%, rgba(53, 144, 255, 0) 100%);
    }
`;
const ScExample = styled.div`
    position: relative;
    top: 0;
    width: 86px;
    height: 104px;
    margin-right: 5px;
    background: url(${IconExample}), no-repeat;
    height: 104px;
`;
export {
    ScContent,
    ScCenter,
    ScColumn,
    ScChart,
    ScRightChart,
    ScTitleLeft,
    ScTopLine,
    ScBottomLine,
    ScTitleRight,
    ScRightTopLine,
    ScRightBottomLine,
    ScHeader,
    ScExample,
};
