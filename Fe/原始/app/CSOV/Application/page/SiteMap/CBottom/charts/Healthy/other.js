import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DataSet from '@antv/data-set';
import { Chart, registerShape, Util } from '@antv/g2';
import { useInterval } from '@CSOV/hook/useInterval';
import { getHealthy } from '../../../api';

const staticColor = ['#B668FF', '#1890FF', '#16CBD6']; // 第一个是top3 第二个是top4-7 第三个是top 8-10

const getTextAttrs = (cfg) => {
    const { mappingData } = cfg;
    const { _origin } = mappingData;
    const { rank } = _origin;
    const [firstColor, secondColor, thirdColor] = staticColor;
    let color;
    if (rank <= 3) color = firstColor;
    else if (rank >= 8) color = secondColor;
    else color = thirdColor;
    return {
        ...cfg.defaultStyle,
        ...cfg.style,
        fontSize: cfg.data.size,
        text: cfg.data.text,
        textAlign: 'center',
        fontFamily: cfg.data.font,
        textBaseline: 'Alphabetic',
        fill: color,
    };
};

const compareFunc = (propertyName) => (val1, val2) => {
    if (val1[propertyName] < val2) return -1;
    if (val1[propertyName] > val2) return 1;
    return 0;
};

const Healthy = ({ type }) => {
    const wordRef = useRef(null);

    const [count, setCount] = useState(0);
    useInterval(() => {
        setCount(count + 1);
    }, 1000 * 60);
    // 获取健康度数据
    useEffect(() => {
        const { id, clientWidth, clientHeight } = wordRef.current;
        const w = clientWidth || 100;
        const h = clientHeight || 100;
        const target = id;
        getHealthy({ type }).then((res) => {
            if (res.code === 200) {
                const { data } = res;
                const arr = data.hwProjectHealthVOS.sort(compareFunc('grade'));
                arr.forEach((item, i) => {
                    item.rank = i + 1; // eslint-disable-line no-param-reassign
                    // eslint-disable-next-line
                    item.name = `${
                        String(item.projectName).length > 9
                            ? `${String(item.projectName).substring(0, 9)}...${item.grade}`
                            : String(item.projectName) + item.grade
                    }`;
                });
                initTagCloud(w, h, arr, target);
            }
        });
    }, []);

    const initTagCloud = (w, h, arr, target) => {
        // 给point注册一个词云的shape
        registerShape('point', 'cloud', {
            draw(cfg, container) {
                const attrs = getTextAttrs(cfg);
                const textShape = container.addShape('text', {
                    attrs: {
                        ...attrs,
                        x: cfg.x,
                        y: cfg.y,
                    },
                });
                if (cfg.data.rotate) {
                    Util.rotate(textShape, (cfg.data.rotate * Math.PI) / 180);
                }

                return textShape;
            },
        });

        const dv = new DataSet.View().source(arr);
        // const range = dv.range('rank');
        // const min = range[0];
        // const max = range[1];
        dv.transform({
            type: 'tag-cloud',
            fields: ['name', 'rank'],
            size: [w, h],
            font: 'Verdana',
            padding: 0,
            timeInterval: 5000, // max execute time
            rotate() {
                return 0;
            },
            fontSize() {
                return 14;
            },
        });
        const chart = new Chart({
            container: target,
            autoFit: false,
            width: w,
            height: h,
            padding: 0,
        });
        chart.data(dv.rows);
        chart.scale({
            x: { nice: false },
            y: { nice: false },
        });
        chart.legend(false);
        chart.axis(false);
        chart.tooltip({
            showTitle: false,
            showMarkers: false,
        });
        chart.coordinate().reflect();
        chart
            .point()
            .position('x*y')
            .shape('cloud')
            .tooltip('name');
        chart.interaction('element-active');
        chart.render();
    };

    return <div id="container" style={{ height: '100%' }} ref={wordRef}></div>;
};

Healthy.propTypes = {
    type: PropTypes.number,
};

export default Healthy;
