import styled from 'styled-components';

const ContentMain = styled.div`
    line-height: 1.7;
    font-size: 14px;
    text-indent: 2em;
    color: #e4e4e4;
    margin-top: ${(props) => {
        const { top } = props;
        return top ? '15px' : '';
    }};
    margin-bottom: 60px;
    & img {
        width: 100%;
        margin-left: -2em;
    }
`;

export default ContentMain;
