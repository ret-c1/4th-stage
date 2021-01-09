import React from 'react';
import LineChart from './components/Chart/LineChart';
import NegativeBar from './components/Chart/NegativeBar';
import TypeThreat from './components/CustomChart/TypeThreat';
import ThreatTriage from './components/CustomChart/ThreatTriage';
import EventType from './components/CustomChart/EventType';
import Topology from './components/Topology';
import TabHeaders from '../components/TabHeaders';
import TrendBkg from './img/trendBkg.svg';
import {
    ScContent,
    ScCenter,
    ScColumn,
    ScChart,
    ScRightChart,
    ScTitleLeft,
    ScTopLine,
    ScBottomLine,
    ScTitleRight,
    ScRightTopLine,
    ScRightBottomLine,
    ScHeader,
    ScExample,
} from './style';

const HWMiddlePage = () => (
    <ScContent>
        <TabHeaders />
        <ScCenter>
            <ScColumn style={{ width: '24%' }}>
                <ScChart style={{ height: '52%' }}>
                    <ScTitleLeft>
                        <ScTopLine />
                        <span>威胁类别</span>
                        <ScBottomLine />
                    </ScTitleLeft>
                    <TypeThreat />
                </ScChart>
                <ScChart style={{ height: '48%', marginTop: '46px' }}>
                    <ScTitleLeft style={{ letterSpacing: 0 }}>
                        <ScTopLine />
                        <span>安全事件工单排查统计</span>
                        <ScBottomLine />
                    </ScTitleLeft>
                    <NegativeBar />
                </ScChart>
            </ScColumn>
            <ScColumn style={{ width: '51%' }}>
                <ScChart style={{ height: '72%' }}>
                    <ScTitleLeft>
                        <ScTopLine />
                        <span>资产拓扑</span>
                        <ScBottomLine />
                    </ScTitleLeft>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '23px',
                        }}
                    >
                        <ScExample />
                        <Topology />
                    </div>
                </ScChart>
                <ScChart style={{ height: '28%' }}>
                    <ScHeader>
                        <div
                            style={{
                                background: `url(${TrendBkg}), no-repeat`,
                                width: '273px',
                                height: '36px',
                                marginLeft: '208px',
                                textAlign: 'center',
                                padding: '3px 0 2px 0',
                            }}
                        >
                            安全事件趋势统计
                        </div>
                    </ScHeader>
                    <LineChart />
                </ScChart>
            </ScColumn>
            <ScColumn style={{ width: '26%' }}>
                <ScRightChart style={{ height: '50%' }}>
                    <ScTitleRight style={{ letterSpacing: 0 }}>
                        <ScRightTopLine />
                        <span>安全分析事件类型统计</span>
                        <ScRightBottomLine />
                    </ScTitleRight>
                    <EventType />
                </ScRightChart>
                <ScRightChart style={{ marginTop: '10px', height: '50%' }}>
                    <ScTitleRight>
                        <ScRightTopLine />
                        <span>威胁分诊统计</span>
                        <ScRightBottomLine />
                    </ScTitleRight>
                    <ThreatTriage />
                </ScRightChart>
            </ScColumn>
        </ScCenter>
    </ScContent>
);

export default HWMiddlePage;
