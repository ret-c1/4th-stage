import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import rbg from '../../img/rbg.svg';
import ybg from '../../img/ybg.svg';
import bbg from '../../img/bbg.svg';
import { queryThreatCategory } from '../../api';

const renderImg = (type) => {
    switch (type) {
        case '网络攻击':
            return rbg;
        case '恶意文件':
            return ybg;
        case '漏洞情报':
            return bbg;
        default:
            return rbg;
    }
};

const ScType = styled.div`
    width: 100%;
    height: 345px;
    margin-top: 23px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;
const ScSumContent = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
const ScContentLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    position: relative;
    &::after {
        position: absolute;
        top: 5px;
        left: 52px;
        background: rgba(208, 98, 125, 0.1);
        width: 1px;
        height: 44px;
        content: '';
    }
`;
const ScContentLeftCount = styled.div`
    font-family: HelveticaNeue;
    font-size: 20px;
`;
const ScContentLeftName = styled.div`
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 24px;
`;
const ScContentRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    text-align: center;
`;

const ScFirstRed = styled.div`
    width: 225px;
    height: 70px;
    display: flex;
    cursor: pointer;
    padding: 13px 0 14px 0;
    justify-content: space-around;
    background-image: linear-gradient(
        -89deg,
        rgba(208, 98, 125, 0.1) 0%,
        rgba(221, 127, 153, 0.1) 58%,
        rgba(208, 98, 125, 0.1) 100%
    );
`;
const ScFirstYellow = styled.div`
    width: 225px;
    height: 70px;
    display: flex;
    cursor: pointer;
    justify-content: space-around;
    padding: 13px 0 14px 0;
    background-image: linear-gradient(
        -89deg,
        rgba(253, 227, 96, 0.1) 0%,
        rgba(253, 227, 96, 0.1) 58%,
        rgba(253, 227, 96, 0.1) 100%
    );
`;
const ScFirstBlue = styled.div`
    width: 225px;
    height: 70px;
    display: flex;
    cursor: pointer;
    justify-content: space-around;
    padding: 13px 0 14px 0;
    background-image: linear-gradient(
        -89deg,
        rgba(24, 144, 255, 0.1) 0%,
        rgba(24, 144, 255, 0.1) 58%,
        rgba(24, 144, 255, 0.1) 100%
    );
`;
const ScSumTitle = styled.div`
    width: 100%;
    background: url(${(props) => renderImg(props.type)}) no-repeat;
    padding: 3px 0 3px 8px;
    cursor: pointer;
    margin-bottom: 7px;
    display: flex;
    justify-content: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgb(255, 255, 255, 0.85);
`;

const TypeThreat = () => {
    const [dataSource, setDataSource] = useState([
        { category: '恶意文件', totalCount: 409, effectCount: 389, percent: '95.11%' },
    ]);
    useEffect(() => {
        let interval;
        queryThreatCategory().then((res) => {
            if (res.code === 200 && res.data && res.data.length > 0) {
                setDataSource(res.data);
                interval = setInterval(() => {
                    queryThreatCategory().then((res1) => {
                        if (res1.code === 200 && res1.data && res1.data.length > 0) {
                            setDataSource(res1.data);
                        }
                    });
                }, 5000);
            }
        });

        return () => clearInterval(interval);
    }, []);
    return (
        <ScType>
            {dataSource.map((item) => (
                <ScSumContent key={item.category}>
                    <ScSumTitle type={item.category}>
                        <div>{item.percent}</div>
                        <div style={{ marginLeft: '14px' }}>{item.category}</div>
                    </ScSumTitle>
                    {item.category === '网络攻击' && (
                        <ScFirstRed>
                            <ScContentLeft>
                                <ScContentLeftCount>{item.totalCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                                    总数
                                </ScContentLeftName>
                            </ScContentLeft>
                            <ScContentRight style={{ color: '#CF617B' }}>
                                <ScContentLeftCount>{item.effectCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(207, 97, 123, 0.85)' }}>
                                    有效告警
                                </ScContentLeftName>
                            </ScContentRight>
                        </ScFirstRed>
                    )}
                    {item.category === '恶意文件' && (
                        <ScFirstYellow>
                            <ScContentLeft>
                                <ScContentLeftCount>{item.totalCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                                    总数
                                </ScContentLeftName>
                            </ScContentLeft>
                            <ScContentRight style={{ color: '#FDE360' }}>
                                <ScContentLeftCount>{item.effectCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(253, 227, 96, 0.85)' }}>
                                    恶意文件样本数
                                </ScContentLeftName>
                            </ScContentRight>
                        </ScFirstYellow>
                    )}
                    {item.category === '漏洞情报' && (
                        <ScFirstBlue>
                            <ScContentLeft>
                                <ScContentLeftCount>{item.totalCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                                    总数
                                </ScContentLeftName>
                            </ScContentLeft>
                            <ScContentRight style={{ color: '#24B6FF' }}>
                                <ScContentLeftCount>{item.effectCount}</ScContentLeftCount>
                                <ScContentLeftName style={{ color: 'rgba(36, 182, 255, 0.85)' }}>
                                    通过审核数
                                </ScContentLeftName>
                            </ScContentRight>
                        </ScFirstBlue>
                    )}
                </ScSumContent>
            ))}
        </ScType>
    );
};

export default TypeThreat;
