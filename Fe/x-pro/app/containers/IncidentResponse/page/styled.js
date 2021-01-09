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
    padding: 20px 0;
`;

export const ScItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;
export const ScTab = styled(Tabs)`
    background-color: #fff;
    padding-left: 24px;
    & .ant-tabs-bar {
        margin-bottom: 0px;
    }
`;
export const ScButton = styled(Button)`
    padding: 0 8px;
`;
export const ScDivider = styled(Divider)`
    margin: 0;
`;
export const ScBottom = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: row-reverse;
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
export const ScImportInner = styled.div`
    width: 60%;
    height: 200px;
`;
export const ScImport = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
`;
export const ScTableContent = styled.div`
    margin: 24px 0px;
    background: #fff;
    border-radius: 2px;
    padding: 30px 30px;
`;
export const ScGray = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 30px;
    background-color: rgba(0, 0, 0, 0.04);
    line-height: 40px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
`;
export const ScCopy = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
`;
