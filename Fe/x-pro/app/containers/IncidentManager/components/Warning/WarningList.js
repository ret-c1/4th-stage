import React from 'react';
import { Button, Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import CircleDot from '../CircleDot';

const WarningList = (props) => {
    const { warningList, queryWarning, spreadWarning, currentStep, page, recordReadyTime } = props;
    const { loading, dataSource = [] } = warningList;

    const edit = (val, source) => {
        if (source.indexOf('warning') !== -1) {
            queryWarning({ id: val.id });
            recordReadyTime({ warningReadyTime: moment().format('x') });
        }
        if (source.indexOf('log') !== -1) {
            recordReadyTime({ logReadyTime: moment().format('x') });
        }
        if (source.indexOf('event') !== -1) {
            recordReadyTime({ eventReadyTime: moment().format('x') });
        }
        spreadWarning(val, source);
    };

    const columns = [
        {
            title: '告警名称',
            dataIndex: 'name',
            key: 'name',
            width: 170,
            ellipsis: true,
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
            title: '告警关键字',
            dataIndex: 'warnKeyword',
            key: 'warnKeyword',
        },
        {
            title: '告警级别',
            dataIndex: 'level',
            key: 'level',
            onFilter: (value, record) => record.level.indexOf(value) === 0,
            render: (text) => {
                switch (text) {
                    case '高':
                        return (
                            <Button
                                style={{
                                    color: '#FFFFFF',
                                    background: '#F5222D',
                                    borderRadius: '4px',
                                }}
                            >
                                {text}
                            </Button>
                        );
                    case '中':
                        return (
                            <Button
                                style={{
                                    color: '#FFFFFF',
                                    background: '#FAAD14',
                                    borderRadius: '4px',
                                }}
                            >
                                {text}
                            </Button>
                        );
                    case '低':
                        return (
                            <Button
                                style={{
                                    color: '#FFFFFF',
                                    background: '#1890FF',
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
            ellipsis: true,
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
            dataIndex: 'result',
            key: 'result',
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
                    <Button type="link" onClick={() => edit(record, 'warningLook')}>
                        查看
                    </Button>
                    {(page === 'warning' || currentStep === 0) && (
                        <Button type="link" onClick={() => edit(record, 'warningEdit')}>
                            编辑
                        </Button>
                    )}
                    {(currentStep === 1 || page === 'log') && (
                        <Button type="link" onClick={() => edit(record, 'logEdit')}>
                            日志分析
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
                size="small"
                rowKey={(record) => `warning${record.id}`}
                columns={columns}
                loading={loading}
                dataSource={dataSource || []}
                pagination={false}
            />
        </>
    );
};

WarningList.propTypes = {
    warningList: PropTypes.object,
    spreadWarning: PropTypes.func,
    // queryLog: PropTypes.func,
    // queryEvent: PropTypes.func,
    queryWarning: PropTypes.func,
    currentStep: PropTypes.number,
    page: PropTypes.string,
    recordReadyTime: PropTypes.func,
};

export default WarningList;
