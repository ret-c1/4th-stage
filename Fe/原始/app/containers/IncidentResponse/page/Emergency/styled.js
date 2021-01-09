import styled from 'styled-components';
import { Steps, Collapse, Col } from 'antd';

const { Panel } = Collapse;

export const ScSteps = styled(Steps)`
    width: 60%;
    margin: 20px auto;
`;
export const ScEmergencySteps = styled(Steps)`
    width: 70%;
    margin: 20px auto;
`;
export const ScStepWrapper = styled.div`
    width: 100%;
    background: #fff;
    overflow: hidden;
`;
export const ScItWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    overflow: hidden;
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
    box-sizing: border-box;
    background: #f1f2f5;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;
export const ScCustomPanel = styled(Panel)`
    margin-bottom: 12px;
    overflow: hidden;
    border: 1px solid #e9e9e9;
    background: #fff;
`;
export const ScCustomStep2Collapse = styled(Collapse)`
    margin-bottom: 16px;
    background: #fff;
    box-sizing: border-box;
    border-bottom: none;
    & .ant-collapse-header {
        border-bottom: 1px solid #e8e8e8;
    }
`;

export const ScTipsCol = styled(Col)`
    padding: 9px 0px 9px 16px;
    background: #bae7ff;
    border: 1px solid #bae7ff;
    border-radius: 4px;
    border-radius: 4px;
`;
export const ScTipWrapper = styled.div`
    padding: 9px 0px 9px 16px;
    background: #bae7ff;
    border: 1px solid #bae7ff;
    border-radius: 4px;
    border-radius: 4px;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 16px;
`;
export const ScAssessPerson = styled.div`
    height: 48px;
    width: 100%;
    margin-top: 16px;
    line-height: 32px;
    padding: 8px 0 8px 32px;
    box-sizing: border-box;
    background: #fff;
`;
