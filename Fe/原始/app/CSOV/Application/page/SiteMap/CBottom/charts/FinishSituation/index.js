import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { pubModalTips } from '@components/PubModal';
import { Chart, Geom, Axis, Tooltip, Legend, Label, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import { useInterval } from '@CSOV/hook/useInterval';
import { getEventFinish } from '../../../api';

const { DataView } = DataSet;

const ages = ['事件总数', '事件完成'];

const colorMap = {
    // 事件总数: ['rgba(24,144,255,0.90)-rgba(24,144,255,0.20)'],
    事件总数: ['l(100) 0:rgba(24,144,255,0.90) 1:rgba(24,144,255,0.20)'],
    事件完成: ['l(100) 0:rgba(1,240,255,0.70) 1:rgba(2,249,255,0.10)'],
};
// const cols = {
//     population: {
//         tickInterval: 1000000,
//     },
// };
Shape.registerShape('interval', 'shapeName', {
    getPoints(cfg) {
        // 获取 shape 绘制的关键点
        const { x } = cfg;
        const { y } = cfg;
        const { y0 } = cfg;
        const width = cfg.size;
        return [
            { x: x - width / 2, y: y0 },
            { x: x - width / 2, y: y[1] },
            { x: x + width / 2, y: y[1] },
            { x: x + width / 2, y: y0 },
        ];
    },
    draw(cfg, container) {
        const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
        const polygon = container.addShape('polygon', {
            attrs: {
                points: [
                    [points[0].x, points[0].y],
                    [points[1].x, points[1].y],
                    [points[2].x, points[2].y],
                    [points[3].x, points[3].y],
                ],
                fill: cfg.color,
            },
        });
        return polygon; // 将自定义Shape返回
    },
});

const FinishSituation = ({ type }) => {
    const [chartHeight, setChartHeight] = useState(0);
    const finishRef = useRef(null);
    useLayoutEffect(() => {
        setChartHeight(finishRef.current.clientHeight - 30);
    }, []);

    const [count, setCount] = useState(0);
    useInterval(() => {
        setCount(count + 1);
    }, 1000 * 60);
    // 事件完成数据请求
    const [finishData, setFinishData] = useState([]);
    useEffect(() => {
        getEventFinish({ type }).then((res) => {
            if (res.code === 200) {
                const { data } = res;
                const finish = [
                    {
                        State: '应急响应事件',
                        事件总数: data.emergencyCount,
                        事件完成: data.emergencyFixCount,
                    },
                    {
                        State: '漏洞修复事件',
                        事件总数: data.vulCount,
                        事件完成: data.vulFixCount,
                    },
                    {
                        State: '威胁排查工单事件',
                        事件总数: data.threatCount,
                        事件完成: data.threatFixCount,
                    },
                    {
                        State: '情报排查工单事件',
                        事件总数: data.intelligenceCount,
                        事件完成: data.intelligenceFixCount,
                    },
                ];
                setFinishData(finish);
            } else {
                pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type, count]);

    // 设置数据
    const [dvData, setDvdata] = useState([]);
    useEffect(() => {
        const dv = new DataView();
        dv.source(finishData)
            .transform({
                type: 'fold',
                fields: ages,
                key: 'age',
                value: 'population',
                retains: ['State'],
            })
            .transform({
                type: 'map',
                callback: (obj) => {
                    const key = obj.age;
                    let typeName;

                    if (key === '事件总数') {
                        typeName = 'a';
                    } else {
                        typeName = 'b';
                    }

                    const newObject = Object.assign(obj, { type: typeName });
                    return newObject;
                },
            });
        setDvdata(dv);
    }, [finishData]);
    return (
        <div style={{ height: '100%' }} ref={finishRef}>
            <Chart data={dvData} padding={[30, 0, 10, 30]} forceFit height={chartHeight}>
                <Axis
                    name="State"
                    line={null}
                    tickLine={null}
                    label={{
                        htmlTemplate(text) {
                            return `
                            <span style="
                                width: 56px;
                                margin-top: 10px;
                                color:rgba(255,255,255,0.85);
                                display:inline-block;
                                vertical-align:top;
                                font-size:12px;
                                text-align:center;
                            " }}>${text}</span>
                        `;
                        },
                    }}
                />
                <Axis name="population" line={null} tickLine={null} label={null} grid={null} />
                <Legend
                    position="top-center"
                    itemGap={38}
                    offsetY={-5}
                    textStyle={{
                        fill: 'rgba(255,255,255,0.65)', // 文本的颜色
                        fontSize: '14', // 文本大小
                    }}
                    marker="square"
                />

                <Tooltip />
                <Geom
                    type="interval"
                    position="State*population"
                    color={['age', (age) => colorMap[age]]}
                    tooltip={[
                        'age*population',
                        (age, population) => ({
                            name: age,
                            value: population,
                        }),
                    ]}
                    adjust={[
                        {
                            type: 'dodge',
                            dodgeBy: 'type',
                            // 按照 type 字段进行分组
                            marginRatio: 0.2, // 分组中各个柱子之间不留空隙
                        },
                        {
                            type: 'stack',
                        },
                    ]}
                    shape="shapeName"
                >
                    <Label
                        content="population"
                        offset={10} // 设置坐标轴文本 label 距离坐标轴线的距离
                        textStyle={(number, item) => {
                            let color;
                            if (item.point.age === '事件完成') {
                                color = '#01F0FF';
                            } else {
                                color = '#1890FF';
                            }
                            return {
                                fill: color,
                                fontSize: '12',
                            };
                        }} // 支持回调
                    />
                </Geom>
            </Chart>
        </div>
    );
};

FinishSituation.propTypes = {
    type: PropTypes.number,
};

export default FinishSituation;
