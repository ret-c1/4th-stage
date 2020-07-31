import styled from 'styled-components';

const Icon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 18px;
`;

export default Icon;
