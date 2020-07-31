import styled from 'styled-components';

const ContentDiv = styled.div`
    padding: 15px;
    color: #e4e4e4;
    font-size: 14px;
    min-height: 85vh;
    padding-top: ${(props) => {
        const { top } = props;
        return top ? '30px' : '';
    }};
`;

export default ContentDiv;
