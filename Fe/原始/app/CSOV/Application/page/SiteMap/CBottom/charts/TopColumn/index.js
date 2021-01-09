import React, { useRef, useState, useLayoutEffect } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Label } from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
    {
        label: '中国光大银行...',
        漏洞总数: 2800,
        未修复漏洞: 2260,
    },
    {
        label: '中国人保浙江...',
        漏洞总数: 1800,
        未修复漏洞: 1300,
    },
    {
        label: '未来电视有限..',
        漏洞总数: 950,
        未修复漏洞: 900,
    },
    {
        label: '军运会主办方',
        漏洞总数: 500,
        未修复漏洞: 390,
    },
    {
        label: '上海市数字证...',
        漏洞总数: 170,
        未修复漏洞: 100,
    },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: 'fold',
    fields: ['漏洞总数', '未修复漏洞'],
    // 展开字段集
    key: 'type',
    // key字段
    value: 'value', // value字段
});

const scale = {
    label: {
        tickCount: 6,
    },
};

const yLabel = {
    offset: 10,
    textStyle: {
        fill: 'rgba(255,255,255,0.85)', // 文本的颜色
        fontSize: '14', // 文本大小
    },
};

const xLabel = {
    offset: 10,
    textStyle: {
        fill: 'rgba(255,255,255,0.45)', // 文本的颜色
        fontSize: '14', // 文本大小
    },
};

const line = {
    fill: 'rgba(230, 230, 230, 0.1)',
    lineWidth: 1,
};

const colorMap = {
    漏洞总数: 'l(100) 0:#1890FF 1:rgba(24,144,255,0.60)',
    未修复漏洞: 'l(100) 0:rgba(250,206,73,0.85) 1:rgba(253,233,128,0.50)',
};

const TopColumn = () => {
    const topColumnRef = useRef(null);
    const [chartHeight, setChartHeight] = useState(285);
    useLayoutEffect(() => {
        setChartHeight(topColumnRef.current.clientHeight);
    }, []);

    return (
        <div style={{ height: 'calc(100% - 30px)' }} ref={topColumnRef}>
            <Chart
                height={chartHeight}
                data={dv}
                forceFit
                scale={scale}
                padding={[30, 50, 20, 120]}
            >
                <Legend
                    position="top-center"
                    itemGap={38}
                    textStyle={{
                        fill: 'rgba(255,255,255,0.65)', // 文本的颜色
                        fontSize: '14', // 文本大小
                    }}
                    marker="square"
                />
                <Coord transpose scale={[1, -1]} />
                <Axis name="label" label={yLabel} tickLine={null} line={line} />
                <Axis name="value" position="right" grid={null} label={xLabel} />
                <Tooltip />
                <Geom
                    type="interval"
                    position="label*value"
                    // color="type"
                    color={['type', (type) => colorMap[type]]}
                    adjust={[
                        {
                            type: 'dodge',
                            marginRatio: 0.3,
                        },
                    ]}
                >
                    <Label
                        content={['label*value', (name, value) => Number(value || 0)]}
                        // colors={['#ff2a50', '#0f9efe', '#1de003', '#ffb64d']}
                        textStyle={(ele, item) => ({
                            textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                            fill: item.color, // 文本的颜色
                            fontSize: '10', // 文本大小
                            textBaseline: 'middle',
                        })}
                    />
                </Geom>
            </Chart>
        </div>
    );
};

export default TopColumn;
