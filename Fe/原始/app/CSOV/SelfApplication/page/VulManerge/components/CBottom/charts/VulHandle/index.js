import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts';
import {
    ScVulLabel,
    ScVulItem,
    ScVulItemLevel,
    ScVulItemHandle,
    ScHandleTimeText,
    ScHandleTime,
    ScSide,
    ScTotal,
    ScShare,
    ScHandle,
} from './style';
import { queryVulHandle, queryVulManage } from '../../api';

const option = {
    series: [
        {
            name: '实际',
            type: 'funnel',
            width: '100%',
            maxSize: '100%',
            label: {
                position: 'inside',
                formatter: '{c}',
                color: '#fff',
            },
            itemStyle: { borderWidth: '0' },
            emphasis: {
                label: {
                    position: 'inside',
                },
            },
            data: [
                {
                    value: 96,
                    itemStyle: {
                        color: '#0e5bab',
                    },
                },
                {
                    value: 62,
                    itemStyle: {
                        color: '#0779ac',
                    },
                },
                {
                    value: 54,
                    itemStyle: {
                        color: '#11a9ba',
                    },
                },
            ],
            top: 13,
            left: 0,
        },
    ],
};

const VulHandle = () => {
    const vulHandleRef1 = useRef(null);
    const vulHandleRef2 = useRef(null);
    const vulHandleRef3 = useRef(null);

    const invertTime = (t) => {
        const HOUR = 1000 * 60 * 60;
        const h = parseInt((t % (HOUR * 24)) / HOUR, 10);
        const m = parseInt((t % HOUR) / (1000 * 60), 10);
        const s = parseInt((t % (1000 * 60)) / 1000, 10);
        return `${h}h ${m}m ${s}s`;
    };

    const [timeSubmitVul, setTimeSubmitVul] = useState(0);

    const invertMsTime = (h, m) => h * 60 * 60 * 1000 + m * 60 * 1000;
    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.commit && res.data.commit.length) {
                    if (res.data.commit[1].spend) {
                        setTimeSubmitVul(res.data.commit[1].spend);
                    }
                }
            }
        });
    }, []);

    useEffect(() => {
        const myChart1 = echarts.init(vulHandleRef1.current);
        const myChart2 = echarts.init(vulHandleRef2.current);
        const myChart3 = echarts.init(vulHandleRef3.current);

        myChart1.setOption(option);
        myChart2.setOption(option);
        myChart3.setOption(option);
        queryVulHandle().then((res) => {
            if (res.code === 200 && res.data) {
                res.data[0].data[0].itemStyle = {
                    color: '#0e5bab',
                };
                res.data[0].data[1].itemStyle = {
                    color: '#0779ac',
                };
                res.data[0].data[2].itemStyle = {
                    color: '#11a9ba',
                };
                res.data[1].data[0].itemStyle = {
                    color: '#0e5bab',
                };
                res.data[1].data[1].itemStyle = {
                    color: '#0779ac',
                };
                res.data[1].data[2].itemStyle = {
                    color: '#11a9ba',
                };
                res.data[2].data[0].itemStyle = {
                    color: '#0e5bab',
                };
                res.data[2].data[1].itemStyle = {
                    color: '#0779ac',
                };
                res.data[2].data[2].itemStyle = {
                    color: '#11a9ba',
                };
                console.log('====', res.data[0].data);
                console.log('====', option.series[0]);
                myChart1.setOption({ series: [{ ...option.series[0], data: res.data[0].data }] });
                myChart2.setOption({ series: [{ ...option.series[0], data: res.data[1].data }] });
                myChart3.setOption({ series: [{ ...option.series[0], data: res.data[2].data }] });
            }
        });
    }, []);

    return (
        <div style={{ height: 'calc(100% - 30px)' }}>
            <ScSide>
                <ScTotal>总数</ScTotal>
                <ScShare>已分配</ScShare>
                <ScHandle>已处置</ScHandle>
            </ScSide>
            <ScVulLabel>
                <div>
                    <ScVulItem>
                        <ScVulItemLevel color="#FF738E">高危</ScVulItemLevel>
                        <ScVulItemHandle>
                            <ScHandleTime>
                                {invertTime(
                                    timeSubmitVul * 0.89 * 0.07 +
                                        invertMsTime(30, 23) * 0.89 * 0.1 +
                                        invertMsTime(54, 19) * 0.89 * 0.1 +
                                        invertMsTime(23, 23) * 0.89 * 0.06,
                                )}
                            </ScHandleTime>
                            <ScHandleTimeText>处置时间</ScHandleTimeText>
                        </ScVulItemHandle>
                        <div
                            ref={vulHandleRef1}
                            style={{
                                width: '115px',
                                height: '270px',
                            }}
                        ></div>
                    </ScVulItem>
                    <ScVulItem>
                        <ScVulItemLevel color="#FDE360">中危</ScVulItemLevel>
                        <ScVulItemHandle>
                            <ScHandleTime>
                                {invertTime(
                                    timeSubmitVul * 0.89 * 0.53 +
                                        invertMsTime(30, 23) * 0.89 * 0.54 +
                                        invertMsTime(54, 19) * 0.89 * 0.36 +
                                        invertMsTime(23, 23) * 0.89 * 0.54,
                                )}
                            </ScHandleTime>
                            <ScHandleTimeText>处置时间</ScHandleTimeText>
                        </ScVulItemHandle>
                        <div
                            ref={vulHandleRef2}
                            style={{
                                width: '115px',
                                height: '270px',
                            }}
                        ></div>
                    </ScVulItem>
                    <ScVulItem>
                        <ScVulItemLevel color="#24B6FF">低危</ScVulItemLevel>
                        <ScVulItemHandle>
                            <ScHandleTime>
                                {invertTime(
                                    timeSubmitVul * 0.89 * 0.4 +
                                        invertMsTime(30, 23) * 0.89 * 0.36 +
                                        invertMsTime(54, 19) * 0.89 * 0.54 +
                                        invertMsTime(23, 23) * 0.89 * 0.4,
                                )}
                            </ScHandleTime>
                            <ScHandleTimeText>处置时间</ScHandleTimeText>
                        </ScVulItemHandle>
                        <div
                            ref={vulHandleRef3}
                            style={{
                                width: '115px',
                                height: '270px',
                            }}
                        ></div>
                    </ScVulItem>
                </div>
            </ScVulLabel>
        </div>
    );
};
export default VulHandle;
