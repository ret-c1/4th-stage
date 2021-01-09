import styled from 'styled-components';

const ScVulLabel = styled.ul`
    width: 100%;
    height: 75px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);
    padding: 10px 0;
    padding-left: 44px;
`;

const ScVulItem = styled.li`
    // flex: 0 0 31.5%;
    float: left;
    width: 31.5%;
    height: 100%;
    margin-right: 1%;
    list-style: none;
`;

const ScVulItemLevel = styled.span`
    font-size: 19px;
    color: ${(props) => props.color};
    display: inline-block;
    width: 19px;
    height: 100%;
    vertical-align: top;
    margin: 0 3px;
`;

const ScVulItemHandle = styled.div`
    width: calc(100% - 41px);
    height: 100%;
    display: inline-block;
    vertical-align: top;
`;

const ScHandleTime = styled.p`
    font-size: 1.4em;
    padding-top: 6px;
    margin-bottom: 0px;
    text-align: center;
    color: white;
`;

const ScHandleTimeText = styled.p`
    opacity: 0.65;
    font-size: 1.4em;
    padding-bottom: 6px;
    text-align: center;
    color: white;
`;
const ScSide = styled.div`
    width: 50px;
    height: 400px;
    float: left;
    color: #fff;
`;
const ScTotal = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3590ff;
    margin-top: 100px;
`;
const ScShare = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #24b6ff;
    margin-top: 50px;
`;
const ScHandle = styled.div`
    opacity: 0.85;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #01f0ff;
    margin-top: 50px;
`;
export {
    ScVulLabel,
    ScVulItem,
    ScVulItemLevel,
    ScVulItemHandle,
    ScHandleTime,
    ScHandleTimeText,
    ScSide,
    ScTotal,
    ScShare,
    ScHandle,
};
