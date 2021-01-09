import React, { useEffect, useState } from 'react';
import {
    Divider,
    Button,
    Typography,
    Tabs,
    Modal,
    Row,
    Col,
    Form,
    Input,
    Upload,
    Drawer,
    Badge,
} from 'antd';
import { searchParams } from '@utils/searchParams';
import { useHistory } from 'react-router-dom';
// import {
//     getCheckReport,
//     getCommitReport,
//     getDetailItem,
//     getImportScanReport,
//     getHoleAllData,
//     getHoleDictory,
// } from '../api';
import WebTable from './WebTable';
import PersonTable from './PersonTable';
import NewVulForm from '../../components/NewVulForm';
import SubmitReportModal from '../../components/SubmitReportModal';
import SystemTable from './SystemTable';
import { ScContent } from '../styled';

const { Title } = Typography;
const { TabPane } = Tabs;

const PenetrationtestPage = () => {
    const history = useHistory();
    const { id } = searchParams();
    const [data] = useState([]);
    useEffect(() => {
        // getCheckReport({ id }).then((res) => {
        //     if (res.code === 200) {
        //         setData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, []);

    // 提交报告模态框
    const [visible, setVisible] = useState(false);
    const [itemData] = useState({});
    const showModal = (ids, projectId) => {
        console.log(ids, projectId);
        // getCommitReport({ id: ids }).then((res) => {
        //     if (res.code === 200) {
        //         console.log('提交报告成功');
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        // getDetailItem({ id: projectId }).then((res) => {
        //     if (res.code === 200) {
        //         setItemData(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    // 控制页面人工渗透漏洞是否刷新的状态
    const [refresh, setRefresh] = useState(false);
    const func = (value) => {
        setPerTotal(value);
        setRefresh(false);
    };
    // 控制web页面是否进行刷新
    const [refreshWeb, setRefreshWeb] = useState(false);
    const funcWeb = (value) => {
        setWebTotal(value);
        setRefreshWeb(false);
    };
    const [refreshSys, setRefreshSys] = useState(false);
    const funcSys = (value) => {
        setSysTotal(value);
        setRefresh(true);
        setRefreshSys(false);
    };
    // 导入扫描报告模态框
    const [file1, setFile] = useState({});
    const [visibleReport, setVisibleReport] = useState(false);
    //  tab栏上标数字状态
    const [sysTotal, setSysTotal] = useState(0);
    const [perTotal, setPerTotal] = useState(0);
    const [webTotal, setWebTotal] = useState(0);

    const showModalReport = () => {
        setVisibleReport(true);
    };
    const handleOkReport = () => {
        const formd = new FormData();
        formd.append('reportId', id);
        formd.append('file', file1);
        // getImportScanReport(formd).then((res) => {
        //     if (res.code === 200) {
        //         console.log('导入文件成功');
        //         setFile({});
        //         setRefreshWeb(true);
        //     } else {
        //         console.log('导入文件失败');
        //     }
        // });
        setVisibleReport(false);
    };
    const handleCancelReport = () => {
        setFile('');
        setVisibleReport(false);
    };
    const fileChangeReport = (file) => {
        setFile(file);
    };

    // 新建漏洞
    const [visibleDrawer, setvisibleDrawer] = useState(false);
    const showDrawer = () => {
        setvisibleDrawer(true);
    };

    const onClose = () => {
        setvisibleDrawer(false);
        setRefresh(true);
    };
    //  获取tab栏上的对应表单项数量
    useEffect(() => {
        // getHoleAllData({ limit: 10, offset: 0, param: { reportId: id, sourceType: '历史' } }).then(
        //     (res) => {
        //         if (res.code === 200) {
        //             setSysTotal(res.data.total);
        //         } else {
        //             console.log('获取数据失败');
        //         }
        //     },
        // );
        // getHoleAllData({
        //     limit: 10,
        //     offset: 0,
        //     param: { reportId: id, sourceType: '人工' },
        // }).then((res) => {
        //     if (res.code === 200) {
        //         setPerTotal(res.data.total);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        // getHoleAllData({
        //     limit: 10,
        //     offset: 0,
        //     param: { reportId: id, sourceType: '扫描器' },
        // }).then((res) => {
        //     if (res.code === 200) {
        //         setWebTotal(res.data.total);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, []);
    useEffect(() => {
        if (refresh) {
            // getHoleAllData({
            //     limit: 0,
            //     offset: 10,
            //     param: { reportId: id, sourceType: '人工' },
            // }).then((res) => {
            //     if (res.code === 200) {
            //         setPerTotal(res.data.total);
            //     } else {
            //         console.log('获取数据失败');
            //     }
            // });
        }
    }, [refresh]);

    //  左侧目录栏
    const [treeDetail] = useState([]);
    // 获取数组中的Key
    const [treeKey] = useState([]);
    useEffect(() => {
        // getHoleDictory({}).then((res) => {
        //     if (res.code === 200) {
        //         const arr = [];
        //         for (let i = 0; i < res.data.length; i += 1) {
        //             res.data[i].title = res.data[i].vtype;
        //             res.data[i].key = `0-${i}`;
        //             res.data[i].children = res.data[i].vnameList;
        //             arr.push(res.data[i].key);
        //             for (let j = 0; j < res.data[i].children.length; j += 1) {
        //                 res.data[i].children[j].title = res.data[i].children[j].vname;
        //                 res.data[i].children[j].key = `0-${i}-${j}`;
        //             }
        //         }
        //         setTreeKey(arr);
        //         setTreeDetail(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    }, []);
    return (
        <>
            <ScContent>
                <div style={{ textAlign: 'center' }}>
                    <Title level={3} style={{ display: 'inline' }}>
                        {data.reportName}
                    </Title>
                    <div style={{ float: 'right' }}>
                        {history.location.search.split('&&')[0].split('=')[1] === 'edit' ? (
                            <>
                                <Button
                                    onClick={() => {
                                        history.push('/penetration/list');
                                    }}
                                >
                                    保存
                                </Button>
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                        showModal(id, data.projectId);
                                    }}
                                >
                                    提交报告
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={() => {
                                    history.push('/penetration/list');
                                }}
                            >
                                返回
                            </Button>
                        )}
                    </div>
                </div>
                <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }} />
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <>
                                <span>WEB扫描漏洞列表</span>
                                <Badge count={webTotal} />
                            </>
                        }
                        key="1"
                    >
                        {history.location.search.split('&&')[0].split('=')[1] === 'edit' ? (
                            <Button
                                style={{ marginBottom: '10px' }}
                                onClick={() => {
                                    showModalReport();
                                }}
                            >
                                导入扫描报告
                            </Button>
                        ) : (
                            ''
                        )}
                        <WebTable ids={id} refreshWeb={refreshWeb} funcWeb={(v) => funcWeb(v)} />
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>人工渗透漏洞列表 </span>
                                <Badge count={perTotal} />
                            </>
                        }
                        key="2"
                    >
                        {history.location.search.split('&&')[0].split('=')[1] === 'edit' ? (
                            <Button style={{ marginBottom: '10px' }} onClick={showDrawer}>
                                新建漏洞
                            </Button>
                        ) : (
                            ''
                        )}
                        <PersonTable ids={id} refresh={refresh} func={(v) => func(v)} />
                    </TabPane>
                    <TabPane
                        tab={
                            <>
                                <span>系统历史漏洞列表</span>
                                <Badge count={sysTotal} />
                            </>
                        }
                        key="3"
                    >
                        <SystemTable ids={id} refreshSys={refreshSys} funcSys={(v) => funcSys(v)} />
                    </TabPane>
                </Tabs>
                <Modal
                    title="工作量记录"
                    visible={visible}
                    width="600px"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <SubmitReportModal itemData={itemData} func={handleOk} />
                </Modal>
                <Modal
                    title="导入扫描报告"
                    visible={visibleReport}
                    onOk={handleOkReport}
                    onCancel={handleCancelReport}
                    okText="导入"
                    cancelText="取消"
                >
                    <Form name="filesubmit" initialValues={{ remember: true }}>
                        <Form.Item
                            label="文件上传"
                            rules={[{ required: true, message: '请上传文件!' }]}
                        >
                            <Row>
                                <Col>
                                    <Input placeholder="未选择任何文件" value={file1.name} />
                                </Col>
                                <Col>
                                    <Upload
                                        beforeUpload={(file) => {
                                            fileChangeReport(file);
                                        }}
                                        showUploadList={false}
                                    >
                                        <Button style={{ marginLeft: '10px' }}>选择文件</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
                <Drawer
                    title="新建漏洞"
                    width={1000}
                    onClose={onClose}
                    visible={visibleDrawer}
                    destroyOnClose
                >
                    <NewVulForm treeDetail={treeDetail} treeKey={treeKey} closefunc={onClose} />
                </Drawer>
            </ScContent>
        </>
    );
};
export default PenetrationtestPage;
