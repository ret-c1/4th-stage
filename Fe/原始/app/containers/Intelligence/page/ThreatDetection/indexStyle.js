import styled from 'styled-components';
import { Card, Button, Row, Col } from 'antd';

const ItWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background-color: #fff;
`;

const CustomCard = styled(Card)`
    margin: 0 24px 24px 24px;
    .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
        width: 100%;
    }
`;

const ExtraButton = styled(Button)`
    border: none;
    background: transparent;
    margin-left: 13px;
    &:hover {
        background: transparent;
    }
`;

const TagRow = styled(Row)`
    height: ${(props) => (props.isactive === 'true' ? 'auto' : '25px')};
    padding-bottom: 10px;
    overflow: hidden;
    transition: all 0.3s;
`;

const TipsCol = styled(Col)`
    padding: 9px 0px 9px 16px;
    background: #bae7ff;
    border: 1px solid #bae7ff;
    border-radius: 4px;
    border-radius: 4px;
`;

export { ItWrapper, CustomCard, ExtraButton, TipsCol, TagRow };
