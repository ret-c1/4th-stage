import React, { useRef, useState, useLayoutEffect } from 'react';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';
import {
    ScVulContent,
    ScVulTypeWrapper,
    ScVulTypeItem,
    ScVulItemText,
    ScVulItemNumber,
    // ScVulDetail,
    // ScVulDetailItem,
    // ScVulDetailText,
    // ScVulDetailItemNumber,
} from './style';

const data = [
    {
        question: '路径遍历',
        percent: 0.4,
    },
    {
        question: '信息泄露',
        percent: 0.9,
    },
    {
        question: '第三方组件漏洞',
        percent: 0.8,
    },
    {
        question: '主机扫描漏洞',
        percent: 0.6,
    },
    {
        question: '未授权访问',
        percent: 0.9,
    },
];
const cols = {
    percent: {
        min: 0,
        max: 2,
    },
};

const VulTop = () => {
    const [chartHeight, setChartHeight] = useState(245);
    const vulTopRef = useRef(null);
    useLayoutEffect(() => {
        setChartHeight(vulTopRef.current.clientHeight);
    }, []);
    return (
        <div style={{ height: 'calc(100% - 40px)', marginTop: '30px' }} ref={vulTopRef}>
            <ScVulContent>
                <ScVulTypeWrapper>
                    <ScVulTypeItem>
                        <ScVulItemText>信息泄露</ScVulItemText>
                        <ScVulItemNumber>204</ScVulItemNumber>
                    </ScVulTypeItem>
                    <ScVulTypeItem>
                        <ScVulItemText>第三方组件漏洞</ScVulItemText>
                        <ScVulItemNumber>279</ScVulItemNumber>
                    </ScVulTypeItem>
                    <ScVulTypeItem>
                        <ScVulItemText>主机扫描漏洞</ScVulItemText>
                        <ScVulItemNumber>117</ScVulItemNumber>
                    </ScVulTypeItem>
                    <ScVulTypeItem>
                        <ScVulItemText>未授权访问</ScVulItemText>
                        <ScVulItemNumber>96</ScVulItemNumber>
                    </ScVulTypeItem>
                    <ScVulTypeItem>
                        <ScVulItemText>路径遍历</ScVulItemText>
                        <ScVulItemNumber>7</ScVulItemNumber>
                    </ScVulTypeItem>
                </ScVulTypeWrapper>
                {/* <ScVulDetail>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                    <ScVulDetailItem>
                        <ScVulDetailText>远程溢出</ScVulDetailText>
                        <ScVulDetailItemNumber>6</ScVulDetailItemNumber>
                    </ScVulDetailItem>
                </ScVulDetail> */}
            </ScVulContent>
            <Chart height={chartHeight} data={data} scale={cols} forceFit padding={[0, 160, 0, 0]}>
                <Coord
                    type="polar"
                    innerRadius={0.1}
                    transpose
                    startAngle={Math.PI / 2}
                    endAngle={0}
                    scale={[1, -1]}
                />
                <Tooltip title="question" />
                <Geom
                    type="interval"
                    position="question*percent"
                    color="l(100) 0:#FDE360 1:#01F0FF"
                    tooltip={[
                        'percent',
                        (val) => ({
                            name: '占比',
                            value: `${val * 100}%`,
                        }),
                    ]}
                    style={{
                        lineWidth: 0,
                        stroke: '#fff',
                    }}
                />
            </Chart>
        </div>
    );
};

export default VulTop;
