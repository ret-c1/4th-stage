import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import WebVulDeltailForm from '../../components/WebTableDrawerForm/WebVulDeltailForm';
import EditWebVulDeltailForm from '../../components/WebTableDrawerForm/EditWebVulDeltailForm';

import { getHoleAllData, getDelPerVul } from '../api';

export const Webcolumns = [
    {
        title: 'URL',
        dataIndex: 'url',
        width: 500,
        render: (text) => (
            <div style={{ width: '500px', whiteSpace: 'normal' }}>
                <Tooltip title={text} placement="topLeft">
                    <span>{text}</span>
                </Tooltip>
            </div>
        ),
    },
    {
        title: '漏洞名称',
        dataIndex: 'name',
        width: 200,
    },
    {
        title: '漏洞级别',
        dataIndex: 'level',
        render: (text, record) => {
            let e = '';
            if (record.level === '高危') {
                e = <span style={{ color: '#e92b1d' }}>高危</span>;
            } else if (record.level === '中危') {
                e = <span style={{ color: '#ee8035' }}>中危</span>;
            } else if (record.level === '低危') {
                e = <span style={{ color: '#00a0ea' }}>低危</span>;
            }
            return e;
        },
    },
    {
        title: '受影响主机',
        dataIndex: 'ip',
    },
    {
        title: '扫描器名称',
        dataIndex: 'scannerType',
    },
    {
        title: '评审结果',
        dataIndex: 'vulStatus',
        render: (text, record) => {
            let e = '';
            if (record.vulStatus === '待评审') {
                e = <span style={{ color: '#ea883a' }}>待评审</span>;
            } else if (record.vulStatus === '有效') {
                e = <span style={{ color: '#66bb3b' }}>有效</span>;
            } else if (record.vulStatus === '存疑') {
                e = <span style={{ color: '#ee8035' }}>存疑</span>;
            } else if (record.vulStatus === '误报') {
                e = <span style={{ color: '#999' }}>存疑</span>;
            } else if (record.vulStatus === '无效') {
                e = <span style={{ color: '#999' }}>存疑</span>;
            }
            return e;
        },
    },
];

const PenetrationtestPage = (props) => {
    const { ids, refreshWeb, funcWeb } = props;
    const history = useHistory();
    const [webData, setWebData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    const action = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                const e =
                    history.location.search.split('&&')[0].split('=')[1] === 'edit' ? (
                        <>
                            <Button
                                type="link"
                                onClick={() => {
                                    showDrawer(record.id);
                                }}
                            >
                                查看
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    showDrawerEdit(record.id);
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    delFunc(record.id);
                                }}
                            >
                                删除
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="link"
                                onClick={() => {
                                    showDrawer(record.id);
                                }}
                            >
                                查看
                            </Button>
                        </>
                    );
                return e;
            },
        },
    ];

    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * 10);
        setLimit(pageSize);
    };
    //  加载页面表格数据
    const getWebReportList = (x, y, z) => {
        getHoleAllData({
            limit: x,
            offset: y,
            param: z,
        }).then((res) => {
            if (res.code === 200) {
                setWebData(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    // 删除数据
    const delFunc = (idVul) => {
        getDelPerVul({ vulId: idVul, reportId: ids }).then((res) => {
            if (res.code === 200) {
                getHoleAllData({
                    limit,
                    offset,
                    param: { reportId: ids, sourceType: '扫描器' },
                }).then((res1) => {
                    if (res1.code === 200) {
                        setWebData(res1.data.records);
                        setTotal(res1.data.total);
                        funcWeb(res1.data.total);
                    } else {
                        console.log('获取数据失败');
                    }
                });
            } else {
                console.log('获取数据失败');
            }
        });
    };

    useEffect(() => {
        getWebReportList(limit, offset, { reportId: ids, sourceType: '扫描器' });
    }, [limit, offset]);

    // 查看的抽屉
    const [visible, setVisible] = useState(false);
    const [VulId, setVulId] = useState(0);
    const showDrawer = (idPer) => {
        setVulId(idPer);
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // 编辑的抽屉
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [VulEditId, setVulEditId] = useState(0);
    const [update, setupdate] = useState(false);
    const updateFunc = () => {
        setupdate(false);
    };
    const showDrawerEdit = (idEdit) => {
        setVisibleEdit(true);
        setVulEditId(idEdit);
    };
    const onCloseEdit = () => {
        setVisibleEdit(false);
        setupdate(true);
    };
    useEffect(() => {
        if (refreshWeb) {
            getHoleAllData({
                limit,
                offset,
                param: { reportId: ids, sourceType: '扫描器' },
            }).then((res) => {
                if (res.code === 200) {
                    setWebData(res.data.records);
                    funcWeb(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
        if (update) {
            getHoleAllData({
                limit,
                offset,
                param: { reportId: ids, sourceType: '扫描器' },
            }).then((res) => {
                if (res.code === 200) {
                    setWebData(res.data.records);
                    funcWeb(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
    }, [refreshWeb, update]);
    return (
        <>
            <Table
                columns={Webcolumns.concat(action)}
                dataSource={webData}
                pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
                rowKey={(record) => record.id}
            />
            <Drawer
                title="WEB扫描漏洞详情"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <WebVulDeltailForm ids={VulId} />
            </Drawer>
            <Drawer
                title="编辑人工渗透漏洞"
                width={720}
                onClose={onCloseEdit}
                visible={visibleEdit}
                bodyStyle={{ paddingBottom: 80 }}
                destroyOnClose
            >
                <EditWebVulDeltailForm
                    ids={VulEditId}
                    func={onCloseEdit}
                    updateFunc={() => updateFunc()}
                />
            </Drawer>
        </>
    );
};
export default PenetrationtestPage;
PenetrationtestPage.propTypes = {
    ids: PropTypes.string,
    refreshWeb: PropTypes.bool,
    funcWeb: PropTypes.func,
};
