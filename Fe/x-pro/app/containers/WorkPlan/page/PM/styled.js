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
