import styled from 'styled-components';
import { Button, Layout, Form, Card, Table, Tree, Tabs } from 'antd';
export const { Content } = Layout;
export const { Meta } = Card;
export const ScContent = styled(Content)`
    margin: 21px 24px 24px 24px;
    padding: 24px 32px;
    background-color: #fff;
`;
export const ScHeader = styled(Content)`
    padding: 12px 28px;
    background-color: #fff;
`;
export const ScButton = styled(Button)`
    margin-left: 5px;
`;
export const ScForm = styled(Form)`
    margin-bottom: 16px;
`;
export const ScCard = styled(Card)`
    position: relative;
    z-index: 1;
    margin-top: 20px;
    margin-left: 20px;
    height: 250px;
    display: flex;
    h1,
    p,
    span {
        cursor: pointer;
    }
    button {
        position: absolute;
        z-index: 1;
        right: 10px;
        bottom: 10px;
    }
`;

export const ScTable = styled(Table)`
    margin-top: 20px;
`;

export const ScTabs = styled(Tabs)`
    & .ant-tabs-bar,
    .ant-tabs-top-bar {
        padding: 0 30px;
        background: #ffffff;
    }
`;

export const ScTree = styled(Tree)`
    .ant-tree-treenode {
        width: 100%;
    }
    .ant-tree-node-content-wrapper {
        width: 100%;
    }
`;

export const ScSteps = styled.div`
    margin-bottom: 20px;
`;
