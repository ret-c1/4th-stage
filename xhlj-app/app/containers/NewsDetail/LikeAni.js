import styled, { keyframes, css } from 'styled-components';

const fadein = keyframes`
    10% {
        opacity: 0.9;
        top: -110px;
    }
    20% {
        opacity: 0.8;
        top: -120px;
    }
    30% {
        opacity: 0.7;
        top: -130px;
    }
    40% {
        opacity: 0.6;
        top: -140px;
    }
    50% {
        opacity: 0.5;
        top: -150px;
    }
    60% {
        opacity: 0.4;
        top: -160px;
    }
    70% {
        opacity: 0.3;
        top: -170px;
    }
    80% {
        opacity: 0.2;
        top: -180px;
    }
    90% {
        opacity: 0.1;
        top: -190px;
    }
    100% {
        opacity: 0;
    }
`;

const FADE = css`
    animation: ${fadein} 0.5s ease-in 0.5s forwards;
`;

const LikeAni = styled.div`
    color: #e4e4e4;
    position: relative;
    font-size: 16px;
    top: -100px;
    left: 50%;
    opacity: 0;
    ${(props) => {
        const { fade } = props;
        return fade === '+1' || fade === '-1' ? FADE : '';
    }};
`;

export default LikeAni;
