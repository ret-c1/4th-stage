import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { pubModalTips } from '@components/PubModal';
import { Chart, Coord, Geom, Shape, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';
// import { Chart, registerShape, Util } from '@antv/g2';
// import { data } from './mock';
import { getHealthy } from '../../../api';

const staticColor = ['#B668FF', '#1890FF', '#16CBD6']; // 第一个是top3 第二个是top4-7 第三个是top 8-10
// let index = 1; // 定义index，记录top

const compareFunc = (propertyName) => (val1, val2) => {
    if (val1[propertyName] < val2) return -1;
    if (val1[propertyName] > val2) return 1;
    return 0;
};

const Healthy = ({ type }) => {
    const [chartHeight, setChartHeight] = useState(0);
    const [chartWidth, setChartWidth] = useState(0);
    const [curDv, setDv] = useState(new DataSet.View().source([]));
    const wordRef = useRef(null);
    useLayoutEffect(() => {
        setChartHeight(wordRef.current.clientHeight);
        setChartWidth(wordRef.current.clientWidth);
    }, []);

    // 获取健康度数据
    const [healthyData, setHealthyData] = useState([]);
    useEffect(() => {
        getHealthy({ type }).then((res) => {
            if (res.code === 200) {
                const { data } = res;
                data.hwProjectHealthVOS.sort(compareFunc('grade'));
                const newHealthyData = data.hwProjectHealthVOS.map((item, index) => {
                    const newItem = { ...item };
                    newItem.rank = index + 1;
                    newItem.name = `${
                        String(item.projectName).length > 9
                            ? `${String(item.projectName).substring(0, 9)}...${item.grade}`
                            : String(item.projectName) + item.grade
                    }`;
                    return newItem;
                });
                setHealthyData(newHealthyData);
            } else {
                pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type]);

    const initTagCloud = () => {
        const getTextAttrs = (cfg) => {
            const { origin } = cfg;
            const { _origin } = origin;
            const { size, rotate, text, font } = _origin;
            return {
                ...cfg.style,
                fillOpacity: cfg.opacity,
                fontSize: size,
                rotate,
                text,
                textAlign: 'center',
                fontFamily: font,
                fill: cfg.color,
                textBaseline: 'Alphabetic',
            };
        };

        Shape.registerShape('point', 'cloud', {
            drawShape(cfg, container) {
                const attrs = getTextAttrs(cfg);
                const { origin } = cfg;
                const { _origin } = origin;
                const { rank } = _origin;
                const [firstColor, secondColor, thirdColor] = staticColor;
                let color;
                if (rank <= 3) color = firstColor;
                else if (rank >= 8) color = secondColor;
                else color = thirdColor;
                return container.addShape('text', {
                    attrs: { ...attrs, x: cfg.x, y: cfg.y, fill: color },
                });
            },
        });
    };

    const renderChart = () => {
        if (healthyData.length < 1) {
            return;
        }

        const h = chartHeight || 0;
        const w = chartWidth || 0;

        const onload = () => {
            const dv = new DataSet.View().source(healthyData);
            const range = dv.range('grade');
            const [min, max] = range;
            dv.transform({
                type: 'tag-cloud',
                fields: ['name', 'grade'],
                font: 'Verdana',
                size: [w, h],
                padding: 0,
                timeInterval: 5000,
                board: [
                    {
                        x: 0,
                        y: 0,
                    },
                    {
                        x: w,
                        y: h,
                    },
                ],
                // max execute time
                rotate() {
                    return 0;
                },
                fontSize(d) {
                    if (max - min === 0) return 20;
                    const size = ((d.grade - min) / (max - min)) ** 2;
                    return size * (17.5 - 5) + 20;
                },
            });
            setDv(dv);
        };
        onload();
    };

    // 初始化图表
    useEffect(() => {
        if (chartHeight && chartWidth && healthyData) {
            initTagCloud();
            renderChart();
        }
    }, [chartHeight, healthyData]);
    return (
        <div
            id="wordCloud"
            style={{ height: 'calc(100% - 40px)', marginTop: '40px' }}
            ref={wordRef}
        >
            {curDv && (
                <Chart
                    width={chartWidth}
                    height={chartHeight}
                    data={curDv}
                    padding={0}
                    scale={{
                        x: {
                            nice: false,
                        },
                        y: {
                            nice: false,
                        },
                    }}
                >
                    <Tooltip showTitle={false} />
                    <Coord reflect="y" />
                    <Geom
                        type="point"
                        position="x*y"
                        shape="cloud"
                        tooltip={[
                            'text*grade',
                            function trans(text, grade) {
                                return {
                                    name: text,
                                    grade,
                                };
                            },
                        ]}
                    />
                </Chart>
            )}
        </div>
    );
};

Healthy.propTypes = {
    type: PropTypes.number,
};

export default Healthy;
