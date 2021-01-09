import React from 'react';
import { Button, Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircleDot from '../CircleDot';

const LogList = (props) => {
    const { logList, queryLog, spreadWarning, currentStep, page, recordReadyTime } = props;
    const { loading, dataSource = [] } = logList;
    const edit = (val, source) => {
        if (source.indexOf('log') !== -1) {
            queryLog({ id: val.id });
            recordReadyTime({ logReadyTime: moment().format('x') });
        }
        if (source.indexOf('event') !== -1) {
            recordReadyTime({ eventReadyTime: moment().format('x') });
        }
        spreadWarning(val, source);
    };
    const columns = [
        {
            title: '事件名称',
            dataIndex: 'eventName',
            key: 'eventName',
            width: 170,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '事件关键字',
            dataIndex: 'eventKeyword',
            key: 'eventKeyword',
        },
        {
            title: '事件级别',
            dataIndex: 'eventLevel',
            key: 'eventLevel',
            onFilter: (value, record) => record.eventLevel.indexOf(value) === 0,
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
            dataIndex: 'destIps',
            key: 'destIps',
            width: 170,
            render: (text) => (
                <Tooltip title={text} placement="topLeft">
                    {text}
                </Tooltip>
            ),
        },
        {
            title: '目的系统',
            dataIndex: 'destSystem',
            key: 'destSystem',
        },
        {
            title: '分析结果',
            dataIndex: 'conclusion',
            key: 'conclusion',
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
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => edit(record, 'logLook')}>
                        查看
                    </Button>
                    {(page === 'log' || currentStep === 1) && (
                        <Button type="link" onClick={() => edit(record, 'logEdit')}>
                            编辑
                        </Button>
                    )}
                    {(currentStep === 2 || page === 'event') && (
                        <Button type="link" onClick={() => edit(record, 'eventEdit')}>
                            研判
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <Table
                rowKey={(record) => `log${record.id}`}
                columns={columns}
                loading={loading}
                dataSource={dataSource || []}
                pagination={false}
            />
        </>
    );
};

LogList.propTypes = {
    logList: PropTypes.object,
    queryLog: PropTypes.func,
    // queryEvent: PropTypes.func,
    spreadWarning: PropTypes.func,
    currentStep: PropTypes.number,
    page: PropTypes.string,
    recordReadyTime: PropTypes.func,
};

export default LogList;
