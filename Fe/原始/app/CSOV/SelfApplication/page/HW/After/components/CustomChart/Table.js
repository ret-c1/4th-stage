import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Bgyellow from './assets/yellow.svg';
import Bgpurple from './assets/purple.svg';
import Bgblue from './assets/blue.svg';
import Bgyellow1 from './assets/yellow1.svg';
import Bgpurple1 from './assets/purple1.svg';
import Bgblue1 from './assets/blue1.svg';
import Bgpink from './assets/pink.svg';
import Bgpink1 from './assets/bgpink1.svg';

import { queryNewestEventInfos } from '../../api';

// 控制图片的变换
const renderImg = (type, level, active) => {
    if (active) {
        switch (level) {
            case '一级':
                return Bgyellow1;
            case '二级':
                return Bgpurple1;
            case '三级':
                return Bgblue1;
            case '四级':
                return Bgpink;
            default:
                return Bgblue1;
        }
    }
    switch (type) {
        case '一级':
            return Bgyellow;
        case '二级':
            return Bgpurple;
        case '三级':
            return Bgblue;
        case '四级':
            return Bgpink1;
        default:
            return Bgblue;
    }
};
// 控制级别字体的颜色
const renderColor = (type, level, active) => {
    if (active) {
        return '#0e1833;';
    }
    switch (type) {
        case '一级':
            return '#FDE360';
        case '二级':
            return '#BF79FF';
        case '三级':
            return '#1890FF';
        case '四级':
            return '#ff738e';
        default:
            return '#b668ff';
    }
};
// 控制级别字体前竖线的颜色
const renderColor2 = (type, level, active) => {
    if (active) {
        switch (level) {
            case '一级':
                return '#FDE360';
            case '二级':
                return '#BF79FF';
            case '三级':
                return '#1890FF';
            case '四级':
                return '#ff738e';
            default:
                return '#0E1833';
        }
    }
    return '';
};
// 控制表格数字的颜色
const renderColor3 = (type, level, active) => {
    if (active) {
        switch (level) {
            case '一级':
                return '#FDE360';
            case '二级':
                return '#BF79FF';
            case '三级':
                return '#1890FF';
            case '四级':
                return '#ff738e';
            default:
                return '#0E1833';
        }
    }
    return ' #80D5FF';
};
// 控制表格背景色
const renderColor4 = (type, level, active) => {
    if (active) {
        switch (level) {
            case '一级':
                return 'rgba(253,227,96,0.4) 93%';
            case '二级':
                return 'rgba(191,121,255,0.4) 93%';
            case '三级':
                return 'rgba(24,144,255,0.4) 93%';
            case '四级':
                return 'rgba(255,92,119,0.4) 93%';
            default:
                return '#0E1833';
        }
    }
    return ' rgba(24, 144, 255, 0.04) 93%';
};

const ScTable = styled.div`
    margin-left: 40px;
`;
const ScTableTop = styled.div`
    height: 36px;
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    background-image: linear-gradient(
        270deg,
        rgba(101, 195, 255, 0.01) 0%,
        rgba(53, 144, 255, 0.08) 52%,
        rgba(24, 144, 255, 0.2) 93%
    );
    line-height: 36px;
`;
const ScSpan = styled.div`
    margin-left: 10px;
    margin-right: 90px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
`;
const ScSpanList = styled.div`
    width: 200px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
`;
const ScTableBottom = styled.div`
    cursor: pointer;
    height: 36px;
    width: 80%;
    margin-left: 20px;
    display: flex;
    line-height: 36px;
    margin-top: 10px;
    background-image: linear-gradient(
        270deg,
        rgba(101, 195, 255, 0) 0%,
        rgba(53, 144, 255, 0.08) 52%,
        ${(props) => renderColor4(props.type, props.level, props.active)}
    );
    posotion: relative;
`;
const ScLevel = styled.div`
    height: 36px;
    width: 94px;
    line-height: 36px;
    padding-left: 10px;
    margin-right: 40px;
    background-repeat: no-repeat;
    background: url(${(props) => renderImg(props.type, props.level, props.active)}) no-repeat;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: ${(props) => renderColor(props.type, props.level, props.active)};
    letter-spacing: 0;
    position: relative;
    &::before {
        position: absolute;
        top: 0;
        left: -5px;
        width: 3px;
        height: 36px;
        content: '';
        background-color: ${(props) => renderColor2(props.type, props.level, props.active)};
    }
`;
const ScSpanNumber = styled.div`
    width: 240px;
    margin-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: ${(props) => renderColor3(props.type, props.level, props.active)};
    text-align: left;
    line-height: 36px;
    position: relative;
`;
const TablePage = (props) => {
    const { func, setTitleStage, currentPage } = props;
    const [dataSource, setdataSource] = useState([]);
    const [level, setLevel] = useState('');
    const [params, setParams] = useState({
        limit: 4,
        offset: 0,
    });
    const [activeId, setActiveId] = useState(null);
    useEffect(() => {
        let interval;
        queryNewestEventInfos(params).then((res) => {
            if (res.code === 200 && res.data) {
                for (let i = 0; i < res.data.records.length; i += 1) {
                    res.data.records[i].eventFoundTime = moment(
                        res.data.records[i].eventFoundTime,
                    ).format('YYYY-MM-DD HH:mm:ss');
                }
                setdataSource(res.data.records);
                if (res.data.records && res.data.records.length > 0 && currentPage === 'new') {
                    setActiveId(
                        `${res.data.records[0].eventName}${res.data.records[0].sourceIps}-${res.data.records[0].eventFoundTime}${res.data.records[0].no}`,
                    );
                    setTitleStage(true);
                    setLevel(res.data.records[0].eventLevel);
                    func(
                        res.data.records[0].eventLevel,
                        0,
                        res.data.records[0].eventName,
                        res.data.records[0].hwStatus,
                    );
                }
                if (res.data.total > 4) {
                    interval = setInterval(() => {
                        if (
                            res.data.records.length < 4 ||
                            params.offset >= res.data.total - params.limit
                        ) {
                            setParams({ limit: 4, offset: 0 });
                        } else {
                            setParams({ ...params, offset: params.offset + params.limit });
                        }
                    }, 5000);
                }
            }
        });
        return () => clearInterval(interval);
    }, [params, currentPage]);

    useEffect(() => {
        if (currentPage === 'overall') {
            setActiveId(null);
        }
    }, [currentPage]);

    return (
        <ScTable>
            <ScTableTop>
                <ScSpan>级别</ScSpan>
                <ScSpanList>事件名称</ScSpanList>
                <ScSpanList>类型</ScSpanList>
                <ScSpanList>产生时间</ScSpanList>
                <ScSpanList>源IP</ScSpanList>
                <ScSpanList style={{ width: '100px' }}>目的IP</ScSpanList>
            </ScTableTop>
            {dataSource.map((item, idx) => (
                <ScTableBottom
                    key={item.no}
                    type={item.eventLevel}
                    level={level}
                    active={
                        activeId ===
                        `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                    }
                    onClick={() => {
                        setTitleStage(true);
                        setLevel(item.eventLevel);
                        func(item.eventLevel, idx, item.eventName, item.hwStatus);
                        setActiveId(
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`,
                        );
                    }}
                >
                    <ScLevel
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.eventLevel}
                    </ScLevel>
                    <ScSpanNumber
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.eventName}
                    </ScSpanNumber>
                    <ScSpanNumber
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.eventType}
                    </ScSpanNumber>
                    <ScSpanNumber
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.eventFoundTime}
                    </ScSpanNumber>
                    <ScSpanNumber
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.sourceIps}
                    </ScSpanNumber>
                    <ScSpanNumber
                        style={{ width: '100px' }}
                        type={item.eventLevel}
                        level={level}
                        active={
                            activeId ===
                            `${item.eventName}${item.sourceIps}-${item.eventFoundTime}${item.no}`
                        }
                    >
                        {item.destIps}
                    </ScSpanNumber>
                </ScTableBottom>
            ))}
        </ScTable>
    );
};

TablePage.propTypes = {
    func: PropTypes.func,
    setTitleStage: PropTypes.func,
    currentPage: PropTypes.string,
};

export default TablePage;
