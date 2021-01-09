import styled from 'styled-components';
import bg from './assets/bg.png';
import imgTop from './assets/imgTop.png';
import imgsvg from './assets/imgsvg.svg';
import imgsvg2 from './assets/imgsvg2.svg';
import review from './assets/review.svg';
import distribution from './assets/distribution.svg';
import finish from './assets/finish.svg';
import verification from './assets/verification.svg';
import management from './assets/management.svg';
import submmit from './assets/submmit.svg';

export const ScOuter = styled.div`
    width: 100%;
    height: 100%;
    background: url(${bg});
    background-repeat: no-repeat;
    position: relative;
`;
export const ScImg1 = styled.span`
    text-align: center;
    z-index: -1;
    display: block;
    width: 185px;
    height: 165px;
    top: -42px;
    left: -92px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[0] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScTopImg = styled.div`
    width: 100%;
    height: 100%;
    background: url(${imgTop});
    background-repeat: no-repeat;
    left: 60px;
    top: 20px;
    position: absolute;
    cursor: pointer;
`;
export const ScSubmmitSvg = styled.span`
    z-index: 1;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${submmit});
    background-color: #22aff7;
    cursor: pointer;
`;
export const ScSubmmit = styled.span`
    position: absolute;
    z-index: 1;
    top: 118px;
    left: 78px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #24b6ff;
    cursor: pointer;
`;
export const ScNumber = styled.span`
    display: block;
    padding-top: 66px;
    padding-left: 20px;
    font-family: PingFangSC-Medium;
    font-size: 26px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
`;
export const ScImg2 = styled.span`
    text-align: center;
    z-index: 1;
    display: block;
    width: 185px;
    height: 165px;
    top: -42px;
    left: -44px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[1] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScReviewSvg = styled.span`
    z-index: 1;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${review});
    background-color: #22aff7;
`;
export const ScImg3 = styled.span`
    text-align: center;
    z-index: 1;
    display: block;
    width: 185px;
    height: 165px;
    top: -42px;
    left: 4px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[2] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScDistributionSvg = styled.span`
    z-index: 1;
    width: 16px;
    height: 16px;
    top: 5px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${distribution});
    background-color: #22aff7;
`;
export const ScImg4 = styled.span`
    text-align: center;
    z-index: 1;
    display: block;
    width: 185px;
    height: 165px;
    top: -14px;
    left: -93px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[3] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScFinishSvg = styled.span`
    z-index: 1;
    width: 17.2px;
    height: 20px;
    top: 5px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${finish});
    background-color: #22aff7;
`;
export const ScImg5 = styled.span`
    text-align: center;
    z-index: 1;
    display: block;
    width: 185px;
    height: 165px;
    top: -14px;
    left: -44px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[4] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScVerificationSvg = styled.span`
    z-index: 1;
    width: 17.2px;
    height: 20px;
    top: 5px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${verification});
    background-color: #22aff7;
`;
export const ScImg6 = styled.span`
    text-align: center;
    z-index: 1;
    display: block;
    width: 185px;
    height: 165px;
    top: -12px;
    left: 5px;
    cursor: pointer;
    position: relative;
    background-image: url(${(props) => (props.controlLight[5] ? imgsvg2 : imgsvg)});
    background-color: rgba(53, 144, 255, 0);
`;
export const ScManagementSvg = styled.span`
    z-index: 1;
    width: 16px;
    height: 16px;
    top: 8px;
    left: 30px;
    display: block;
    position: absolute;
    mask-image: url(${management});
    background-color: #22aff7;
`;
export const ScTopImg1 = styled.div`
    width: 100%;
    height: 100%;
    background: url(${imgTop});
    background-repeat: no-repeat;
    left: 60px;
    top: 20px;
    position: absolute;
`;

export const ScSubmmit1 = styled.span`
    position: absolute;
    z-index: 1;
    top: 119px;
    left: 78px;
    color: #24b6ff;
    opacity: 0.85;
    font-family: PingFangSC-Medium;
    font-size: 20px;
`;
export const ScNumber1 = styled.span`
    display: block;
    padding-top: 63px;
    padding-left: 20px;
    font-family: PingFangSC-Medium;
    font-size: 26px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
`;

export const ScTipsBox = styled.div`
    position: absolute;
    z-index: 10001;
    left: 155px;
    top: -56px;
    padding: 10px;
    box-shadow: 0 0 12px 1px #3590ff;
    min-height: 100px;
    color: #fff;
    width: 290px;
    height: 150px;
`;

export const ScTipsBoxBg = styled.div`
    opacity: 0.9;
    background: #0a1e45;
    border: 1px solid #3590ff;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    span {
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 3px;
        &.border-1 {
            position: absolute;
            z-index: 1;
            left: 2px;
            top: 2px;
            border-top: 2px solid #48f4ff;
            border-left: 2px solid #48f4ff;
        }
        &.border-2 {
            position: absolute;
            z-index: 1;
            right: 2px;
            top: 2px;
            border-top: 2px solid #48f4ff;
            border-right: 2px solid #48f4ff;
        }
        &.border-3 {
            position: absolute;
            z-index: 1;
            left: 2px;
            bottom: 2px;
            border-bottom: 2px solid #48f4ff;
            border-left: 2px solid #48f4ff;
        }
        &.border-4 {
            position: absolute;
            z-index: 1;
            right: 2px;
            bottom: 2px;
            border-bottom: 2px solid #48f4ff;
            border-right: 2px solid #48f4ff;
        }
    }
`;

export const ScTipsBoxLine1 = styled.div`
    position: absolute;
    z-index: 1;
    width: 25px;
    height: 1px;
    border-bottom: 1px solid #48f4ff;
    top: 50%;
    left: -25px;
`;
export const ScTipsBoxLine2 = styled.div`
    position: absolute;
    z-index: 1;
    width: 50px;
    height: 1px;
    top: calc(50% + 12px);
    left: -70px;
    border-bottom: 1px solid #48f4ff;
    transform: rotate(-30deg);
`;
export const ScContent = styled.p`
    position: relative;
    z-index: 1000;
    font-size: 15px;
`;
