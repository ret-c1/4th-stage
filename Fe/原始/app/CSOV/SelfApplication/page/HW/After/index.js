import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
// import { useHistory } from 'react-router-dom';
import TopChart from './components/CustomChart/TopChart';
import Table from './components/CustomChart/Table';
import FlowChart from './components/FlowChart';
import TabHeaders from '../components/TabHeaders';

import {
    ScContent,
    // ScTop,
    // ScRight,
    ScChart,
    ScRightChart,
    ScTitleLeft,
    ScTopLine,
    ScBottomLine,
    ScTitleRight,
    ScRightTopLine,
    ScRightBottomLine,
    ScEmergency,
    ScSummary,
    ScDetail,
    ScName,
    ScGroup,
    ScButton,
    ScMiddleInner,
    FlowChartLineRow,
    FlowChartLineCol,
    // ScTopInner,
    ScFont,
} from './styled';
import { queryTrackProgress, queryTrackOverview } from './api';

const HWAfterPage = () => {
    // const history = useHistory();
    // const name = history.location.search.split('=')[1];
    const [currentPage, changeCurrentPage] = useState('overall');
    const [eventLevelUp, setEventLevelUp] = useState([]);

    const [overview, setOverview] = useState({});
    useEffect(() => {
        queryTrackProgress({ limit: 1, offset: 0 }).then((res) => {
            if (res.code === 200 && res.data.records) {
                setEventLevelUp(res.data.records);
            }
        });
        queryTrackOverview().then((res) => {
            if (res.code === 200) {
                setOverview({ ...res.data });
            }
        });
    }, []);
    const [levelobj, setLevelobj] = useState({ level: null, idx: -1, name: '', hwStatus: -1 });
    const handleListChange = (val, idx, name, hwStatus) => {
        setLevelobj({
            level: val,
            idx,
            name,
            hwStatus,
        });
    };
    const levelFunction = (val) => {
        switch (val) {
            case '一级':
                return 'level1';
            case '二级':
                return 'level2';
            case '三级':
                return 'level3';
            case '四级':
                return 'level4';
            case 0:
                return 'level1';
            case 1:
                return 'level2';
            case 2:
                return 'level3';
            case 3:
                return 'level4';
            default:
                return '';
        }
    };

    // 只是为了点击状态 - 临时解决方案
    const [titleStage, setTitleStage] = useState(false);
    useEffect(() => {
        if (titleStage) {
            changeCurrentPage('new');
        }
    }, [titleStage]);

    return (
        <ScContent>
            <TabHeaders />
            <Row style={{ marginTop: '10px' }}>
                <Col span={19}>
                    <ScChart>
                        <ScTitleLeft>
                            <ScTopLine />
                            <span>应急事件跟踪进度</span>
                            <ScBottomLine />
                        </ScTitleLeft>
                        <ScEmergency>
                            <ScSummary>
                                <ScDetail>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: '#ffffff',
                                                marginRight: '30px',
                                            }}
                                        >
                                            应急响应事件升级
                                        </span>
                                        {eventLevelUp.length > 0 &&
                                            eventLevelUp.map((item) => (
                                                <div key={item.name}>
                                                    <ScName>
                                                        <span>事件名称：</span>
                                                        <span style={{ color: '#80d5ff' }}>
                                                            {item.name || '无'}
                                                        </span>
                                                    </ScName>
                                                    <ScName>
                                                        <span>升级级别：</span>
                                                        <span style={{ color: '#ff738e' }}>
                                                            {item.nowLevel || '无'}
                                                        </span>
                                                    </ScName>
                                                    <ScName>
                                                        <span>原级别：</span>
                                                        <span style={{ color: '#80d5ff' }}>
                                                            {item.level || '无'}
                                                        </span>
                                                    </ScName>
                                                    <ScName>
                                                        <span>发现时间：</span>
                                                        <span style={{ color: '#80d5ff' }}>
                                                            {moment(
                                                                eventLevelUp.discoverTime,
                                                            ).format('YYYY-MM-DD hh:mm:ss')}
                                                        </span>
                                                    </ScName>
                                                </div>
                                            ))}
                                    </div>
                                </ScDetail>
                                <ScGroup
                                    size="small"
                                    value={currentPage}
                                    onChange={(e) => {
                                        changeCurrentPage(e.target.value);
                                        if (e.target.value === 'new') {
                                            setTitleStage(true);
                                        }
                                    }}
                                >
                                    <ScButton value="overall">整体概括</ScButton>
                                    <ScButton value="new">最新事件</ScButton>
                                </ScGroup>
                            </ScSummary>
                            {currentPage !== 'overall' && titleStage ? (
                                <ScMiddleInner className={levelFunction(levelobj.level)}>
                                    <ScFont className={levelFunction(levelobj.level)}>
                                        <span>{levelobj.name}</span>
                                    </ScFont>
                                    <FlowChartLineRow className={levelFunction(levelobj.idx)} />
                                    <FlowChartLineCol className={levelFunction(levelobj.idx)} />
                                </ScMiddleInner>
                            ) : null}
                            <FlowChart
                                currentPage={currentPage}
                                hwStatus={levelobj.hwStatus}
                                overview={overview}
                            />
                            <Table
                                func={handleListChange}
                                currentPage={currentPage}
                                setTitleStage={setTitleStage}
                            />
                        </ScEmergency>
                    </ScChart>
                </Col>
                <Col span={5}>
                    <ScRightChart>
                        <ScTitleRight>
                            <ScRightTopLine />
                            <span>事件TOP5</span>
                            <ScRightBottomLine />
                        </ScTitleRight>
                        <TopChart />
                    </ScRightChart>
                </Col>
            </Row>
        </ScContent>
    );
};

export default HWAfterPage;
