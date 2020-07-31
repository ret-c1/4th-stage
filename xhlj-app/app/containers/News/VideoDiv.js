import styled from 'styled-components';

const VideoDiv = styled.div`
    height: 180px;
    width: 100%;
    background-image: ${(props) => {
        const { src } = props;
        return src !== ''
            ? `url(${src})`
            : 'url(http://aht-cdn.dbappsecurity.com.cn/FlzyvHfWHMBlkB0QYHhj77BicQ8s)';
    }};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
`;

export default VideoDiv;
