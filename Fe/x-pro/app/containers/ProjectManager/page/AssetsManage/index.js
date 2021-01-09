import React, { useState, useEffect } from 'react';
import { searchParams } from '@utils/searchParams';
import moment from 'moment';
import {
    Tabs,
    Form,
    Input,
    Row,
    Col,
    Divider,
    Cascader,
    Drawer,
    Button,
    Modal,
    Upload,
    Table,
    Select,
    DatePicker,
    message,
} from 'antd';
import {
    getIPAssetType,
    getIpPage,
    getIpAssetDel,
    getWebPage,
    getWebAssetDel,
    getfile,
    getWebfile,
    getIPAssetPage,
    getWebAssetPage,
    getSystemAssetDetail,
    getTaskAssetDetail,
    getTaskPerson,
    getChectedAsset,
    getRelatedAsset,
    gettaskSubmit,
} from '../api';
import AddIpasset from '../../components/AddIpasset';
import EditIpasset from '../../components/EditIpasset';
import SeeAddIpAsset from '../../components/SeeAddIpAsset';
import AddWebAsset from '../../components/AddWebAsset';
import EditWebAsset from '../../components/EditWebAsset';
import SeeAddWebAsset from '../../components/SeeAddWebAsset';
import {
    columns,
    columnsWeb,
    columnsSystem,
    columnsSystemDetail,
    columnsSystemRelation,
} from '../config';
import { ScContent, ScForm, ScButton, ScTable } from '../styled';

const { TabPane } = Tabs;
const { Option } = Select;

const AssetManage = () => {
    const { id } = searchParams();
    const [form] = Form.useForm();
    const [assetType, setAssetType] = useState({});
    const actionSystem = [
        {
            title: '操作',
            width: 260,
            align: 'center',
            render: (text, record) => (
                <div>
                    <ScButton type="link" size="small" onClick={() => showModalSystem(record)}>
                        查看详情
                    </ScButton>
                    <ScButton type="link" size="small" onClick={() => showModalRelation(record)}>
                        关联资产
                    </ScButton>
                    <ScButton type="link" size="small" onClick={() => showModalTask(record)}>
                        指派等保任务
                    </ScButton>
                </div>
            ),
        },
    ];
    const [tabKey, setTabKey] = useState('1');
    const tabChange = (value) => {
        setTabKey(value);
    };
    const handleFinish = (field) => {
        if (tabKey === '1') {
            handleFormChange(field);
        } else if (tabKey === '2') {
            handleFormChangeWeb(field);
        } else if (tabKey === '3') {
            handleFormChangeSystem(field);
        }
    };
    const handleFormChange = (fields) => {
        let formdata2 = {};
        if (fields.assetType) {
            formdata2 = {
                ...fields,
                assetType: fields.assetType.toString(),
            };
        } else {
            formdata2 = {
                ...fields,
            };
        }
        setParamIp({ offset: 0, limit: 10, param: { ...paramSys.param, ...formdata2 } });
    };
    const handleFormChangeWeb = (fields) => {
        setParamWeb({ offset: 0, limit: 10, param: { ...paramSys.param, ...fields } });
    };

    const handleFormChangeSystem = (fields) => {
        setParamSys({ offset: 0, limit: 10, param: { ...paramSys.param, ...fields } });
    };
    const [paramSys, setParamSys] = useState({
        offset: 0,
        limit: 10,
        param: { projectId: Number(id) },
    });
    const [totalSys, setTotalSys] = useState(0);
    const [dataSys, setDataSys] = useState([]);
    const getSystemData = () => {
        getWebAssetPage(paramSys).then((res) => {
            if (res.code === 200) {
                setDataSys(res.data.records);
                setTotalSys(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const pageChangeSys = (page, pageSize) => {
        setParamSys({ ...paramSys, offset: (page - 1) * pageSize });
    };
    useEffect(() => {
        getSystemData();
    }, [paramSys]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    // ip资产状态
    const actionIp = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
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
            ),
        },
    ];
    // ip资产的表格
    const [paramIp, setParamIp] = useState({
        offset: 0,
        limit: 10,
        param: { projectId: Number(id) },
    });
    const [totalIp, setTotalIp] = useState(0);
    const [dataIp, setDataIp] = useState([]);
    const getIpData = () => {
        getIpPage(paramIp).then((res) => {
            if (res.code === 200) {
                setDataIp(res.data.records);
                setTotalIp(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const pageChangeIp = (page, pageSize) => {
        setParamIp({ ...paramSys, offset: (page - 1) * pageSize });
    };
    useEffect(() => {
        getIpData();
    }, [paramIp]);

    // ip资产新增 删除 查看 编辑
    const [visibleIp, setVisibleIp] = useState(false);
    const [visibleSeeIp, setVisibleSeeIp] = useState(false);
    const [visibleEditIp, setVisibleEditIp] = useState(false);
    const [idIpAssetRow, setIdIpAssetRow] = useState(0);

    const [ipType, setIpType] = useState([]);

    const onClose = () => {
        setVisibleIp(false);
        setVisibleSeeIp(false);
        setVisibleEditIp(false);
        setVisibleSeeWeb(false);
        setVisibleEditWeb(false);
        setVisibleWeb(false);
    };
    const IpCancel = () => {
        setVisibleIp(false);
        getIpData();
    };
    const showDrawerIp = () => {
        setVisibleIp(true);
    };
    const showDrawerSeeIp = (ids) => {
        setVisibleSeeIp(true);
        setIdIpAssetRow(ids);
    };
    const showDrawerEditIp = (ids) => {
        setVisibleEditIp(true);
        setIdIpAssetRow(ids);
    };
    const IpEditCancel = () => {
        setVisibleEditIp(false);
        getIpData();
    };
    const delIpAsset = (ids) => {
        getIpAssetDel({ ids: [ids] }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                getIpData();
            } else {
                message.warning(res.message);
            }
        });
    };
    const exportXlsx = () => {
        const iFrame = document.createElement('iframe');
        const elink = document.createElement('a');
        elink.style.display = 'none';
        iFrame.style.display = 'none';
        elink.href = `/api/asset/ip/export?projectId=${id}`;
        iFrame.appendChild(elink);
        document.body.appendChild(iFrame);
        elink.click();
        document.body.removeChild(iFrame);
    };

    useEffect(() => {
        getIPAssetType().then((res) => {
            if (res.code === 200) {
                setIpType(res.data.root);
            } else {
                console.log('获取数据失败');
            }
        });
        getIPAssetType().then((res) => {
            if (res.code === 200) {
                setAssetType(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);
    //   web资产新增 删除 查看 编辑
    const [visibleWeb, setVisibleWeb] = useState(false);
    const [visibleSeeWeb, setVisibleSeeWeb] = useState(false);
    const [visibleEditWeb, setVisibleEditWeb] = useState(false);
    const [idWebAssetRow, setIdWebAssetRow] = useState(0);

    const actionWeb = [
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
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
            ),
        },
    ];
    // web列表状态
    const [paramWeb, setParamWeb] = useState({
        offset: 0,
        limit: 10,
        param: { projectId: Number(id) },
    });
    const [totalWeb, setTotalWeb] = useState(0);
    const [dataWeb, setDataWeb] = useState([]);
    const getWebData = () => {
        getWebPage(paramWeb).then((res) => {
            if (res.code === 200) {
                setDataWeb(res.data.records);
                setTotalWeb(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const pageChangeWeb = (page, pageSize) => {
        setParamWeb({ ...paramSys, offset: (page - 1) * pageSize });
    };
    useEffect(() => {
        getWebData();
    }, [paramWeb]);

    const showDrawerWeb = () => {
        setVisibleWeb(true);
    };
    const showDrawerSeeWeb = (ids) => {
        setVisibleSeeWeb(true);
        setIdWebAssetRow(ids);
    };
    const showDrawerEditWeb = (ids) => {
        setVisibleEditWeb(true);
        setIdWebAssetRow(ids);
    };
    const webCancel = () => {
        setVisibleWeb(false);
        setParamWeb({
            offset: 0,
            limit: 10,
            param: { projectId: Number(id) },
        });
        // 重新请求数据
        getWebData();
    };
    const webEditCancel = () => {
        setVisibleEditWeb(false);
        setParamWeb({
            offset: 0,
            limit: 10,
            param: { projectId: Number(id) },
        });
    };
    const delWebAsset = (ids) => {
        getWebAssetDel({ ids: [ids] }).then((res) => {
            if (res.code === 200) {
                console.log('删除数据成功');
                setParamWeb({
                    offset: 0,
                    limit: 10,
                    param: { projectId: Number(id) },
                });
            } else {
                message.warning(res.message);
            }
        });
    };
    const exportWebXlsx = () => {
        const iFrame = document.createElement('iframe');
        const elink = document.createElement('a');
        elink.style.display = 'none';
        iFrame.style.display = 'none';
        elink.href = `/api/asset/web/export?projectId=${id}`;
        iFrame.appendChild(elink);
        document.body.appendChild(iFrame);
        elink.click();
        document.body.removeChild(iFrame);
    };

    // 有关文件导入导出
    const [file1, setFile] = useState({});
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        const formd = new FormData();
        formd.append('id', id);
        formd.append('file', file1);
        if (tabKey === '1') {
            getfile(formd).then((res) => {
                if (res.code === 200) {
                    console.log('导入文件成功');
                    // getIpAssetCheck(limit, offset, { projectId: Number(id) });
                    setFile({});
                    // 重新请求数据
                    getIpData();
                } else {
                    console.log('导入文件失败');
                }
            });
        }
        if (tabKey === '2') {
            getWebfile(formd).then((res) => {
                if (res.code === 200) {
                    console.log('导入文件成功');
                    setFile({});
                    // 重新请求数据
                    getWebData();
                } else {
                    console.log('导入文件失败');
                }
            });
        }
        setVisible(false);
    };
    const handleCancel = () => {
        getIpData();
        setFile('');
        setVisible(false);
    };
    const fileChange = (file) => {
        setFile(file);
    };

    //  关联资产查看详情

    const [limitSystem, setLimitSystem] = useState(10);
    const [offsetSystem, setOffsetSystem] = useState(0);
    const [dataSystem, setDataSystem] = useState([]);
    const [totalSystem, setTotalSystem] = useState(0);
    const [systemVisible, setSystemVisible] = useState(false);
    const [recordSystemRow, setRecordSystemRow] = useState([]);
    const pageSystemChange = (page, pageSize) => {
        setLimitSystem(pageSize);
        setOffsetSystem((page - 1) * pageSize);
    };
    const showModalSystem = (recordSystem) => {
        setSystemVisible(true);
        setRecordSystemRow(recordSystem);
        getSystemAssetDetail({
            limit: limitSystem,
            offset: offsetSystem,
            param: {
                id: recordSystem.id,
            },
        }).then((res) => {
            if (res.code === 200) {
                setDataSystem(res.data.records);
                setTotalSystem(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const handleOkSystem = () => {
        setSystemVisible(false);
    };
    const handleCancelSystem = () => {
        setSystemVisible(false);
    };
    // 关联资产
    const [limitRelation, setLimitRelation] = useState(10);
    const [offsetRelation, setOffsetRelation] = useState(0);
    const [dataRelation, setDataRelation] = useState([]);
    const [totalRelation, setTotalRelation] = useState(0);
    const [RelationVisible, setRelationVisible] = useState(false);
    const [recordRelationRow, setRecordRelationRow] = useState({});
    const [selected, setSelected] = useState([]);
    const rowSelectionRelation = {
        selectedRowKeys: selected,
        onChange: (selectedRowKeys) => {
            setSelected(selectedRowKeys);
        },
    };
    const pageRelationChange = (page, pageSize) => {
        setLimitRelation(pageSize);
        setOffsetRelation((page - 1) * pageSize);
    };
    const showModalRelation = (recordRelation) => {
        setRelationVisible(true);
        setRecordRelationRow(recordRelation);
        getIPAssetPage({
            limit: limitRelation,
            offset: offsetRelation,
            param: {
                projectId: id,
            },
        }).then((res) => {
            if (res.code === 200) {
                setDataRelation(res.data.records);
                setTotalRelation(res.data.total);
            } else {
                console.log('获取数据失败');
            }
        });
        getChectedAsset({
            id: recordRelation.id,
        }).then((res) => {
            if (res.code === 200) {
                setSelected(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const handleOkRelation = () => {
        getRelatedAsset({
            domainId: recordRelationRow.id,
            ipIds: selected,
        }).then((res) => {
            if (res.code === 200) {
                console.log('关联成功');
                setRelationVisible(false);
                getIPAssetPage({
                    limit: limitRelation,
                    offset: offsetRelation,
                    param: {
                        projectId: id,
                    },
                }).then((res2) => {
                    if (res2.code === 200) {
                        setDataRelation(res2.data.records);
                        setTotalRelation(res2.data.total);
                    } else {
                        console.log('获取数据失败');
                    }
                });
            } else {
                console.log('获取数据失败');
            }
        });
    };
    const handleCancelRelation = () => {
        setRelationVisible(false);
    };
    //   指派等保任务
    const [taskVisible, setTaskVisible] = useState(false);
    const [taskData, setTaskData] = useState({});
    const [sysRow, setSysRow] = useState([]);
    const [taskPersonData, setTaskPersonData] = useState([]);
    const showModalTask = (sysData) => {
        setSysRow(sysData);
        setTaskVisible(true);
        getTaskAssetDetail({
            id: sysData.id,
        }).then((res) => {
            if (res.code === 200) {
                setTaskData(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
        getTaskPerson({
            id: 1,
        }).then((res) => {
            if (res.code === 200) {
                setTaskPersonData(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
        form.setFieldsValue(taskData);
    };
    const handleOkTask = () => {
        setTaskVisible(false);
    };
    const handleCancelTask = () => {
        setTaskVisible(false);
    };
    const FormFinishTask = (values) => {
        const data = {
            startTime: new Date(moment(values.startTime).format('YYYY-MM-DD HH:mm:ss')).valueOf(),
            endTime: new Date(moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')).valueOf(),
        };
        gettaskSubmit({
            projectId: id,
            domainAssetId: sysRow.id,
            engineerIds: values.engineerNames,
            ...values,
            ...data,
        }).then((res) => {
            if (res.code === 200) {
                setTaskVisible(false);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    return (
        <>
            <ScContent>
                <Tabs defaultActiveKey="1" onChange={tabChange}>
                    <TabPane tab="IP资产管理" key="1">
                        <ScForm
                            form={form}
                            style={{ marginTop: '10px' }}
                            className="ant-advanced-search-form"
                            onFinish={handleFinish}
                        >
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="资产名称" name="assetName">
                                        <Input placeholder="请输入资产名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="资产IP" name="assetIp">
                                        <Input placeholder="请输入资产IP" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="资产类型" name="assetType">
                                        <Cascader
                                            options={assetType.root || []}
                                            placeholder="请选择"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label=" 责任人" name="personInCharge">
                                        <Input placeholder="请输入责任人" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="资产标签" name="assetTags">
                                        <Cascader options={[] || assetType} placeholder="请选择" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="资产编号" name="assetCode">
                                        <Input placeholder="请输入资产编号" />
                                    </Form.Item>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }} offset={6}>
                                    <ScButton type="primary" htmlType="submit">
                                        查询
                                    </ScButton>
                                    <ScButton
                                        onClick={() => {
                                            form.resetFields();
                                            setParamIp({
                                                offset: 0,
                                                limit: 10,
                                                param: { projectId: Number(id) },
                                            });
                                            // getCheckFunction(limit, offset, {});
                                        }}
                                    >
                                        重置
                                    </ScButton>
                                </Col>
                            </Row>
                        </ScForm>
                        <Divider
                            orientation="left"
                            style={{ color: '#333', fontWeight: 'normal' }}
                        />
                        <Row justify="space-between">
                            <Col>{/* <ScButton type="primary" >删除</ScButton> */}</Col>
                            <Col>
                                <ScButton
                                    type="primary"
                                    onClick={() => {
                                        showDrawerIp();
                                    }}
                                >
                                    新增
                                </ScButton>
                                <ScButton type="primary" onClick={showModal}>
                                    导入
                                </ScButton>
                                <ScButton
                                    type="primary"
                                    onClick={() => {
                                        exportXlsx();
                                    }}
                                >
                                    导出
                                </ScButton>
                            </Col>
                        </Row>

                        <ScTable
                            size="small"
                            rowSelection={{ ...rowSelection }}
                            columns={columns.concat(actionIp)}
                            dataSource={dataIp}
                            rowKey={(record) => record.id}
                            pagination={{
                                defaultCurrent: 1,
                                total: totalIp,
                                showTotal: (total) => `总共 ${total} 页`,
                                onChange: pageChangeIp,
                            }}
                        />
                    </TabPane>
                    <TabPane tab="WEB资产管理" key="2">
                        <ScForm form={form} style={{ marginTop: '10px' }} onFinish={handleFinish}>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="应用名称" name="applicationName">
                                        <Input placeholder="请输入应用名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="域名" name="domain">
                                        <Input placeholder="请输入域名，URL或IP端口" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="应用类型" name="applicationType">
                                        <Input placeholder="请输入应用类型" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="技术架构" name="techFramework">
                                        <Input placeholder="请输入技术架构" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="应用编号" name="domainCode">
                                        <Input placeholder="请输入应用编号" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="应用标签" name="applicationTags">
                                        <Cascader options={[] || assetType} placeholder="请选择" />
                                    </Form.Item>
                                </Col>
                                <Col span={6} offset={6} style={{ textAlign: 'right' }}>
                                    <ScButton type="primary" htmlType="submit">
                                        查询
                                    </ScButton>
                                    <ScButton
                                        onClick={() => {
                                            form.resetFields();
                                            // getCheckWebFunction(limitWeb, offsetWeb, {});
                                            setParamWeb({
                                                offset: 0,
                                                limit: 10,
                                                param: { projectId: Number(id) },
                                            });
                                        }}
                                    >
                                        重置
                                    </ScButton>
                                </Col>
                            </Row>
                        </ScForm>
                        <Divider
                            orientation="left"
                            style={{ color: '#333', fontWeight: 'normal' }}
                        />
                        <Row justify="space-between">
                            <Col>{/* <ScButton type="primary">删除</ScButton> */}</Col>
                            <Col>
                                <ScButton type="primary" onClick={showDrawerWeb}>
                                    新增
                                </ScButton>
                                <ScButton type="primary" onClick={showModal}>
                                    导入
                                </ScButton>
                                <ScButton
                                    type="primary"
                                    onClick={() => {
                                        exportWebXlsx();
                                    }}
                                >
                                    导出
                                </ScButton>
                            </Col>
                        </Row>

                        <ScTable
                            size="small"
                            columns={columnsWeb.concat(actionWeb)}
                            dataSource={dataWeb}
                            pagination={{
                                defaultCurrent: 1,
                                total: totalWeb,
                                onChange: pageChangeWeb,
                                showTotal: (total) => `总共 ${total} 页`,
                            }}
                            rowKey={(record) => record.id}
                        />
                    </TabPane>
                    <TabPane tab="系统资产关联" key="3">
                        <ScForm form={form} style={{ marginTop: '10px' }} onFinish={handleFinish}>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Form.Item label="名称" name="applicationName">
                                        <Input placeholder="请输入资产名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="IP" name="domain">
                                        <Input placeholder="请输入资产IP名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label=" 责任人" name="personInCharge">
                                        <Input placeholder="请输入责任人" />
                                    </Form.Item>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <ScButton type="primary" htmlType="submit">
                                        查询
                                    </ScButton>
                                    <ScButton
                                        onClick={() => {
                                            form.resetFields();
                                            setParamSys({ offset: 0, limit: 10, param: {} });
                                        }}
                                    >
                                        重置
                                    </ScButton>
                                </Col>
                            </Row>
                        </ScForm>
                        <Divider
                            orientation="left"
                            style={{ color: '#333', fontWeight: 'normal' }}
                        />

                        <ScTable
                            size="small"
                            rowSelection={{ ...rowSelection }}
                            columns={columnsSystem.concat(actionSystem)}
                            dataSource={dataSys}
                            rowKey={(record) => record.id}
                            pagination={{
                                defaultCurrent: 1,
                                total: totalSys,
                                onChange: pageChangeSys,
                                showTotal: (total) => `总共 ${total} 页`,
                            }}
                        />
                    </TabPane>
                </Tabs>
                <Drawer
                    title="新增IP资产"
                    width={720}
                    onClose={onClose}
                    visible={visibleIp}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <AddIpasset iptype={ipType} handleCancel={IpCancel} />
                </Drawer>
                <Drawer
                    title="IP资产详情"
                    width={720}
                    onClose={onClose}
                    visible={visibleSeeIp}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <SeeAddIpAsset id={idIpAssetRow} />
                </Drawer>
                <Drawer
                    title="编辑IP资产"
                    width={720}
                    onClose={onClose}
                    visible={visibleEditIp}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <EditIpasset
                        iptype={ipType}
                        idIp={idIpAssetRow}
                        handleCancelIp={IpEditCancel}
                    />
                </Drawer>
                <Drawer
                    title="新增Web应用"
                    width={720}
                    onClose={onClose}
                    visible={visibleWeb}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <AddWebAsset handleCancelWeb={webCancel} />
                </Drawer>
                <Drawer
                    title="WEB应用详情"
                    width={720}
                    onClose={onClose}
                    visible={visibleSeeWeb}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <SeeAddWebAsset id={idWebAssetRow} />
                </Drawer>
                <Drawer
                    title="编辑WEB应用"
                    width={720}
                    onClose={onClose}
                    visible={visibleEditWeb}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                >
                    <EditWebAsset idWeb={idWebAssetRow} handleCancelWeb={webEditCancel} />
                </Drawer>
                <Modal
                    title="导入资产信息"
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
                                        href={tabKey === '1' ? '模版.xlsx' : '模版.xlsx'}
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
                <Modal
                    title={recordSystemRow.applicationName}
                    visible={systemVisible}
                    cancelText="取消"
                    okText="确定"
                    onOk={handleOkSystem}
                    onCancel={handleCancelSystem}
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item label="域名：">{recordSystemRow.domain}</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="责任人：">{recordSystemRow.personInCharge}</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="待关联数量：">{totalSystem}</Form.Item>
                        </Col>
                    </Row>
                    <h4>关联资产</h4>
                    <Table
                        size="small"
                        columns={columnsSystemDetail}
                        dataSource={dataSystem}
                        pagination={{
                            defaultCurrent: 1,
                            total: totalSystem,
                            onChange: pageSystemChange,
                        }}
                        rowKey="id"
                    />
                </Modal>
                <Modal
                    title={recordRelationRow.applicationName}
                    visible={RelationVisible}
                    onOk={handleOkRelation}
                    onCancel={handleCancelRelation}
                    width="700px"
                    cancelText="取消"
                    okText="确定"
                >
                    <Row>
                        <Col span={8}>
                            <Form.Item label="域名：">{recordRelationRow.domain}</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="责任人：">
                                {recordRelationRow.personInCharge}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="关联数量：">{totalRelation}</Form.Item>
                        </Col>
                    </Row>
                    <h4>关联资产</h4>
                    <Table
                        size="small"
                        columns={columnsSystemRelation}
                        dataSource={dataRelation}
                        pagination={{
                            defaultCurrent: 1,
                            total: totalRelation,
                            onChange: pageRelationChange,
                        }}
                        rowKey={(record) => record.id}
                        rowSelection={{
                            ...rowSelectionRelation,
                        }}
                    />
                </Modal>
                <Modal
                    title={recordSystemRow.applicationName}
                    visible={taskVisible}
                    onOk={handleOkTask}
                    onCancel={handleCancelTask}
                    width="700px"
                    footer={null}
                >
                    <Form
                        name="basic"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinish={FormFinishTask}
                    >
                        <Row>
                            <Col span={24}>
                                <Form.Item label="职责：">实施工程师</Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="搜索成员："
                            name="engineerNames"
                            labelCol={{ span: '4' }}
                            wrapperCol={{ span: '16' }}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                // onChange={handleChange}
                            >
                                {taskPersonData.map((item) => (
                                    <Option key={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            label="服务周期："
                            labelCol={{ span: '4' }}
                        >
                            <Form.Item
                                name="startTime"
                                style={{ display: 'inline-block', marginRight: '15px' }}
                                rules={[{ required: true, message: '请填写开始时间!' }]}
                            >
                                <DatePicker
                                    placeholder="请填写开始时间"
                                    style={{ width: '210px' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="endTime"
                                style={{ display: 'inline-block' }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请填写结束时间!',
                                    },
                                ]}
                            >
                                <DatePicker
                                    placeholder="请填写结束时间"
                                    style={{ width: '210px' }}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Row style={{ marginLeft: '110px' }}>
                                <Col>
                                    <Button
                                        type="primary"
                                        style={{ width: '435px' }}
                                        htmlType="submit"
                                    >
                                        提交
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </ScContent>
        </>
    );
};
export default AssetManage;
