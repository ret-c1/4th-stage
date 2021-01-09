import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

/**
 * 自定义表头
 * @param  {...any} params 所有参数
 */
const CustomHeadTitle = (...params) => (
    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.65)', lineHeight: '22px' }}>
        <span style={{ color: 'red' }}>*</span>
        {params[1]}
    </div>
);

const columns = [
    {
        title: CustomHeadTitle(null, '软件类型'),
        dataIndex: 'softwareType',
        key: 'softwareType',
        width: 172,
    },
    {
        title: CustomHeadTitle(null, '软件信息'),
        dataIndex: 'softwareMessage',
        key: 'softwareMessage',
        width: 172,
    },
    {
        title: CustomHeadTitle(null, '受影响版本'),
        dataIndex: 'affectedVersion',
        key: 'affectedVersion',
        width: 352,
    },
    {
        title: CustomHeadTitle(null, '不受影响版本'),
        dataIndex: 'unaffectedVersion',
        key: 'unaffectedVersion',
    },
];

const SoftWareTable = ({ data = [] }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [data]);

    return (
        <Table
            loading={loading}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
        />
    );
};

SoftWareTable.propTypes = {
    data: PropTypes.array,
};

export default SoftWareTable;
