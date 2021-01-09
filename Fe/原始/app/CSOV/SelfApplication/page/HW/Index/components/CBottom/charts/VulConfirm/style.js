import styled from 'styled-components';

const ScChart = styled.div`
    width: 34.5%;
    height: 100%;
    text-align: center;
    display: inline-block;
    vertical-align: top;
    position: relative;
`;

const ScStroke = styled.ul`
    width: 65.5%;
    display: inline-block;
    vertical-align: top;
    padding-left: 0px;
    padding: 22px 0;
`;

const ScStrokeItem = styled.li`
    width: 31.5%;
    height: 100%;
    float: right;
    margin-left: 1%;
    border-left: 2px solid ${(props) => props.color};
    list-style: none;
`;

const StrokeCommon = styled.p`
    margin-bottom: 0;
    color: white;
    font-size: 1.6em;
    margin-left: 8px;
`;

const ScStrokeNumber = styled(StrokeCommon)`
    font-family: PingFangSC-Regular;
`;

const ScStrokeLevel = styled(StrokeCommon)`
    opacity: 0.65;
`;

const ScTotalNumber = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: #cbcbcb;
    position: absolute;
    left: 38%;
    top: 50%;
`;
const ScFontBox = styled.div`
    position: relative;
    height: 20px;
`;

const ScDone = styled.div`
    width: 111px;
    position: absolute;
    left: 19px;
    background-color: rgba(53, 144, 255, 0.2);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #24b6ff;
    padding-left: 50px;
`;
const ScUnDone = styled.div`
    width: 111px;
    position: absolute;
    right: 39px;
    background-color: rgba(255, 115, 142, 0.13);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    padding-left: 15px;
    color: #ff738e;
`;
export {
    ScChart,
    ScStroke,
    ScStrokeItem,
    ScStrokeNumber,
    ScStrokeLevel,
    ScTotalNumber,
    ScFontBox,
    ScDone,
    ScUnDone,
};
