import styled from 'styled-components';
import { menu } from 'antd';
export const ScModalSubmit = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 56px;
    padding: 10px 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;

export const ScMenu = styled(menu)`
    &.ant-menu-inline {
        border-right: 0px solid #f0f0f0;
    }
`;
