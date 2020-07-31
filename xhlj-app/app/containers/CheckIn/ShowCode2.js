import styled from 'styled-components';

const ShowCode2 = styled.div`
    width: 200px;
    height: 200px;
    margin: auto;
    text-align: center;
    display: block;
    transition: all 0.3s ease;
    margin-top: -10px;
    & > img {
        width: 100%;
    }
    & > div {
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding-top: 120px;
        & > span {
            padding-top: 20px;
            display: block;
        }
    }
`;

export default ShowCode2;
