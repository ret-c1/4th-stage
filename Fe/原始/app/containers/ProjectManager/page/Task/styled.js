import styled from 'styled-components';
import { Modal, Divider } from 'antd';

export const ScWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
    & .ant-tabs-top-bar {
        padding: 0;
    }
    & .ant-tag {
        font-size: 14px;
        margin-right: 40px;
        margin-bottom: 16px;
    }
    & .ant-tag-checkable {
        font-size: 14px;
        margin-right: 40px;
        margin-bottom: 16px;
    }
`;

export const ScTitle = styled.span`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    font-weight: bold;
    width: 100%;
`;

export const ScTagWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-item: flex-start;
    margin-bottom: 6px;
    height: ${(props) => (props.isMore ? 'auto' : '30px')};
    overflow: ${(props) => (props.isMore ? 'visible' : 'hidden')};
`;

export const ScTagLeft = styled.div`
    flex: 0 0 100px;
`;
export const ScTagMiddle = styled.div`
    flex: 1 0;
`;
export const ScTagRight = styled.div`
    text-align: right;
    flex: 0 0 120px;
`;

export const ScInfoLeft = styled.div`
    flex: 1 0;
    padding-left: 88px;
`;
export const ScInfoRight = styled.div`
    flex: 0 0 100px;
`;
export const ScInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    background: rgba(0, 0, 0, 0.04);
`;
export const ScCustomModal = styled(Modal)`
    & .ant-modal-body {
        padding: 0;
        max-height: 70vh;
        overflow: scroll;
    }
`;

export const ScDivider = styled(Divider)`
    margin: 5px;
`;
// export const ScPubModal = styled(PubModal)`
//     & .ant-modal-body {
//         padding: 0;
//     }
// `;
