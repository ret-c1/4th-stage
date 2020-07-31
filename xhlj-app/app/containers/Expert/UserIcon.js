import styled from 'styled-components';

const UserIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 100%;
    height: 196px;
    display: inline-block;
    z-index: 1;
    position: relative;
    top: -21px;
    clip-path: polygon(
        20px 0,
        100% 0,
        100% calc(100% - 20px),
        calc(100% - 20px) 100%,
        0 100%,
        0 20px
    );
`;

export default UserIcon;
