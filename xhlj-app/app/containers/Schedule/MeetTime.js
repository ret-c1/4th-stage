import styled from 'styled-components';

const MeetTime = styled.span`
    color: ${(props) => {
        const { color } = props;
        return color === 'true' ? '#e4e4e4' : '#00c6ff';
    }};
    display: inline-block;
    margin-right: ${(props) => {
        const { right } = props;
        return right ? '5px' : '';
    }};
    font-size: ${(props) => {
        const { big15 } = props;
        return big15 ? '15px' : '';
    }};
    line-height: ${(props) => {
        const { linheight } = props;
        return linheight ? '1.8' : '';
    }};
`;

export default MeetTime;
