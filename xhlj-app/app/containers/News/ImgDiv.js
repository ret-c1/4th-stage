import styled from 'styled-components';

const ImgDiv = styled.div`
    /* width: 140.4px;
    height: 80px;
    overflow: hidden; */
    width: 140.4px;
    height: 80px;
    background-image: ${(props) => {
        const { src } = props;
        return src !== '' ? `url(${src}?imageView2/1/w/140/h/80|imageslim)` : '';
    }};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`;

export default ImgDiv;
