import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;
export const ScLayout = styled(Layout)`
    width: 100%;
    min-width: 1200px;
    min-height: 100vh;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: rgba(0, 0, 0, 0.85);
`;
export const ScContent = styled(Content)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const ScFont = styled.div`
    text-align: center;
`;
export const ScFontTop = styled.div`
    margin-top: 20px;
`;
export const ScFontBottom = styled.div`
    margin-top: 8px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
`;
export const ScInnerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 18px 116px 30px 110px;
    background: #fff;
    border-radius: 2px;
    padding-top: 64px;
`;
export const ScRegister = styled.div`
    width: 368px;
    margin: 0 auto;
`;
export const ScPassword = styled.div`
    width: 368px;
    margin: 50px auto;
`;

export const ScFontInner = styled.div`
    font-size: 14px;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.45);
`;
