import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import titleBgd from '../../img/title_bgd.svg';
import { queryEffectEventIps, queryIpInfo } from '../../api';

const ScType = styled.div`
    width: 80%;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
`;
const ScCallout = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
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
    background: #fde360;
`;
const ScSingle2 = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background: #24b6ff;
`;
const ScSection = styled.div`
    margin-top: 21px;
    cursor: pointer;
`;
const ScTitle = styled.div`
    background: url(${titleBgd}) no-repeat;
    padding: 2px 0 2px 11px;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #fde360;
`;
const ScLine = styled.div`
    width: 244px;
    margin-bottom: 8px;
    height: 10px;
    font-family: HelveticaNeue;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: rgba(53, 144, 255, 0.15);
`;
const ScEffective = styled.div`
    width: ${(props) => props.expendLength};
    height: 10px;
    background: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 0) 0px,
        rgba(255, 255, 255, 0) 10px,
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
        rgba(255, 255, 255, 0) 10px,
        #24b6ff 2%,
        #3590ff 100%
    );
`;

const TopChart = () => {
    const [showInfos, changeShowInfos] = useState(false);
    const [currentEventKeyword, setCurrentEventKeyword] = useState();
    const [params, setParams] = useState({
        limit: 5,
        offset: 0,
    });
    const [dataSource, setDataSource] = useState([
        { sequenceNo: 1, eventKeyword: '', effectEventCount: '', destIpCount: '' },
    ]);
    const [ipParams, setIpParams] = useState({
        limit: 5,
        offset: 0,
        param: {},
    });
    const [ipDataSource, setIpDataSource] = useState([]);
    useEffect(() => {
        let interval;
        queryEffectEventIps(params).then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.records && res.data.records.length > 0) {
                    setDataSource(res.data.records);
                    changeShowInfos(true);
                    setCurrentEventKeyword(res.data.records[0].eventKeyword);
                    setIpParams({
                        ...ipParams,
                        param: { eventKeyword: res.data.records[0].eventKeyword },
                    });
                }
                if (res.data.total >= 5) {
                    interval = setInterval(() => {
                        if (
                            (res.data.records && res.data.records.length < 5) ||
                            params.offset >= res.data.total - params.limit
                        ) {
                            setParams({ limit: 5, offset: 0 });
                        } else {
                            setParams({ ...params, offset: params.offset + params.limit });
                        }
                    }, 5000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [params]);
    useEffect(() => {
        let interval;
        queryIpInfo(ipParams).then((res) => {
            if (res.code === 200 && res.data) {
                if (res.data.records && res.data.records.length > 0) {
                    setIpDataSource(res.data.records);
                }
                if (res.data.total >= 5) {
                    interval = setInterval(() => {
                        if (
                            (res.data.records && res.data.records.length < 5) ||
                            ipParams.offset >= res.data.total - ipParams.limit
                        ) {
                            setIpParams({ ...ipParams, limit: 5, offset: 0 });
                        } else {
                            setIpParams({
                                ...params,
                                offset: (ipParams.offset += 1) * params.limit,
                            });
                        }
                    }, 5000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [ipParams, currentEventKeyword]);

    const changeTable = (item) => {
        setCurrentEventKeyword(item.eventKeyword);
        setIpParams({ ...ipParams, param: { ...ipParams.param, eventKeyword: item.eventKeyword } });
    };
    return (
        <ScType>
            {dataSource.length > 0 && (
                <ScCallout>
                    <ScLegend>
                        <ScSingle />
                        有效事件
                    </ScLegend>
                    <ScLegend>
                        <ScSingle2 />
                        IP数
                    </ScLegend>
                </ScCallout>
            )}
            {dataSource.map((item) => (
                <ScSection key={item.no}>
                    <div style={{ height: 68 }}>
                        <ScTitle>
                            <div>
                                <span>{item.no}</span>
                                <span style={{ marginLeft: '18px', color: '#ffffff' }}>
                                    {item.eventKeyword}
                                </span>
                            </div>
                        </ScTitle>
                        <ScLine>
                            <ScEffective
                                expendLength={`${(item.effectEventCount / 600) * 244}px`}
                            />
                            <span style={{ color: '#fde360' }}>{item.effectEventCount}</span>
                        </ScLine>
                        <ScLine onClick={() => changeTable(item)}>
                            <ScTotal expendLength={`${(item.destIpCount / 3000) * 244}px`} />
                            <span style={{ color: '#24b6ff' }}>{item.destIpCount}</span>
                        </ScLine>
                    </div>
                    {showInfos && currentEventKeyword && currentEventKeyword === item.eventKeyword && (
                        <div style={{ height: 280 }}>
                            <table style={{ width: '244px', textAlign: 'center' }}>
                                <thead>
                                    <tr
                                        style={{
                                            height: '36px',
                                            background: 'rgba(53, 144, 255, 0.25)',
                                            border: '1px solid rgba(255, 255, 255, 0.09)',
                                        }}
                                    >
                                        <th
                                            colSpan="2"
                                            style={{
                                                textAlign: 'left',
                                                paddingLeft: '38px',
                                                fontFamily: 'PingFangSC-Regular',
                                                fontSize: '14px',
                                                color: '#24b6ff',
                                                letterSpacing: 0,
                                                lineHeight: '12px',
                                            }}
                                        >
                                            目的Ip列表
                                        </th>
                                    </tr>
                                    <tr
                                        style={{
                                            opacity: '0.65',
                                            height: '44px',
                                            background: 'rgba(53, 144, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.09)',
                                        }}
                                    >
                                        <td>资产名称</td>
                                        <td>资产IP</td>
                                    </tr>
                                </thead>
                                <tbody style={{ color: '#80d5ff' }}>
                                    {ipDataSource.map((item1, index1) => (
                                        <tr
                                            key={`${item.eventKeyword} - ${index1.toString()}`}
                                            style={{
                                                border: '1px solid rgba(255, 255, 255, 0.09)',
                                                height: '40px',
                                            }}
                                        >
                                            <td>{item1.destsystem}</td>
                                            <td>{item1.destIp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ScSection>
            ))}
        </ScType>
    );
};
export default TopChart;
