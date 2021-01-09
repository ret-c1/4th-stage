import styled from 'styled-components';

export const ScCBottom = styled.div`
    position: relative;
    z-index: 1;
    height: 59.9%;
    /* font-size: 1.8em; */
    font-size: 10px;
    @media (max-width: 1441px) {
        font-size: 8px;
    }
`;

export const ScTitle = styled.h4`
    width: 60%;
    display: inline-block;
    vertical-align: top;
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 0;
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

export const ScCBottomUl = styled.ul`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    justify-content: space-between;
    & > li {
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        flex: 0 0 31.6%;
        max-width: 31.6%;
        height: 100%;
        padding-top: 10px;
        padding-right: 10px;
        border-top: 1px solid rgba(53, 144, 255, 0.6);
        &:first-child {
            flex: 0 0 32.3%;
            max-width: 32.3%;
        }
        &:last-child {
            flex: 0 0 32.3%;
            max-width: 32.3%;
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
    }
`;

export const ScItemTop = styled.div`
    height: 49.5%;
    position: relative;
`;

export const ScItemBottom = styled.div`
    position: relative;
    height: 49.5%;
`;

export const ScTaps = styled.span`
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: top;
    background: rgba(24, 144, 255, 0.2);
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    color: #01f0ff;
    padding: 0 6px;
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
    background: rgba(255, 255, 255, 0.04);
    font-family: PingFangSC-Regular;
    font-size: 1.4em;
    color: rgba(255, 255, 255, 0.45);
    padding: 0 6px;
`;

export const ScItemInfoTab1 = styled(ScTaps)`
    background: ${(props) =>
        props.active ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.active && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.active ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
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

export const ScItemUnActive = styled(ScTaps2)`
    background: ${(props) =>
        props.active ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.active && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.active ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
    font-size: 1.2em;
    padding: 1px;
`;

export const ScItemInfoTab2 = styled(ScTaps2)`
    background: ${(props) =>
        props.active ? 'rgba(24, 144, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)'};
    box-shadow: ${(props) => props.active && 'inset 0 0 2px 0 #1890FF'};
    color: ${(props) => (props.active ? '#01f0ff' : 'rgba(255, 255, 255, 0.45)')};
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

export const ScLittleDot = styled.span`
    width: 2px;
    height: 2px;
    background: #1890ff;
    position: absolute;
`;

export const ScChartBox = styled.div`
    height: calc(100% - 28px);
`;
