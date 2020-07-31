import styled from 'styled-components';

const ZBDiv = styled.div`
    margin-right: 15px;
    margin-left: 15px;
    text-align: right;
    color: #00c6ff;
    padding-top: 10px;
    margin-left: 25px;
    border-left: ${(props) => {
        const { border } = props;
        return border ? '1px dashed #00c6ff' : '';
    }};
`;

export default ZBDiv;
