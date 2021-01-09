import styled from 'styled-components';
import { Steps, Collapse } from 'antd';

export const ScSteps = styled(Steps)`
    width: 60%;
    margin: 20px auto;
`;
export const ScStepWrapper = styled.div`
    width: 100%;
    background: #fff;
    overflow: hidden;
`;
export const ScItWrapper = styled.div`
    margin: 21px 24px 16px 24px;
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
export const ScCustomCollapse = styled(Collapse)`
    margin-bottom: 16px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;
