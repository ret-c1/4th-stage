import styled from 'styled-components';

export const ScVulContent = styled.div`
    position: absolute;
    right: 0;
    top: 60px;
    width: 63%;
    height: calc(100% - 60px);
`;

export const ScVulTypeWrapper = styled.div`
    width: 70%;
    display: inline-block;
    vertical-align: top;
`;

export const ScVulTypeItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-item: center;
    margin-bottom: 15px;
`;

export const ScVulItemText = styled.span`
    opacity: 0.85;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    line-height: 16px;
`;

export const ScVulItemNumber = styled(ScVulItemText)`
    color: #15ccf8;
`;

export const ScVulDetail = styled.div`
    width: 50%;
    height: 100%;
    padding: 10px 15px;
    vertical-align: top;
    display: inline-block;
`;

export const ScVulDetailItem = styled(ScVulTypeItem)`
    display: flex;
    justify-content: space-between;
    align-item: center;
    margin-bottom: 5px;
`;

export const ScVulDetailText = styled(ScVulItemText)`
    opacity: 0.65;
    font-size: 12px;
    line-height: 20px;
`;

export const ScVulDetailItemNumber = styled(ScVulItemNumber)`
    opacity: 0.85;
    font-size: 12px;
    text-align: right;
    line-height: 20px;
`;
