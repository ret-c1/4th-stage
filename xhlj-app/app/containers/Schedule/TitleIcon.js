import styled from 'styled-components';

const TitleIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-left: 15px;
    display: ${(props) => {
        const { videourl } = props;
        return videourl === '' ? 'none' : 'inline-block';
    }};
`;

export default TitleIcon;
