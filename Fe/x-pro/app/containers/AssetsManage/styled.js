import styled from 'styled-components';
import { Layout, Button, Card, Steps } from 'antd';
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
    /* 覆盖弹出框默认样式 */
    .ant-popover .ant-popover-inner {
        background: rgba(0, 0, 0, 0.75);
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
            0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .ant-popover.ant-popover-placement-top .ant-popover-arrow {
        border-right-color: rgba(0, 0, 0, 0.75);
        border-bottom-color: rgba(0, 0, 0, 0.75);
    }
    .ant-popover.ant-popover-placement-bottom .ant-popover-arrow {
        border-top-color: rgba(0, 0, 0, 0.75);
        border-left-color: rgba(0, 0, 0, 0.75);
    }
    .ant-popover .ant-popover-inner-content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 22px;
    }
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
export const AssetsValueSteps = styled(Steps)`
    &.ant-steps .ant-steps-dot .ant-steps-item-process .ant-steps-item-icon,
    &.ant-steps-dot.ant-steps-small .ant-steps-item-process .ant-steps-item-icon {
        transform: scale(1.3);
        border-color: #1890ff;
    }
    &.ant-steps .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: white;
        border: 2px solid #91d5ff;
    }
    &.ant-steps .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: #ffffff;
        border: 2px solid rgba(0, 0, 0, 0.09);
    }
    &.ant-steps
        .ant-steps-item-active
        .ant-steps-item-icon
        > .ant-steps-icon
        .ant-steps-icon-dot.ant-popover-open {
        border-color: #1890ff;
    }
    &.ant-steps .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: white;
        border: 2px solid #91d5ff;
    }
    &.ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
        background: #69c0ff;
    }
`;
export const FormItemSpace = styled.div`
    margin-bottom: 60px;
`;
