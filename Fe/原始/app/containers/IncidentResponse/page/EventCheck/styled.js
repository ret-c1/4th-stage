import { Collapse } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

export const ScCustomCollapse = styled(Collapse)`
    box-sizing: border-box;
    background: #f1f2f5;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;
export const ScItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;
export const ScCustomPanel = styled(Panel)`
    margin-bottom: 12px;
    overflow: hidden;
    border: 1px solid #e9e9e9;
    background: #fff;
`;
