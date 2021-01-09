import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Row, Button, Table, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import CircleDot from '../../components/CircleDot';
import { getThreatList, allProject } from '../api';
import useTableParam from '../../hooks/useTableParam';
import { InvestModal } from './InvestModal';
import { tabelcheckAction, tabelallcheckAction } from '../../action';

const ItWrapper = styled.div`
    margin: 21px 24px 24px 24px;
    background-color: #fff;
    padding: 24px 32px;
`;

const ItTitle = styled.span`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
`;

const columns = [
    {
        title: '漏洞名称',
        dataIndex: 'vulName',
        key: 'vulName',
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
        width: 200,
        key: 'cve',
    },
    {
        title: '等级',
        dataIndex: 'vulLevel',
        key: 'vulLevel',
        width: 82,
        filters: [
            { text: '紧急', value: '紧急' },
            { text: '高危', value: '高危' },
            { text: '中危', value: '中危' },
            { text: '低危', value: '低危' },
            { text: '信息', value: '信息' },
        ],
        onFilter: (text, record) => record.statusStr.indexOf(text) === 0,
    },
    {
        title: '排查状态',
        dataIndex: 'statusStr',
        key: 'statusStr',
        width: 120,
        filters: [
            { text: '待排查', value: '待排查' },
            {
                text: '已排查',
                value: '已排查',
                children: [
                    {
                        text: '误报',
                        value: '误报',
                    },
                    {
                        text: '有效',
                        value: '有效',
                    },
                ],
            },
        ],
        onFilter: (text, record) => record.statusStr.indexOf(text) === 0,
        render: (text) => {
            if (text === '已排查-误报') {
                return (
                    <div>
                        <CircleDot
                            size={8}
                            style={{ marginRight: '8px' }}
                            backgroundColor="background: rgba(0,0,0,0.45);"
                        />
                        <span>{text}</span>
                    </div>
                );
            }
            if (text === '待排查') {
                return (
                    <div>
                        <CircleDot
                            size={8}
                            style={{ marginRight: '8px' }}
                            backgroundColor="#FAAD14"
                        />
                        <span>{text}</span>
                    </div>
                );
            }
            return (
                <div>
                    <CircleDot
                        size={8}
                        style={{ marginRight: '8px' }}
                        backgroundColor="rgba(245,34,45,0.10)"
                        borderColor="rgba(245,34,45,0.40)"
                    />
                    <span>{text}</span>
                </div>
            );
        },
    },
    {
        title: '发布时间',
        dataIndex: 'createTimeStr',
        key: 'createTimeStr',
    },
    {
        title: '上报时间',
        dataIndex: 'createTimeStr',
        key: 'createTimeStr',
    },
    {
        title: '上报来源',
        dataIndex: 'userName',
        key: 'userName',
    },
];

const requestParam = { param: { status: 0, type: 0 } };

const ThreatList = (props) => {
    const { rxRole, rxChecked, rxTabelcheck, rxTabelcheckall } = props;
    const history = useHistory();
    // 定义变量记录情报id
    const [id, setId] = useState(-1);

    // 列表数据
    const tableParam = useTableParam(getThreatList);
    const { dataSource, loading, pagination } = tableParam;

    // 项目经理的项目
    const allProjectData = useTableParam(allProject, requestParam);

    // 模态框
    const [visible, setVisible] = useState(false);
    const handleCancel = () => {
        setVisible(false);
    };

    const action = {
        title: '操作',
        key: 'action',
        align: 'center',
        render: (text, record) => {
            if (record.statusStr === '待排查' && rxRole.indexOf('项目经理') !== -1) {
                return (
                    <Button
                        type="link"
                        onClick={() => {
                            setVisible(true);
                            setId(record.id);
                        }}
                    >
                        排 查
                    </Button>
                );
            }
            return (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(`/intelligence/threatDetail?threatId=${record.id}`);
                    }}
                >
                    查 看
                </Button>
            );
        },
    };

    return (
        <ItWrapper>
            <Row justify="space-between" style={{ marginBottom: '12px' }}>
                <ItTitle>威胁列表</ItTitle>
                <div>
                    {/* <Button style={{ marginRight: '4px' }}>情报导入 </Button> */}
                    <Button
                        type="primary"
                        onClick={() => {
                            history.push('/intelligence/list/create?enterBy=threat');
                        }}
                    >
                        情报上报
                    </Button>
                </div>
            </Row>
            <Table
                loading={loading}
                dataSource={dataSource}
                columns={columns.concat(action)}
                pagination={pagination}
                rowKey={(record) => record.id}
            />
            <InvestModal
                visible={visible}
                handleCancel={handleCancel}
                data={allProjectData}
                rxChecked={rxChecked}
                rxTabelcheck={rxTabelcheck}
                rxTabelcheckall={rxTabelcheckall}
                id={id}
            />
        </ItWrapper>
    );
};

ThreatList.propTypes = {
    rxRole: PropTypes.array,
    rxChecked: PropTypes.array,
    rxTabelcheck: PropTypes.func,
    rxTabelcheckall: PropTypes.func,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxChecked: state.intelligence.checked,
});

const mapDispatchToProps = (dispatch) => ({
    rxTabelcheck: (id) => {
        dispatch(tabelcheckAction(id));
    },
    rxTabelcheckall: (ids) => {
        dispatch(tabelallcheckAction(ids));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThreatList);
