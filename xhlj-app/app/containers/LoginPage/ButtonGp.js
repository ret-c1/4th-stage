import styled from 'styled-components';

const Buttongroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > button {
        display: inline-block;
        border: 0;
        outline: 0;
        background-color: #1890ff;
        color: #fff;
        border-radius: 4px;
        height: 40px;
        margin: 0 20px;
        padding: 0 25px;
    }
`;

export default Buttongroup;
