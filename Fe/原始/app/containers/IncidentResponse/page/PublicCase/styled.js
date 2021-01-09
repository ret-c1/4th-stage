import styled from 'styled-components';
import { Layout } from 'antd';
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
export const ScBackground = styled(Content)`
    background-color: #fff;
    width: 100%;
    height: 45px;
    position: absolute;
`;
