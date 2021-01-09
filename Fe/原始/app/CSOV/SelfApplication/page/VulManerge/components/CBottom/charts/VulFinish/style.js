import styled from 'styled-components';

const ScFinishHead = styled.div`
    width: 100%;
    height: 66px;
    background: rgba(53, 144, 255, 0.1);
    border-top: 1px solid rgba(53, 144, 255, 0.3);
    border-bottom: 1px solid rgba(53, 144, 255, 0.3);
    padding: 8px;
    margin-bottom: 1.4em;
    margin-top: 30px;
`;

const ScHeadTitle = styled.p`
    width: 100%;
    margin-bottom: 8px;
`;

const ScTitleText = styled.span`
    font-size: 1.6em;
    color: #59c7fe;
    display: inline-block;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const ScInfluence = styled.p`
    display: inline-block;
    vertical-align: top;
    padding-left: 47%;
`;

const ScInfluenceType = styled.span`
    color: ${(props) => props.color};
    margin-right: 1em;
    font-size: 1.4em;
`;

const ScFinishContent = styled.div`
    margin-bottom: 0.8em;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #80d5ff;
    letter-spacing: 0;
    padding: 0;
`;

const ScContentInfo = styled.span`
    display: inline-block;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 16px;
    color: #ffffff;
`;

const ScContentIndex = styled.span`
    background: rgba(1, 240, 255, ${(props) => props.opacity});
    display: inline-block;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 0 4px 4px 0;
    border-radius: 0px 4px 4px 0px;
    font-size: 14px;
    color: #ffffff;
    width: 20px;
    height: 20px;
    text-align: center;
    margin-right: 3.2em;
`;

const ScFixed = styled.span`
    color: ${(props) => props.color};
    width: 33%;
    display: inline-block;
    vertical-align: top;
`;

export {
    ScFinishHead,
    ScHeadTitle,
    ScTitleText,
    ScInfluence,
    ScInfluenceType,
    ScFinishContent,
    ScContentInfo,
    ScContentIndex,
    ScFixed,
};
