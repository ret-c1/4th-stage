import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';
import ybg from '../../img/title_bgd.svg';
import tab from '../../img/tab.svg';
import { queryEventType } from '../../api';

const ScType = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
`;
const ScGroup = styled(Radio.Group)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    background: url(${tab}) no-repeat;
    width: 148px;
    height: 26px;
    margin: 19px 0 19px 88px;
    padding: 0 10px;
    color: rgba(255, 255, 255, 0.45);
`;
const ScButton = styled(Radio.Button)`
    color: rgba(255, 255, 255, 0.45);
    width: 55%;
    border: none;
    font-size: 14px;
    white-space: nowrap;
    background: rgba(255, 255, 255, 0);
    &.ant-radio-button-wrapper:first-child {
        border-left: none;
    }
    &.ant-radio-button-wrapper:not(:first-child)::before {
        width: 0;
    }
    &.ant-radio-button-wrapper {
        display: flex;
        justify-content: flex-start;
        height: 20px;
    }
    &.ant-radio-button-wrapper-checked {
        display: flex;
        justify-content: flex-start;
        color: #01f0ff;
        background: rgba(24, 144, 255, 0.2);
        box-shadow: inset 0 0 2px 0 #1890ff;
        outline: none;
        height: 20px;
    }
`;
const ScCallout = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    margin-bottom: 16px;
    justify-content: space-around;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0;
`;
const ScLegend = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ScSingle = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background-image: linear-gradient(270deg, #01f0ff 0%, #fde360 100%);
`;
const ScSingle2 = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background: #24b6ff;
`;
const ScSection = styled.div`
    margin-bottom: 24px;
    height: 34px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    cursor: pointer;
`;
const ScTitle = styled.div`
    background: url(${ybg}) no-repeat;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #fde360;
`;
const ScDividingLine = styled.span`
    position: relative;
    &::after {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 3px;
        height: 12px;
        content: '';
        background: rgba(255, 255, 255, 0.1);
    }
`;
const ScLine = styled.div`
    width: 297px;
    height: 10px;
    display: flex;
    flex-direction: row;
    background: rgba(53, 144, 255, 0.15);
`;
const ScEffective = styled.div`
    width: ${(props) => props.expendLength};
    height: 10px;
    background: linear-gradient(
        -45deg,
        ${(props) => (props.expendLength === '100.00%' ? 'rgba(0, 0, 0, 0) 0' : '#24b6ff 0')},
        ${(props) => (props.expendLength === '100.00%' ? 'rgba(0, 0, 0, 0) 7px' : '#24b6ff 7px')},
        rgba(253, 227, 96, 0.9) 0%,
        rgba(253, 233, 128, 0.2) 100%
    );
`;

const ScTotal = styled.div`
    width: ${(props) => props.expendLength};
    height: 10px;
    background: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0) 0px,
        rgba(255, 255, 255, 0) 7px,
        #24b6ff 0%,
        #24b6ff 100%
    );
`;

const EventType = () => {
    const [params, setParams] = useState({
        limit: 5,
        offset: 0,
        param: {
            analysisType: 1, // 1是告警分析，2是日志分析
        },
    });
    const [dataSource, setDataSource] = useState([
        { sequenceNo: 1, eventKeyword: '', effectCount: 0, totalCount: 0 },
    ]);
    useEffect(() => {
        let interval;
        queryEventType(params).then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.records && res.data.records.length > 0) {
                    setDataSource(res.data.records);
                }
                if (res.data.total >= 5) {
                    interval = setInterval(() => {
                        if (
                            res.data.records.length < 5 ||
                            params.offset >= res.data.total - params.limit
                        ) {
                            setParams({ limit: 5, offset: 0, param: { ...params.param } });
                        } else {
                            setParams({ ...params, offset: params.offset + params.limit });
                        }
                    }, 5000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [params]);

    const handleSizeChange = (e) => {
        setParams({ limit: 5, offset: 0, param: { analysisType: e.target.value } });
    };

    return (
        <ScType>
            <ScGroup size="small" value={params.param.analysisType} onChange={handleSizeChange}>
                <ScButton value={1}>告警分析</ScButton>
                <ScButton value={2}>日志分析</ScButton>
            </ScGroup>
            {dataSource.length > 0 && (
                <ScCallout>
                    <ScLegend>
                        <ScSingle />
                        有效事件
                    </ScLegend>
                    <ScLegend>
                        <ScSingle2 />
                        总数
                    </ScLegend>
                </ScCallout>
            )}
            <div style={{ height: 290 }}>
                {dataSource.map((item) => (
                    <ScSection key={item.sequenceNo}>
                        <ScTitle>
                            <div>
                                <span style={{ margin: '2px 0 2px 11px' }}>{item.sequenceNo}</span>
                                <span style={{ margin: '2px 0 2px 18px', color: '#ffffff' }}>
                                    {item.eventKeyword}
                                </span>
                            </div>
                            <div>
                                <span>{item.effectCount}</span>
                                <ScDividingLine />
                                <span style={{ color: '#24b6ff', marginLeft: '11px' }}>
                                    {item.totalCount}
                                </span>
                            </div>
                        </ScTitle>
                        <ScLine>
                            <div
                                style={{
                                    width: `${(parseInt(item.keywordPercent, 10) / 100) * 297}px`,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <ScEffective expendLength={item.effectPercent} />
                                {item.effectPercent !== '100.00%' && (
                                    <ScTotal
                                        expendLength={`${(1 -
                                            parseInt(item.effectPercent, 10) / 100) *
                                            100}%`}
                                    />
                                )}
                            </div>
                        </ScLine>
                    </ScSection>
                ))}
            </div>
        </ScType>
    );
};
export default EventType;
