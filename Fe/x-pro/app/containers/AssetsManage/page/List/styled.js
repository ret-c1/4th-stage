import styled from 'styled-components';
import { Checkbox, Radio } from 'antd';
// export const { Content } = Layout;
export const ScI = styled.div`
    // display: inline-block;
    // width: 15px;
    // height: 7px;
    // // background-color: yellow;
    // position: absolute;
    // top: 12px;
    // right: 0px;
    // overflow: hidden;
`;
export const ScS = styled.s`
    // font: 400 15px/15px '宋体';
    // position: absolute;
    // top: -6px;
    // right: 0;
`;
export const RoundBtn = styled(Radio.Button)`
    margin: 0 10px;
`;
export const MessageType = styled(Checkbox.Group)`
    margin: 0 20px;
    .ant-checkbox-group-item {
        margin: 20px;
    }
`;
