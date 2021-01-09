import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Descriptions } from 'antd';
import { useHistory } from 'react-router-dom';
import PubDrawer from '@components/PubDrawer';
import { getLoopholeList, generateReport, nextSerialNo, vulDetail } from '../../api';

const LoopholeDetail = () => {
    const history = useHistory();
    const { state } = history.location;
    const [tableList, setTableList] = useState([]);
    const [vulDetails, setVulDetails] = useState({});
    const [vulProcessInfo, setVulProcessInfo] = useState([]);
    const [isShow, changeIsShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [loading, changeLoading] = useState(false);
    const [params, changeParams] = useState({
        pageSize: 10,
        pageNo: 1,
        taskId: [state && state.taskId],
        projectId: [1],
        id: [],
        groupId: [],
        risk: [],
        status: [],
        typeId: [],
        keyWord: '',
        versionId: [],
        vulFilter: 0,
        beginDate: '',
        endDate: '',
    });
    const getList = (searchParam) => {
        getLoopholeList({ ...params, ...searchParam }).then((res) => {
            if (res.code === 200 && res.message) {
                changeLoading(false);
                setTotal(res.message.count);
                setTableList(res.message.resultList);
            }
        });
    };
    useEffect(() => {
        getList();
    }, [params]);
    // 分页

    const pageChange = (page) => {
        changeParams({ ...params, pageNo: page });
    };
    const columns = [
        {
            title: '漏洞ID',
            dataIndex: 'vulId',
            key: 'vulId',
            sorter: (a, b) => a.taskId - b.taskId,
        },
        {
            title: '漏洞名称',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: '相关资产',
            key: 'asset',
            dataIndex: 'asset',
        },
        {
            title: '漏洞类型',
            key: 'type',
            dataIndex: 'type',
        },
        {
            title: '风险等级',
            key: 'risk',
            dataIndex: 'risk',
            sorter: (a, b) => a.risk - b.risk,
            width: 130,
            render: (text) => {
                if (text === 1) {
                    return '低';
                }
                if (text === 2) {
                    return '中';
                }
                if (text === 3) {
                    return '高';
                }
                if (text === 4) {
                    return '紧急';
                }
                return text;
            },
        },
        {
            title: '任务ID',
            key: 'taskId',
            dataIndex: 'taskId',
            sorter: (a, b) => a.taskId - b.taskId,
        },
        {
            title: '创建时间',
            key: 'createdDate',
            dataIndex: 'createdDate',
            width: 120,
            sorter: (a, b) => a.createdDate - b.createdDate,
        },
        {
            title: '状态',
            key: 'statusId',
            dataIndex: 'statusId',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => detailDrawer(record.vulId)}>
                    查看详情
                </Button>
            ),
        },
    ];
    const detailDrawer = (id) => {
        vulDetail(id).then((res) => {
            if (res.code === 200) {
                setVulDetails(res.message.vulDetails);
                setVulProcessInfo(res.message.process);
            }
        });
        changeIsShow(true);
    };
    const generatorReport = () => {
        const downloadParams = {
            ids: [state && state.taskId],
            type: 1,
            reportName: `REPORT_${state && state.name}_${Date.parse(new Date())}`,
            fileFormat: [
                2, // 1 word格式 2 pdf  3 excel
            ],
            waterMark: state && state.name,
        };
        generateReport(downloadParams).then((res) => {
            if (res.code === 200) {
                nextSerialNo().then((d) => {
                    if (d.code === 200) {
                        const url = `/DevSocOps/api/file/download/${d.message}/${res.message.downloadType}?uploadFileName=${res.message.fileName}`;
                        const a = document.createElement('a');
                        a.setAttribute('href', url);
                        a.setAttribute('download', res.message.fileName);
                        a.click();
                    }
                });
            }
        });
    };
    return (
        <Card style={{ margin: 30 }}>
            <div style={{ textAlign: 'right', marginBottom: '8px' }}>
                <Button onClick={generatorReport}>生成报告</Button>
            </div>
            <Table
                columns={columns}
                tableLayout="fixed"
                loading={loading}
                rowKey="vulId"
                dataSource={tableList || []}
                pagination={{
                    pageSize: 10,
                    onChange: pageChange,
                    total,
                    showTotal: () => `共 ${total} 条`,
                    showSizeChanger: false,
                }}
            />
            <PubDrawer
                title="漏洞详情"
                visible={isShow}
                onOk={() => changeIsShow(false)}
                onClose={() => changeIsShow(false)}
            >
                <Descriptions title="基本详情" column={2}>
                    <Descriptions.Item label="漏洞名称" key="name">
                        {vulDetails && vulDetails.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="项目名称" key="projectName">
                        {vulDetails && vulDetails.projectName}
                    </Descriptions.Item>
                    <Descriptions.Item label="版本" key="versionName">
                        {vulDetails && vulDetails.versionName}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞编号" key="vulCode">
                        {vulDetails && vulDetails.vulCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞等级" key="risk">
                        {vulDetails && vulDetails.risk === 1 && '低'}
                        {vulDetails && vulDetails.risk === 2 && '中'}
                        {vulDetails && vulDetails.risk === 3 && '高'}
                        {vulDetails && vulDetails.risk === 4 && '紧急'}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞类型" key="type">
                        {vulDetails && vulDetails.type}
                    </Descriptions.Item>
                    <Descriptions.Item label="关联资产" key="asset">
                        {vulDetails && vulDetails.asset}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞位置" key="position">
                        {vulDetails && vulDetails.position}
                    </Descriptions.Item>
                    <Descriptions.Item label="创建时间" key="createdDate">
                        {vulProcessInfo.length > 0 &&
                            vulProcessInfo[vulProcessInfo.length - 1].createdDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞状态" key="status">
                        {vulProcessInfo.length > 0 &&
                            vulProcessInfo[vulProcessInfo.length - 1].status}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞描述" key="descri" span={2}>
                        {vulDetails && (
                            <div
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: vulDetails.descri,
                                }}
                            />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="漏洞验证" key="confirm" span={2}>
                        {vulDetails && (
                            <div
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: vulDetails.confirm,
                                }}
                            />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="修改方案" key="advice" span={2}>
                        {vulDetails && (
                            <div
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: vulDetails.advice,
                                }}
                            />
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </PubDrawer>
        </Card>
    );
};

export default LoopholeDetail;
