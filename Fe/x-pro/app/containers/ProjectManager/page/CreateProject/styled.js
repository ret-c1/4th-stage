import styled from 'styled-components';
import { Card } from 'antd';

export const Title = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
`;
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

export const ScCard = styled(Card)`
    margin: 14px 24px;
`;
