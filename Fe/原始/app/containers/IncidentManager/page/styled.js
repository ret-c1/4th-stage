import styled from 'styled-components';
import { Tabs, Button, Divider } from 'antd';

export const ScTabWrap = styled.div`
    background: #fff;
    & .ant-tabs-bar {
        border: 0;
        margin: 0;
        padding: 0 24px;
    }
    & .ant-tabs-nav-container {
        font-size: 16px;
    }
`;

export const ScContent = styled.div`
    margin: 24px;
    background: #fff;
    border-radius: 2px;
    padding: 20px;
`;

export const ItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;
export const StyledTab = styled(Tabs)`
    background-color: #fff;
    padding-left: 24px;
    & .ant-tabs-bar {
        margin-bottom: 0px;
    }
`;
export const ScButton = styled(Button)`
    padding: 0 8px;
`;
export const StyledDivider = styled(Divider)`
    margin: 0;
`;
