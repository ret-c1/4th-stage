import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { pubModalTips } from '@components/PubModal';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { Descriptions, Button, Table, Popconfirm } from 'antd';
import moment from 'moment';
import useTableParam from '../../hooks/useTableParam';
import { taskResource, deleteResource, filePreview } from '../api';
import { ScInfoWrapper, ScInfoLeft, ScInfoRight, ScCustomModal, ScDivider } from './styled';

const columns = [
    {
        title: '任务名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text) => moment(text).format('YYYY-MM-DD HH:ss:mm') || '暂无',
    },
];
const CheckTask = ({ visible, cancel, nowRecord }) => {
    // 重新请求列表
    const [refreshPlan, setRefreshPlan] = useState(false);
    const refresh = () => {
        onChange(1, 10);
        setRefreshPlan(!refreshPlan);
    };

    // 更多基本信息
    const [isMore, setIsMore] = useState(false);
    const moreInfo = () => setIsMore(!isMore);

    // 单条信息的表格
    const fetchTaskList = useCallback((params) => taskResource(params), [refreshPlan]);
    const tableParam = useTableParam(fetchTaskList, {
        param: {
            planId: nowRecord.id,
        },
    });
    const { dataSource, pagination, loading } = tableParam;
    const { onChange } = pagination;

    // 表格删除
    const handleDelete = (id) => {
        deleteResource({ id }).then((res) => {
            if (res.code === 200) {
                pubModalTips('success', '删除成功', '当前任务资源已被删除', 2, () => {
                    refresh();
                });
            } else {
                pubModalTips('error', '删除失败', res.message, 2, () => {
                    refresh();
                });
            }
        });
    };

    // 下载
    const download = (did) => {
        const a = document.createElement('a');
        a.setAttribute('href', `/api/doc/download/${did}`);
        a.setAttribute('referrerpolicy', 'origin');
        a.click();
    };

    // 表格预览
    const preview = (did) => {
        filePreview({ id: did }).then((res) => {
            if (res.code === 200) {
                window.open(
                    `/kkfileview/onlinePreview?url=${window.location.origin}/api/img${res.message}`,
                    '预览',
                    'channelmode=yes,left=200,toolbar=no,status=no,scrollbars=no,location=no,menubar=no,width=1200,height=800',
                );
            } else {
                pubModalTips('error', '预览失败', res.message, 2);
            }
        });
    };

    const action = {
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
            <div>
                <Button type="link" size="small" onClick={() => preview(record.id)}>
                    预览
                </Button>
                <ScDivider type="vertical" />
                <Button type="link" size="small" onClick={() => download(record.id)}>
                    下载
                </Button>
                <ScDivider type="vertical" />
                <Popconfirm
                    title="是否要删除此行？"
                    onConfirm={() => handleDelete(record.id)}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button type="link" size="small">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        ),
    };
    return (
        <ScCustomModal
            title="查看任务信息"
            visible={visible}
            onCancel={cancel}
            width={700}
            footer={[
                <Button key="back" onClick={cancel}>
                    关闭
                </Button>,
            ]}
        >
            <ScInfoWrapper>
                <ScInfoLeft>
                    <Descriptions column={2}>
                        <Descriptions.Item label="任务名称" key="任务名称" span={1}>
                            {nowRecord.taskName}
                        </Descriptions.Item>
                        <Descriptions.Item label="任务类型" key="任务类型" span={1}>
                            {nowRecord.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="预计开始时间" key="预计开始时间" span={1}>
                            {`${moment(nowRecord.scheduledStartDate).format('YYYY-MM-DD')}
                                ${nowRecord.startSchedulePeriod || ''}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="预计结束时间" key="预计结束时间" span={1}>
                            {`${moment(nowRecord.scheduledEndDate).format('YYYY-MM-DD')}
                                ${nowRecord.endSchedulePeriod || ''}`}
                        </Descriptions.Item>
                        {isMore ? (
                            <>
                                <Descriptions.Item label="计划工作量" key="计划工作量" span={1}>
                                    {nowRecord.estimateWorkTime}
                                </Descriptions.Item>
                                <Descriptions.Item label="任务优先级" key="任务优先级" span={1}>
                                    {nowRecord.priority}
                                </Descriptions.Item>
                                <Descriptions.Item label="项目负责人" key="项目负责人" span={1}>
                                    {nowRecord.managerName}
                                </Descriptions.Item>
                                <Descriptions.Item label="执行人" key="执行人" span={1}>
                                    {nowRecord.executorName}
                                </Descriptions.Item>
                                <Descriptions.Item label="专家评审人" key="专家评审人" span={1}>
                                    {nowRecord.reviewExpertName}
                                </Descriptions.Item>
                            </>
                        ) : null}
                    </Descriptions>
                </ScInfoLeft>
                <ScInfoRight>
                    <Button onClick={moreInfo} type="link">
                        {isMore ? '收起' : '更多'}
                        {isMore ? (
                            <UpOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                        ) : (
                            <DownOutlined style={{ color: '#1890FF', fontSize: '14px' }} />
                        )}
                    </Button>
                </ScInfoRight>
            </ScInfoWrapper>
            <div style={{ padding: '16px 24px 32px 24px' }}>
                <p
                    type="primary"
                    style={{
                        fontSize: '16px',
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontWeight: 'bold',
                    }}
                >
                    记录文件列表
                </p>
                <Table
                    dataSource={dataSource}
                    columns={columns.concat(action)}
                    pagination={pagination}
                    loading={loading}
                    rowKey={(record) => record.id}
                />
            </div>
        </ScCustomModal>
    );
};
CheckTask.propTypes = {
    visible: PropTypes.bool,
    cancel: PropTypes.func,
    nowRecord: PropTypes.object,
};
export default CheckTask;
