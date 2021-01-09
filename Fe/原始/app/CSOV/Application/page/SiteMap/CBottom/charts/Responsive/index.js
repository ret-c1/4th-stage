import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { pubModalTips } from '@components/PubModal';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import moment from 'moment';
import { getResponsive } from '../../../api';

// const data = [
//     {
//         type: '应急响应',
//         date: '1750',
//         time: 502,
//     },
//     {
//         type: '应急响应',
//         date: '1800',
//         time: 635,
//     },
//     {
//         type: '应急响应',
//         date: '1850',
//         time: 809,
//     },
//     {
//         type: '应急响应',
//         date: '1900',
//         time: 5268,
//     },
//     {
//         type: '应急响应',
//         date: '1950',
//         time: 4400,
//     },
//     {
//         type: '应急响应',
//         date: '1999',
//         time: 3634,
//     },
//     {
//         type: '应急响应',
//         date: '2050',
//         time: 947,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1750',
//         time: 106,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1800',
//         time: 107,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1850',
//         time: 111,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1900',
//         time: 1766,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1950',
//         time: 221,
//     },
//     {
//         type: '威胁排查工单',
//         date: '1999',
//         time: 767,
//     },
//     {
//         type: '漏洞修复',
//         date: '2050',
//         time: 133,
//     },
//     {
//         type: '漏洞修复',
//         date: '1750',
//         time: 106,
//     },
//     {
//         type: '漏洞修复',
//         date: '1800',
//         time: 107,
//     },
//     {
//         type: '漏洞修复',
//         date: '1850',
//         time: 111,
//     },
//     {
//         type: '漏洞修复',
//         date: '1900',
//         time: 1766,
//     },
//     {
//         type: '漏洞修复',
//         date: '1950',
//         time: 221,
//     },
//     {
//         type: '漏洞修复',
//         date: '1999',
//         time: 767,
//     },
//     {
//         type: '漏洞修复',
//         date: '2050',
//         time: 133,
//     },
//     {
//         type: '漏洞修复',
//         date: '2050',
//         time: 133,
//     },
//     {
//         type: '漏洞修复',
//         date: '1750',
//         time: 106,
//     },
//     {
//         type: '情报发布工单',
//         date: '1800',
//         time: 107,
//     },
//     {
//         type: '情报发布工单',
//         date: '1850',
//         time: 111,
//     },
//     {
//         type: '情报发布工单',
//         date: '1900',
//         time: 1766,
//     },
//     {
//         type: '情报发布工单',
//         date: '1950',
//         time: 221,
//     },
//     {
//         type: '情报发布工单',
//         date: '1999',
//         time: 767,
//     },
//     {
//         type: '情报发布工单',
//         date: '2050',
//         time: 133,
//     },
// ];
const label = {
    textStyle: {
        fill: 'rgba(255,255,255,0.6)', // 文本的颜色
        fontSize: '12', // 文本大小
    },

    tickLine: {
        lineWidth: 1, // 刻度线宽
        stroke: 'rgba(255,255,255,0.6)', // 刻度线的颜色
        length: 5, // 刻度线的长度, **原来的属性为 line**,可以通过将值设置为负数来改变其在轴上的方向
        alignWithLabel: false, // alignWithLabel设为false，且数据类型为 category 时，tickLine 的样式变为 category 数据专有样式
    },
};

const scale = {
    time: {
        tickCount: 4, // 定义坐标轴刻度线的条数，默认为 5
    },
    date: {
        tickCount: 4, // 定义坐标轴刻度线的条数，默认为 5
    },
};

const Responsive = ({ type }) => {
    const responsiveDom = useRef({ current: {} });
    const [chartHeight, setChartHeight] = useState(285);
    useLayoutEffect(() => {
        setChartHeight(responsiveDom.current.clientHeight);
    }, []);

    // 事件响应时间
    const [responsiveData, setResponsiveData] = useState({});
    useEffect(() => {
        getResponsive({ type }).then((res) => {
            if (res.code === 200) {
                const { data } = res;
                const {
                    hwNewEmergencySpendDTOS,
                    intelligenceDtos,
                    threatSpendDTOS,
                    vulFixDTOS,
                } = data;
                const response = [];
                hwNewEmergencySpendDTOS.forEach((item) => {
                    response.push({
                        type: '应急响应',
                        date: moment(item.startTime).format('MM-DD') || 0,
                        time: item.spendTimeAverage || 0,
                    });
                });
                intelligenceDtos.forEach((item) => {
                    response.push({
                        type: '情报发布工单',
                        date: moment(item.startTime).format('MM-DD') || 0,
                        time: item.spendTimeAverage || 0,
                    });
                });
                threatSpendDTOS.forEach((item) => {
                    response.push({
                        type: '威胁排查工单',
                        date: moment(item.startTime).format('MM-DD'),
                        time: item.spendTimeAverage,
                    });
                });
                vulFixDTOS.forEach((item) => {
                    response.push({
                        type: '漏洞修复',
                        date: moment(item.startTime).format('MM-DD') || 0,
                        time: item.spendTimeAverage || 0,
                    });
                });
                setResponsiveData(response);
            } else {
                pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type]);
    return (
        <div style={{ height: 'calc(100% - 28px)', marginTop: '10px' }} ref={responsiveDom}>
            <Chart
                height={chartHeight}
                data={responsiveData}
                forceFit
                padding={[20, 10, 20, 30]}
                scale={scale}
            >
                <Axis name="date" label={label} />
                <Axis name="time" grid={null} label={label} />
                <Legend
                    position="top-center"
                    itemGap={38}
                    offsetY={40}
                    textStyle={{
                        fill: 'rgba(255,255,255,0.65)', // 文本的颜色
                        fontSize: '14', // 文本大小
                    }}
                    marker="square"
                />
                <Tooltip
                    crosshairs={{
                        hideMarkers: true,
                    }}
                />
                <Geom
                    type="areaStack"
                    position="date*time"
                    color={[
                        'type',
                        [
                            'l (90) 0:rgba(255, 115, 142, 1) 1:rgba(255, 115, 142, 0.1)',
                            'l (90) 0:rgba(1, 240, 255, 1) 1:rgba(1, 240, 255, 0.1)',
                            'l (90) 0:rgba(253, 227, 96, 1) 1:rgba(253, 227, 96, 0.1)',
                            'l (90) 0:rgba(24, 144, 255, 1) 1:rgba(24, 144, 255, 0.1)',
                        ],
                    ]}
                    tooltip={null}
                />
                <Geom
                    type="lineStack"
                    position="date*time"
                    size={2}
                    color={[
                        'type',
                        [
                            'rgba(255, 115, 142, 1)',
                            'rgba(1, 240, 255, 1)',
                            'rgba(253, 227, 96, 1)',
                            'rgba(24, 144, 255, 1)',
                        ],
                    ]}
                    tooltip={[
                        'date*time*type',
                        (val, time, typeName) => ({
                            // 自定义 tooltip 上显示的 title 显示内容等。
                            name: typeName,
                            title: `${val}`,
                            value: `${time}分钟`,
                        }),
                    ]}
                />
            </Chart>
        </div>
    );
};

Responsive.propTypes = {
    type: PropTypes.number,
};

export default Responsive;
