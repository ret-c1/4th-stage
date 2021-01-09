import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { Button } from 'antd';
import Icon from './assets/icon.png';
import logo1 from './assets/logo1.svg';
import logo1Checked from './assets/logo1-checked.svg';
import logo2 from './assets/logo2.svg';
import logo2Checked from './assets/logo2-checked.svg';
import logo3 from './assets/logo3.svg';
import logo3Checked from './assets/logo3-checked.svg';
import logo4 from './assets/logo4.svg';
import logo4Checked from './assets/logo4-checked.svg';
import logo5 from './assets/logo5.svg';
import logo5Checked from './assets/logo5-checked.svg';
import logo6 from './assets/logo6.svg';
import logo6Checked from './assets/logo6-checked.svg';
import logo7 from './assets/logo7.svg';
const ScOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: ${(props) => (props.status ? 'block' : 'none')};
    background: rgba(0, 0, 0, 0.35);
    z-index: 999;
`;
const ScSwitchMenu = styled.div`
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    bottom: 79px;
    right: 77px;
    width: 64px;
`;
const ScMenu = styled.div`
    border-radius: 31px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;
const ScMenuItem = styled.div`
    width: 100%;
    display: flex;
    height: 65px;
    flex-direction: column;
    justify-content: flex-end;
    padding: 8px;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 17px;
`;
const ScIcon = styled.div`
    width: 70px;
    height: 70px;
    background: url(${Icon}) no-repeat;
    background-size: contain;
`;
const ScLine = styled.div`
    content: '';
    position: absolute;
    left: 16px;
    top: 0px;
    background: #e9e9e9;
    height: 1px;
    width: 32px;
`;
const ScModal1 = styled.div`
    position: absolute;
    top: 25px;
    right: 64px;
    padding: 8px 0px;
    // height: 25px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScModal2 = styled.div`
    position: absolute;
    right: 64px;
    top: 76px;
    padding: 8px 0px;
    height: 44px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScModal3 = styled.div`
    position: absolute;
    right: 64px;
    top: 140px;
    padding: 8px 0px;
    height: 44px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScModal4 = styled.div`
    position: absolute;
    right: 64px;
    top: 202px;
    padding: 8px 0px;
    height: 44px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScModal5 = styled.div`
    position: absolute;
    right: 64px;
    top: 268px;
    padding: 8px 0px;
    height: 100px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScModal6 = styled.div`
    position: absolute;
    right: 64px;
    top: 328px;
    padding: 8px 0px;
    height: 156px;
    background: #ffffff;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
`;
const ScButton = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 152px;
    height: 28px;
    padding: 6px 16px;
    border-color: #ffffff;
    background: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
        height: 28px;
        background: rgba(59, 62, 188, 0.06);
        color: #3b3ebc;
    }
`;
const ScLogo1 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo1Checked : logo1)}) no-repeat;
    background-size: contain;
`;
const ScLogo2 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo2Checked : logo2)}) no-repeat;
    background-size: contain;
`;
const ScLogo3 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo3Checked : logo3)}) no-repeat;
    background-size: contain;
`;
const ScLogo4 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo4Checked : logo4)}) no-repeat;
    background-size: contain;
`;
const ScLogo5 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo5Checked : logo5)}) no-repeat;
    background-size: contain;
`;
const ScLogo6 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${(props) => (props.status ? logo6Checked : logo6)}) no-repeat;
    background-size: contain;
`;
const ScLogo7 = styled.div`
    width: 28px;
    height: 28px;
    background: url(${logo7}) no-repeat;
    background-size: contain;
`;

const PlantformSwitch = () => {
    const [isShowColor1, changeIsShowColor1] = useState(false);
    const [isShowColor2, changeIsShowColor2] = useState(false);
    const [isShowColor3, changeIsShowColor3] = useState(false);
    const [isShowColor4, changeIsShowColor4] = useState(false);
    const [isShowColor5, changeIsShowColor5] = useState(false);
    const [isShowColor6, changeIsShowColor6] = useState(false);
    const [isShowSwitch, changeIsShowSwitch] = useState(false);
    const [urlConfig] = useState({
        link1: `${window.location.origin}`,
        link2: '#',
        link3: '#',
        link4: '#',
        link5: '#',
        link6: '#',
        link7: '#',
        link8: '#',
        link9: `${window.location.origin}/digitiz/csovself/hw/before`,
        link10: `${window.location.origin}/digitiz/csovself/hw/middle`,
        link11: `${window.location.origin}/digitiz/csovself/hw/after`,
        link12: `${window.location.origin}/digitiz/csovapp/sitemap`,
        link13: '#',
    });
    return (
        <>
            <ScOverlay status={isShowSwitch} />
            <ScSwitchMenu>
                {isShowSwitch ? (
                    <ScMenu
                        onMouseEnter={() => changeIsShowSwitch(true)}
                        onMouseLeave={() => changeIsShowSwitch(false)}
                    >
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor1(true)}
                            onMouseLeave={() => changeIsShowColor1(false)}
                            style={{
                                borderTopLeftRadius: 31,
                                borderTopRightRadius: 31,
                                background: isShowColor1 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor1
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo1 status={isShowColor1} />
                            安全运营
                        </ScMenuItem>
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor2(true)}
                            onMouseLeave={() => changeIsShowColor2(false)}
                            style={{
                                background: isShowColor2 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor2
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo2 status={isShowColor2} />
                            应急响应
                        </ScMenuItem>
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor3(true)}
                            onMouseLeave={() => changeIsShowColor3(false)}
                            style={{
                                background: isShowColor3 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor3
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo3 status={isShowColor3} />
                            威胁狩猎
                        </ScMenuItem>
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor4(true)}
                            onMouseLeave={() => changeIsShowColor4(false)}
                            style={{
                                background: isShowColor4 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor4
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo4 status={isShowColor4} />
                            纵深防御
                        </ScMenuItem>
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor5(true)}
                            onMouseLeave={() => changeIsShowColor5(false)}
                            style={{
                                background: isShowColor5 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor5
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo5 status={isShowColor5} />
                            风险监控
                        </ScMenuItem>
                        <ScMenuItem
                            onMouseEnter={() => changeIsShowColor6(true)}
                            onMouseLeave={() => changeIsShowColor6(false)}
                            style={{
                                background: isShowColor6 && 'rgba(59, 62, 188, 0.06)',
                                color: isShowColor6
                                    ? 'rgba(59, 62, 188, 1)'
                                    : 'rgba(0, 0, 0, 0.65)',
                            }}
                        >
                            <ScLogo6 status={isShowColor6} />
                            风险态势
                        </ScMenuItem>
                        <ScMenuItem style={{ position: 'relative' }}>
                            <a
                                href={`${window.location.origin}`}
                                style={{ color: 'rgba(59, 62, 188, 1)' }}
                            >
                                <ScLogo7 />
                                启动台
                                <ScLine />
                            </a>
                        </ScMenuItem>
                        {isShowColor1 && (
                            <ScModal1
                                onMouseEnter={() => changeIsShowColor1(true)}
                                onMouseLeave={() => changeIsShowColor1(false)}
                            >
                                <ScButton href={`${urlConfig.link1}`}>安全服务平台</ScButton>
                                <ScButton>安全开发平台</ScButton>
                            </ScModal1>
                        )}
                        {isShowColor2 && (
                            <ScModal2
                                onMouseEnter={() => changeIsShowColor2(true)}
                                onMouseLeave={() => changeIsShowColor2(false)}
                            >
                                <ScButton>HW事件管理平台</ScButton>
                            </ScModal2>
                        )}
                        {isShowColor3 && (
                            <ScModal3
                                onMouseEnter={() => changeIsShowColor3(true)}
                                onMouseLeave={() => changeIsShowColor3(false)}
                            >
                                <ScButton>安全分析平台</ScButton>
                            </ScModal3>
                        )}
                        {isShowColor4 && (
                            <ScModal4
                                onMouseEnter={() => changeIsShowColor4(true)}
                                onMouseLeave={() => changeIsShowColor4(false)}
                            >
                                <ScButton>红队攻击平台</ScButton>
                            </ScModal4>
                        )}
                        {isShowColor5 && (
                            <ScModal5
                                onMouseEnter={() => changeIsShowColor5(true)}
                                onMouseLeave={() => changeIsShowColor5(false)}
                            >
                                <ScButton>互联网暴露监测平台</ScButton>
                                <ScButton>漏洞信息追踪平台</ScButton>
                                <ScButton>威胁情报平台</ScButton>
                            </ScModal5>
                        )}
                        {isShowColor6 && (
                            <ScModal6
                                onMouseEnter={() => changeIsShowColor6(true)}
                                onMouseLeave={() => changeIsShowColor6(false)}
                            >
                                <ScButton href={`${urlConfig.link9}`}>风险评估大屏</ScButton>
                                <ScButton href={`${urlConfig.link10}`}>安全事件大屏</ScButton>
                                <ScButton href={`${urlConfig.link11}`}>应急响应大屏</ScButton>
                                <ScButton href={`${urlConfig.link12}`}>运营地图</ScButton>
                                <ScButton>事件大屏</ScButton>
                            </ScModal6>
                        )}
                        <ScIcon />
                    </ScMenu>
                ) : (
                    <ScIcon onMouseEnter={() => changeIsShowSwitch(true)} />
                )}
            </ScSwitchMenu>
        </>
    );
};
export default PlantformSwitch;
