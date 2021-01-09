import styled from 'styled-components';
import { Layout, Button, Card } from 'antd';
export const { Content } = Layout;

export const ScFooterToolbar = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;

export const ScSteps = styled.div`
    width: 840px;
    margin-left: 14%;
`;
export const ScCard = styled(Card)`
    height: calc(100vh - 64px - 54px - 96px - 56px - 30px);
    margin: 14px 24px 24px;
    overflow: auto;
`;

export const ScCardDetail = styled(Card)`
    margin: 16px 24px;
`;

// 资产列表样式
export const ScContent = styled(Content)`
    margin: 21px 24px 24px 24px;
    padding: 24px 32px;
    background-color: #fff;
`;
export const ScSpan = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    text-align: right;
    line-height: 22px;
`;
export const ScButton = styled(Button)`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
`;
