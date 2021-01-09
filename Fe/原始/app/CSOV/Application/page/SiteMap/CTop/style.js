import styled from 'styled-components';

export const ScCTop = styled.div`
    position: relative;
    z-index: 1;
    height: 39%;
    margin-bottom: 0.9%;
    padding-top: 10px;
    padding-right: 10px;
    border-top: 1px solid rgba(53, 144, 255, 0.6);
    font-size: 10px;
    @media (max-width: 1441px) {
        font-size: 8px;
    }
    &::before {
        display: block;
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-image: linear-gradient(
            180deg,
            rgba(53, 144, 255, 0.6) 0%,
            rgba(101, 195, 255, 0) 100%
        );
    }
    &::before {
        display: block;
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-image: linear-gradient(
            180deg,
            rgba(53, 144, 255, 0.6) 0%,
            rgba(101, 195, 255, 0) 100%
        );
    }
    &::after {
        display: block;
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        z-index: 1;
        right: 0;
        top: 0;
        background-image: linear-gradient(
            180deg,
            rgba(53, 144, 255, 0.4) 0%,
            rgba(101, 195, 255, 0) 100%
        );
    }
`;

export const ScCTopUl = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 90%;
    padding: 0;
    padding-left: 10px;
    list-style: none;
    justify-content: space-between;
    & > li {
        position: relative;
        z-index: 1;
        flex: 0 0 32%;
        max-width: 32%;
        height: 47%;
        /* min-height: 125px; */
        background-image: linear-gradient(
            180deg,
            rgba(53, 144, 255, 0.04) 0%,
            rgba(53, 144, 255, 0.1) 100%
        );
        & > span {
            height: 30px;
            position: relative;
            z-index: 1;
            font-size: 1.8em;
            color: #24b6ff;
            padding-left: 13px;
            &::before {
                position: absolute;
                z-index: 1;
                left: 0;
                bottom: 4px;
                display: block;
                width: 3px;
                height: 3px;
                background: #01f0ff;
                content: '';
            }
            &::after {
                position: absolute;
                z-index: 1;
                right: -13px;
                bottom: 4px;
                display: block;
                width: 3px;
                height: 3px;
                background: #01f0ff;
                content: '';
            }
            & > i {
                position: absolute;
                z-index: 1;
                left: 62px;
                bottom: 5px;
                display: block;
                width: 200px;
                height: 1px;
                background-image: linear-gradient(
                    270deg,
                    rgba(101, 195, 255, 0) 0%,
                    rgba(53, 144, 255, 0.6) 100%
                );
            }
        }
    }
`;

export const ScTitle = styled.h4`
    width: 171px;
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    font-size: 1.8em;
    color: #fff;
    padding-left: 24px;
    display: inline-block;
    vertical-align: top;
    background-image: linear-gradient(
        270deg,
        rgba(101, 195, 255, 0) 0%,
        rgba(53, 144, 255, 0.2) 100%
    );
    background-position: 14px 0;
    &::before {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 50%;
        display: inline-block;
        width: 12px;
        height: 1px;
        content: '';
        background-image: linear-gradient(270deg, rgba(1, 240, 255, 0.6) 0%, #1e4884 100%);
    }
    &::after {
        position: absolute;
        z-index: 1;
        left: 12px;
        top: 0;
        display: inline-block;
        width: 2px;
        height: 100%;
        content: '';
        background: #01f0ff;
    }
`;

export const ScLiTitle = styled.span`
    position: relative;
    z-index: 1;
    font-size: 1.8em;
    color: #24b6ff;
    padding-left: 13px;
    &::before {
        position: absolute;
        z-index: 1;
        left: 0;
        bottom: 2px;
        display: block;
        width: 3px;
        height: 3px;
        background: #01f0ff;
        content: '';
    }
    &::after {
        position: absolute;
        z-index: 1;
        right: -13px;
        bottom: 2px;
        display: block;
        width: 3px;
        height: 3px;
        background: #01f0ff;
        content: '';
    }
    & > i {
        position: absolute;
        z-index: 1;
        left: 62px;
        bottom: 3px;
        display: block;
        width: 200px;
        height: 1px;
        background-image: linear-gradient(
            270deg,
            rgba(101, 195, 255, 0) 0%,
            rgba(53, 144, 255, 0.6) 100%
        );
    }
`;

export const ScTaps = styled.span`
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: top;
    background: ${(props) =>
        props.type === 1 ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.type === 1 && 'inset 0 0 2px 0 #1890FF'};
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    color: ${(props) => (props.type === 1 ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    padding: 2px 6px;
    &::before {
        border: 1px solid rgba(24, 144, 255, 0.2);
        width: 4.5px;
        height: 24px;
        position: absolute;
        left: -4.5px;
        top: -2px;
        content: '';
    }
`;

export const ScTaps2 = styled.span`
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: top;
    background: ${(props) =>
        props.type === 2 ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.type === 2 && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.type === 2 ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    padding: 2px 6px;
`;

export const ScTap2After = styled(ScTaps2)`
    background: ${(props) =>
        props.type === 3 ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.type === 3 && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.type === 3 ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    &::after {
        border: 1px solid rgba(24, 144, 255, 0.2);
        width: 4.5px;
        height: 24px;
        position: absolute;
        right: -4.5px;
        top: -2px;
        content: '';
    }
`;

export const ScHeadWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ScLittleDot = styled.span`
    width: 2px;
    height: 2px;
    background: #1890ff;
    position: absolute;
`;

export const ScItemContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 30px);
`;

export const ScEmergencyContent = styled(ScItemContent)`
    /* padding: 8px 32px 14px; */
`;

export const ScItemInfo = styled.div`
    flex: 0 0 32%;
    text-align: center;
`;

export const ScEmergencyInfo = styled(ScItemInfo)`
    flex: 0 0 16%;
    text-align: center;
`;

export const ScItemInfoNumber = styled.span`
    font-family: HelveticaNeue;
    font-size: 3em;
    color: #ffffff;
    text-shadow: 0 0 4px rgba(1, 240, 255, 0.1);
`;

export const ScEmergencyLevel = styled.p`
    background: ${(props) => props.background};
    border-radius: 2px;
    height: 18px;
    line-height: 18px;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
`;

export const ScEmergencyLevelText = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    color: ${(props) => props.color};
`;

export const ScItemInfoUnit = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 1.2em;
    color: rgba(255, 255, 255, 0.65);
    margin-left: 4px;
`;

export const ScItemInfoRemark = styled.span`
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    color: #80d5ff;
`;

export const ScItemInfoTab1 = styled(ScTaps)`
    background: ${(props) =>
        props.type === 1 ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.type === 1 && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.type === 1 ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    font-size: 1.2em;
    padding: 1px;
    &::before {
        border: 1px solid rgba(24, 144, 255, 0.2);
        width: 4.5px;
        height: 16px;
        position: absolute;
        left: -4.5px;
        top: -2px;
        content: '';
    }
`;

export const ScItemInfoTab2 = styled(ScTaps2)`
    background: ${(props) =>
        props.type === 2 ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.type === 2 && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.type === 2 ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    font-size: 1.2em;
    padding: 1px;
    &::after {
        border: 1px solid rgba(24, 144, 255, 0.2);
        width: 4.5px;
        height: 16px;
        position: absolute;
        right: -4.5px;
        top: -2px;
        content: '';
    }
`;
