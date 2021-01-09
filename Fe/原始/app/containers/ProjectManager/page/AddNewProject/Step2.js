import React, { useState, useEffect } from 'react';
import { Tabs, Button, Row, Col, Table, Drawer, Modal, Form, Input, Upload } from 'antd';
import { searchParams } from '@utils/searchParams';
import {
    getIpPage,
    getWebPage,
    getIPAssetType,
    getIpAssetDel,
    getWebAssetDel,
    getfile,
    getWebfile,
} from '../api';
import AddIpasset from '../../components/AddIpasset';
import AddWebAsset from '../../components/AddWebAsset';
import SeeAddIpAsset from '../../components/SeeAddIpAsset';
import EditIpasset from '../../components/EditIpasset';
import SeeAddWebAsset from '../../components/SeeAddWebAsset';
import EditWebAsset from '../../components/EditWebAsset';
import { columns, columnsWeb } from '../config';

const { TabPane } = Tabs;

const Step2 = () => {
    const { id } = searchParams();
    const [visibleIp, setVisibleIp] = useState(false);
    const [visibleSeeIp, setVisibleSeeIp] = useState(false);
    const [visibleEditIp, setVisibleEditIp] = useState(false);
    const [idIpAssetRow, setIdIpAssetRow] = useState(0);

    const [visibleWeb, setVisibleWeb] = useState(false);
    const [visibleSeeWeb, setVisibleSeeWeb] = useState(false);
    const [visibleEditWeb, setVisibleEditWeb] = useState(false);
    const [idWebAssetRow, setIdWebAssetRow] = useState(0);

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [dataIp, setDataIp] = useState([]);
    const [totalIp, setTotalIp] = useState(0);
    const [updateIp, setupdateIp] = useState(false);
    const [ipType, setIpType] = useState([]);

    const [limitWeb, setLimitWeb] = useState(10);
    const [offsetWeb, setOffsetWeb] = useState(0);
    const [dataWeb, setDataWeb] = useState([]);
    const [totalWeb, setTotalWeb] = useState(0);
    const [updateWeb, setupdateWeb] = useState(false);

    const pageChangeIP = (page, pageSize) => {
        setOffset((page - 1) * pageSize);
        setLimit(pageSize);
    };
    const onClose = () => {
        setVisibleIp(false);
        setVisibleSeeIp(false);
        setVisibleEditIp(false);

        setVisibleSeeWeb(false);
        setVisibleEditWeb(false);
        setVisibleWeb(false);
    };
    const showDrawerIp = () => {
        setVisibleIp(true);
        setupdateIp(false);
    };
    const showDrawerSeeIp = (ids) => {
        setVisibleSeeIp(true);
        setIdIpAssetRow(ids);
    };
    const showDrawerEditIp = (ids) => {
        setVisibleEditIp(true);
        setIdIpAssetRow(ids);
        setupdateIp(false);
    };
    const IpCancel = () => {
        setVisibleIp(false);
        setupdateIp(true);
    };
    const IpEditCancel = () => {
        setVisibleEditIp(false);
        setupdateIp(true);
    };
    // ////////////////////////////////////////////
    const showDrawerWeb = () => {
        setVisibleWeb(true);
        setupdateWeb(false);
    };
    const showDrawerSeeWeb = (ids) => {
        setVisibleSeeWeb(true);
        setIdWebAssetRow(ids);
    };
    const showDrawerEditWeb = (ids) => {
        setVisibleEditWeb(true);
        setIdWebAssetRow(ids);
        setupdateWeb(false);
    };
    const webCancel = () => {
        setVisibleWeb(false);
        setupdateWeb(true);
    };
    const webEditCancel = () => {
        setVisibleEditWeb(false);
        setupdateWeb(true);
    };
    const pageChangeWeb = (page, pageSize) => {
        setOffsetWeb((page - 1) * pageSize);
        setLimitWeb(pageSize);
    };

    const actionIp = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                console.log('1');
                return (
                    <>
                        <Button type="link" onClick={() => showDrawerSeeIp(record.id)}>
                            查看
                        </Button>
                        <Button type="link" onClick={() => showDrawerEditIp(record.id)}>
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                delIpAsset(record.id);
                            }}
                        >
                            删除
                        </Button>
                    </>
                );
            },
        },
    ];
    const actionWeb = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                console.log('1');
                return (
                    <>
                        <Button type="link" onClick={() => showDrawerSeeWeb(record.id)}>
                            查看
                        </Button>
                        <Button type="link" onClick={() => showDrawerEditWeb(record.id)}>
                            编辑
                        </Button>
                        <Button
                            type="link"
                            onClick={() => {
                                delWebAsset(record.id);
                            }}
                        >
                            删除
                        </Button>
                    </>
                );
            },
        },
    ];
    const delIpAsset = (ids) => {
        getIpAssetDel({ ids: [ids] }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                setupdateIp(false);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const delWebAsset = (ids) => {
        getWebAssetDel({ ids: [ids] }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                setupdateWeb(false);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const [tabKey, setTabKey] = useState('1');
    const tabChange = (value) => {
        setTabKey(value);
    };
    useEffect(() => {
        getIPAssetType().then((res) => {
            if (res.code === 200) {
                setIpType(res.data.root);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);

    //  模态框  IP
    const [file1, setFile] = useState({});
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        console.log(file1);
        const formd = new FormData();
        formd.append('id', id);
        formd.append('file', file1);
        if (tabKey === '1') {
            getfile(formd).then((res) => {
                if (res.code === 200) {
                    console.log('获取数据成功');
                    setFile({});
                    setupdateIp(true);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
        if (tabKey === '2') {
            getWebfile(formd).then((res) => {
                if (res.code === 200) {
                    console.log('获取数据成功');
                    setFile({});
                    setupdateWeb(true);
                } else {
                    console.log('获取数据失败');
                }
            });
        }
        setVisible(false);
    };
    const handleCancel = () => {
        setFile('');
        setVisible(false);
    };
    const fileChange = (file) => {
        setFile(file);
    };
    // 模态框 web

    useEffect(() => {
        getIpPage({
            limit,
            offset,
            param: {
                projectId: Number(id),
            },
        }).then((res) => {
            if (res.code === 200) {
                setDataIp(res.data.records);
                setTotalIp(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    }, [limit, offset, updateIp]);

    useEffect(() => {
        getWebPage({
            limit: limitWeb,
            offset: offsetWeb,
            param: {
                projectId: Number(id),
            },
        }).then((res) => {
            if (res.code === 200) {
                setDataWeb(res.data.records);
                setTotalWeb(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    }, [limitWeb, offsetWeb, updateWeb]);

    return (
        <>
            <Tabs defaultActiveKey="1" onChange={tabChange}>
                <TabPane tab="IP资产" key="1">
                    <Row justify="space-between" style={{ marginBottom: '20px' }}>
                        <Col>
                            <Button type="primary" onClick={showModal}>
                                导入IP资产
                            </Button>
                        </Col>
                        <Col>
                            <div>
                                <Button type="primary" onClick={showDrawerIp}>
                                    新增
                                </Button>
                                <Drawer
                                    title="新增IP资产"
                                    width={720}
                                    onClose={onClose}
                                    visible={visibleIp}
                                    bodyStyle={{ paddingBottom: 80 }}
                                >
                                    <AddIpasset iptype={ipType} handleCancel={IpCancel} />
                                </Drawer>
                            </div>
                        </Col>
                    </Row>
                    <Table
                        columns={columns.concat(actionIp)}
                        dataSource={dataIp}
                        rowKey={(record) => record.id}
                        pagination={{
                            // defaultCurrent: 1,
                            total: totalIp,
                            onChange: pageChangeIP,
                            showTotal: () => `共 ${totalIp} 条`,
                        }}
                    />
                </TabPane>
                <TabPane tab="WEB资产" key="2">
                    <Row justify="space-between" style={{ marginBottom: '20px' }}>
                        <Col>
                            <Button type="primary" onClick={showModal}>
                                导入WEB资产
                            </Button>
                        </Col>
                        <Col>
                            <div>
                                <Button type="primary" onClick={showDrawerWeb}>
                                    新增
                                </Button>
                                <Drawer
                                    title="新增Web应用"
                                    width={720}
                                    onClose={onClose}
                                    visible={visibleWeb}
                                    bodyStyle={{ paddingBottom: 80 }}
                                >
                                    <AddWebAsset handleCancelWeb={webCancel} />
                                </Drawer>
                            </div>
                        </Col>
                    </Row>
                    <Table
                        columns={columnsWeb.concat(actionWeb)}
                        dataSource={dataWeb}
                        pagination={{
                            defaultCurrent: 1,
                            total: totalWeb,
                            onChange: pageChangeWeb,
                            showTotal: () => `共 ${totalWeb} 条`,
                        }}
                        rowKey={(record) => record.id}
                    />
                </TabPane>
            </Tabs>
            <Drawer
                title="IP资产详情"
                width={720}
                onClose={onClose}
                visible={visibleSeeIp}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <SeeAddIpAsset id={idIpAssetRow} />
            </Drawer>
            <Drawer
                title="编辑IP资产"
                width={720}
                onClose={onClose}
                visible={visibleEditIp}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <EditIpasset iptype={ipType} idIp={idIpAssetRow} handleCancelIp={IpEditCancel} />
            </Drawer>
            <Drawer
                title="WEB应用详情"
                width={720}
                onClose={onClose}
                visible={visibleSeeWeb}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <SeeAddWebAsset id={idWebAssetRow} />
            </Drawer>
            <Drawer
                title="编辑WEB应用"
                width={720}
                onClose={onClose}
                visible={visibleEditWeb}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <EditWebAsset idWeb={idWebAssetRow} handleCancelWeb={webEditCancel} />
            </Drawer>
            <Modal
                title={tabKey === '1' ? '导入资产信息' : '导入web资产'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="导入"
                cancelText="取消"
            >
                <Form name="filesubmit" initialValues={{ remember: true }}>
                    <Form.Item
                        label="文件上传"
                        name="file"
                        rules={[{ required: true, message: '请选择文件!' }]}
                    >
                        <Row>
                            <Col>
                                <Input placeholder="未选择任何文件" value={file1.name} />
                            </Col>
                            <Col>
                                <Upload
                                    beforeUpload={(file) => {
                                        fileChange(file);
                                        return false;
                                    }}
                                    showUploadList={false}
                                >
                                    <Button style={{ marginLeft: '10px' }}>选择文件</Button>
                                </Upload>
                                {/* <input ref={fileref} type="file" onchange=(file) /> */}
                                {/* ref.current.click() */}
                                {/* <Button style={{ marginLeft: '10px' }} onclic={handlclickfile}>选择文件</Button> */}
                            </Col>
                            <Col>
                                <a
                                    href={
                                        tabKey === '1'
                                            ? 'https://x.com.cn/staticsrc/IP资产模版.xlsx'
                                            : 'https://x.com.cn/staticsrc/应用资产模版.xlsx'
                                    }
                                    style={{ marginLeft: '10px' }}
                                >
                                    模板下载
                                </a>
                            </Col>
                        </Row>
                        <p style={{ marginTop: '10px' }}>
                            如果“资产IP+编号”的在系统中已存在，将更新现有资产信息。
                        </p>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default Step2;
