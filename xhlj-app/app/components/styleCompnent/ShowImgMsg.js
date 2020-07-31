import styled from 'styled-components';

const ShowImgMsg = styled.span`
    display: block;
    line-height: 0;
    width: 100%;
    max-width: 375px;
    height: 100px;
    margin: 0 auto;
    background-image: ${(props) => `url(${props.sorce})`};
    background-repeat: no-repeat;
    background-position: top center;
    background-size: auto;
`;

export default ShowImgMsg;
