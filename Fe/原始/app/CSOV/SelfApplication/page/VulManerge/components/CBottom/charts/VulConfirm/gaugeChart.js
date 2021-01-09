import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';

const color = ['#0086FA', '#FFBF00', '#F5222D'];

const data1 = [{ value: 1 }, { value: 3 }, { value: 6 }];
const Gauge = (props) => {
    const { totalData, reviewData } = props;
    const dataTotal = [];
    if (reviewData.length) {
        dataTotal.push(reviewData[0].count, reviewData[1].count, 787, 567, 456);
    }
    const gaugeChart = useRef(null);
    const [mockData, setMockData] = useState([]);
    useEffect(() => {
        if (reviewData.length > 0) {
            setMockData([
                {
                    fixType: '已修复',

                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.12),
                    level: '高危',
                },
                {
                    fixType: '已修复',
                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.34),
                    level: '中危',
                },
                {
                    fixType: '已修复',
                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.08),
                    level: '低危',
                },
                {
                    fixType: '未修复',
                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.05),
                    level: '高危',
                },
                {
                    fixType: '未修复',
                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.2),
                    level: '中危',
                },
                {
                    fixType: '未修复',
                    type: '渗透测试',
                    value: Math.floor(reviewData[0].count * 0.9 * 0.75 * 0.21),
                    level: '低危',
                },

                {
                    fixType: '已修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.23),
                    level: '高危',
                },
                {
                    fixType: '已修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.2),
                    level: '中危',
                },
                {
                    fixType: '已修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.05),
                    level: '低危',
                },
                {
                    fixType: '未修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.03),
                    level: '高危',
                },
                {
                    fixType: '未修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.23),
                    level: '中危',
                },
                {
                    fixType: '未修复',
                    type: '漏洞扫描',
                    value: Math.floor(reviewData[1].count * 0.9 * 0.75 * 0.26),
                    level: '低危',
                },
                {
                    fixType: '已修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.25),
                    level: '高危',
                },
                {
                    fixType: '已修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.18),
                    level: '中危',
                },
                {
                    fixType: '已修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.05),
                    level: '低危',
                },
                {
                    fixType: '未修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.03),
                    level: '高危',
                },
                {
                    fixType: '未修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.2),
                    level: '中危',
                },
                {
                    fixType: '未修复',
                    type: '代码审计',
                    value: Math.floor(787 * 0.9 * 0.75 * 0.29),
                    level: '低危',
                },

                {
                    fixType: '已修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.17),
                    level: '高危',
                },
                {
                    fixType: '已修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.29),
                    level: '中危',
                },
                {
                    fixType: '已修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.08),
                    level: '低危',
                },
                {
                    fixType: '未修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.05),
                    level: '高危',
                },
                {
                    fixType: '未修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.18),
                    level: '中危',
                },
                {
                    fixType: '未修复',
                    type: '配置检查',
                    value: Math.floor(567 * 0.9 * 0.75 * 0.23),
                    level: '低危',
                },

                {
                    fixType: '已修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.12),
                    level: '高危',
                },
                {
                    fixType: '已修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.34),
                    level: '中危',
                },
                {
                    fixType: '已修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.08),
                    level: '低危',
                },
                {
                    fixType: '未修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.05),
                    level: '高危',
                },
                {
                    fixType: '未修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.2),
                    level: '中危',
                },
                {
                    fixType: '未修复',
                    type: 'APP检测',
                    value: Math.floor(456 * 0.9 * 0.75 * 0.21),
                    level: '低危',
                },
            ]);
        }
    }, [reviewData]);
    let g = 0;
    let m = 0;
    let d = 0;
    if (mockData.length > 0) {
        for (let i = 0; i < mockData.length; i += 1) {
            if (mockData[i].level === '高危') {
                g = mockData[i].value + g;
            }
            if (mockData[i].level === '中危') {
                m = mockData[i].value + m;
            }
            if (mockData[i].level === '低危') {
                d = mockData[i].value + d;
            }
        }
    }
    useEffect(() => {
        const { id, clientWidth, clientHeight } = gaugeChart.current;
        const w = clientWidth || 100;
        const h = clientHeight || 100;
        const target = id;
        if (totalData) {
            initChart(w, h, [{ value: Math.floor(g) + Math.floor(m) + Math.floor(d) }], target);
        }
    }, [totalData]);

    const initChart = (w, h, obj, target) => {
        const chart = new Chart({
            container: target,
            autoFit: true,
            height: h,
            width: w,
            padding: [0, 0, 30, 0],
        });
        chart.animate(false);

        chart.coordinate('polar', {
            startAngle: (-9 / 8) * Math.PI,
            endAngle: (1 / 8) * Math.PI,
            radius: 0.75,
        });
        chart.scale('value', {
            min: 0,
            max: g + m + d,
            tickInterval: 1,
        });

        chart.axis('type', false);
        chart.axis('value', {
            line: null,
            label: null,
            grid: null,
        });
        chart.legend(false);
        chart.tooltip(false);
        chart
            .point()
            .position('value*type')
            .color('transparent')
            .size(0);

        const draw = (data) => {
            // const val = data[0].value;
            // const val2 = data[1].value;
            // const val3 = data[2].value;

            const lineWidth = 5;
            chart.annotation().clear(true);
            // 绘制仪表盘背景
            chart.annotation().arc({
                top: false,
                start: [0, 1],
                end: [g + m + d, 1],
                style: {
                    stroke: '#CBCBCB',
                    lineWidth,
                    lineDash: null,
                },
            });
            chart.annotation().arc({
                top: false,
                start: [0, 1],
                end: [g, 1],
                style: {
                    stroke: color[2],
                    lineWidth,
                    lineDash: null,
                },
            });
            chart.annotation().arc({
                start: [g, 1],
                end: [g + m, 1],
                style: {
                    stroke: color[1],
                    lineWidth,
                    lineDash: null,
                },
            });
            chart.annotation().arc({
                start: [g + m, 1],
                end: [m + g + d, 1],
                style: {
                    stroke: color[0],
                    lineWidth,
                    lineDash: null,
                },
            });

            chart.annotation().text({
                position: ['50%', '30%'],
                content: `${obj[0].value}`,
                style: {
                    fontSize: 20,
                    fill: '#FFFFFF',
                    textAlign: 'center',
                },
                offsetY: 15,
            });
            chart.changeData(data);
            // 绘制指标数字
            // chart.annotation().text({
            //     position: ['50%', '30%'],
            //     content: `${data[0].value * 10}`,
            //     style: {
            //         fontSize: 28,
            //         fill: '#FFFFFF',
            //         textAlign: 'center',
            //     },
            //     offsetY: 15,
            // });
            // chart.annotation().text({
            //     position: ['50%', '90%'],
            //     content: '总数',
            //     style: {
            //         fontSize: 16,
            //         fill: '#a6a6a6',
            //         textAlign: 'center',
            //         fontWeight: '200', // 文本粗细
            //     },
            // });

            // draw(obj);
        };
        draw(data1);
    };

    return <div id="container" ref={gaugeChart} style={{ width: '100%', height: '100%' }} />;
};

export default Gauge;
Gauge.propTypes = {
    totalData: PropTypes.number,
    reviewData: PropTypes.array,
};
