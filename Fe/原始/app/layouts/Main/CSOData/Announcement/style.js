import styled from 'styled-components';
import bg from './assets/bg.png';
import img001 from './assets/img-001.png';
import img002 from './assets/img-002.png';
import img003 from './assets/img-003.svg';
import img004 from './assets/img-004.svg';
import img005 from './assets/img-005.svg';
import img006 from './assets/img-006-on.svg';
import img007 from './assets/img-007.svg';
import img003icon from './assets/img-003-icon.svg';
import img004icon from './assets/img-004-icon.svg';
import img005icon from './assets/img-005-icon.svg';
import img006icon from './assets/img-006-icon.svg';
import img007icon from './assets/img-007-icon.svg';

const renderBg = (type) => {
    switch (type) {
        case 2: // 任务
            return `url(${img003icon});`;
        case 3: // 情报
            return `url(${img004icon});`;
        case 4: // 事件
            return `url(${img005icon});`;
        case 1: // 培训
            return `url(${img007icon});`;
        case 5: // 咨询 图不对
            return `url(${img006icon});`;
        default:
            return `url(${img003icon});`;
    }
};

const renderColor = (type) => {
    switch (type) {
        case 2: // 任务
            return '#1890ff';
        case 3: // 情报
            return '#faad14';
        case 4: // 事件
            return '#ff738e';
        case 1: // 培训
            return '#b668ff';
        case 5: // 咨询
            return 'rgba(1,240,255,0.80)';
        default:
            return '#1890ff';
    }
};

export const ScAnnouncement = styled.div`
    margin-left: -12px;
    flex: 0 0 290px;
    max-width: 290px;
    min-width: 290px;
    width: 290px;
    height: calc(100vh - 110px);
    background: url(${bg});
    background-size: auto;
    background-repeat: no-repeat;
    padding-top: 10px;
    padding-left: 10px;
`;

export const ScTitle = styled.div`
    position: relative;
    z-index: 1;
    font-size: 16px;
    color: #01f0ff;
    letter-spacing: 12px;
    text-align: right;
    line-height: 50px;
    height: 50px;
    padding-right: 26px;
    &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 14px;
        width: 26px;
        height: 24px;
        background: url(${img001});
        background-size: auto;
        background-repeat: no-repeat;
    }
`;

export const ScTaps = styled.div`
    position: relative;
    z-index: 1;
    height: 69px;
    background: url(${img002});
    background-size: auto;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        width: 264px;
        height: 1px;
        background-image: linear-gradient(
            270deg,
            rgba(53, 144, 255, 0.6) 0%,
            rgba(101, 195, 255, 0) 100%
        );
    }
    &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 0;
        width: 264px;
        height: 1px;
        transform: scaleX(-1);
        background-image: linear-gradient(
            270deg,
            rgba(53, 144, 255, 0.6) 0%,
            rgba(101, 195, 255, 0) 100%
        );
    }
`;

export const ScType1 = styled.span`
    position: relative;
    z-index: 1;
    display: block;
    width: 44px;
    height: 36px;
    cursor: pointer;
    mask-image: url(${img003});
    background-color: ${(props) => (props.type[0] ? '#1890ff' : 'rgba(255, 255, 255, 0.25)')};
`;

export const ScType2 = styled.span`
    position: relative;
    z-index: 1;
    display: block;
    width: 44px;
    height: 36px;
    cursor: pointer;
    mask-image: url(${img004});
    background-color: ${(props) => (props.type[1] ? '#face49' : 'rgba(255, 255, 255, 0.25)')};
`;

export const ScType3 = styled.span`
    position: relative;
    z-index: 1;
    display: block;
    width: 44px;
    height: 36px;
    cursor: pointer;
    mask-image: url(${img005});
    background-color: ${(props) => (props.type[2] ? '#ff738e' : 'rgba(255, 255, 255, 0.25)')};
`;

export const ScType4 = styled.span`
    position: relative;
    z-index: 1;
    display: block;
    width: 44px;
    height: 36px;
    cursor: pointer;
    mask-image: url(${img006});
    background-color: ${(props) =>
        props.type[3] ? 'rgba(1, 240, 255, 0.8)' : 'rgba(255, 255, 255, 0.25)'};
`;

export const ScType5 = styled.span`
    position: relative;
    z-index: 1;
    display: block;
    width: 44px;
    height: 36px;
    cursor: pointer;
    mask-image: url(${img007});
    background-color: ${(props) => (props.type[4] ? '#b668ff' : 'rgba(255, 255, 255, 0.25)')};
`;
export const ScUlBox = styled.div`
    margin: auto;
    overflow-y: scroll;
    height: calc(100% - 120px);
`;

export const ScUl = styled.ul`
    position: relative;
    z-index: 1;
    display: block;
    width: 240px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
    padding-top: 18px;
    li {
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        font-family: PingFangSC-Regular;
        margin-bottom: 10px;
        padding-left: 16px;
        h4 {
            font-size: 14px;
            color: #fff;
            margin: 0;
            padding: 0;
            margin-bottom: 6px;
            width: 160px;
        }
        p {
            font-size: 12px;
            color: #80d5ff;
            border-bottom: 1px solid rgba(255, 255, 255, 0.09);
            margin: 0;
            padding: 0;
            padding-bottom: 10px;
        }
        em {
            position: absolute;
            z-index: 1;
            right: 0;
            top: 0;
            opacity: 0.45;
            font-size: 10px;
            color: #fff;
            text-align: right;
            font-style: normal;
        }
    }
`;
export const ItemIcon = styled.span`
    position: absolute;
    z-index: 1;
    top: 2px;
    left: -6px;
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${(props) => renderColor(props.type)};
    padding: 2px;
    i {
        display: block;
        width: 12px;
        height: 12px;
        mask: ${(props) => renderBg(props.type)};
        background-color: #fff;
    }
`;
