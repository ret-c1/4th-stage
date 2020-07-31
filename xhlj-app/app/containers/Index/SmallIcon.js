import styled from 'styled-components';

const SmallIcon = styled.img.attrs(({ src, alt }) => ({
    src,
    alt,
}))`
    width: ${(props) => {
        const { which } = props;
        return which === '特色内容' ? '12px' : '14px';
    }};
    height: ${(props) => {
        const { which } = props;
        return which === '精彩时刻' ? '8px' : '14px';
    }};
    display: inline-block;
    margin-right: 6px;
`;

export default SmallIcon;
