import React, { useState, useEffect } from 'react';
import Gauge from './gaugeChart';
import FixChart from './fixChart';
import {
    ScChart,
    ScStroke,
    ScStrokeItem,
    ScStrokeNumber,
    ScStrokeLevel,
    ScTotalNumber,
    ScFontBox,
    ScDone,
    ScUnDone,
} from './style';
import { queryVulManage } from '../../api';

const VulConfirm = () => {
    const [totalData, setTotalData] = useState(0);
    const [reviewData, setReviewData] = useState([]);
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
    let g = 0;
    let m = 0;
    let d = 0;
    if (mockData.length > 0) {
        for (let i = 0; i < mockData.length; i += 1) {
            if (mockData[i].level === '高危') {
                g = mockData[i].value + g;
            }
            if (mockData[i].level === '中危') {
                m = mockData[i].value + m;
            }
            if (mockData[i].level === '低危') {
                d = mockData[i].value + d;
            }
        }
    }

    useEffect(() => {
        queryVulManage().then((res) => {
            if (res.code === 200 && res.data) {
                let total = 0;
                for (let i = 0; i < res.data.review.length; i += 1) {
                    total += res.data.review[i].count;
                }
                total = Math.floor((787 + 567 + 456 + total) * 0.75 * 0.9);

                setReviewData(res.data.review);
                setTotalData(total);
            }
        });
    }, []);

    return (
        <div style={{ height: 'calc(100% - 30px)' }}>
            {/* 漏洞验证情况上半部分 */}
            <div style={{ height: '23.5%', overflow: 'hidden' }}>
                <ScChart>
                    <ScTotalNumber>总数</ScTotalNumber>
                    <Gauge totalData={totalData} reviewData={reviewData} />
                </ScChart>
                <ScStroke>
                    <ScStrokeItem color="#24B6FF">
                        <ScStrokeNumber>{Math.floor(d)}</ScStrokeNumber>
                        <ScStrokeLevel>低危</ScStrokeLevel>
                    </ScStrokeItem>
                    <ScStrokeItem color="#FACE49">
                        <ScStrokeNumber>{Math.floor(m)}</ScStrokeNumber>
                        <ScStrokeLevel>中危</ScStrokeLevel>
                    </ScStrokeItem>
                    <ScStrokeItem color="#CF3157">
                        <ScStrokeNumber>{Math.floor(g)}</ScStrokeNumber>
                        <ScStrokeLevel>高危</ScStrokeLevel>
                    </ScStrokeItem>
                </ScStroke>
            </div>
            {/* 漏洞验证情况下半部分 */}
            <div style={{ height: '76.5%', width: '100%' }}>
                <ScFontBox>
                    <ScDone>已修复</ScDone>
                    <ScUnDone>未修复</ScUnDone>
                </ScFontBox>
                <FixChart reviewData={reviewData} />
            </div>
        </div>
    );
};

export default VulConfirm;
