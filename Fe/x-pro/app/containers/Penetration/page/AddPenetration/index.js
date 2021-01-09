import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Switch,
    Button,
    Row,
    Col,
    Drawer,
    Divider,
    Tree,
    // message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScContent } from '../styled';
import WebApplicationDetailDrawer from '../../components/WebApplicationDetailDrawer';
// import {
//     getItem,
//     gethHoleList,
//     getWebList,
//     getWebDetail,
//     getHoleDictory,
//     getSubmitTable,
// } from '../api';

const { Option } = Select;

const PenetrationtestPage = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { rxInfo } = props;

    // 项目名称列表状态
    const [itemList] = useState([]);
    // 活动名称列表状态
    const [actionList] = useState([]);
    // 漏洞分类状态
    const [holeList] = useState([]);
    // 已备案按钮控制状态
    const [webList] = useState([]);
    //  应用信息详情
    const [webDetail] = useState([]);
    //  抽屉中树形结构列表数据
    const [treeDetail] = useState([]);
    // 获取数组中的Key
    const [treeKey] = useState([]);
    // 获取计划ID
    const [planId] = useState(0);
    console.log(planId);
    //  漏洞分类是否
    const [yesNo] = useState(true);
    // const [hisYesNo, setHisYesNo] = useState(0);

    const [report, setReport] = useState('');
    const [reportLast, setReportLast] = useState('');
    const reportName = `${report}-${reportLast}系统-渗透测试报告`;
    // console.log(history.location.search.split('&&')[0].split('=')[1]);
    const id = history.location.search.split('&&')[0].split('=')[1];
    // console.log(Location);
    // 项目名称列表改变
    const itemChange = (value) => {
        setReport(value);
        // getItem({ condition: value, type: 60, planId: '' }).then((res) => {
        //     if (res.code === 200) {
        //         setActionList(res.data);
        //         // 获取web列表
        //         getWebList({ applicationName: '', projectId: res.data[0].id }).then((res1) => {
        //             if (res1.code === 200) {
        //                 setWebList(res1.data);
        //                 console.log(res1.data);
        //             } else {
        //                 console.log('获取数据失败');
        //             }
        //         });
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };
    const actionChange = (value, option) => {
        console.log(value, option);
        // setPlanId(option.key);
    };
    const yesnoFunction = (checked) => {
        console.log(checked);
        // setYesNo(checked);
    };
    const hisyesnoFunction = (checked) => {
        if (checked) {
            // setHisYesNo(1);
        } else {
            // setHisYesNo(0);
        }
    };
    //  web应用名称列表改变
    const webItemChange = (value, option) => {
        setReportLast(option.children);
        console.log(value, option);
        // getWebDetail({ id: option.key }).then((res) => {
        //     if (res.code === 200) {
        //         res.data.vulnerabilityClassification = '通用';
        //         setWebDetail(res.data);
        //         console.log(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
    };
    //  表单提交
    const handleFinish = () => {
        const requestParam = { ...form.getFieldsValue(), reportName };
        console.log(requestParam);
        history.push('/penetration/detail?type=edit&&id=1');
        if (id) {
            // getSubmitTable({
            //     planId: id,
            //     putOn: 1,
            //     historyTracking: hisYesNo,
            //     domainId: webDetail.id,
            //     ...requestParam,
            // }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('保存成功！');
            //         history.push(`/penetration/detail?type=edit&&id=${res.data}`);
            //     } else {
            //         console.log('获取数据失败');
            //     }
            // });
        } else {
            // getSubmitTable({
            //     planId,
            //     putOn: 1,
            //     historyTracking: hisYesNo,
            //     domainId: webDetail.id,
            //     ...requestParam,
            // }).then((res) => {
            //     if (res.code === 200) {
            //         message.success('保存成功！');
            //         history.push(`/penetration/detail?type=edit&&id=${res.data}`);
            //     } else {
            //         console.log('获取数据失败');
            //     }
            // });
        }
    };
    //  抽屉
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
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
    };

    const onClose = () => {
        setVisible(false);
    };
    // 历史详情抽屉
    const [visibleHis, setVisibleHis] = useState(false);
    const showDrawerHis = () => {
        setVisibleHis(true);
    };

    const onCloseHis = () => {
        setVisibleHis(false);
    };
    // 工作台进入项目后初始数据
    const [itemName] = useState([]);
    const [activeName] = useState([]);

    useEffect(() => {
        // getItem({ condition: '', type: 60, planId: '' }).then((res) => {
        //     if (res.code === 200) {
        //         setItemList(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        // gethHoleList().then((res) => {
        //     if (res.code === 200) {
        //         setHoleList(res.data);
        //     } else {
        //         console.log('获取数据失败');
        //     }
        // });
        if (id) {
            // getItem({ condition: '', type: 60, planId: id }).then((res) => {
            //     if (res.code === 200) {
            //         setItemName(res.data);
            //         setReport(res.data[0].projectName);
            //         setActiveName(res.data[0].plans[0]);
            //         setReportLast(res.data[0].plans[0].taskName);
            //         getWebList({ applicationName: '', projectId: res.data[0].id }).then((res1) => {
            //             if (res1.code === 200) {
            //                 setWebList(res1.data);
            //             } else {
            //                 console.log('获取数据失败');
            //             }
            //         });
            //     } else {
            //         console.log('获取数据失败');
            //     }
            // });
        }
    }, []);
    useEffect(() => {
        if (actionList) {
            form.setFieldsValue(actionList[0]);
            form.setFieldsValue(webDetail);
        }
        if (itemName) {
            form.setFieldsValue(itemName[0]);
        }
        if (activeName) {
            form.setFieldsValue(activeName);
        }
    }, [actionList, webDetail, itemName, activeName]);

    return (
        <>
            <ScContent>
                <h3>项目信息</h3>
                <Form
                    labelCol={{ span: '2' }}
                    wrapperCol={{ span: '10' }}
                    name="basic"
                    form={form}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label="项目名称："
                        name="projectName"
                        rules={[
                            {
                                // required: true,
                                message: '请选择项目!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="项目名称(合同编号)"
                            onChange={itemChange}
                            disabled={!!id}
                        >
                            {itemList.map((item) => (
                                <Option key={item.id} value={item.projectName}>
                                    {item.projectName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="合同编号：" name="contractNo">
                        <Input placeholder="自动匹配" disabled />
                    </Form.Item>
                    <Form.Item label="客户名称：" name="clientName">
                        <Input placeholder="自动匹配" disabled />
                    </Form.Item>
                    <Form.Item
                        label="活动："
                        name="taskName"
                        rules={[
                            {
                                // required: true,
                                message: '请选择计划!',
                            },
                        ]}
                    >
                        <Select placeholder="自动匹配" onChange={actionChange} disabled={!!id}>
                            {actionList.map((item) =>
                                item.plans.map((item1) => (
                                    <Option key={item1.id} value={item1.taskName}>
                                        {item1.taskName}
                                    </Option>
                                )),
                            )}
                        </Select>
                    </Form.Item>
                    <h3>应用信息</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <span>已备案web应用：</span>
                        <Switch
                            checkedChildren="是"
                            unCheckedChildren="否"
                            defaultChecked
                            onChange={yesnoFunction}
                        />
                    </div>
                    {yesNo ? (
                        <>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="web应用名称："
                                        name="webApplicationName"
                                        labelCol={{ span: '4' }}
                                        wrapperCol={{ span: '20' }}
                                    >
                                        <Select placeholder="web应用名称" onChange={webItemChange}>
                                            {webList.map((item) => (
                                                <Option key={item.id} value={item.applicationName}>
                                                    {item.applicationName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {webDetail.historyId && webDetail.historyId === true ? (
                                    <>
                                        <Col>
                                            <Button
                                                onClick={showDrawerHis}
                                                style={{ marginRight: '5px' }}
                                            >
                                                详情
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Switch
                                                style={{ marginTop: '5px' }}
                                                checkedChildren="是"
                                                unCheckedChildren="否"
                                                onChange={hisyesnoFunction}
                                            />
                                            <span>历史漏洞追踪</span>
                                        </Col>
                                    </>
                                ) : null}
                            </Row>
                            <Form.Item label="开发商：" name="developerAllName">
                                <Input placeholder="自动匹配" disabled />
                            </Form.Item>
                            <Form.Item label="web容器名称：" name="domainContainer">
                                <Input placeholder="请输入应用名称" disabled />
                            </Form.Item>
                            <Form.Item label="web容器版本：" name="domainContainerVersion">
                                <Input placeholder="请输入应用版本" disabled />
                            </Form.Item>
                            <Form.Item
                                label="域名："
                                name="domain"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: '请输入域名!',
                                //     },
                                // ]}
                            >
                                <Input placeholder="自动匹配" disabled />
                            </Form.Item>
                            <Form.Item label="服务器网段：" name="serviceSegment">
                                <Input placeholder="自动匹配" disabled />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                label="web应用名称："
                                name="webApplicationName"
                                rules={[
                                    {
                                        // required: true,
                                        message: '请输入web应用名称!',
                                    },
                                ]}
                            >
                                <Input placeholder="web应用名称" />
                            </Form.Item>
                            <Form.Item label="开发商：" name="developerAllName">
                                <Input placeholder="自动匹配" />
                            </Form.Item>
                            <Form.Item label="web容器名称：" name="domainContainer">
                                <Input placeholder="请输入应用名称" />
                            </Form.Item>
                            <Form.Item label="web容器版本：" name="domainContainerVersion">
                                <Input placeholder="请输入应用版本" />
                            </Form.Item>
                            <Form.Item
                                label="域名："
                                name="domain"
                                rules={[
                                    {
                                        // required: true,
                                        message: '请输入你的域名!',
                                    },
                                ]}
                            >
                                <Input placeholder="自动匹配" />
                            </Form.Item>
                            <Form.Item label="服务器网段：" name="serviceSegment">
                                <Input placeholder="自动匹配" />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item
                        label="测试IP："
                        name="testIp"
                        rules={[
                            {
                                // required: true,
                                message: '请输入测试IP!',
                            },
                        ]}
                    >
                        <Input placeholder="请输入测试IP" />
                    </Form.Item>
                    <Form.Item
                        label="目标IP："
                        name="targetIp"
                        rules={[
                            {
                                // required: true,
                                message: '请输入目标IP!',
                            },
                        ]}
                    >
                        <Input placeholder="请输入目标IP" />
                    </Form.Item>
                    <Form.Item label="测试账号：" name="testAccount">
                        <Input placeholder="账号1，密码1，角色1；账号2，密码2，角色2；" />
                    </Form.Item>
                    <h3>报告信息</h3>
                    <Form.Item label="报告名称：">
                        <Input placeholder="请输入报告名称" disabled value={reportName} />
                    </Form.Item>
                    <Form.Item label="报告作者：">
                        <Input placeholder="自动匹配" value={rxInfo.name} disabled />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="漏洞分类："
                                name="vulnerabilityClassification"
                                labelCol={{ span: '4' }}
                                wrapperCol={{ span: '20' }}
                            >
                                <Select>
                                    {holeList.map((item) => (
                                        <Option key={item.value} value={item.value}>
                                            {item.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button onClick={showDrawer}>详情</Button>
                        </Col>
                    </Row>
                    <Form.Item style={{ marginLeft: '50px' }}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                history.push('/penetration/list');
                            }}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Form>
                <Drawer
                    width={300}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Divider />
                    <Tree treeData={treeDetail} defaultExpandAll expandedKeys={treeKey} />
                </Drawer>
                <Drawer
                    title="WEB应用详情"
                    width={720}
                    onClose={onCloseHis}
                    visible={visibleHis}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <WebApplicationDetailDrawer id={webDetail.id} />
                </Drawer>
            </ScContent>
        </>
    );
};
PenetrationtestPage.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(PenetrationtestPage);
