import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ht001 from '../../assets/h-t-001.png';
import ht001active from '../../assets/h-t-001-active.png';
import ht002 from '../../assets/h-t-002.png';
import ht002active from '../../assets/h-t-002-active.png';
import ht003 from '../../assets/h-t-003.png';
import ht003active from '../../assets/h-t-003-active.png';
import ht004 from '../../assets/h-t-004.png';
import ht004active from '../../assets/h-t-004-active.png';
import htbg001 from '../../assets/h-t-bg-001.png';
import htbg002l from '../../assets/h-t-bg-002-left.png';
import htbg002r from '../../assets/h-t-bg-002-right.png';
import htbg003 from '../../assets/h-t-bg-003.png';

export const ScHeaders = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 65px;
`;

export const ScHeadersBg = styled.div`
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 65px;
    border-top: 1px solid rgba(53, 144, 255, 0.4);
`;
export const ScHeadersBg1 = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    width: 924px;
    height: 65px;
    background-image: url(${htbg003});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const ScHeadersBg2L = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 489px;
    height: 65px;
    background-image: url(${htbg002l});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const ScHeadersBg2R = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    width: 486px;
    height: 65px;
    background-image: url(${htbg002r});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const ScHeadersBg3 = styled.span`
    display: block;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 930px;
    height: 65px;
    background-image: url(${htbg001});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const ScHeaderUl = styled.ul`
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    li {
        a {
            display: flex;
            cursor: pointer;
            height: 100%;
            justify-content: space-around;
            align-items: center;
        }
        span {
            display: block;
            font-size: 16px;
            color: #24b6ff;
            opacity: 0.65;
            line-height: 38px;
            text-align: center;
            margin: 0 3px;
            &.h-t-001 {
                width: 134px;
                height: 38px;
                background-image: url(${ht001});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-002 {
                width: 166px;
                height: 38px;
                background-image: url(${ht002});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-003 {
                width: 106px;
                height: 38px;
                background-image: url(${ht003});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-004 {
                width: 187px;
                height: 38px;
                background-image: url(${ht004});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }
    li.active {
        padding-top: 20px;
        span {
            display: block;
            font-size: 16px;
            color: #fff;
            opacity: 1;
            &.h-t-001 {
                width: 134px;
                height: 38px;
                background-image: url(${ht001active});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-002 {
                width: 166px;
                height: 38px;
                background-image: url(${ht002active});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-003 {
                width: 106px;
                height: 38px;
                background-image: url(${ht003active});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
            &.h-t-004 {
                width: 187px;
                height: 38px;
                background-image: url(${ht004active});
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }
`;

const TabHeaders = () => {
    const location = useLocation();
    const { pathname } = location;
    return (
        <ScHeaders>
            <ScHeadersBg>
                {/before/.test(pathname) ? <ScHeadersBg1 /> : null}
                {/middle/.test(pathname) ? (
                    <>
                        <ScHeadersBg2L />
                        <ScHeadersBg2R />
                    </>
                ) : null}
                {/after/.test(pathname) ? <ScHeadersBg3 /> : null}
            </ScHeadersBg>
            <ScHeaderUl>
                <li className={/before/.test(pathname) ? 'active' : null}>
                    <Link to="/csovself/hw/before">
                        <span className="h-t-001">风险评估</span>
                        <span className="h-t-001">整 改</span>
                        <span className="h-t-002">红蓝对抗演练</span>
                    </Link>
                </li>
                <li className={/middle/.test(pathname) ? 'active' : null}>
                    <Link to="/csovself/hw/middle">
                        <span className="h-t-003">威胁监控</span>
                        <span className="h-t-004">安全分析与事件报告</span>
                        <span className="h-t-003">威胁分诊</span>
                    </Link>
                </li>
                <li className={/after/.test(pathname) ? 'active' : null}>
                    <Link to="/csovself/hw/after">
                        <span className="h-t-003">威胁发布</span>
                        <span className="h-t-003">威胁响应</span>
                        <span className="h-t-003">CERT管理</span>
                        <span className="h-t-003">威胁推送</span>
                    </Link>
                </li>
            </ScHeaderUl>
        </ScHeaders>
    );
};

export default TabHeaders;
