import styled from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;
// const { Meta } = Card;
const ScContent = styled(Content)`
    margin: 21px 24px 24px 24px;
    padding: 24px 32px;
    background-color: #fff;
`;
const SCfont = styled.span`
    font-size: '30px';
`;
export { ScContent, SCfont };
