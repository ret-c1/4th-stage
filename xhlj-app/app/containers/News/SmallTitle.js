import styled from 'styled-components';

const SmallTitle = styled.div`
    color: #b1b1b1;
    font-size: 10px;
    text-align: ${(props) => {
        const { right } = props;
        return right ? 'right' : '';
    }};
`;

export default SmallTitle;
