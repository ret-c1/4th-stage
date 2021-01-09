import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, message } from 'antd';
import { getISrcTable, getPullHole } from '../api';
import { ScContent } from '../styled';

const ISrcPage = () => {
    const columns = [
        {
            title: '任务ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: '任务类型',
            dataIndex: 'type',
            render: () => <span>众测任务</span>,
        },
        {
            title: '原始需求方的公司名称或者公司ID',
            key: 'companyName',
            dataIndex: 'companyName',
        },
        {
            title: '服务形式',
            key: 'serverType',
            dataIndex: 'serverType',
            render: (text) => {
                let value = '';
                if (text === 1) {
                    value = '公司';
                } else if (text === 2) {
                    value = '远程';
                } else if (text === 3) {
                    value = '值守保障';
                } else if (text === 4) {
                    value = '驻场服务';
                } else if (text === 5) {
                    value = '外包服务';
                } else {
                    value = '其他';
                }
                return value;
            },
        },
        {
            title: '预计开始时间',
            key: 'startTime',
            dataIndex: 'startTime',
        },
        {
            title: '预计结束时间',
            key: 'endTime',
            dataIndex: 'endTime',
        },
        {
            title: '任务状态',
            key: 'status',
            dataIndex: 'status',
            render: (text) => {
                let value = '';
                if (text === 1) {
                    value = '待完成';
                } else if (text === 2) {
                    value = '已完成';
                } else if (text === 3) {
                    value = '已拒绝';
                }
                return value;
            },
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => {
                            history.push(`/isrc/addisrc?id=${record.id}&&type=detail`);
                        }}
                    >
                        查看详情
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            pullHole(record.id);
                        }}
                    >
                        拉取漏洞
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            history.push(`/isrc/isrcVullist?id=${record.id}`);
                        }}
                    >
                        查看漏洞
                    </Button>
                </>
            ),
        },
    ];
    const history = useHistory();
    const [param, setParam] = useState({ limit: 10, offset: 0 });
    const [isrcData, setIsrcData] = useState([]);
    const [total, setTotal] = useState(0);
    const pullHole = (ids) => {
        getPullHole(ids, { id: ids }).then((res) => {
            if (res.code === 200) {
                message.error(res.data.message);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const pageChange = (page) => {
        setParam({ limit: 10, offset: page });
    };
    useEffect(() => {
        getISrcTable(param).then((res) => {
            if (res.code === 200) {
                setIsrcData(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);

    return (
        <>
            <ScContent>
                <Button
                    type="primary"
                    onClick={() => {
                        history.push('/isrc/addisrc?type=add&&type=add');
                    }}
                    style={{ marginBottom: '10px' }}
                >
                    创建众测
                </Button>
                <Table
                    size="small"
                    columns={columns}
                    pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                    dataSource={isrcData}
                    rowKey={(record) => record.id}
                />
            </ScContent>
        </>
    );
};

export default ISrcPage;
