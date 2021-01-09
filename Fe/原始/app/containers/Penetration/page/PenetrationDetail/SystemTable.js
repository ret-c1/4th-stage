import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SysVulDeltailForm from '../../components/SystemTableDrawerForm/SysVulDeltailForm';
import EditSysVulDeltailForm from '../../components/SystemTableDrawerForm/EditSysVulDeltailForm';

import { getHoleAllData, getDelPerVul } from '../api';

export const Systemcolumns = [
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
        title: '问题类型',
        dataIndex: 'type',
    },
    {
        title: '漏洞名称',
        dataIndex: 'name',
    },
    {
        title: '当前状态',
        dataIndex: 'bugStatus',
    },
    {
        title: '发现时间',
        dataIndex: 'discoverTime',
    },
    {
        title: '复测漏洞',
        dataIndex: 'retest',
        render: (text, records) => {
            const state = records.retest;
            let value = '';
            if (state === 1) {
                value = '是';
            } else if (state === 0) {
                value = '否';
            }
            return <span>{value}</span>;
        },
    },
];

const PenetrationtestPage = (props) => {
    const { ids, refreshSys, funcSys } = props;
    const history = useHistory();
    const [sysData, setSysData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

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
    // 查看的抽屉
    const [visible, setVisible] = useState(false);
    const [VulId, setVulId] = useState(0);
    const showDrawer = (idSys) => {
        setVulId(idSys);
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    // 编辑的抽屉
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [sysEditId, setSysEditId] = useState(0);
    const [update, setupdate] = useState(false);
    const updateFunc = () => {
        setupdate(false);
    };
    const showDrawerEdit = (idEdit) => {
        setVisibleEdit(true);
        setSysEditId(idEdit);
    };
    const onCloseEdit = () => {
        setVisibleEdit(false);
        setupdate(true);
    };
    // 删除数据
    const delFunc = (idVul) => {
        getDelPerVul({ vulId: idVul, reportId: ids }).then((res) => {
            if (res.code === 200) {
                getHoleAllData({
                    limit,
                    offset,
                    param: { reportId: ids, sourceType: '人工' },
                }).then((res1) => {
                    if (res1.code === 200) {
                        setSysData(res1.data.records);
                        setTotal(res1.data.total);
                        funcSys(res1.data.total);
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
        if (refreshSys) {
            getHoleAllData({
                limit,
                offset,
                param: { reportId: ids, sourceType: '扫描器' },
            }).then((res) => {
                if (res.code === 200) {
                    setSysData(res.data.records);
                    setTotal(res.data.total);
                    funcSys(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
    }, [refreshSys]);

    useEffect(() => {
        getHoleAllData({ limit, offset, param: { reportId: ids, sourceType: '历史' } }).then(
            (res) => {
                if (res.code === 200) {
                    setSysData(res.data.records);
                    setTotal(res.data.total);
                } else {
                    console.log('获取数据失败');
                }
            },
        );
    }, [limit, offset]);
    useEffect(() => {
        if (update) {
            getHoleAllData({ limit, offset, param: { reportId: ids, sourceType: '历史' } }).then(
                (res) => {
                    if (res.code === 200) {
                        setSysData(res.data.records);
                        setTotal(res.data.total);
                        funcSys(res.data.total);
                    } else {
                        console.log('获取数据失败');
                    }
                },
            );
            updateFunc();
        }
    }, [update]);
    return (
        <>
            <Table
                rowKey={(record) => record.id}
                columns={Systemcolumns.concat(action)}
                dataSource={sysData}
                pagination={{ defaultCurrent: 1, total, onChange: pageChange }}
            />
            <Drawer
                title="系统历史漏洞详情"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <SysVulDeltailForm ids={VulId} />
            </Drawer>
            <Drawer
                title="编辑人工渗透漏洞"
                width={720}
                onClose={onCloseEdit}
                visible={visibleEdit}
                bodyStyle={{ paddingBottom: 80 }}
                destroyOnClose
            >
                {visibleEdit && <EditSysVulDeltailForm ids={sysEditId} func={onCloseEdit} />}
            </Drawer>
        </>
    );
};
export default PenetrationtestPage;
PenetrationtestPage.propTypes = {
    ids: PropTypes.string,
    refreshSys: PropTypes.bool,
    funcSys: PropTypes.func,
};
