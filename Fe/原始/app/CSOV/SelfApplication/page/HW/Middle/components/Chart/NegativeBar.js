import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import styled from 'styled-components';
import { queryWorkOrder } from '../../api';
import tab from '../../img/tab.svg';

const ScGroup = styled(Radio.Group)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    background: url(${tab}) no-repeat;
    width: 148px;
    height: 26px;
    margin: 10px 0 5px 6px;
    padding: 0 10px;
    color: rgba(255, 255, 255, 0.45);
`;
const ScButton = styled(Radio.Button)`
    color: #ffffff;
    width: 100%;
    border: none;
    background: rgba(255, 255, 255, 0);
    &.ant-radio-button-wrapper:first-child {
        border-left: none;
    }
    &.ant-radio-button-wrapper:not(:first-child)::before {
        width: 0;
    }
    &.ant-radio-button-wrapper {
        display: flex;
        justify-content: center;
        height: 20px;
    }
    &.ant-radio-button-wrapper-checked {
        display: flex;
        justify-content: center;
        color: #01f0ff;
        background: rgba(24, 144, 255, 0.2);
        box-shadow: inset 0 0 2px 0 #1890ff;
        outline: none;
        height: 20px;
    }
`;
const NegativeBar = () => {
    const [params, setParams] = useState({
        limit: 5,
        offset: 0,
        param: {
            searchType: 1, // 1累计，2当天
        },
    });
    const drawChart = (res) => {
        // 初始化
        const myChart = echarts.init(document.getElementById('threatNegativeBar'));
        // 绘制图表
        const series = [];
        const nameList = [];
        res.records.forEach((item) => {
            nameList.push(item.name);
            if (item.name === '总数') {
                series.push({
                    ...item,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside',
                    },
                });
            }
            if (item.name === '有效') {
                series.push({
                    ...item,
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                    },
                });
            }
            if (item.name === '误报') {
                series.push({
                    ...item,
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'left',
                    },
                });
            }
        });
        myChart.setOption({
            color: ['#2199d9', '#05c6d8', '#face49'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: {
                data: [...new Set(nameList)],
                textStyle: {
                    color: '#ffffff',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.45)',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255, 255, 255, 0.2)',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff',
                        },
                    },
                    data: res.xlabels,
                },
            ],
            series,
        });
    };
    useEffect(() => {
        drawChart({
            xlabels: [],
            records: [
                { name: '总数', data: [0] },
                { name: '有效', data: [0] },
                { name: '误报', data: [0] },
            ],
        });
        let interval;
        queryWorkOrder(params).then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.xlabels && res.data.xlabels.length > 0) {
                    drawChart(res.data);
                }
                interval = setInterval(() => {
                    if (
                        res.data.xlabels.length < 5 ||
                        params.offset >= res.data.total - params.limit
                    ) {
                        setParams({ limit: 5, offset: 0, param: { ...params.param } });
                    } else {
                        setParams({ ...params, offset: params.offset + params.limit });
                    }
                }, 5000);
            }
        });
        return () => clearInterval(interval);
    }, [params]);

    const handleSizeChange = (e) => {
        setParams({ limit: 5, offset: 0, param: { searchType: e.target.value } });
    };

    return (
        <div
            style={{
                width: '100%',
                marginTop: '13px',
            }}
        >
            <ScGroup size="small" value={params.param.searchType} onChange={handleSizeChange}>
                <ScButton value={1}>累计</ScButton>
                <ScButton value={2}>当天</ScButton>
            </ScGroup>
            <div
                style={{
                    height: '265px',
                    width: '100%',
                    marginTop: '10px',
                }}
                id="threatNegativeBar"
            />
        </div>
    );
};

export default NegativeBar;
