import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, PageHeader, Descriptions, Form, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { searchParams } from '@utils/searchParams';
import { dateFormat } from '@utils/momentFormat';
import Ckeditor from '@components/Ckeditor';
import { pubModalTips } from '@components/PubModal';
import { getWorkOrderDetail, getVulDetail, commitOrder } from '../../api';
import { orderDetailConfig, vulDetailConfig } from './config';

const OperationDetailPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    useEffect(() => {
        fetch();
    }, []);

    const { id, type, state } = searchParams();
    console.log(id, type, state);
    const [orderData, setOrderData] = useState({});
    // 定义html状态
    const [schemehtml, setSchemehtml] = useState('');
    const [processeshtml, setProcesseshtml] = useState('');
    const fetch = () => {
        const param = {
            id,
        };
        getWorkOrderDetail(param).then((res) => {
            if (res.code === 200) {
                setOrderData({ ...res.data });
                const { reportId, vulId, vulStatus, scheme, processes } = res.data;
                setSchemehtml(scheme);
                setProcesseshtml(processes);
                fetch2(reportId, vulId, vulStatus);
            }
        });
    };

    const [valData, setVulData] = useState({});
    const fetch2 = (reportId, vulId, vulStatus) => {
        const param = {
            reportId,
            vulId,
            vulStatus,
        };
        getVulDetail(param).then((res) => {
            if (res.code === 200) {
                setVulData({ ...res.data });
            }
        });
    };

    // 提交
    const fetch3 = () => {
        const param = {
            id,
            scheme: schemehtml,
            processes: processeshtml,
        };
        commitOrder(param).then((res) => {
            if (res.code === 200) {
                pubModalTips('success', '提示', '处置内容已提交', 3, () => {
                    history.push('/vulmanager/list/engineer');
                });
            }
        });
    };

    return (
        <Card style={{ margin: 30 }}>
            <PageHeader
                ghost={false}
                title="基本信息"
                extra={[
                    <Button
                        key="1"
                        onClick={() => {
                            history.go(-1);
                        }}
                    >
                        取消
                    </Button>,
                    type === '2' && state === '1' ? (
                        <Button
                            key="2"
                            type="primary"
                            onClick={() => {
                                fetch3();
                            }}
                        >
                            提交
                        </Button>
                    ) : null,
                ]}
            >
                <Descriptions size="small" column={2}>
                    {orderDetailConfig.map((item) => {
                        if (item.name === 'description' || item.name === 'contentDescription') {
                            return (
                                <Descriptions.Item label={item.label} key={item.name} span={2}>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: valData[item.name] }}
                                    />
                                </Descriptions.Item>
                            );
                        }
                        return (
                            <Descriptions.Item label={item.label} key={item.name}>
                                {valData[item.name]}
                            </Descriptions.Item>
                        );
                    })}
                </Descriptions>
            </PageHeader>
            <PageHeader ghost={false} title="工单详情">
                <Descriptions size="small" column={3}>
                    {vulDetailConfig.map((item) => {
                        if (item.name === 'dispatchTime' || item.name === 'wishFinishTime') {
                            return (
                                <Descriptions.Item label={item.label} key={item.name}>
                                    {dateFormat(orderData[item.name], 'YY-MM-DD')}
                                </Descriptions.Item>
                            );
                        }
                        if (item.name === 'handle') {
                            return (
                                <Descriptions.Item label={item.label} key={item.name}>
                                    {(Number(orderData[item.name]) / (60 * 60 * 1000)).toFixed(2)}
                                    小时
                                </Descriptions.Item>
                            );
                        }
                        return (
                            <Descriptions.Item label={item.label} key={item.name}>
                                {orderData[item.name]}
                            </Descriptions.Item>
                        );
                    })}
                </Descriptions>
            </PageHeader>
            <Form form={form} style={{ padding: '16px 4px' }} labelCol={{ span: 2 }}>
                <Form.Item label="新解决方案">
                    {type === '1' || state !== '1' ? (
                        <div dangerouslySetInnerHTML={{ __html: orderData.scheme }} />
                    ) : (
                        <Ckeditor
                            data={schemehtml}
                            name="scheme"
                            onChange={(editor) => {
                                const data = editor.getData();
                                setSchemehtml(data);
                            }}
                        />
                    )}
                </Form.Item>
                <Form.Item label="处置过程">
                    {type === '1' || state !== '1' ? (
                        <div dangerouslySetInnerHTML={{ __html: orderData.processes }} />
                    ) : (
                        <Ckeditor
                            data={processeshtml}
                            name="processes"
                            onChange={(editor) => {
                                const data = editor.getData();
                                setProcesseshtml(data);
                            }}
                        />
                    )}
                </Form.Item>
            </Form>
        </Card>
    );
};

// OperationDetailPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(OperationDetailPage);
