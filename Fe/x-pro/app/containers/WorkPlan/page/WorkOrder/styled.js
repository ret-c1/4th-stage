import styled from 'styled-components';
import { Form } from 'antd';
export const Count = styled.span`
    width: 27px;
    height: 28px;
    font-size: 24px;
    font-family: HelveticaNeue-Medium, HelveticaNeue;
    font-weight: 500;
    color: rgba(24, 144, 255, 1);
    line-height: 29px;
`;

export const UploadStep = styled(Form.Item)`
    .ant-form-item-no-colon,
    .ant-form-item-control-input-content {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
    }
`;
export const ScFooterToolbar = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;
