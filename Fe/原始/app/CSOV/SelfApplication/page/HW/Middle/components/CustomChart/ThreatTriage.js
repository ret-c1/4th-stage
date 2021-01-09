import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import imgLevel1 from '../../img/level1.svg';
import imgLevel2 from '../../img/level2.svg';
import imgLevel3 from '../../img/level3.svg';
import imgLevel4 from '../../img/level4.svg';
import { queryThreatTriage } from '../../api';
const renderImg = (type) => {
    switch (type) {
        case '一级':
            return imgLevel1;
        case '二级':
            return imgLevel2;
        case '三级':
            return imgLevel3;
        case '四级':
            return imgLevel4;
        default:
            return imgLevel1;
    }
};
const renderColor = (type) => {
    switch (type) {
        case '一级':
            return '#b668ff';
        case '二级':
            return '#ff738e';
        case '三级':
            return '#fde360';
        case '四级':
            return '#1890ff';
        default:
            return '#b668ff';
    }
};
const renderBkg = (type) => {
    switch (type) {
        case '一级':
            return 'rgba(182, 104, 255, 0.15)';
        case '二级':
            return 'rgba(255, 115, 142, 0.15)';
        case '三级':
            return 'rgba(253, 227, 96, 0.15)';
        case '四级':
            return 'rgba(24, 144, 255, 0.15)';
        default:
            return 'rgba(182, 104, 255, 0.15)';
    }
};

const ScThreat = styled.div`
    width: 100%;
    height: 303px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
`;
const ScGrade = styled.div`
    width: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const ScInfos = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 161px;
        height: 1px;
        content: '';
        background: rgba(255, 255, 255, 0.09);
    }
`;
const ScTitle = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: url(${(props) => renderImg(props.type)}) no-repeat;
    background-size: 64px 64px;
`;
const ScCount = styled.div`
    width: 100%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: ${(props) => renderColor(props.type)};
`;

const ScLevel = styled(Button)`
    margin-left: 16%;
    font-family: PingFangSC-Regular;
    background: rgba(0, 0, 0, 0);
    border: none;
    margin-left: -1px;
    margin-top: -2px;
    border-radius: 2px;
    width: 63px;
    height: 26px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    border: none;
    background: rgba(255, 255, 255, 0);
    &.ant-btn: focus {
        background: ${(props) => renderColor(props.type)};
    }
    &.ant-btn: hover {
        background: ${(props) => renderColor(props.type)};
    }
`;

const ScInfoContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ScThreatType = styled.div`
    width: 45px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    letter-spacing: 0;
`;

const ScThreatCount = styled.div`
    width: 161px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0;
`;
const ScCircle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    background: ${(props) => renderBkg(props.type)};
    color: ${(props) => renderColor(props.type)};
`;

const ThreatTriage = () => {
    const [dataSource, setDataSource] = useState([
        {
            eventLevel: '一级',
            effectEventCount: 0,
            eventTypes: [
                {
                    label: '',
                    eventKeywords: [
                        {
                            label: '',
                            count: 0,
                        },
                    ],
                },
                {
                    label: '',
                    eventKeywords: [
                        {
                            label: '',
                            count: 0,
                        },
                    ],
                },
                {
                    label: '',
                    eventKeywords: [
                        {
                            label: '',
                            count: 0,
                        },
                    ],
                },
                {
                    label: '',
                    eventKeywords: [
                        {
                            label: '',
                            count: 0,
                        },
                    ],
                },
                {
                    label: '',
                    eventKeywords: [
                        {
                            label: '',
                            count: 0,
                        },
                    ],
                },
            ],
        },
        {
            eventLevel: '二级',
            effectEventCount: 0,
            eventTypes: [],
        },
        {
            eventLevel: '三级',
            effectEventCount: 0,
            eventTypes: [],
        },
        {
            eventLevel: '四级',
            effectEventCount: 0,
            eventTypes: [],
        },
    ]);
    useEffect(() => {
        let interval;
        queryThreatTriage().then((res) => {
            if (res.code === 200 && res.data && res.data.length > 0) {
                setDataSource(res.data);
                interval = setInterval(() => {
                    queryThreatTriage().then((res1) => {
                        if (res1.code === 200 && res1.data && res1.data.length > 0) {
                            setDataSource(res1.data);
                        }
                    });
                }, 5000);
            }
        });
        return () => clearInterval(interval);
    }, []);

    const [currentLevel, setCurrentLevel] = useState('一级');
    useEffect(() => {
        const canvas = document.getElementById('treatLine');
        canvas.width = 40;
        canvas.height = 303;
        if (canvas.getContext) {
            const context = canvas.getContext('2d'); // 得到绘图的上下文环境
            context.beginPath(); // 开始绘制线条，若不使用beginPath，则不能绘制多条线条
            if (currentLevel === '一级') {
                context.moveTo(1, 30); // 线条开始位置
                context.lineTo(20, 30); // 线条经过点
                context.moveTo(20, 30);
                context.lineTo(20, 1);
                context.moveTo(20, 1);
                context.lineTo(40, 1);

                context.moveTo(1, 40);
                context.lineTo(20, 40);
                context.moveTo(20, 40);
                context.lineTo(20, 300);
                context.moveTo(20, 300);
                context.lineTo(40, 300);
                context.strokeStyle = 'rgba(182, 104, 255, 0.4)'; // 设置线条颜色
            }
            if (currentLevel === '二级') {
                context.moveTo(1, 110); // 线条开始位置
                context.lineTo(20, 110); // 线条经过点
                context.moveTo(20, 110);
                context.lineTo(20, 1);
                context.moveTo(20, 1);
                context.lineTo(40, 1);

                context.moveTo(1, 120);
                context.lineTo(20, 120);
                context.moveTo(20, 120);
                context.lineTo(20, 300);
                context.moveTo(20, 300);
                context.lineTo(40, 300);
                context.strokeStyle = 'rgba(255, 115, 142, 0.4)'; // 设置线条颜色
            }
            if (currentLevel === '三级') {
                context.moveTo(1, 190); // 线条开始位置
                context.lineTo(20, 190); // 线条经过点
                context.moveTo(20, 190);
                context.lineTo(20, 1);
                context.moveTo(20, 1);
                context.lineTo(40, 1);

                context.moveTo(1, 200);
                context.lineTo(20, 200);
                context.moveTo(20, 200);
                context.lineTo(20, 300);
                context.moveTo(20, 300);
                context.lineTo(40, 300);
                context.strokeStyle = 'rgba(253, 227, 96, 0.4)'; // 设置线条颜色
            }
            if (currentLevel === '四级') {
                context.moveTo(1, 260); // 线条开始位置
                context.lineTo(20, 260); // 线条经过点
                context.moveTo(20, 260);
                context.lineTo(20, 1);
                context.moveTo(20, 1);
                context.lineTo(40, 1);

                context.moveTo(1, 270);
                context.lineTo(20, 270);
                context.moveTo(20, 270);
                context.lineTo(20, 300);
                context.moveTo(20, 300);
                context.lineTo(40, 300);
                context.strokeStyle = 'rgba(24, 144, 255, 0.4)'; // 设置线条颜色
            }
            context.lineWidth = 1; // 设置线条宽度
            context.stroke(); // 用于绘制线条
        }
    }, [currentLevel]);
    return (
        <ScThreat>
            <ScGrade>
                {dataSource.map((item) => (
                    <ScTitle
                        key={item.eventLevel}
                        type={item.eventLevel}
                        onClick={() => setCurrentLevel(item.eventLevel)}
                    >
                        <ScCount type={item.eventLevel}>{item.effectEventCount}</ScCount>
                        <ScLevel type={currentLevel} value={currentLevel}>
                            {item.eventLevel}
                        </ScLevel>
                    </ScTitle>
                ))}
            </ScGrade>
            <canvas id="treatLine">当用户浏览器不支持Canvas,请更换浏览器重试！</canvas>
            <ScInfos>
                {dataSource.map((item) => {
                    if (item.eventLevel === currentLevel) {
                        return item.eventTypes.map((item1, index1) => (
                            <ScInfoContent key={index1.toString()}>
                                <ScThreatType>{item1.label}</ScThreatType>
                                <ScThreatCount>
                                    {item1.eventKeywords.map((item2, index2) => (
                                        <div key={index2.toString()}>
                                            <ScCircle type={item.eventLevel}>
                                                {item2.count}
                                            </ScCircle>
                                            <div>{item2.label}</div>
                                        </div>
                                    ))}
                                </ScThreatCount>
                            </ScInfoContent>
                        ));
                    }
                    return null;
                })}
            </ScInfos>
        </ScThreat>
    );
};
export default ThreatTriage;
