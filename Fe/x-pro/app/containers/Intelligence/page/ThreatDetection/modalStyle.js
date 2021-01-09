import styled from 'styled-components';
import { Col, Modal, Button } from 'antd';
const CustomCol = styled(Col)`
    margin-bottom: 16px;
`;
const CustomModal = styled(Modal)`
    & .ant-modal-body {
        padding: 0;
    }
`;
const BasicInfoWrapper = styled.div`
    width: 558px;
    margin: 40px auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    text-align: 'center';
`;
const GrayDiv = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    box-sizing: border-box;
`;
const AssetDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7px 13px 7px 12px;
    height: 35px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
`;

const ExtraButton = styled(Button)`
    border: none;
    background: transparent;
    margin-left: 13px;
    height: auto;
    line-height: 0;
    & .ant-btn:focus {
        background: transparent;
    }
    &.ant-btn:active {
        background: transparent;
    }
    &.ant-btn.active {
        background: transparent;
    }
    &:hover {
        background: transparent;
    }
`;

export { CustomCol, CustomModal, BasicInfoWrapper, GrayDiv, AssetDiv, ExtraButton };
