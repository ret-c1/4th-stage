import React, { useEffect } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import moment from 'moment';
import { queryTrend } from '../../api';

const LineChart = () => {
    const drawChart = (res) => {
        const series = [];
        res.records.forEach((item) => {
            series.push({
                ...item,
                type: 'line',
                stack: '总量',
                areaStyle: {},
            });
        });
        const myChart = echarts.init(document.getElementById('trendLineChart'));
        // 绘制图表
        myChart.setOption({
            color: ['#cf3157', '#fde360', '#01f0ff'],
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['事件', '疑似', '已解决'],
                icon: 'rect',
                top: 12,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.45)',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.65)',
                    },
                },
                data: [
                    moment()
                        .subtract(6, 'day')
                        .format('YYYY-MM-DD'),
                    moment()
                        .subtract(5, 'day')
                        .format('YYYY-MM-DD'),
                    moment()
                        .subtract(4, 'day')
                        .format('YYYY-MM-DD'),
                    moment()
                        .subtract(3, 'day')
                        .format('YYYY-MM-DD'),
                    moment()
                        .subtract(2, 'day')
                        .format('YYYY-MM-DD'),
                    moment()
                        .subtract(1, 'day')
                        .format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                ],
            },
            yAxis: {
                type: 'value',
                splitNumber: 3,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.65)',
                    },
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(255, 255, 255, 0.4)',
                    },
                },
            },
            series,
        });
    };
    useEffect(() => {
        drawChart({
            records: [
                { name: '事件', data: [0] },
                { name: '疑似', data: [0] },
                { name: '已解决', data: [0] },
            ],
        });
        let interval;
        queryTrend().then((res) => {
            if (res.code === 200 && res.data) {
                drawChart(res.data);
                interval = setInterval(() => {
                    queryTrend().then((res1) => {
                        if (res1.code === 200 && res1.data) {
                            drawChart(res1.data);
                        }
                    });
                }, 5000);
            }
        });

        return () => clearInterval(interval);
    }, []);
    return (
        <div
            id="trendLineChart"
            style={{
                width: '100%',
                height: '130px',
                marginTop: '10px',
            }}
        />
    );
};

export default LineChart;
//
// LineChart.propTypes = {
//     data: PropTypes.object,
// };
