import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { useHistory, Link } from 'react-router-dom';
import { Table, Button, Row, Col, Typography } from 'antd';
import Matebase from '@components/Matebase';
import SelectDateRange from '@components/SelectDateRange';
// import { getTodayNews, getTop10, getFocusNews } from './api';
// import { useHistory } from 'react-router-dom';
// import moment from 'moment';
// import { Button } from 'antd';
import { ScCard } from './styled';
// import { allProject, getThreatsManager, getEmployee, getThreatNames } from './api';
const { Text } = Typography;

const InuserNameligencePage = () => {
    const history = useHistory();
    // top10接口请求参数
    const [topParams, setTopParams] = useState({
        orderType: 1,
        startTime: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')).getTime(),
        endTime: moment.now(),
    });
    // top10接口返回数据
    // const [top10, setTop10] = useState([]);

    // 最新情报接口请求参数
    const [newsParams, setNewsParams] = useState({
        limit: 3,
        offset: 0,
        param: {
            state: 1,
            startSubmitTime: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')).getTime(),
            endSubmitTime: moment.now(),
        },
    });
    // 今日最新情报接口返回数据
    const [news, setNews] = useState([]);

    // 重点关注接口请求参数
    const [focusParams, setFocusParams] = useState({
        limit: 3,
        offset: 0,
        param: {
            startSubmitTime: new Date(moment().subtract(1, 'days').format('YYYY-MM-DD')).getTime(),
            endSubmitTime: moment.now(),
        },
    });
    // 重点关注情报接口返回数据
    const [focus, setFocus] = useState([]);

    // 获取今日最新情报
    const fetchNews = () => {
        // getTodayNews(newsParams).then((res) => {
        //     if (res.code === 200) {
        //         const temp = res.data.records.map((record) => {
        //             const obj = {
        //                 mes: '最新情报',
        //                 id: record.id,
        //                 des: {
        //                     threatType: record.threatType,
        //                     name: record.name,
        //                     // readedCount: record.readedCount,
        //                     // downloadCount: record.downloadCount,
        //                     labels: record.labels,
        //                     userName: record.userName,
        //                     createTime: moment(parseInt(record.createTime, 10)).format('HH:mm:ss'),
        //                 },
        //             };
        //             return obj;
        //         });
        //         setNews(temp);
        //     }
        // });
    };

    useEffect(() => {
        fetchNews();
    }, [newsParams]);

    // 获取重点关注情报
    const fetchFocus = () => {
        getFocusNews(focusParams).then((res) => {
            if (res.code === 200) {
                const temp = res.data.records.map((record) => {
                    const obj = {
                        mes: '重点关注',
                        id: record.id,
                        des: {
                            threatType: record.threatType,
                            name: record.name,
                            labels: record.labels,
                            userName: record.userName,
                            publishTime: moment(parseInt(record.publishTime, 10)).format(
                                'HH:mm:ss',
                            ),
                        },
                    };
                    return obj;
                });
                setFocus(temp);
            }
        });
    };

    useEffect(() => {
        fetchFocus();
    }, [focusParams]);

    // 获取TOP10情报
    const fetchTop10 = () => {
        // getTop10(topParams).then((res) => {
        //     if (res.code === 200) {
        //         console.log(res.data);
                // count = 0;
                // const temp = res.data.map((record) => {
                //     count += 1;
                //     const obj = {
                //         threatType: record.threatType,
                //         id: record.id,
                //         no: count,
                //         threatName: record.name,
                //         viewNum: record.viewNum,
                //         downloadNum: record.downloadNum,
                //     };
                //     return obj;
                // });
                // setTop10(temp);
            }
        // });
    };

    useEffect(() => {
        fetchTop10();
    }, [topParams]);

    const switchIntel = (threatType) => {
        switch (Number(threatType)) {
            case 1:
                return '0daydetail';
            case 2:
                return 'evendetail';
            default:
                return 'evendetail';
        }
    };

    // const top10Intel = (threatType) => {
    //     switch (Number(threatType)) {
    //         case 2:
    //             return '0daydetail';
    //         case 3:
    //             return 'evendetail';
    //         default:
    //             return 'evendetail';
    //     }
    // };

    const columnsA = (source) => {
        console.log(source);
        return [
            {
                dataIndex: 'mes',
                width: '20px',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 0) {
                        obj.props.rowSpan = 3;
                    }
                    // These two are merged into above cell
                    if (index === 1) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 2) {
                        obj.props.rowSpan = 0;
                    }
                    if (index === 3) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            },
            {
                dataIndex: 'des',
                render: (text, record) => {
                    const type = switchIntel(text.threatType);
                    const sname = text.name;
                    return (
                        <Row justify="space-between">
                            <Col span={14}>
                                <Link
                                    style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                                    to={`/intelligence/threat/${type}?stage=detail&sourceType=0&id=${record.id}`}
                                >
                                    <Text>
                                        {sname && sname.length > 30
                                            ? `${sname.substr(0, 28)}...`
                                            : sname}
                                    </Text>
                                </Link>
                            </Col>
                            {/* <Col span={4}>
                                <Text>上报人：{text.userName}</Text>
                            </Col> */}
                            <Col span={8} style={{ textAlign: 'right' }}>
                                {source === 1 ? '上报时间：' : '发布时间：'}
                                {source === 1 ? text.createTime : text.publishTime}
                            </Col>
                        </Row>
                    );
                },
            },
        ];
    };
    // const columnsB = [
    //     {
    //         title: '排名',
    //         dataIndex: 'no',
    //     },
    //     {
    //         title: '情报名称',
    //         dataIndex: 'threatName',
    //         render: (text, record) => {
    //             if (text && text.length > 12) {
    //                 const arg = text.slice(0, 12);
    //                 return (
    //                     <Button
    //                         onClick={() => {
    //                             const type = top10Intel(record.threatType);
    //                             history.push(
    //                                 `/intelligence/threat/${type}?stage=detail&sourceType=0&id=${record.id}`,
    //                             );
    //                         }}
    //                         type="text"
    //                     >
    //                         {`${arg}...`}
    //                     </Button>
    //                 );
    //             }
    //             return (
    //                 <Button
    //                     onClick={() => {
    //                         const type = top10Intel(record.threatType);
    //                         history.push(
    //                             `/intelligence/threat/${type}?stage=detail&sourceType=0&id=${record.id}`,
    //                         );
    //                     }}
    //                     type="text"
    //                 >
    //                     {text}
    //                 </Button>
    //             );
    //         },
    //     },
    //     {
    //         title: '查看次数',
    //         dataIndex: 'viewNum',
    //         render: (text) => <div>{text}次</div>,
    //     },
    //     {
    //         title: '下载次数',
    //         dataIndex: 'downloadNum',
    //         render: (text) => <div>{text}次</div>,
    //     },
    // ];

    // 日期区间段选择
    const [dateRange, setDateRange] = useState({
        starttime: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        endtime: moment(new Date()).format('YYYY-MM-DD'),
    });
    const handleSelectDateRange = (date) => {
        if (Array.isArray(date)) {
            setDateRange({
                ...dateRange,
                starttime: date[0],
                endtime: date[1],
            });
            setTopParams({
                ...topParams,
                startTime: new Date(`${date[0]} 00:00:00`).getTime(),
                endTime: moment.now(),
            });
            setNewsParams({
                ...newsParams,
                param: {
                    ...newsParams.param,
                    startSubmitTime: new Date(`${date[0]} 00:00:00`).getTime(),
                    endSubmitTime: moment.now(),
                },
            });
            setFocusParams({
                ...focusParams,
                param: {
                    ...focusParams.param,
                    startSubmitTime: new Date(`${date[0]} 00:00:00`).getTime(),
                    endSubmitTime: moment.now(),
                },
            });
        } else {
            setDateRange({
                ...dateRange,
                starttime: date,
            });
            setTopParams({
                ...topParams,
                startTime: new Date(date).getTime(),
                endTime: moment.now(),
            });
            setNewsParams({
                ...newsParams,
                param: {
                    ...newsParams.param,
                    startSubmitTime: new Date(date).getTime(),
                    endSubmitTime: moment.now(),
                },
            });
            setFocusParams({
                ...focusParams,
                param: {
                    ...focusParams.param,
                    startSubmitTime: new Date(date).getTime(),
                    endSubmitTime: moment.now(),
                },
            });
        }
    };

    return (
        <ScCard>
            <SelectDateRange handleChange={handleSelectDateRange} />
            <Row gutter={10}>
                <Col span={12}>
                    <Table
                        showHeader={false}
                        columns={columnsA(1)}
                        dataSource={news}
                        size="small"
                        pagination={false}
                        bordered
                        rowKey="id"
                    />
                </Col>
                <Col span={12}>
                    <Table
                        showHeader={false}
                        columns={columnsA(2)}
                        dataSource={focus}
                        size="small"
                        pagination={false}
                        bordered
                        rowKey="id"
                    />
                </Col>
            </Row>
            <div
                style={{
                    padding: 3,
                    textAlign: 'center',
                    border: '1px solid #f0f0f0',
                    borderRadius: '0 0 2px 2px',
                    backgroundColor: '#fafafa',
                }}
            >
                <Button
                    style={{ height: 29 }}
                    type="link"
                    onClick={() => history.push('/intelligence/threat')}
                >
                    查看更多
                </Button>
            </div>
            <Matebase
                id={7}
                starttime={dateRange.starttime}
                endtime={dateRange.endtime}
                width="100%"
                height="800px"
            />
            {/* <Row gutter={20}> */}
            {/* <Col span={16}> */}
            {/* <Matebase */}
            {/* id={7} */}
            {/* starttime={dateRange.starttime} */}
            {/* endtime={dateRange.endtime} */}
            {/* height={900} */}
            {/* /> */}
            {/* </Col> */}
            {/* <Col span={8} style={{ marginTop: '20px' }}> */}
            {/* <Row */}
            {/* style={{ */}
            {/* fontSize: 16, */}
            {/* paddingBottom: '1rem', */}
            {/* paddingLeft: '1rem', */}
            {/* fontWeight: 'bold', */}
            {/* }} */}
            {/* > */}
            {/* <Col span={9}> */}
            {/* <span>TOP10 情报</span> */}
            {/* </Col> */}
            {/* </Row> */}
            {/* <Table */}
            {/* size="small" */}
            {/* columns={columnsB} */}
            {/* dataSource={top10} */}
            {/* pagination={false} */}
            {/* rowKey="id" */}
            {/* /> */}
            {/* </Col> */}
            {/* </Row> */}
        </ScCard>
    );
};

// InuserNameligencePage.propTypes = {
//     rxRole: PropTypes.array,
// };

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxChecked: state.inuserNameligence.checked,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     rxTabelcheck: (id) => {
//         dispatch(tabelcheckAction(id));
//     },
//     rxTabelcheckall: (ids) => {
//         dispatch(tabelallcheckAction(ids));
//     },
// });

const withConnect = connect(null, null);

export default compose(withConnect, memo)(InuserNameligencePage);
