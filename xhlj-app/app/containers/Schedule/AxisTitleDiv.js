import styled from 'styled-components';

const AxisTitleDiv = styled.div`
    margin-right: 15px;
    margin-left: 15px;
    padding-top: ${(props) => {
        const { nomargin } = props;
        return nomargin ? '2px' : '20px';
    }};
    text-align: center;
    color: #00c6ff;
`;

export default AxisTitleDiv;
