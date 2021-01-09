import styled from 'styled-components';
import { Button, Collapse, Descriptions } from 'antd';
import Client from '../../asset/client.png';

const { Panel } = Collapse;

export const ScAssessInfo = styled.div`
    padding: 8px 32px 16px 24px;
    background: #fff;
    margin-bottom: 24px;
`;

export const ScHeadIcon = styled.div`
    width: 28px;
    height: 28px;
    display: inline-block;
    background: url(${Client});
`;

export const ScButton = styled(Button)`
    margin-right: 8px;
`;

export const ScMoreButton = styled(Button)`
    margin-right: 8px;
    position: absolute;
    right: 0;
`;

export const ScCustomPanel = styled(Panel)`
    margin-bottom: 12px;
    overflow: hidden;
    border: 1px solid #e9e9e9;
    background: #fff;
`;

export const ScCustomCollapse = styled(Collapse)`
    box-sizing: border-box;
    background: #f1f2f5;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;

export const ScDescriptions = styled(Descriptions)`
    .ant-descriptions-row > th,
    .ant-descriptions-row > td {
        padding-bottom: 30px;
    }
`;
