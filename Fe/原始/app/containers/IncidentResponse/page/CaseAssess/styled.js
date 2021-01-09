import styled from 'styled-components';
import { Collapse } from 'antd';

export const ScCustomStep2Collapse = styled(Collapse)`
    margin-bottom: 16px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;
export const ScFooterWrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 20;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;
export const ScItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
`;
