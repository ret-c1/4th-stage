import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import {
    ScOuter,
    ScImg1,
    ScImg2,
    ScImg3,
    ScImg4,
    ScImg5,
    ScImg6,
    ScTopImg,
    ScSubmmitSvg,
    ScSubmmit,
    ScNumber,
    ScReviewSvg,
    ScDistributionSvg,
    ScFinishSvg,
    ScVerificationSvg,
    ScManagementSvg,
    ScTopImg1,
    ScSubmmit1,
    ScNumber1,
    ScTipsBox,
    ScTipsBoxBg,
    ScTipsBoxLine1,
    ScTipsBoxLine2,
    ScContent,
} from './style';
import { queryVulManage } from '../../api';
const controlLight = [false, false, false, false, false, false];

const VulManage = () => {
    const [data, setData] = useState([]);
    const invertTime = (t) => {
        const HOUR = 1000 * 60 * 60;
        const h = parseInt((t % (HOUR * 24)) / HOUR, 10);
        const m = parseInt((t % HOUR) / (1000 * 60), 10);
        const s = parseInt((t % (1000 * 60)) / 1000, 10);
        return `${h}h ${m}m ${s}s`;
    };
    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data) {
                setData(res.data);
            }
        });
    }, []);
    const invertMsTime = (h, m) => h * 60 * 60 * 1000 + m * 60 * 1000;

    const [mouseType, setMouseType] = useState(null);

    const changeLight = (index, val) => {
        controlLight[index] = val;
    };
    const handleMouse = (type) => {
        setMouseType(type);
    };
    const vertify =
        data && data.review
            ? (data.review[0].count + data.review[1].count + 787 + 567 + 456) * 0.9 * 0.75
            : 0;
    return (
        <>
            <ScOuter>
                <Row>
                    <Col>
                        <ScImg1
                            onMouseEnter={() => {
                                handleMouse(1);
                                changeLight(0, true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(0, false);
                            }}
                            mouseType={mouseType}
                            controlLight={controlLight}
                        >
                            <ScTopImg>
                                <ScSubmmitSvg />
                            </ScTopImg>
                            <ScNumber>
                                {data && data.commit
                                    ? data.commit[0].count + data.commit[1].count + 787 + 567 + 456
                                    : 0}
                                个
                            </ScNumber>
                            <ScSubmmit>提交</ScSubmmit>
                        </ScImg1>
                        {mouseType === 1 ? (
                            <ScTipsBox>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试: {data && data.commit ? data.commit[0].count : 0}&nbsp;
                                    已用时长：
                                    {data.commit && data.commit.length && data.commit[1].spend > 0
                                        ? invertTime(data.commit[0].spend)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：{data && data.commit ? data.commit[1].count : 0}&nbsp;
                                    已用时长：
                                    {data.commit && data.commit.length > 0 && data.commit[1].spend
                                        ? invertTime(data.commit[1].spend)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>配置检查：787 已用时长：54h 19m</ScContent>
                                <ScContent>代码审计：567 已用时长：30h 23m</ScContent>
                                <ScContent>APP检测：456 已用时长：23h 23m</ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                    <Col>
                        <ScImg2
                            onMouseEnter={() => {
                                handleMouse(2);
                                changeLight(1, true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(1, false);
                            }}
                            controlLight={controlLight}
                            mouseType={mouseType}
                        >
                            <ScTopImg>
                                <ScReviewSvg />
                            </ScTopImg>
                            <ScNumber>
                                {data.review
                                    ? data.review[0].count + data.review[1].count + 787 + 567 + 456
                                    : 0}
                                个
                            </ScNumber>
                            <ScSubmmit>评审</ScSubmmit>
                        </ScImg2>
                        {mouseType === 2 ? (
                            <ScTipsBox style={{ left: 200 }}>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试：
                                    {data.review ? data.review[0].count : 0}&nbsp; 已用时长：
                                    {data.review && data.review.length > 0 && data.review[0].spend
                                        ? invertTime(data.review[0].spend)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：{data.review ? data.review[1].count : 0}
                                    &nbsp;已用时长：
                                    {data.review && data.review.length > 0 && data.review[1].spend
                                        ? invertTime(data.review[1].spend)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>配置检查：787 已用时长：20h 19m</ScContent>
                                <ScContent>代码审计：567已用时长：16h 7m</ScContent>
                                <ScContent>APP检测：456已用时长：10h 3m</ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                    <Col>
                        <ScImg3
                            onMouseEnter={() => {
                                handleMouse(3);
                                changeLight(2, true);
                                // setLight(true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(2, false);
                                // setLight(false);
                            }}
                            // light={light}
                            controlLight={controlLight}
                            mouseType={mouseType}
                        >
                            <ScTopImg>
                                <ScDistributionSvg />
                            </ScTopImg>
                            <ScNumber>
                                {data.dispatch && data.review
                                    ? data.dispatch[0].count +
                                      Math.floor(
                                          (data.review[0].count +
                                              data.review[1].count +
                                              787 +
                                              567 +
                                              456) *
                                              0.9 *
                                              0.8,
                                      )
                                    : 0}
                                个
                            </ScNumber>
                            <ScSubmmit>分配</ScSubmmit>
                        </ScImg3>
                        {mouseType === 3 ? (
                            <ScTipsBox style={{ left: 250 }}>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试：
                                    {data.dispatch && data.review ? data.dispatch[0].count : 0}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：
                                    {data.review ? Math.floor(data.review[1].count * 0.9 * 0.8) : 0}
                                </ScContent>
                                <ScContent>
                                    配置检查：
                                    {Math.floor(787 * 0.9 * 0.8)}
                                </ScContent>
                                <ScContent>代码审计： {Math.floor(567 * 0.9 * 0.8)}</ScContent>
                                <ScContent>APP检测： {Math.floor(456 * 0.9 * 0.8)}</ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ScImg4
                            onMouseEnter={() => {
                                handleMouse(4);
                                changeLight(3, true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(3, false);
                            }}
                            controlLight={controlLight}
                            mouseType={mouseType}
                        >
                            <ScTopImg>
                                <ScFinishSvg />
                            </ScTopImg>
                            <ScNumber>{Math.floor(vertify * 0.5)}个</ScNumber>
                            <ScSubmmit>完成</ScSubmmit>
                        </ScImg4>
                        {mouseType === 4 ? (
                            <ScTipsBox style={{ left: 154, top: -26 }}>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试：
                                    {data.review
                                        ? Math.floor(data.review[0].count * 0.9 * 0.75 * 0.5)
                                        : 0}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：
                                    {data.review
                                        ? Math.floor(data.review[1].count * 0.9 * 0.75 * 0.5)
                                        : 0}
                                </ScContent>
                                <ScContent>
                                    配置检查：{Math.floor(787 * 0.9 * 0.75 * 0.5)}
                                </ScContent>
                                <ScContent>
                                    代码审计：{Math.floor(567 * 0.9 * 0.75 * 0.5)}
                                </ScContent>
                                <ScContent>APP检测：{Math.floor(456 * 0.9 * 0.75 * 0.5)}</ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                    <Col>
                        <ScImg5
                            onMouseEnter={() => {
                                handleMouse(5);
                                changeLight(4, true);
                                // setLight(true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(4, false);
                                // setLight(false);
                            }}
                            controlLight={controlLight}
                            // light={light}
                            mouseType={mouseType}
                        >
                            <ScTopImg>
                                <ScVerificationSvg />
                            </ScTopImg>
                            <ScNumber>{Math.floor(vertify)}个</ScNumber>
                            <ScSubmmit>验证</ScSubmmit>
                        </ScImg5>
                        {mouseType === 5 ? (
                            <ScTipsBox style={{ left: 204, top: -26 }}>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试：
                                    {data.review
                                        ? Math.floor(data.review[0].count * 0.9 * 0.75)
                                        : 0}
                                    &nbsp;已用时长：
                                    {data.review && data.review.length > 0 && data.review[0].spend
                                        ? invertTime(data.review[0].spend * 0.75)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：
                                    {data.review
                                        ? Math.floor(data.review[1].count * 0.9 * 0.75)
                                        : 0}
                                    &nbsp;已用时长：
                                    {data.review && data.review.length > 0 && data.review[1].spend
                                        ? invertTime(data.review[1].spend * 0.75)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    配置检查：{Math.floor(787 * 0.9 * 0.75)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(20, 19) * 0.75)}
                                </ScContent>
                                <ScContent>
                                    代码审计：{Math.floor(567 * 0.9 * 0.75)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(16, 7) * 0.75)}
                                </ScContent>
                                <ScContent>
                                    APP检测：{Math.floor(456 * 0.9 * 0.75)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(10, 3) * 0.75)}
                                </ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                    <Col>
                        <ScImg6
                            onMouseEnter={() => {
                                handleMouse(6);
                                changeLight(5, true);
                                // setLight(true);
                            }}
                            onMouseLeave={() => {
                                handleMouse(null);
                                changeLight(5, false);
                                // setLight(false);
                            }}
                            controlLight={controlLight}
                            // light={light}
                            mouseType={mouseType}
                        >
                            <ScTopImg1>
                                <ScManagementSvg />
                            </ScTopImg1>
                            <ScNumber1>
                                {data.handle && data.review
                                    ? data.handle[0].count +
                                      Math.floor(
                                          (data.review[0].count +
                                              data.review[1].count +
                                              787 +
                                              567 +
                                              456) *
                                              0.9 *
                                              0.8 *
                                              0.85,
                                      )
                                    : 0}
                                个
                            </ScNumber1>
                            <ScSubmmit1>处置</ScSubmmit1>
                        </ScImg6>
                        {mouseType === 6 ? (
                            <ScTipsBox style={{ left: 254, top: -26 }}>
                                <ScTipsBoxBg>
                                    <span className="border-1" />
                                    <span className="border-2" />
                                    <span className="border-3" />
                                    <span className="border-4" />
                                </ScTipsBoxBg>
                                <ScTipsBoxLine1 />
                                <ScTipsBoxLine2 />
                                <ScContent>
                                    渗透测试：
                                    {data && data.dispatch[0].spend ? data.dispatch[0].spend : 0}
                                    &nbsp; 已用时长：
                                    {data.dispatch &&
                                    data.dispatch.length > 0 &&
                                    data.dispatch[0].spend
                                        ? invertTime(data.dispatch[0].spend)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    漏洞扫描：
                                    {data.review
                                        ? Math.floor(data.review[1].count * 0.9 * 0.8 * 0.85)
                                        : 0}
                                    &nbsp; 已用时长：
                                    {data.commit && data.commit.length > 0 && data.commit[0].spend
                                        ? invertTime(data.commit[0].spend * 0.89)
                                        : '0h 0m 0s'}
                                </ScContent>
                                <ScContent>
                                    配置检查：{Math.floor(787 * 0.9 * 0.8 * 0.85)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(54, 19) * 0.89)}
                                </ScContent>
                                <ScContent>
                                    代码审计：{Math.floor(567 * 0.9 * 0.8 * 0.85)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(30, 23) * 0.89)}
                                </ScContent>
                                <ScContent>
                                    APP检测：{Math.floor(456 * 0.9 * 0.8 * 0.85)}&nbsp;已用时长：
                                    {invertTime(invertMsTime(23, 23) * 0.89)}
                                </ScContent>
                            </ScTipsBox>
                        ) : null}
                    </Col>
                </Row>
            </ScOuter>
        </>
    );
};
export default VulManage;
