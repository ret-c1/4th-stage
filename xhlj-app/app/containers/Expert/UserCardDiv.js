import styled from 'styled-components';

const UserCardDiv = styled.div`
    border: 2px solid #00c6ff;
    background-color: #00c6ff;
    width: 150px;
    height: 200px;
    margin-bottom: 25px;
    clip-path: polygon(
        20px 0,
        100% 0,
        100% calc(100% - 20px),
        calc(100% - 20px) 100%,
        0 100%,
        0 20px
    );
`;

export default UserCardDiv;
