import styled from 'styled-components';

const MediaIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 100px;
    height: 40px;
    display: inline-block;
    margin: 8px;
`;

export default MediaIcon;
