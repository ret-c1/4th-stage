import styled from 'styled-components';
import { Row } from 'antd';

const ScOuter = styled.div`
    width: 330px;
    height: 330px;
    position: relative;
`;
const ScCenter = styled.div`
    color: #fff;
    width: 80px;
    height: 100px;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 20px;
    margin: auto;
}
`;
const ScSunrise = styled.div`
    width: 330px;
    height: 310px;
    margin-top: 20px;
`;
const ScRow = styled(Row)`
    color: #fff;
    line-height: 10px;
    margin-top: 15px;
    margin-left: 35px;
`;
const ScColor = styled.div`
    width: 10px;
    height: 10px;
    float: left;
`;
const ScSpan = styled.div`
    margin-left: 28px;
    opacity: 0.65;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
`;
const ScCol = styled.div`
    margin-left: 20px;
`;
const ScNumber = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
`;
const ScFont = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    text-align: right;
`;

export { ScOuter, ScCenter, ScSunrise, ScRow, ScColor, ScSpan, ScCol, ScNumber, ScFont };
