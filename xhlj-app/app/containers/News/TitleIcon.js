import styled from 'styled-components';

const TitleIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-left: 10px;
    margin-right: 4px;
    margin-top: -4px;
`;

export default TitleIcon;
