import styled from 'styled-components';

const Logo = styled.div`
    width: 235px;
    height: 170px;
    margin: auto;
    background-image: url('http://aht-cdn.dbappsecurity.com.cn/checkin_logo.png');
    background-repeat: no-repeat;
    background-position: right top;
    background-size: cover;
    /* margin-bottom: 100px; */
    transition: all 0.5s ease;
    transform: scale(${(props) => (props.full !== 'inviter' ? '1' : '0.5')});
`;

export default Logo;
