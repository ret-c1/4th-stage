import styled from 'styled-components';
import flowentity from './img/flow-entity.png';
import flowentityactive from './img/flow-entity-active.png';
import flowentitynormal from './img/flow-entity-normal.png';
import flowentitynum from './img/flow-entity-num.png';
import earlyline01 from './img/early-line-01.svg';
import earlyline02 from './img/early-line-02.svg';
import earlyline03 from './img/early-line-03.svg';
import earlyline04 from './img/early-line-04.svg';
import earlyline041 from './img/early-line-04-1.svg';
import earlyline051 from './img/early-line-05-1.svg';
import emerline01 from './img/emer-line-01.svg';
import emerline021 from './img/emer-line-02-1.svg';
import emerline022 from './img/emer-line-02-2.svg';
import emerline023 from './img/emer-line-02-3.svg';
import emerlinexc03 from './img/emer-line-xc-03.svg';
import emerlineyc03 from './img/emer-line-yc-03.svg';
import emerline04 from './img/emer-line-04.svg';
import endline01 from './img/end-line-01.svg';

export const ScFlow = styled.div`
    margin-left: 40px;
    height: 430px;
    display: flex;
    padding: 8px 0;
`;
export const ScEarly = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
`;
export const ScEarlyCol1 = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
`;
export const ScEarlyCol2 = styled.div`
    position: relative;
    z-index: 1;
    margin: 0 -68px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-between;
`;
export const ScEarlyCol3 = styled.div`
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
`;

export const ScFlowEntityNum = styled.div`
    position: absolute;
    z-index: 1;
    top: 7px;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 77px;
    height: 28px;
    background-image: url(${flowentitynum});
    background-repeat: no-repeat;
    font-size: 20px;
    color: #01f0ff;
    text-align: center;
`;

export const ScFlowEntity = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 165px;
    height: 143px;
    background-image: url(${flowentity});
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    text-align: center;
    padding: 30px;
    &.active {
        background-image: url(${flowentityactive});
        background-repeat: no-repeat;
        background-size: cover;
    }
    &.normal {
        background-image: url(${flowentitynormal});
        background-repeat: no-repeat;
        background-size: cover;
    }
    h3 {
        font-size: 16px;
        color: #bbd7f9;
        text-align: center;
    }
    p {
        font-size: 12px;
        color: rgba(128, 213, 255, 0.85);
        text-align: center;
    }
    &.earlyentity01 {
        left: 0;
    }
    &.earlyentity02 {
        left: 0;
    }
    &.earlyentity03 {
        left: 0;
    }
    &.earlyentity04 {
        left: 0;
    }
    &.earlyentity05 {
        margin-bottom: 6px;
    }
    &.emerentity01 {
        left: 0;
    }
    &.emerentity02 {
        left: 0;
    }
    &.emerentity031 {
        left: 0;
    }
    &.emerentity032 {
        left: 0;
    }
    &.emerentity04 {
        left: 0;
    }
    &.endentity01 {
        left: 0;
    }
    &.endentity02 {
        left: 0;
    }
`;

export const ScFlowLine = styled.span`
    position: absolute;
    z-index: 1;
    display: block;
    &.earlyline01 {
        top: 139px;
        left: 95px;
        width: 20px;
        height: 136px;
        cursor: pointer;
        mask-image: url(${earlyline01});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.earlyline02 {
        bottom: 68px;
        left: 182px;
        width: 42px;
        height: 71px;
        cursor: pointer;
        mask-image: url(${earlyline02});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.earlyline03 {
        top: 70px;
        left: 207px;
        width: 43px;
        height: 66px;
        cursor: pointer;
        mask-image: url(${earlyline03});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.earlyline04 {
        top: 61px;
        right: -30px;
        width: 56px;
        height: 52px;
        cursor: pointer;
        mask-image: url(${earlyline04});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.earlyline041 {
        top: 138px;
        right: 100px;
        width: 20px;
        height: 135px;
        cursor: pointer;
        mask-image: url(${earlyline041});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.earlyline051 {
        bottom: -30px;
        left: 320px;
        width: 648px;
        height: 34px;
        cursor: pointer;
        mask-image: url(${earlyline051});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerline01 {
        left: 184px;
        top: 70px;
        width: 29px;
        height: 66px;
        cursor: pointer;
        mask-image: url(${emerline01});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerline021 {
        left: 224px;
        top: 70px;
        width: 29px;
        height: 66px;
        cursor: pointer;
        mask-image: url(${emerline021});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerline022 {
        bottom: 70px;
        left: 184px;
        width: 43px;
        height: 68px;
        cursor: pointer;
        mask-image: url(${emerline022});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerline023 {
        left: -100px;
        top: 138px;
        width: 237px;
        height: 76px;
        cursor: pointer;
        mask-image: url(${emerline023});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerlinexc03 {
        top: 138px;
        right: 94px;
        width: 20px;
        height: 135px;
        cursor: pointer;
        mask-image: url(${emerlinexc03});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerlineyc03 {
        bottom: 30px;
        left: 164px;
        width: 120px;
        height: 20px;
        cursor: pointer;
        mask-image: url(${emerlineyc03});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.emerline04 {
        top: 70px;
        right: -26px;
        width: 53px;
        height: 273px;
        cursor: pointer;
        mask-image: url(${emerline04});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
    &.endline01 {
        top: 140px;
        left: 96px;
        width: 19px;
        height: 135px;
        cursor: pointer;
        mask-image: url(${endline01});
        mask-repeat: no-repeat;
        background-color: #1890ff;
    }
`;
