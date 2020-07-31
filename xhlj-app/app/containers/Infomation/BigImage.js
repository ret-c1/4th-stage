import styled from 'styled-components';

const BigImage = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 100%;
    /* height: 100px; */
`;

export default BigImage;
