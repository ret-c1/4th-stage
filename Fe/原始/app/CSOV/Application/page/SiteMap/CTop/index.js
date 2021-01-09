import React, { useEffect, useState } from 'react';
// import { pubModalTips } from '@components/PubModal';
import { useInterval } from '@CSOV/hook/useInterval';
import {
    ScCTop,
    ScTitle,
    ScCTopUl,
    ScLiTitle,
    ScTaps,
    ScTaps2,
    ScHeadWrap,
    ScLittleDot,
    ScTap2After,
    ScItemContent,
    ScItemInfo,
    ScItemInfoNumber,
    ScItemInfoUnit,
    ScItemInfoRemark,
    ScItemInfoTab1,
    ScItemInfoTab2,
    ScEmergencyContent,
    ScEmergencyInfo,
    ScEmergencyLevel,
    ScEmergencyLevelText,
} from './style';
import { getEvent, getEmergency, getHealthy, getSLA } from '../api';

const CTop = () => {
    const [type, setType] = useState(3); // 定义时间点 1. 24小时 2. 7天 3.30天
    const [count, setCount] = useState(0);
    useInterval(() => {
        setCount(count + 1);
    }, 1000 * 60);

    // 众测大屏接口
    const [isrcData, setIsrcData] = useState({});
    useEffect(() => {
        // getIsrc({ type }).then((res) => {
        //     if (res.code === 200) {
        //         setIsrcData(res.data);
        //     } else {
        //         // pubModalTips('error', '获取数据失败', res.message, 2);
        //     }
        // });
        if (type === 1) {
            setIsrcData({
                unFinishCount: 10,
                weaknessCount: 4,
                fixedCount: 0,
            });
        }
        if (type === 2) {
            setIsrcData({
                unFinishCount: 10,
                weaknessCount: 97,
                fixedCount: 0,
            });
        }
        if (type === 3) {
            setIsrcData({
                unFinishCount: 10,
                weaknessCount: 1318,
                fixedCount: 0,
            });
        }
    }, [type, count]);

    // 事件管理接口
    const [eventData, setEventData] = useState({});
    useEffect(() => {
        getEvent({ type }).then((res) => {
            if (res.code === 200) {
                setEventData(res.data);
            } else {
                // pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type]);

    // 应急响应接口
    const [emergencyData, setEmergencyData] = useState({}); // 应急响应全部数据
    const [filterEmergencyData, setFilterEmergencyData] = useState([]);
    useEffect(() => {
        getEmergency({ type }).then((res) => {
            if (res.code === 200) {
                const newFilter = res.data.emergencyLevelDTOS.filter((item) => item.level);
                setEmergencyData(res.data);
                setFilterEmergencyData(newFilter);
            } else {
                // pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type, count]);

    // 健康度接口
    const [healthyData, setHealthyData] = useState({});
    useEffect(() => {
        getHealthy({ type }).then((res) => {
            if (res.code === 200) {
                setHealthyData(res.data);
            } else {
                // pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type, count]);

    // 安全SLA接口
    const [slaData, setSlaData] = useState({});
    const [timeType, setTimeType] = useState(1); // 1 分钟 2 小时
    useEffect(() => {
        getSLA({ type }).then((res) => {
            if (res.code === 200) {
                setSlaData(res.data);
            } else {
                // pubModalTips('error', '获取数据失败', res.message, 2);
            }
        });
    }, [type, count]);

    return (
        <ScCTop>
            <ScHeadWrap>
                <ScTitle>应用指标</ScTitle>
                <div>
                    <ScTaps
                        type={type}
                        style={{ marginTop: '2px' }}
                        onClick={() => {
                            setType(1);
                        }}
                    >
                        <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                        <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                        近24小时
                    </ScTaps>
                    <ScTaps2
                        type={type}
                        style={{ marginTop: '2px', marginLeft: '2px' }}
                        onClick={() => {
                            setType(2);
                        }}
                    >
                        近7天
                    </ScTaps2>
                    <ScTap2After
                        type={type}
                        style={{ marginTop: '2px', marginLeft: '2px' }}
                        onClick={() => {
                            setType(3);
                        }}
                    >
                        <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                        <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                        近一个月
                    </ScTap2After>
                </div>
            </ScHeadWrap>

            <ScCTopUl>
                <li>
                    <ScLiTitle>
                        众&nbsp;&nbsp;&nbsp;测
                        <i style={{ left: '72px' }} />
                    </ScLiTitle>
                    <ScItemContent>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>{isrcData.unFinishCount || 0}</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>进行中任务</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <ScItemInfo>
                                <p>
                                    <ScItemInfoNumber style={{ color: '#01F0FF' }}>
                                        {isrcData.weaknessCount || 0}
                                    </ScItemInfoNumber>
                                    <ScItemInfoUnit>个</ScItemInfoUnit>
                                </p>
                                <p>
                                    <ScItemInfoRemark>发现漏洞</ScItemInfoRemark>
                                </p>
                            </ScItemInfo>
                        </ScItemInfo>
                        <ScItemInfo>
                            <ScItemInfo>
                                <p>
                                    <ScItemInfoNumber>{isrcData.fixedCount || 0}</ScItemInfoNumber>
                                    <ScItemInfoUnit>个</ScItemInfoUnit>
                                </p>
                                <p>
                                    <ScItemInfoRemark>修复漏洞</ScItemInfoRemark>
                                </p>
                            </ScItemInfo>
                        </ScItemInfo>
                    </ScItemContent>
                </li>
                <li>
                    <ScLiTitle>
                        事 件 管 理
                        <i style={{ left: '109px' }} />
                    </ScLiTitle>
                    <ScItemContent>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>{eventData.addEvent || 0}</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>新增安全事件</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>{eventData.fixedVulRate || 0}</ScItemInfoNumber>
                                <ScItemInfoUnit>%</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>漏洞修复</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {eventData.emergencyFixedRate || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>%</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>事件闭环</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                    </ScItemContent>
                </li>
                <li>
                    <ScLiTitle>
                        安 全 S L A
                        <i style={{ left: '109px' }} />
                    </ScLiTitle>
                    <div style={{ position: 'absolute', right: 0, top: 0 }}>
                        <ScItemInfoTab1
                            type={timeType}
                            style={{ marginTop: '2px' }}
                            onClick={() => {
                                setTimeType(1);
                            }}
                        >
                            <ScLittleDot style={{ left: '-2px', top: '-2px' }} />
                            <ScLittleDot style={{ left: '-2px', bottom: '-2px' }} />
                            分钟
                        </ScItemInfoTab1>
                        <ScItemInfoTab2
                            type={timeType}
                            style={{ marginTop: '2px', marginLeft: '2px' }}
                            onClick={() => {
                                setTimeType(2);
                            }}
                        >
                            <ScLittleDot style={{ right: '-2px', top: '-2px' }} />
                            <ScLittleDot style={{ right: '-2px', bottom: '-2px' }} />
                            小时
                        </ScItemInfoTab2>
                    </div>
                    <ScItemContent>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {(timeType === 1
                                        ? slaData.vulSpend
                                        : (slaData.vulSpend / 60).toFixed(2)) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>{timeType === 1 ? '分钟' : '小时'}</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>漏洞修复</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {(timeType === 1
                                        ? slaData.threatSpend
                                        : (slaData.threatSpend / 60).toFixed(2)) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>{timeType === 1 ? '分钟' : '小时'}</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>威胁响应</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {(timeType === 1
                                        ? slaData.emergencySpend
                                        : (slaData.emergencySpend / 60).toFixed(2)) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>{timeType === 1 ? '分钟' : '小时'}</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>应急响应</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                    </ScItemContent>
                </li>
                <li>
                    <ScLiTitle>
                        红 队 行 动
                        <i style={{ left: '109px' }} />
                    </ScLiTitle>
                    <ScItemContent>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>5</ScItemInfoNumber>
                                <ScItemInfoUnit>支</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>参与队伍</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>32</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>成果</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>30</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>漏洞</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                    </ScItemContent>
                </li>
                <li>
                    <ScLiTitle>
                        应 急 响 应
                        <i style={{ left: '109px' }} />
                    </ScLiTitle>
                    <ScEmergencyContent>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {filterEmergencyData.map((item) => {
                                        let newArr;
                                        if (item.level === '一级') {
                                            newArr = item.count;
                                        }
                                        return newArr;
                                    }) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <ScEmergencyLevel background="rgba(182,104,255,0.15)">
                                <ScEmergencyLevelText color="#B668FF">Ⅰ级</ScEmergencyLevelText>
                            </ScEmergencyLevel>
                        </ScEmergencyInfo>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {filterEmergencyData.map((item) => {
                                        let newArr;
                                        if (item.level === '二级') {
                                            newArr = item.count;
                                        }
                                        return newArr;
                                    }) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <ScEmergencyLevel background="rgba(255,115,142,0.15)">
                                <ScEmergencyLevelText color="#FF738E">Ⅱ级</ScEmergencyLevelText>
                            </ScEmergencyLevel>
                        </ScEmergencyInfo>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {filterEmergencyData.map((item) => {
                                        let newArr;
                                        if (item.level === '三级') {
                                            newArr = item.count;
                                        }
                                        return newArr;
                                    }) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <ScEmergencyLevel background="rgba(250,206,73,0.15)">
                                <ScEmergencyLevelText color="#FACE49">Ⅲ级</ScEmergencyLevelText>
                            </ScEmergencyLevel>
                        </ScEmergencyInfo>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>
                                    {filterEmergencyData.map((item) => {
                                        let newArr;
                                        if (item.level === '四级') {
                                            newArr = item.count;
                                        }
                                        return newArr;
                                    }) || 0}
                                </ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <ScEmergencyLevel background="rgba(24,144,255,0.10)">
                                <ScEmergencyLevelText color="#1890FF">Ⅳ级</ScEmergencyLevelText>
                            </ScEmergencyLevel>
                        </ScEmergencyInfo>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>{emergencyData.upgrade}</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>升级</ScItemInfoRemark>
                            </p>
                        </ScEmergencyInfo>
                        <ScEmergencyInfo>
                            <p>
                                <ScItemInfoNumber>{emergencyData.finish}</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>响应闭环</ScItemInfoRemark>
                            </p>
                        </ScEmergencyInfo>
                    </ScEmergencyContent>
                </li>
                <li>
                    <ScLiTitle>
                        健 康 度
                        <i style={{ left: '85px' }} />
                    </ScLiTitle>
                    <ScItemContent>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>45</ScItemInfoNumber>
                                <ScItemInfoUnit>个</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>培训次数</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>1430</ScItemInfoNumber>
                                <ScItemInfoUnit>人</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>培训参与人数</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                        <ScItemInfo>
                            <p>
                                <ScItemInfoNumber>{healthyData.rate || 0}</ScItemInfoNumber>
                                <ScItemInfoUnit>%</ScItemInfoUnit>
                            </p>
                            <p>
                                <ScItemInfoRemark>健康资产</ScItemInfoRemark>
                            </p>
                        </ScItemInfo>
                    </ScItemContent>
                </li>
            </ScCTopUl>
        </ScCTop>
    );
};

export default CTop;
