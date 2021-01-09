import styled from 'styled-components';
import { Tabs } from 'antd';

export const ScTabs = styled(Tabs)`
    & .ant-tabs-bar,
    .ant-tabs-top-bar {
        padding: 0 30px;
        background: #ffffff;
    }
`;
export const ScSearch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;
export const ScSearchLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;
export const ScModalSubmit = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 56px;
    padding: 10px 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;
