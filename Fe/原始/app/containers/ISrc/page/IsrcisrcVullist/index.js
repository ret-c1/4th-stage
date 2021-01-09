import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { searchParams } from '@utils/searchParams';
import { ScContent } from '../styled';
import { getHoleData } from '../api';
const columns = [
    {
        title: '漏洞名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '利用链接',
        dataIndex: 'url',
        key: 'url',
    },
    {
        title: '利用类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '漏洞等级',
        key: 'level',
        dataIndex: 'level',
    },
    {
        title: '漏洞简介',
        key: 'description',
        width: 180,
        dataIndex: 'description',
    },
    {
        title: '漏洞详情',
        key: 'detail',
        dataIndex: 'detail',
    },
    {
        title: '修复建议',
        key: 'recommendation',
        dataIndex: 'recommendation',
    },
    {
        title: '提交时间',
        key: 'createTime',
        dataIndex: 'createTime',
    },
    {
        title: '初审时间',
        key: 'bugExamimeTime',
        dataIndex: 'bugExamimeTime',
    },
    {
        title: '漏洞状态',
        key: 'bugStatus',
        dataIndex: 'bugStatus',
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: () => (
            <>
                <Button type="link">查看详情</Button>
                <Button type="link">拉取漏洞</Button>
                <Button type="link">查看漏洞</Button>
            </>
        ),
    },
];

const ISrcPage = () => {
    const { id } = searchParams();
    const [param, setParam] = useState({ limit: 10, offset: 0, param: { isrcTaskId: id } });
    const [holeData, setHoleData] = useState([]);
    const [total, setTotal] = useState(0);
    const pageChange = (page) => {
        setParam({ ...param, offset: page });
    };
    useEffect(() => {
        getHoleData(param).then((res) => {
            if (res.code === 200) {
                setHoleData(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);
    return (
        <>
            <ScContent>
                <Table
                    columns={columns}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    dataSource={holeData}
                />
            </ScContent>
        </>
    );
};

export default ISrcPage;
