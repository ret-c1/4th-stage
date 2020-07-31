import styled from 'styled-components';

// 时间轴的圆
const MeetCril = styled.span`
    background-color: #00c6ff;
    width: 14px;
    height: 14px;
    display: inline-block;
    position: relative;
    left: ${(props) => {
        const { moreleft } = props;
        return moreleft ? '-38px' : '-23px';
    }};
    border-radius: 50%;
`;

export default MeetCril;
