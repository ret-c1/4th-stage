import styled from 'styled-components';

const Icon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 100%;
    margin-left: ${(props) => {
        const { margin } = props;
        return margin ? '-2em' : '';
    }};
`;

export default Icon;
