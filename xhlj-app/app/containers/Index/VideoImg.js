import styled from 'styled-components';

const VideoImg = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 100%;
    height: 200px;
`;

export default VideoImg;
