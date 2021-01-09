import React, { useEffect, useState } from 'react';
import {
    ScFinishHead,
    ScHeadTitle,
    ScTitleText,
    ScInfluence,
    ScInfluenceType,
    ScFinishContent,
    ScContentInfo,
    ScContentIndex,
    ScFixed,
} from './style';
import { queryvulSort, queryVulManage } from '../../api';

const VulFinish = () => {
    const [params, setParams] = useState({ limit: 6, offset: 0 });
    const invertMsTime = (h, m) => h * 60 * 60 * 1000 + m * 60 * 1000;
    const [dataSource, setDatasource] = useState([
        { type: '代码审计', no: 1, spendTime: invertMsTime(30, 23) },
        { type: '配置检查', no: 2, spendTime: invertMsTime(54, 19) },
        { type: 'App检测', no: 3, spendTime: invertMsTime(23, 23) },
    ]);
    const invertTime = (t) => {
        const HOUR = 1000 * 60 * 60;
        const h = parseInt((t % (HOUR * 24)) / HOUR, 10);
        const m = parseInt((t % HOUR) / (1000 * 60), 10);
        const s = parseInt((t % (1000 * 60)) / 1000, 10);
        return `${h}h ${m}m ${s}s`;
    };
    const [timeSubmitVul, setTimeSubmitVul] = useState(0);
    const [timeSubmitPen, setTimeSubmitPen] = useState(0);
    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data && res.data.commit) {
                if (res.data.commit && res.data.commit.length) {
                    if (res.data.commit[1].spend) {
                        setTimeSubmitVul(res.data.commit[1].spend);
                    }
                    if (res.data.commit[0].spend) {
                        setTimeSubmitPen(res.data.commit[0].spend);
                    }
                }
            }
        });
    }, []);
    // console.log(timeSubmitVul);
    // console.log(timeSubmitPen);

    useEffect(() => {
        let interval;
        queryvulSort(params).then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.records.length > 0) {
                    setDatasource(res.data.records);
                }
                if (res.data.total >= 5) {
                    interval = setInterval(() => {
                        if (res.data.records.length < 5) {
                            setParams({ limit: 5, offset: 0 });
                        } else {
                            setParams({ ...params, offset: params.offset + params.limit });
                        }
                    }, 5000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [params]);
    return (
        <div>
            <ScFinishHead>
                <ScHeadTitle>
                    <ScTitleText style={{ width: '19%', marginLeft: '3.8em' }}>漏洞名</ScTitleText>
                    <ScTitleText style={{ width: '15%' }}>服务类型</ScTitleText>
                    <ScTitleText style={{ width: '30%', textAlign: 'center' }}>
                        影响资产数
                    </ScTitleText>
                    <ScTitleText style={{ width: '24%', textAlign: 'center' }}>
                        已修复用时
                    </ScTitleText>
                </ScHeadTitle>
                <ScInfluence>
                    <ScInfluenceType color="#FFFFFF">总数</ScInfluenceType>
                    <ScInfluenceType color="#59C7FE">已修复</ScInfluenceType>
                    <ScInfluenceType color="#FF6482">未修复</ScInfluenceType>
                </ScInfluence>
            </ScFinishHead>
            <React.Fragment key="tableBody">
                {dataSource.map((val) => (
                    <ScFinishContent key={val.name}>
                        <ScContentIndex opacity={0.6}>{val.no}</ScContentIndex>
                        <ScContentInfo style={{ width: '19%' }}>{val.name}</ScContentInfo>
                        <ScContentInfo style={{ width: '15%' }}>{val.type}</ScContentInfo>
                        <ScContentInfo style={{ width: '28%', textAlign: 'center' }}>
                            <ScFixed color="#FFFFFF">
                                {val.type === '代码审计' && 434}
                                {val.type === '配置检查' && 634}
                                {val.type === 'App检测' && 329}
                                {val.type === '渗透' && val.total}
                                {val.type === '漏扫' && val.total}
                            </ScFixed>
                            <ScFixed color="#59C7FE">
                                {val.type === '代码审计' && Math.floor(434 * 0.75)}
                                {val.type === '配置检查' && Math.floor(634 * 0.6)}
                                {val.type === 'App检测' && Math.floor(329 * 0.67)}
                                {val.type === '渗透' && Math.floor(val.total * 0.92)}
                                {val.type === '漏扫' && Math.floor(val.total * 0.8)}
                            </ScFixed>
                            <ScFixed color="#FF6482">
                                {val.type === '代码审计' && 434 - Math.floor(434 * 0.75)}
                                {val.type === '配置检查' && 634 - Math.floor(634 * 0.6)}
                                {val.type === 'App检测' && 329 - Math.floor(329 * 0.67)}
                                {val.type === '渗透' && val.total - Math.floor(val.total * 0.92)}
                                {val.type === '漏扫' && val.total - Math.floor(val.total * 0.8)}
                            </ScFixed>
                        </ScContentInfo>
                        <ScContentInfo style={{ width: '24%', textAlign: 'center' }}>
                            {val.type === '代码审计' && invertTime(invertMsTime(30, 23))}
                            {val.type === '配置检查' && invertTime(invertMsTime(54, 19))}
                            {val.type === 'App检测' && invertTime(invertMsTime(23, 23))}
                            {val.type === '渗透' && invertTime(timeSubmitPen * 0.445)}
                            {val.type === '漏扫' && invertTime(timeSubmitVul * 0.445)}
                        </ScContentInfo>
                    </ScFinishContent>
                ))}
            </React.Fragment>
        </div>
    );
};

export default VulFinish;
