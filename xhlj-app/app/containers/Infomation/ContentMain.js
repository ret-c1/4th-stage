import styled from 'styled-components';

const ContentMain = styled.div`
    line-height: 2;
    font-size: 13px;
    text-indent: 2em;
    color: #e4e4e4;
    margin-top: ${(props) => {
        const { top } = props;
        return top ? '15px' : '';
    }};
`;

export default ContentMain;
