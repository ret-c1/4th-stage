import styled from 'styled-components';
import { Layout, Tabs } from 'antd';
export const { Content } = Layout;

export const ScTableContent = styled.div`
    margin: 10px 0px;
    background: #fff;
    border-radius: 2px;
    padding: 30px 30px;
`;
export const ScArrowUp = styled(Content)`
    height: 20px;
    display: inline-block;
    transform: rotate(270deg);
    color: #1890ff;
`;
export const ScTabs = styled(Tabs)`
    .ant-tabs-nav {
        background: #fff;
        padding: 0 20px;
    }
    .ant-tabs-content-holder {
        margin: 0 20px;
    }
`;
