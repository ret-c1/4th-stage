import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import PerVulDeltailForm from '../../components/PersonTableDrawerForm/PerVulDeltailForm';
import EditPerVulDeltailForm from '../../components/PersonTableDrawerForm/EditPerVulDeltailForm';
import { getHoleAllData, getDelPerVul } from '../api';

export const Personcolumns = [
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
        title: '录入时间',
        dataIndex: 'createTime',
    },
    {
        title: '复测漏洞',
        dataIndex: 'retest',
        render: (text, record) => {
            const e = record.retest === 0 ? <span>否</span> : <span>是</span>;
            return <>{e}</>;
        },
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
    const history = useHistory();
    const { ids, refresh, func } = props;
    const [perData, setPerData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

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

    const action = [
        {
            title: '操作',
            align: 'center',
            dataIndex: 'action',
            key: 'action',
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
    const getReportList = (limit1, offset1, param1) => {
        getHoleAllData({
            limit: limit1,
            offset: offset1,
            param: param1,
        }).then((res) => {
            if (res.code === 200) {
                setPerData(res.data.records);
                setTotal(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const delFunc = (idVul) => {
        getDelPerVul({ vulId: idVul, reportId: ids }).then((res) => {
            if (res.code === 200) {
                getHoleAllData({
                    limit,
                    offset,
                    param: { reportId: ids, sourceType: '人工' },
                }).then((res1) => {
                    if (res1.code === 200) {
                        setPerData(res1.data.records);
                        setTotal(res1.data.total);
                        func(res1.data.total);
                    } else {
                        console.log('获取数据失败');
                    }
                });
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const pageChange = (page, pageSize) => {
        setOffset((page - 1) * 10);
        setLimit(pageSize);
    };
    useEffect(() => {
        getReportList(limit, offset, { reportId: ids, sourceType: '人工' });
    }, [limit, offset]);
    useEffect(() => {
        if (refresh) {
            getHoleAllData({
                limit,
                offset,
                param: { reportId: ids, sourceType: '人工' },
            }).then((res) => {
                if (res.code === 200) {
                    setPerData(res.data.records);
                    setTotal(res.data.total);
                    func(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
        if (update) {
            getHoleAllData({
                limit,
                offset,
                param: { reportId: ids, sourceType: '人工' },
            }).then((res) => {
                if (res.code === 200) {
                    setPerData(res.data.records);
                    setTotal(res.data.total);
                    func(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
    }, [refresh, update]);
    return (
        <>
            <Table
                rowKey={(record) => record.id}
                columns={Personcolumns.concat(action)}
                dataSource={perData}
                pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
            />
            <Drawer
                title="人工渗透漏洞详情"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <PerVulDeltailForm ids={VulId} />
            </Drawer>
            <Drawer
                title="编辑人工渗透漏洞"
                width={720}
                onClose={onCloseEdit}
                visible={visibleEdit}
                bodyStyle={{ paddingBottom: 80 }}
                destroyOnClose
            >
                <EditPerVulDeltailForm ids={VulEditId} func={onCloseEdit} updateFunc={updateFunc} />
            </Drawer>
        </>
    );
};
export default PenetrationtestPage;
PenetrationtestPage.propTypes = {
    ids: PropTypes.string,
    refresh: PropTypes.bool,
    func: PropTypes.func,
};
