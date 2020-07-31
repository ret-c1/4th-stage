import styled from 'styled-components';

const TitleIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: ${(props) => {
        const { which } = props;
        return which === '特色内容' ? '16px' : '20px';
    }};
    height: ${(props) => {
        const { which } = props;
        return which === '精彩时刻' || which === '精彩直播' || which === '精彩回顾'
            ? '12px'
            : '20px';
    }};
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    position: relative;
    top: -1px;
`;

export default TitleIcon;
