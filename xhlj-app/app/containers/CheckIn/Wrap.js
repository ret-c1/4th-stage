import styled from 'styled-components';

const Wrap = styled.div`
    background-image: url('http://aht-cdn.dbappsecurity.com.cn/background.png');
    background-repeat: no-repeat;
    background-position: right top;
    background-size: cover;
    padding-bottom: 70px;
    padding-top: ${(props) => (props.full !== 'inviter' ? '50px' : '0')};
    min-height: 100vh;
    margin: 0 auto;
`;

export default Wrap;
