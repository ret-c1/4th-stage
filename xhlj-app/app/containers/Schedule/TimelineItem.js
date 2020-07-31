import styled from 'styled-components';

const TimelineItem = styled.div`
    padding: 1em 2em 1em;
    position: relative;
    border-left: 2px solid #f1f1f1;
    &::before {
        content: ${(props) => props.date};
        position: absolute;
        left: 2em;
        font-weight: bold;
        top: 1em;
        display: block;
        font-weight: 700;
        font-size: 0.785rem;
    }

    &::after {
        width: 10px;
        height: 10px;
        display: block;
        top: 1em;
        position: absolute;
        left: -7px;
        border-radius: 10px;
        content: '';
        border: 2px solid #ccc; // 圆圈
        background: #ccc;
    }
`;

export default TimelineItem;
