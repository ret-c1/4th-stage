import styled from 'styled-components';

const TitleNotAll = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
    display: block;
    color: ${(props) => {
        const { nocolor } = props;
        return nocolor ? '#b1b1b1' : '#00c6ff';
    }};
    font-size: 13px;
`;

export default TitleNotAll;
