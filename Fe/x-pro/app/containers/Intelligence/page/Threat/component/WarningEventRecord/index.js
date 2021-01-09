import React from 'react';
import { Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

const columns = [
    {
        title: '告警事件',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '起始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 120,
        render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
        title: '威胁等级',
        dataIndex: 'threatLevel',
        key: 'threatLevel',
        width: 90,
    },
    {
        title: '攻击意图',
        dataIndex: 'attackIntention',
        key: 'attackIntention',
        width: 100,
    },
    {
        title: '来源IP',
        dataIndex: 'sourceIp',
        key: 'sourceIp',
        width: 130,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '目的IP',
        dataIndex: 'destIp',
        key: 'destIp',
        width: 130,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '模型名称',
        dataIndex: 'destIp',
        key: 'destIp',
        width: 130,
    },
    {
        title: '目的主机名',
        dataIndex: 'destHost',
        key: 'destHost',
        width: 110,
    },
    {
        title: '来源地址',
        dataIndex: 'sourceAddress',
        key: 'sourceAddress',
    },
    {
        title: '目的地址',
        dataIndex: 'destAddress',
        key: 'destAddress',
    },
];

const WarningEventRecord = (props) => {
    const {
        warningEvent,
        chooseWarningProperty,
        getChooseWarningProperty,
        getWarningEvent,
    } = props;
    const { loading, dataSource, params } = warningEvent;
    const rowSelection = {
        selectedRowKeys: chooseWarningProperty && chooseWarningProperty.length === 0 && [],
        onChange: (selectedRowKeys, selectedRows) => {
            const propertyParams = [];
            selectedRows.forEach((item) => {
                if (item) {
                    propertyParams.push(item.name);
                }
            });
            getChooseWarningProperty({ propertyParams, selectedRows });
        },
    };
    // 改变页数方法
    const pageChange = (page, pageSize) => {
        getWarningEvent({ ...params, offset: (page - 1) * pageSize });
    };
    return (
        <Table
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            loading={loading}
            dataSource={dataSource.records || []}
            tableLayout="fixed"
            pagination={{
                pageSize: 10,
                onChange: pageChange,
                total: dataSource.total,
                showSizeChanger: false,
            }}
            footer={() => (
                <span
                    style={{
                        fontSize: '16px',
                        color: 'rgba(0,0,0,0.25)',
                        lineHeight: '24px',
                    }}
                >
                    (此数据由大数据平台提供)
                </span>
            )}
        />
    );
};

WarningEventRecord.propTypes = {
    getWarningEvent: PropTypes.func,
    warningEvent: PropTypes.object,
    getChooseWarningProperty: PropTypes.func,
    chooseWarningProperty: PropTypes.array,
};

export default WarningEventRecord;
