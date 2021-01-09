import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Row, Table, Tooltip, Button, Menu, Dropdown, Divider, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import DistributeModal from './DistributeModal';
import { ScItWrapper } from '../styled';
// import useTableParam from '../../hooks/useTableParam';
// import { getEvent } from '../api';
import CircleDot from '../../components/CircleDot';

const ItTitle = styled.span`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const columns = [
    {
        title: '事件名称',
        dataIndex: 'eventName',
        width: 172,
        ellipsis: true,
        render: (text) => (
            <Tooltip title={text} placement="topLeft">
                {text}
            </Tooltip>
        ),
    },
    {
        title: '事件关键字',
        dataIndex: 'eventKeyword',
    },
    {
        title: '事件等级',
        dataIndex: 'eventLevel',
        filters: [
            { text: '一级', value: '一级', key: '一级' },
            { text: '二级', value: '二级', key: '二级' },
            { text: '三级', value: '三级', key: '三级' },
            { text: '四级', value: '四级', key: '四级' },
            { text: '五级', value: '五级', key: '五级' },
        ],
        onFilter: (text, record) => record.eventLevel && record.eventLevel.indexOf(text) === 0,
        render: (level) => {
            let node = null;
            switch (level) {
                case '一级':
                    node = <Tag color="green">{level}</Tag>;
                    break;
                case '二级':
                    node = <Tag color="blue">{level}</Tag>;
                    break;
                case '三级':
                    node = <Tag color="orange">{level}</Tag>;
                    break;
                case '四级':
                    node = <Tag color="red">{level}</Tag>;
                    break;
                case '五级':
                    node = <Tag color="purple">{level}</Tag>;
                    break;
                default:
                    break;
            }
            return node;
        },
    },
    {
        title: '紧急程度',
        dataIndex: 'eventEmergencyLevel',
        render: (eventEmergencyLevel) => {
            let node = null;
            switch (eventEmergencyLevel) {
                case '低':
                    node = <span style={{ color: 'blue' }}>{eventEmergencyLevel}</span>;
                    break;
                case '中':
                    node = <span style={{ color: 'orange' }}>{eventEmergencyLevel}</span>;
                    break;
                case '高':
                    node = <span style={{ color: 'red' }}>{eventEmergencyLevel}</span>;
                    break;
                case '紧急':
                    node = <span style={{ color: 'purple' }}>{eventEmergencyLevel}</span>;
                    break;
                default:
                    break;
            }
            return node;
        },
    },
    {
        title: '是否为事件',
        dataIndex: 'result',
        render: (result) => {
            let text = '';
            let backgroundColor = '';
            switch (result) {
                case 0:
                    text = '有效事件';
                    backgroundColor = '#F5222D';
                    break;
                case 1:
                    text = '隐患事件';
                    backgroundColor = '#DE9F21';
                    break;
                case 2:
                    text = '无效事件';
                    backgroundColor = 'rgba(0,0,0,0.45)';
                    break;
                default:
                    break;
            }
            return (
                <div>
                    <CircleDot size={8} backgroundColor={backgroundColor} />
                    <span style={{ marginLeft: '8px' }}>{text}</span>
                </div>
            );
        },
    },
    {
        title: '目的IP',
        dataIndex: 'destIps',
    },
    {
        title: '目的系统',
        dataIndex: 'destSystem',
    },
    {
        title: '提交时间',
        dataIndex: 'submitTime',
        render: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: '处置状态',
        dataIndex: 'handleStatus',
        width: 135,
        filters: [
            { text: '应急未处置', value: 1, key: '应急未处置' },
            { text: '隐患未处置', value: 2, key: '隐患未处置' },
            { text: '无效事件不处理', value: 3, key: '无效事件不处理' },
            { text: '处置中', value: 4, key: '处置中' },
            { text: '已处置', value: 5, key: '已处置' },
        ],
        onFilter: (text, record) => `${record.handleStatus}`.indexOf(`${text}`) === 0,
        render: (handleStatus) => {
            let node = null;
            switch (handleStatus) {
                case 1:
                    node = <span style={{ color: '#F5222D' }}>应急未处置</span>;
                    break;
                case 2:
                    node = <span style={{ color: '#DE9F21' }}>隐患未处置</span>;
                    break;
                case 3:
                    node = <span style={{ color: '#F5222D' }}>无效事件不处理</span>;
                    break;
                case 4:
                    node = <span style={{ color: '#722ED1' }}>处置中</span>;
                    break;
                case 5:
                    node = <span>已处置</span>;
                    break;
                default:
                    node = <span>未知</span>;
                    break;
            }
            return node;
        },
    },
];

const EventPage = ({ rxRole, rxInfo }) => {
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    // 获取列表数据
    // const fetchSyncList = useCallback((params) => getEvent(params), [searchFlag]);
    // const tableParam = useTableParam(fetchSyncList, { param: {} });
    // const { dataSource, loading, pagination } = tableParam;
    const dataSource = [];
    const loading = false;
    const pagination = 10;

    const [visible, setVisible] = useState(false);
    const handleCancel = () => {
        // 关闭模态框,重新查询列表
        setSearchFlag(!searchFlag);
        setVisible(false);
    };

    const history = useHistory();

    const [nowRecord, setRecord] = useState({});
    const handleModalOpen = (record) => {
        setRecord(record);
        setVisible(true);
    };

    // 表格操作项
    const action = {
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
            <div>
                <Dropdown
                    overlay={() => enmergencyMenu(record)}
                    style={{ display: 'inline-block' }}
                    disabled={record.handleStatus > 2}
                >
                    <Button type="link" onClick={(e) => e.preventDefault()} size="small">
                        {record.result === 1 ? '隐患处置' : '应急处置'}
                        <DownOutlined />
                    </Button>
                </Dropdown>
                <Divider type="vertical" />
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        history.push(`/incident/event/check?id=${record.id}`);
                    }}
                >
                    查看
                </Button>
            </div>
        ),
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

    return (
        <ScItWrapper>
            <Row>
                <ItTitle>事件列表</ItTitle>
                <Table
                    size="small"
                    dataSource={dataSource}
                    columns={columns.concat(action)}
                    pagination={pagination}
                    loading={loading}
                    rowKey={(record) => record.id}
                    rxInfo={rxInfo}
                />
            </Row>
            {visible ? (
                <DistributeModal
                    visible={visible}
                    handleCancel={handleCancel}
                    event={nowRecord}
                    rxInfo={rxInfo}
                />
            ) : null}
        </ScItWrapper>
    );
};

EventPage.propTypes = {
    rxRole: PropTypes.array,
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
    rxInfo: state.global.useinfo,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(EventPage);
