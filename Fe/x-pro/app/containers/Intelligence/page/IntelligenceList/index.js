import React from 'react';
import styled from 'styled-components';
import { Row, Button, Table, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import CircleDot from '../../components/CircleDot';
// import { getEngineerList } from '../api';
import useTableParam from '../../hooks/useTableParam';

const ScItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;

const ScItTitle = styled.span`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
`;

const columns = [
    {
        title: '漏洞名称',
        dataIndex: 'vulName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: 'CVE编号',
        dataIndex: 'cve',
        width: 180,
    },
    {
        title: '等级',
        dataIndex: 'vulLevel',
        width: 82,
        filters: [
            { text: '紧急', value: '紧急', key: '紧急' },
            { text: '高危', value: '高危', key: '高危' },
            { text: '中危', value: '中危', key: '中危' },
            { text: '低危', value: '低危', key: '低危' },
            { text: '信息', value: '信息', key: '信息' },
        ],
        onFilter: (text, record) => record.vulLevel.indexOf(text) === 0,
    },
    {
        title: '审核状态',
        dataIndex: 'statusStr',
        width: 120,
        filters: [
            { text: '已通过', value: '已通过', key: '已通过' },
            { text: '审核中', value: '审核中', key: '审核中' },
            { text: '待审核', value: '待审核', key: '待审核' },
            { text: '待排查', value: '待排查', key: '待排查' },
            { text: '不通过', value: '不通过', key: '不通过' },
        ],
        onFilter: (text, record) => record.statusStr.indexOf(text) === 0,
        render: (text) => {
            if (text === '待审核' || text === '待排查') {
                return (
                    <div>
                        <CircleDot size={8} backgroundColor="#FAAD14" />
                        <span style={{ marginLeft: '8px' }}>{text}</span>
                    </div>
                );
            }
            if (text === '审核中') {
                return (
                    <div>
                        <CircleDot size={8} backgroundColor="#1890FF" />
                        <span style={{ marginLeft: '8px' }}>{text}</span>
                    </div>
                );
            }
            if (text === '已通过') {
                return (
                    <div>
                        <CircleDot size={8} backgroundColor="#F5222D" />
                        <span style={{ marginLeft: '8px' }}>{text}</span>
                    </div>
                );
            }
            return (
                <div>
                    <CircleDot size={8} backgroundColor="#BFBFBF" />
                    <span style={{ marginLeft: '8px' }}>{text}</span>
                </div>
            );
        },
    },
    {
        title: '待办人员',
        dataIndex: 'dealUser',
        width: 180,
    },
    {
        title: '发布时间',
        dataIndex: 'createTimeStr',
        width: 180,
    },
    // {
    //     title: '上报来源',
    //     dataIndex: 'userName',
    //     width: 100,
    // },
];

const IntelligenceList = () => {
    const tableParam = useTableParam();
    const { dataSource, loading, pagination } = tableParam;
    const history = useHistory();

    const action = {
        title: '排查操作',
        key: 'action',
        align: 'center',
        render: (text, record) => (
            <Button
                type="link"
                onClick={() => {
                    history.push(
                        `/intelligence/assessInfo?id=${record.id}&type=check&role=engineer`,
                    );
                }}
            >
                查 看
            </Button>
        ),
    };

    return (
        <ScItWrapper>
            <Row justify="space-between" style={{ marginBottom: '12px' }} key="infoRow">
                <ScItTitle>情报列表</ScItTitle>
                <div>
                    {/* <Button style={{ marginRight: '4px' }}>情报导入 </Button> */}
                    <Button
                        type="primary"
                        onClick={() => {
                            history.push('/intelligence/list/create?enterBy=intelligence');
                        }}
                    >
                        情报上报
                    </Button>
                </div>
            </Row>
            <Table
                size="small"
                loading={loading}
                dataSource={dataSource}
                columns={columns.concat(action)}
                pagination={pagination}
                rowKey={(record) => record.id}
            />
        </ScItWrapper>
    );
};

export default IntelligenceList;
