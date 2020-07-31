import styled from 'styled-components';

const UserName = styled.div`
    background: linear-gradient(to right, #2fb5c9, #136fa7);
    width: 70%;
    padding: 2px 5px;
    padding-left: 15px;
    font-size: 15px;
    position: relative;
    top: 136px;
    z-index: 2;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 0 100%);
`;

export default UserName;
