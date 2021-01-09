import React, { useState, useEffect } from 'react';
import { Table, Progress, Button, Dropdown, Menu, Steps, Popover, Drawer, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import request from '@utils/request';
import CircleDot from './CircleDot';
import EventAnalyseRecord from './EventAnalyseRecord';
import DistributeModal from '../../../../IncidentResponse/page/Event/DistributeModal';

const { Step } = Steps;
const getProcess = (params) =>
    request(`/api/threat/asset/progress`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

const ThreatDetailList = (props) => {
    const {
        source,
        getList,
        columnList,
        rxRole,
        rxInfo,
        progressParams,
        queryEvent,
        eventRecord,
    } = props;
    const { params, dataSource, loading } = columnList;
    const [newColumns, setColumns] = useState([]);
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    const [visible, setVisible] = useState(false);
    const [nowRecord, setRecord] = useState({});
    const [isEventVisiblie, changeIsEventVisiblie] = useState(false);
    const [progressDetail, setProgressDetail] = useState({});

    const showPopcover = (id) =>
        getProcess({
            id,
            threatId: progressParams.threatId,
        }).then((res) => {
            if (res.code === 200) {
                setProgressDetail(res.data);
            }
        });
    const queryEventRecord = (id) => {
        changeIsEventVisiblie(true);
        queryEvent({ id });
    };

    const handleCancel = () => {
        // 关闭模态框,重新查询列表
        setSearchFlag(!searchFlag);
        setVisible(false);
    };

    const handleModalOpen = (record) => {
        setRecord(record);
        setVisible(true);
    };
    const enmergencyMenu = (record) => (
        <Menu style={{ textAlign: 'center' }}>
            <Menu.Item
                key="need"
                onClick={() => {
                    handleModalOpen({ ...record, type: 'self' });
                }}
            >
                我要应急
            </Menu.Item>
            {rxRole.indexOf('项目经理') !== -1 && (
                <Menu.Item
                    key="distribute"
                    onClick={() => {
                        handleModalOpen({ ...record, type: 'distribute' });
                    }}
                >
                    分派应急
                </Menu.Item>
            )}
        </Menu>
    );

    useEffect(() => {
        let columns = [];
        if (source === '排查中') {
            columns = [
                {
                    title: '资产名称',
                    dataIndex: 'assetName',
                    key: 'assetName',
                },
                {
                    title: '内网IP地址',
                    dataIndex: 'assetIp',
                    key: 'assetIp',
                },
                {
                    title: '资产类型',
                    dataIndex: 'assetType',
                    key: 'assetType',
                },
                {
                    title: '执行时间',
                    key: 'createTime',
                    dataIndex: 'createTime',
                    render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
                },
                {
                    title: '所属业务系统',
                    key: 'businessSystem',
                    dataIndex: 'businessSystem',
                },
                {
                    title: '操作者名称',
                    key: 'executorName',
                    dataIndex: 'executorName',
                },
                {
                    title: '进度',
                    key: 'process',
                    dataIndex: 'process',
                    width: 200,
                    render: (text, record) => (
                        <Popover
                            content={
                                Object.keys(progressDetail).length > 0 && (
                                    <Steps size="small" current={progressDetail.currentState}>
                                        <Step title="开始分析" />
                                        <Step
                                            title="告警分析"
                                            description={
                                                progressDetail.warnAnalysisInMills
                                                    ? `用时：${progressDetail.warnAnalysisInMills}毫秒`
                                                    : false
                                            }
                                        />
                                        <Step
                                            title="日志分析"
                                            description={
                                                progressDetail.logAnalysisInMills
                                                    ? `用时：${progressDetail.logAnalysisInMills}毫秒`
                                                    : false
                                            }
                                        />
                                        <Step
                                            title="事件研判"
                                            description={
                                                progressDetail.eventAnalysisInMills
                                                    ? `用时：${progressDetail.eventAnalysisInMills}毫秒`
                                                    : false
                                            }
                                        />
                                    </Steps>
                                )
                            }
                        >
                            <div onMouseEnter={() => showPopcover(record.id)}>
                                {record.eventStatus === 1 && <Progress percent={100} />}
                                {record.logStatus === 1 && record.eventStatus === 0 && (
                                    <Progress percent={66} />
                                )}
                                {record.warnStatus === 1 &&
                                    record.logStatus === 0 &&
                                    record.eventStatus === 0 && <Progress percent={33} />}
                                {record.warnStatus === 0 &&
                                    record.logStatus === 0 &&
                                    record.eventStatus === 0 && <Progress percent={0} />}
                            </div>
                        </Popover>
                    ),
                },
            ];
        }
        if (source === '未排查') {
            columns = [
                {
                    title: '内网IP地址',
                    dataIndex: 'assetIp',
                    key: 'assetIp',
                },
                {
                    title: '所属业务系统',
                    key: 'businessSystem',
                    dataIndex: 'businessSystem',
                },
                {
                    title: '资产名称',
                    dataIndex: 'assetName',
                    key: 'assetName',
                },
                {
                    title: '资产类型',
                    dataIndex: 'assetType',
                    key: 'assetType',
                },
                {
                    title: '项目名称',
                    dataIndex: 'projectName',
                    key: 'projectName',
                },
                {
                    title: '客户名称',
                    dataIndex: 'clientName',
                    key: 'clientName',
                },
            ];
        }
        if (source === '已排查') {
            columns = [
                {
                    title: '是否为事件',
                    key: 'result',
                    dataIndex: 'result',
                    render: (text) => {
                        switch (text) {
                            case 0:
                                return (
                                    <div>
                                        <CircleDot
                                            size={8}
                                            style={{ marginRight: '8px' }}
                                            backgroundColor="#F5222D"
                                        />
                                        <span>有效事件</span>
                                    </div>
                                );
                            case 1:
                                return (
                                    <div>
                                        <CircleDot
                                            size={8}
                                            style={{ marginRight: '8px' }}
                                            backgroundColor="#EBA62D"
                                        />
                                        <span>隐患问题</span>
                                    </div>
                                );
                            case 2:
                                return (
                                    <div>
                                        <CircleDot
                                            size={8}
                                            style={{ marginRight: '8px' }}
                                            backgroundColor="#000000"
                                        />
                                        <span>无效问题</span>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    },
                },
                {
                    title: '事件名称',
                    dataIndex: 'eventName',
                    key: 'eventName',
                },
                {
                    title: '事件类型',
                    key: 'eventType',
                    dataIndex: 'eventType',
                },
                {
                    title: '事件关键字',
                    dataIndex: 'eventKeyword',
                    key: 'eventKeyword',
                },
                {
                    title: '事件等级',
                    dataIndex: 'eventLevel',
                    key: 'eventLevel',
                    render: (text) => {
                        switch (text) {
                            case '一级':
                                return (
                                    <Button
                                        style={{
                                            color: '#52C41A',
                                            background: '#F6FFED',
                                            border: '1px solid #B7EB8F',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {text}
                                    </Button>
                                );
                            case '二级':
                                return (
                                    <Button
                                        style={{
                                            color: '#1890FF',
                                            background: '#E6F7FF',
                                            border: '1px solid #91D5FF',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {text}
                                    </Button>
                                );
                            case '三级':
                                return (
                                    <Button
                                        style={{
                                            color: '#DE9F21',
                                            background: 'rgba(250,173,20,0.10)',
                                            border: '1px solid rgba(250,173,20,0.40)',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {text}
                                    </Button>
                                );
                            case '四级':
                                return (
                                    <Button
                                        style={{
                                            color: '#F5222D',
                                            background: '#FFF1F0',
                                            border: '1px solid #FFA39E',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {text}
                                    </Button>
                                );
                            case '五级':
                                return (
                                    <Button
                                        style={{
                                            color: '#722ED1',
                                            background: '#F9F0FF',
                                            border: '1px solid #D3ADF7',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        {text}
                                    </Button>
                                );
                            default:
                                return null;
                        }
                    },
                },
                {
                    title: '目的IP',
                    key: 'destIps',
                    dataIndex: 'destIps',
                },
                {
                    title: '目的系统',
                    key: 'destSystem',
                    dataIndex: 'destSystem',
                },
                {
                    title: '提交时间',
                    key: 'submitTime',
                    dataIndex: 'submitTime',
                    render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
                },
                {
                    title: '处置状态',
                    dataIndex: 'handleStatus',
                    key: 'handleStatus',
                    render: (text) => {
                        switch (text) {
                            case 1:
                                return '应急未处置';
                            case 2:
                                return '隐患未处置';
                            case 3:
                                return '无效事件不处理';
                            case 4:
                                return '处置中';
                            case 5:
                                return '已处置';
                            default:
                                return null;
                        }
                    },
                    onFilter: (value, record) => record.handleStatus.indexOf(value) === 0,
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    render: (text, record) => (
                        <>
                            <Dropdown
                                overlay={() => enmergencyMenu(record)}
                                style={{ display: 'inline-block' }}
                                disabled={record.handleStatus > 2}
                            >
                                <Button
                                    type="link"
                                    onClick={(e) => e.preventDefault()}
                                    size="small"
                                >
                                    {record.result === 1 ? '隐患处置' : '应急处置'}
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                            <Divider type="vertical" />
                            <Button type="link" onClick={() => queryEventRecord(record.id)}>
                                查看
                            </Button>
                        </>
                    ),
                },
            ];
        }
        setColumns(columns);
    }, [source]);

    // 改变页数方法
    const pageChange = (page, pageSize) => {
        getList({ ...params, offset: (page - 1) * pageSize });
    };
    const pagination = {
        pageSize: 10,
        onChange: pageChange,
        total: (dataSource && dataSource.total) || 0,
    };
    return (
        <>
            <Table
                rowKey="id"
                columns={newColumns}
                loading={loading}
                dataSource={(dataSource && dataSource.records) || []}
                pagination={pagination}
            />
            {visible ? (
                <DistributeModal
                    visible={visible}
                    handleCancel={handleCancel}
                    event={nowRecord}
                    rxInfo={rxInfo}
                />
            ) : null}
            <Drawer
                title="事件研判记录"
                visible={isEventVisiblie}
                width={500}
                style={{
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: '14px',
                }}
                onClose={() => changeIsEventVisiblie(false)}
            >
                <EventAnalyseRecord eventRecord={eventRecord} />
            </Drawer>
        </>
    );
};

ThreatDetailList.propTypes = {
    source: PropTypes.string,
    rxRole: PropTypes.array,
    rxInfo: PropTypes.object,
    getList: PropTypes.func,
    columnList: PropTypes.object,
    progressParams: PropTypes.object,
    eventRecord: PropTypes.object,
    queryEvent: PropTypes.func,
};

export default ThreatDetailList;
