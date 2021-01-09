import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
// import styled from 'styled-components';
import {
    ScSwiper,
    ScOuter,
    SCNumber,
    ScSystem,
    ScRisk,
    ScRiskNumber,
    ScLeft,
    ScRight,
} from './style';
import { queryLoopholeRate } from '../../api';
const RiskRank = () => {
    const [dataSource, setDataSource] = useState([
        [
            { no: 1, risk: 95, name: '模拟演练系统' },
            { no: 2, risk: 92, name: '制服管理系统 ' },
            { no: 3, risk: 90, name: '官方票务系统' },
            { no: 4, risk: 86, name: '竞赛视频管理系统 ' },
            { no: 5, risk: 83, name: '中央成绩管理系统' },
            { no: 6, risk: 84, name: '应用通信保障系统' },
        ],
        [
            { no: 7, risk: 81, name: '翻译订单管理系统' },
            { no: 8, risk: 73, name: '综合运行管理中心' },
            { no: 9, risk: 71, name: '人力资源管理系统' },
            { no: 10, risk: 67, name: '档案管理系统' },
            { no: 11, risk: 64, name: '物资管理系统 ' },
            { no: 12, risk: 62, name: 'OA协同办公软件' },
        ],
        [
            { no: 13, risk: 61, name: '市场开放业务系统' },
            { no: 14, risk: 59, name: '生物研究院官网' },
            { no: 15, risk: 57, name: '人民网在线官网' },
            { no: 16, risk: 55, name: '志愿者管理系统' },
            { no: 17, risk: 52, name: '官方发布系统 ' },
            { no: 18, risk: 50, name: '竞赛信息发布系统' },
        ],
    ]);
    const [params, setParams] = useState({
        limit: 18,
        offset: 0,
    });
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let interval;
        queryLoopholeRate(params).then((res) => {
            if (res.code === 200 && res.data) {
                setTotal(res.data.total);
                if (res.data.records && res.data.records.length > 0) {
                    const result = [];
                    for (let i = 0, len = res.data.total; i < len; i += 6) {
                        result.push(res.data.records.slice(i, i + 6));
                    }
                    setDataSource(result);
                }
                if (res.data.total >= 18) {
                    interval = setInterval(() => {
                        if (res.data.records.length < 18) {
                            setParams({ limit: 18, offset: 0 });
                        } else {
                            setParams({ ...params, offset: (params.offset += 1) * params.limit });
                        }
                    }, 15000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [params]);

    return (
        <ScSwiper>
            <Swiper
                // loop // 循环显示
                loop={!(total < 6)}
                pagination={{
                    // 分页点
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                autoplay={{
                    // 自动播放 单位ms
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >
                {dataSource.map((val) => (
                    <div style={{ marginTop: '20px', height: '350px' }}>
                        {val.map((item) => (
                            <ScOuter key={item.no}>
                                <ScLeft>
                                    <SCNumber>{item.no}</SCNumber>
                                    <ScSystem>{item.name}</ScSystem>
                                </ScLeft>
                                <ScRight>
                                    <ScRisk>风险值</ScRisk>
                                    <ScRiskNumber>{item.risk}</ScRiskNumber>
                                </ScRight>
                            </ScOuter>
                        ))}
                    </div>
                ))}
            </Swiper>
        </ScSwiper>
    );
};
export default RiskRank;
