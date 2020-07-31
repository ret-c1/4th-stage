import styled from 'styled-components';

const Rectangle = styled.div`
    background-color: #00c6ff;
    width: 30px;
    height: 30px;
    position: relative;
    left: ${(props) => {
        const { iseven } = props;
        return iseven === 'odd' ? '-30px' : '298px';
    }};
    top: -110px;
`;

export default Rectangle;
