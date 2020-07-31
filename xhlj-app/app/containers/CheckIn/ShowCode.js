import styled from 'styled-components';

const ShowCode = styled.div`
    width: 300px;
    height: 300px;
    margin: auto;
    text-align: center;
    display: ${(props) => (props.role === 'inviter' ? 'block' : 'none')};
    transition: all 0.3s ease;
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

export default ShowCode;
