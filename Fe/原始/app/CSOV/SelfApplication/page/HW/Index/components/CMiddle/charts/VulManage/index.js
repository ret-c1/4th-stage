import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts';
import { Col } from 'antd';
import {
    ScOuter,
    ScCenter,
    ScSunrise,
    ScRow,
    ScColor,
    ScSpan,
    ScCol,
    ScNumber,
    ScFont,
} from './style';
import { queryVulFinishRate, queryVulManage } from '../../api';
// const data = [
//     {
//         value: 0,
//         name: '0',
//         children: [
//             {
//                 value: 0,
//                 name: '0',

//             },
//             {
//                 value: 0,
//                 name: '0',
//                 itemStyle: {
//                     color: '#1b59a8',
//                 },
//             },
//         ],
//     },
//     {
//         value: 10,
//         name: 10,
//         itemStyle: {
//             color: '#213d9c',
//         },
//     },
// ];

const VulManage = () => {
    const textInput = useRef(null);
    // const [total, setDatatotal] = useState(0);
    const [data, setData] = useState([]);

    const [option] = useState({
        silent: true,
        series: {
            radius: ['40%', '90%'],
            type: 'sunburst',
            sort: null,
            highlightPolicy: 'ancestor',
            center: ['50%', '50%'],
            data: '',
            label: {
                color: 'black',
                rotate: 'tangential',
            },
            itemStyle: {
                borderColor: '#112354',
            },
            levels: [
                {},
                {
                    itemStyle: {
                        color: '#4965ff',
                    },
                },
                {
                    itemStyle: {
                        color: '#3590ff',
                    },
                },
                {
                    itemStyle: {
                        color: '#23b5ff',
                    },
                },
                {
                    itemStyle: {
                        color: '#01dbed',
                    },
                },
            ],
        },
    });
    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data) {
                setData(res.data);
            }
        });
    }, []);

    useEffect(() => {
        const myChart = echarts.init(textInput.current);
        myChart.setOption(option);
        queryVulFinishRate().then((res) => {
            if (res.code === 200 && res.data) {
                const valTotal = data.commit
                    ? data.commit[0].count + data.commit[1].count + 787 + 567 + 456
                    : 0;
                // 已分配数值
                const dispatch =
                    data.dispatch && data.review
                        ? data.dispatch[0].count +
                          Math.floor(
                              (data.review[0].count + data.review[1].count + 787 + 567 + 456) *
                                  0.9 *
                                  0.8,
                          )
                        : 0;

                // 处置的数值
                const handle =
                    data.handle && data.review
                        ? data.handle[0].count +
                          Math.floor(
                              (data.review[0].count + data.review[1].count + 787 + 567 + 456) *
                                  0.9 *
                                  0.8 *
                                  0.85,
                          )
                        : 0;
                // 已验证数据
                const vertify =
                    data && data.review
                        ? (data.review[0].count + data.review[1].count + 787 + 567 + 456) *
                          0.9 *
                          0.75
                        : 0;
                console.log(Math.floor(vertify));
                // 已完成数据
                // const finish = Math.floor(vertify) - Math.floor(vertify * 0.5);
                // 未完成（未修复）数据
                const unFinish = Math.floor(vertify) - Math.floor(vertify * 0.5);
                // 未验证数据
                const unVertify = data.review
                    ? (data.review[0].count + data.review[1].count + 787 + 567 + 456) * 0.9 -
                      Math.floor(vertify)
                    : 0;
                // 未处置数据
                const unHandle = dispatch - handle;
                // 未派发数据
                const unDispatch = valTotal - dispatch;
                console.log(valTotal, dispatch);

                console.log('=====');
                console.log(unFinish, Math.floor(unVertify), unHandle, unDispatch);

                const data0 = res.data[0];
                data0.itemStyle = { color: '#4965FF ' };
                data0.value += dispatch;
                data0.name = String(data0.value);
                const data1 = res.data[1];
                data1.value += unDispatch;
                data1.name = String(unDispatch);
                data1.itemStyle = { color: '#2940A0 ' };
                const data01 = data0.children;
                data01[0].value += handle;
                data01[0].name = String(data01[0].value);
                data01[0].itemStyle = { color: '#3590ff ' };
                data01[1].itemStyle = { color: '#2259a9 ' };
                data01[1].value += unHandle;
                data01[1].name = String(unHandle);

                data01[0].children = [
                    {
                        value: Math.floor(vertify),
                        name: String(Math.floor(vertify)),
                        itemStyle: { color: '#23b5ff' },
                        children: [
                            {
                                value: Math.floor(0.5 * vertify),
                                name: String(Math.floor(0.5 * vertify)),
                                itemStyle: { color: '#00f0ff' },
                            },
                            {
                                value: Math.floor(unFinish),
                                name: String(Math.floor(unFinish)),
                                itemStyle: { color: '#0888ab' },
                            },
                        ],
                    },
                    {
                        value: Math.floor(unVertify),
                        name: String(Math.floor(unVertify)),
                        itemStyle: { color: '#3d6a98' },
                    },
                ];

                myChart.setOption({ ...option, series: { ...option.series, data: res.data } });
            }
        });
    }, [data]);

    const [valData, setValData] = useState([]);
    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data) {
                setValData(res.data);
            }
        });
    }, []);
    const vertify =
        valData && valData.commit
            ? (valData.commit[0].count + valData.commit[1].count + 787 + 567 + 456) * 0.9 * 0.75
            : 0;
    const valTotal = valData.commit
        ? valData.commit[0].count + valData.commit[1].count + 787 + 567 + 456
        : 0;
    return (
        <ScOuter>
            <ScSunrise ref={textInput} />
            <ScCenter>
                <p>
                    <ScNumber>{Number((vertify / valTotal) * 100).toFixed(2)}</ScNumber>
                    <span>%</span>
                </p>
                <ScFont>漏洞闭环率</ScFont>
                <p>
                    <ScNumber>{valTotal}</ScNumber>
                    <span>个</span>
                </p>
                <ScFont>漏洞总数</ScFont>
            </ScCenter>
            <ScRow style={{ marginTop: '-5px' }}>
                <Col>
                    <ScColor
                        style={{
                            backgroundColor: '#4965FF',
                        }}
                    />
                    <ScColor
                        style={{
                            backgroundColor: '#2940A0',
                        }}
                    />
                    <ScSpan>已派发 | 未派发</ScSpan>
                </Col>
                <ScCol>
                    <ScColor
                        style={{
                            backgroundColor: '#3590FF',
                        }}
                    />
                    <ScColor
                        style={{
                            backgroundColor: '#2259A9',
                        }}
                    />
                    <ScSpan>已处置 | 未处置</ScSpan>
                </ScCol>
            </ScRow>
            <ScRow>
                <Col>
                    <ScColor
                        style={{
                            backgroundColor: '#23B5FF',
                        }}
                    />
                    <ScColor
                        style={{
                            backgroundColor: '#3D6A98',
                        }}
                    />
                    <ScSpan>已验证 | 未验证</ScSpan>
                </Col>
                <ScCol>
                    <ScColor
                        style={{
                            backgroundColor: '#00F0FF',
                        }}
                    />
                    <ScColor
                        style={{
                            backgroundColor: '#0889A9',
                        }}
                    />
                    <ScSpan>已修复 | 未修复</ScSpan>
                </ScCol>
            </ScRow>
        </ScOuter>
    );
};
export default VulManage;
