import styled from 'styled-components';

const ScMiddle = styled.div`
    width: 100%;
    height: 46vh;
`;

const ScCMiddleUl = styled.ul`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;
    margin: 0;
    padding: 0 0 0 24px;
    list-style: none;
    justify-content: space-between;
    & > li {
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        flex: 1 0 auto;
        height: 100%;
        padding-top: 10px;
        padding-right: 10px;
        &:first-child {
            flex: 0 0 28%;
            max-width: 28%;
        }
        &:nth-child(2) {
            margin-top: 65px;
            margin-left: 40px;
        }
        &:last-child {
            flex: 0 0 28%;
            max-width: 26%;
        }
    }
`;

const ScTitleLeft = styled.div`
    position: relative;
    padding: 0 80px 0 16px;
    font-size: 18px;
    width: 250px;
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
const ScTopLine = styled.div`
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
const ScBottomLine = styled.div`
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
const ScTitleRight = styled.div`
    position: relative;
    padding: 0 16px 0 80px;
    font-size: 18px;
    width: 250px;
    margin-left: 90px;
    letter-spacing: 4px;
    text-align: right;
    margin-right: 20px;
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

const ScChart = styled.div`
    height: calc(100% - 28px);
`;

export {
    ScMiddle,
    ScCMiddleUl,
    ScTitleRight,
    ScChart,
    ScTitleLeft,
    ScTopLine,
    ScBottomLine,
    ScRightTopLine,
    ScRightBottomLine,
};
