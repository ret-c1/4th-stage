import styled from 'styled-components';
import { Descriptions } from 'antd';
export const TopCardIcon = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    background: rgba(24, 144, 255, 1);
    border-radius: 4px;
    > span {
        color: #fff;
    }
    margin-right: 16px;
`;
export const TopCardTitle = styled.span`
    width: 120px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
`;

export const TopDescriptions = styled(Descriptions)`
    .ant-descriptions-title {
        > span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 28px;
            height: 28px;
            background: rgba(24, 144, 255, 1);
            border-radius: 4px;
            color: #fff;
            margin-right: 16px;
        }
        > h1 {
            display: inline;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
        }
    }
    .ant-descriptions-view {
        padding-left: 44px;
    }
`;
