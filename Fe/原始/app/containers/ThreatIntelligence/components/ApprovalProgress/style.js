import styled from 'styled-components';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export const ScItWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background-color: #fff;
`;
export const ScAssessWrapper = styled.div`
    z-index: 20;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;

export const ScCustomCollapse = styled(Collapse)`
    margin-bottom: 16px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;

export const ScCustomChildCollapse = styled(Collapse)`
    margin-bottom: 12px;
    background: #fff;
    overflow: hidden;
    & .ant-collapse-header {
        border-bottom: 1px solid #d9d9d9;
        background: #fafafa;
    }
    & .ant-collapse-item-active {
        border-bottom: 1px solid #e8e8e8;
    }
    & .ant-collapse-content-inactive {
        border-bottom: 0;
    }
    & .ant-collapse-content {
        padding-left: 24px;
    }
`;

export const ScCustomChildPanel = styled(Panel)`
    margin-bottom: 12px;
    background: #fff;
    overflow: hidden;
    border: 1px solid #e9e9e9;
`;

export const ScTitle = styled.span`
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
`;

export const ScTimeLineDiv = styled.div`
    margin-left: 33px;
`;
