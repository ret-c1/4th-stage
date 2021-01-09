import React, { useRef, useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
import PropTypes from 'prop-types';
import { Chart } from '@antv/g2';

const FixChart = (props) => {
    const fixChartRef = useRef(null);
    const { reviewData } = props;
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
    // let g = 0;
    // let m = 0;
    // let d = 0;
    // if (mockData.length > 0) {
    //     for (let i = 0; i < mockData.length; i += 1) {
    //         if (mockData[i].level === '高危') {
    //             g = mockData[i].value + g;
    //         }
    //         if (mockData[i].level === '中危') {
    //             m = mockData[i].value + m;
    //         }
    //         if (mockData[i].level === '低危') {
    //             d = mockData[i].value + d;
    //         }
    //     }
    // }
    // console.log('111', g);
    // console.log('111', m);
    // console.log('111', d);

    useEffect(() => {
        const { id, clientWidth, clientHeight } = fixChartRef.current;
        const w = clientWidth || 100;
        const h = clientHeight || 100;
        const target = id;
        if (mockData.length > 0) {
            initChart(w, h, mockData, target);
        }
    }, [mockData]);

    const initChart = (w, h, obj, target) => {
        const chart = new Chart({
            container: target,
            autoFit: true,
            height: h,
            width: w,
            padding: [0, -40, 130, 20],
        });

        const ds = new DataSet();
        const dv = ds.createView().source(obj);
        chart.data(dv.rows);
        chart.scale({
            type: {
                sync: true,
            },
            value: {
                sync: true,
                formatter(v) {
                    return `${v}`;
                },
                tickCount: 5,
                ticks: [0, 15, 30],
            },
            fixType: {
                sync: true,
            },
        });
        chart.axis('value', { grid: null });
        // chart.scale({
        //     sale: {
        //         min: 0,
        //         max: 40,
        //     },
        // });
        // chart.scale('type', {
        //     min: 0,
        //     ticks: [0, 15, 30, 45],
        // });

        chart.facet('mirror', {
            fields: ['fixType'],
            transpose: true,
            showTitle: false,
            padding: [0, 80, 0, 0],
            eachView(view) {
                view.interval()
                    .adjust('stack')
                    .position('type*value')
                    .color('level', (level) => {
                        if (level === '高危') {
                            return '#CF3157';
                        }
                        if (level === '中危') {
                            return '#FDE360';
                        }
                        if (level === '低危') {
                            return '#24B6FF';
                        }
                        return '#CF3157';
                    });
            },
        });
        chart.render();
    };

    return <div id="fixChart" ref={fixChartRef} style={{ width: '100%', height: '100%' }} />;
};

export default FixChart;
FixChart.propTypes = {
    reviewData: PropTypes.array,
};
