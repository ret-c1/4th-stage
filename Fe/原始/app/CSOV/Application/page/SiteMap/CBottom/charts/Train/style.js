import styled from 'styled-components';

export const SctrainWrapper = styled.div`
    padding: 13px 22px 12px 12px;
    width: 100%;
    height: calc(100% - 28px);
    box-sizing: border-box;
`;

export const ScHeader = styled.div`
    width: 100%;
    background: rgba(53, 144, 255, 0.07);
    margin-bottom: 1em;
`;

export const ScHeaderInfo = styled.span`
    display: inline-block;
    vertical-align: top;
    opacity: 0.85;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    padding: 6px 0;
`;

export const ScContent = styled.div`
    margin-bottom: 0.8em;
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #80d5ff;
    letter-spacing: 0;
    padding: 0;
    text-align: center;
`;

export const ScContentInfo = styled.span`
    display: inline-block;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
