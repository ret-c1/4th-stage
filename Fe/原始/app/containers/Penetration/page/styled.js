import styled from 'styled-components';
import { Button, Layout, Form, Card, Table } from 'antd';
export const { Content } = Layout;
export const { Meta } = Card;
export const ScContent = styled(Content)`
    margin: 21px 24px 24px 24px;
    padding: 24px 32px;
    background-color: #fff;
`;
export const ScButton = styled(Button)`
    margin-left: 5px;
`;
export const ScForm = styled(Form)`
    margin-bottom: 16px;
`;
export const StyledCard = styled(Card)`
    margin-top: 20px;
    margin-left: 20px;
    height: 250px;
    display: flex;
`;
export const StyledDiv = styled.div`
    margin-right: 400px;
`;
export const StyledTable = styled(Table)`
    margin-top: 20px;
`;
export const ScCard = styled(Card)`
    margin-bottom: 20px;
`;
