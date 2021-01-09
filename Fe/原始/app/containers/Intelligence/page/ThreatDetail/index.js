import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Radio, Form, Descriptions, Divider, Button, message, Select, Table } from 'antd';
import request from '@utils/request';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import PieChart from './component/pieChart';
import {
    StyleContent,
    StyleChart,
    StyleChartLeft,
    StyleChartRight,
    StyleNum,
    StyleTitle,
} from './style';

import { getAssetKeyAction, getTaskListAction } from '../../action';

const { Option } = Select;

const threatInfo = (value) =>
    request(`/api/threat/${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });

const getClientName = (params) =>
    request('/api/threat/relate/clients', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
        },
    });

const ThreatDetail = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { assetKey, taskList, getAssetKey, getTaskList } = props;
    const threatId = parseInt(searchParams().threatId, 10);
    const [info, setInfo] = useState({});
    const { loading, params, dataSource } = taskList;
    const [isSpread, changeIsSpread] = useState(false);
    const [clientName, setClientName] = useState({});
    useEffect(() => {
        threatInfo(threatId).then((res) => {
            if (res.data) {
                setInfo(res.data);
            }
        });
        getClientName({ id: threatId }).then((res) => {
            if (res.data) {
                setClientName(res.data);
            }
        });
        getTaskList({ ...params, param: { threatId: parseInt(threatId, 10) } });
    }, []);

    const onFinish = (values) => {
        const resultParam = { ...values, threatId: parseInt(threatId, 10) };
        request('/api/threat/judge', {
            method: 'POST',
            body: JSON.stringify(resultParam),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((res) => message.success(res.message))
            .catch((err) => message.error(err.message));
    };
    const changeChart = (v) => {
        getAssetKey({ clientName: v, threatId });
    };
    const pageChange = (page, pageSize) => {
        getTaskList({ ...params, offset: (page - 1) * pageSize });
    };
    const columns = [
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
        },
        {
            title: '执行起始时间',
            dataIndex: 'scheduledDate',
            key: 'scheduledDate',
            render: (text, record) => (
                <span>
                    {moment(record.scheduledStartDate).format('YYYY-MM-DD')}~
                    {moment(record.scheduledEndDate).format('YYYY-MM-DD')}
                </span>
            ),
        },
        {
            title: '任务优先级',
            key: 'priority',
            dataIndex: 'priority',
        },
        {
            title: '执行人',
            key: 'executorName',
            dataIndex: 'executorName',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() =>
                            history.push(
                                `/intelligence/threatdetection/process?planId=${record.id}&projectId=${record.projectId}&threatId=${threatId}`,
                            )
                        }
                    >
                        执行
                    </Button>
                    <Button
                        type="link"
                        onClick={() =>
                            history.push({
                                pathname: '/intelligence/taskDetail',
                                query: {
                                    planId: record.id,
                                    threatId,
                                },
                                state: record,
                            })
                        }
                    >
                        查看
                    </Button>
                </>
            ),
        },
    ];
    return (
        <StyleContent>
            <Card title="威胁事件信息" style={{ marginBottom: '24px' }}>
                <Descriptions title="漏洞信息">
                    <Descriptions.Item label="威胁类型" key="威胁类型">
                        {info && info.threatType}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞名称" key="漏洞名称">
                        {info && info.vulName}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞类型" key="漏洞类型">
                        {info && info.vulType}
                    </Descriptions.Item>
                    <Descriptions.Item label="CVE编号" key="CVE编号">
                        {info && info.cve}
                    </Descriptions.Item>
                    <Descriptions.Item label="CNND编号" key="CNND编号">
                        {info && info.cnnd}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞等级" key="漏洞等级">
                        {info && info.vulLevel}
                    </Descriptions.Item>
                    {isSpread && (
                        <>
                            <Descriptions.Item label="相关链接" key="相关链接">
                                {info && info.url}
                            </Descriptions.Item>
                            <Descriptions.Item label="漏洞公告" key="漏洞公告">
                                {info && info.notice}
                            </Descriptions.Item>
                            <Descriptions.Item label="影响范围" key="影响范围">
                                {info && info.scope}
                            </Descriptions.Item>
                            <Descriptions.Item label="漏洞描述" key="漏洞描述">
                                {info && info.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="缓解措施" key="缓解措施">
                                {info && info.solution}
                            </Descriptions.Item>
                            <Descriptions.Item label="友情提示" key="友情提示">
                                {info && info.tips}
                            </Descriptions.Item>
                            <Descriptions.Item label="情报专家" key="情报专家">
                                {info && info.threatExpertName}
                            </Descriptions.Item>
                            <Descriptions.Item label="运营专家" key="运营专家">
                                {info && info.operateExpertName}
                            </Descriptions.Item>
                        </>
                    )}
                </Descriptions>
                <div style={{ textAlign: 'right', marginRight: '50px' }}>
                    <Button type="link" onClick={() => changeIsSpread(!isSpread)}>
                        {isSpread ? (
                            <span>
                                收起
                                <UpOutlined />
                            </span>
                        ) : (
                            <span>
                                更多
                                <DownOutlined />
                            </span>
                        )}
                    </Button>
                </div>
                <Divider />
                <Descriptions title="威胁排查统计情况" />
                <Select style={{ width: 260 }} onChange={(v) => changeChart(v)}>
                    {clientName &&
                        clientName.length > 0 &&
                        clientName.map((item) => (
                            <Option value={item.clientName} key={item.clientName}>
                                {item.clientName}
                            </Option>
                        ))}
                </Select>
                {assetKey && Object.keys(assetKey).length > 0 && (
                    <StyleChart>
                        <StyleChartLeft>
                            <StyleNum>{assetKey && assetKey.totalAssets}</StyleNum>
                            <StyleTitle>隐患资产总数</StyleTitle>
                        </StyleChartLeft>
                        <StyleChartRight>
                            <PieChart
                                assetKey={assetKey}
                                compareParams={[
                                    {
                                        type: 'dispatchAssets',
                                        value: assetKey.dispatchAssets - assetKey.alreadyAssets,
                                    },
                                    {
                                        type: 'alreadyAssets',
                                        value: assetKey.alreadyAssets,
                                    },
                                ]}
                            />
                            <StyleChartLeft style={{ borderLeft: '3px solid rgba(0,0,0,0.15)' }}>
                                <StyleNum>{assetKey && assetKey.dispatchAssets}</StyleNum>
                                <StyleTitle>已派发资产</StyleTitle>
                            </StyleChartLeft>
                            <StyleChartLeft style={{ borderLeft: '3px solid #1890FF' }}>
                                <StyleNum>{assetKey && assetKey.alreadyAssets}</StyleNum>
                                <StyleTitle>已排查资产</StyleTitle>
                            </StyleChartLeft>
                        </StyleChartRight>
                        <StyleChartRight>
                            <PieChart
                                assetKey={assetKey}
                                compareParams={[
                                    {
                                        type: 'effectiveEvents',
                                        value: assetKey.effectiveEvents,
                                    },
                                    {
                                        type: 'troubleEvents',
                                        value: assetKey.troubleEvents,
                                    },
                                    {
                                        type: 'inEffectiveEvents',
                                        value: assetKey.inEffectiveEvents,
                                    },
                                ]}
                            />
                            <StyleChartLeft style={{ borderLeft: '3px solid #F5222D' }}>
                                <StyleNum>{assetKey && assetKey.effectiveEvents}</StyleNum>
                                <StyleTitle>有效事件</StyleTitle>
                            </StyleChartLeft>
                            <StyleChartLeft style={{ borderLeft: '3px solid #FAAD14' }}>
                                <StyleNum>{assetKey && assetKey.troubleEvents}</StyleNum>
                                <StyleTitle>隐患事件</StyleTitle>
                            </StyleChartLeft>
                            <StyleChartLeft style={{ borderLeft: '3px solid #2FC25B' }}>
                                <StyleNum>{assetKey && assetKey.inEffectiveEvents}</StyleNum>
                                <StyleTitle>无效事件</StyleTitle>
                            </StyleChartLeft>
                        </StyleChartRight>
                    </StyleChart>
                )}
            </Card>
            <Card title="排查列表" style={{ marginBottom: '24px' }}>
                <Table
                    rowKey="id"
                    columns={columns}
                    loading={loading}
                    dataSource={(dataSource && dataSource.records) || []}
                    pagination={{
                        pageSize: 10,
                        onChange: pageChange,
                        total: (dataSource && dataSource.total) || 0,
                    }}
                />
            </Card>
            <Card title="研判结果">
                <Form
                    name="result"
                    autoComplete="off"
                    wrapperCol={{ span: 12 }}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item label="威胁类型" name="status">
                        <Radio.Group>
                            <Radio value={3}>有效</Radio>
                            <Radio value={4}>误报</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </StyleContent>
    );
};

ThreatDetail.propTypes = {
    assetKey: PropTypes.object,
    taskList: PropTypes.object,
    getAssetKey: PropTypes.func,
    getTaskList: PropTypes.func,
};

const mapStateToProps = (state) => ({
    assetKey: state.intelligence.assetKey,
    taskList: state.intelligence.taskList,
});

const mapDispatchToProps = (dispatch) => ({
    getAssetKey: (params) => {
        dispatch(getAssetKeyAction(params));
    },
    getTaskList: (params) => {
        dispatch(getTaskListAction(params));
    },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThreatDetail);
