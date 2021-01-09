import React, { useEffect, useState } from 'react';
import { Result, Button, Table, Dropdown, Menu, Drawer, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import moment from 'moment';
import DistributeModal from '@containers/IncidentResponse/page/Event/DistributeModal';
import EventAnalyseRecord from '../../component/Event/EventAnalyseRecord';
import CircleDot from '../../component/CircleDot';

const Step4 = (props) => {
    const { eventRecord, getResultList, queryEvent, validId, resultList, rxRole, rxInfo } = props;
    const { loading, dataSource, params } = resultList;
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    const [visible, setVisible] = useState(false);
    const [nowRecord, setRecord] = useState({});
    const [formData, setFormData] = useState({
        card1: false,
        source: '',
    });
    useEffect(() => {
        getResultList({
            ...params,
            param: { threatId: validId.threatId, planId: validId.planId },
        });
    }, []);
    const edit = (val, source) => {
        setFormData({ card1: true, source });
        queryEvent({ id: val.id });
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

    const columns = [
        {
            title: '事件名称',
            dataIndex: 'eventName',
            key: 'eventName',
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
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
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
                    <Button type="link" onClick={() => edit(record, 'eventLook')}>
                        查看
                    </Button>
                </>
            ),
        },
    ];
    // 改变页数方法
    const pageChange = (page, pageSize) => {
        getResultList({ ...params, offset: (page - 1) * pageSize });
    };
    return (
        <Result
            status="success"
            title="提交成功"
            style={{ background: '#ffffff' }}
            subTitle="已排查事件信息请查看下方事件列表"
        >
            <Table
                size="small"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={dataSource.records || []}
                pagination={{
                    pageSize: 10,
                    onChange: pageChange,
                    total: dataSource.total,
                    showSizeChanger: false,
                }}
            />
            <Drawer
                title="事件研判记录"
                visible={formData.card1}
                width={500}
                style={{
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: '14px',
                }}
                onClose={() => setFormData({ ...formData, card1: false })}
            >
                <EventAnalyseRecord eventRecord={eventRecord} />
            </Drawer>
            {visible ? (
                <DistributeModal
                    visible={visible}
                    handleCancel={handleCancel}
                    event={nowRecord}
                    rxInfo={rxInfo}
                />
            ) : null}
        </Result>
    );
};

Step4.propTypes = {
    resultList: PropTypes.object,
    getResultList: PropTypes.func,
    validId: PropTypes.object,
    queryEvent: PropTypes.func,
    eventRecord: PropTypes.object,
    rxRole: PropTypes.array,
    rxInfo: PropTypes.object,
};

export default Step4;
