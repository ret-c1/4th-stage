import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Table, Button, Tag, Space, Divider, Row, Col, Select, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import AddSystemPage from './addSystem';
import SystemDetail from './systemDetail';
import SystemRating from './systemRating';
import SystemDelete from './systemDelete';
import SystemImport from './systemImport';
// import { getBusiness } from './api';

const { Column } = Table;
const { Option } = Select;

// let count = 0;

const scope = ['全国', '跨省', '全省', '跨地', '地（市、区）内', '其他'];
const coverage = ['局域网', '城域网', '广域网', '其他'];
const rank = ['第一级', '第二级', '第三级', '第四级', '第五级'];

const DescriptionSystemPage = () => {
    const colors = ['purple', 'red', 'gold', 'blue', 'green'];
    let queryCoverage;
    let queryService;
    let querySecurity;
    const [data] = useState([]);
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();
    const [params, setParams] = useState({
        offset: 0,
        limit: 90,
        param: {
            projectId: 551,
        },
    });
    const [status, setStatus] = useState({
        addVisible: false,
        addKey: 0,
        detailVisible: false,
        detailKey: 1,
        detailId: 0,
        ratingVisible: false,
        ratingKey: 2,
        deleteVisible: false,
        deleteKey: 3,
        deleteId: 0,
        importVisible: false,
        importKey: 4,
    });

    // 获取业务系统数据
    const fetchBusiness = () => {
        // getBusiness(params).then((res) => {
        //     if (res.code === 200) {
        //         /* console.log(res.data.records); */
        //         const temp = res.data.records.map((record) => {
        //             count += 1;
        //             const obj = {
        //                 ...record,
        //                 no: count,
        //             };
        //             return obj;
        //         });
        //         setData(temp);
        //     }
        // });
    };

    useEffect(() => {
        fetchBusiness();
    }, [params]);

    // 导出业务系统
    const outputSystem = () => {
        const a = document.createElement('a');
        a.setAttribute('href', `/api/business/system/export?projectId=551`);
        a.setAttribute('download', 'fileNameS');
        /* a.setAttribute('href', res.data.outputUrl); */
        /* a.setAttribute('referrerpolicy', 'origin'); */
        a.click();
        a.remove();
        /* setExportNumber(type === 'part' ? selectedRowKeys.length : total); */
        message.success('业务系统导出成功', 10);
    };

    // 新增业务系统界面相关方法
    const handleClick = () => {
        setStatus({
            ...status,
            addVisible: true,
            addKey: Math.random(),
        });
    };

    const handleOk = () => {
        setStatus({
            ...status,
            addVisible: false,
        });
        setParams({
            ...params,
            limit: 91,
        });
        // count = 0;
    };

    const handleCancel = () => {
        setStatus({
            ...status,
            addVisible: false,
        });
    };

    // 系统详情界面相关方法
    const handleDetailClick = (id) => {
        console.log(id);
        setStatus({
            ...status,
            detailVisible: true,
            detailKey: Math.random(),
            detailId: id,
        });
    };

    const handleDetailCancel = () => {
        setStatus({
            ...status,
            detailVisible: false,
        });
    };

    // 系统定级界面相关方法
    const handleRatingClick = () => {
        setStatus({
            ...status,
            ratingVisible: true,
            ratingKey: Math.random(),
        });
    };

    const handleRatingCancel = () => {
        setStatus({
            ...status,
            ratingVisible: false,
        });
    };

    // 系统删除界面相关方法
    const handleDeleteClick = (id) => {
        setStatus({
            ...status,
            deleteVisible: true,
            deleteKey: Math.random(),
            deleteId: id,
        });
    };

    const handleDeleteCancel = () => {
        setStatus({
            ...status,
            deleteVisible: false,
        });
    };

    const handleDeleteOk = () => {
        setStatus({
            ...status,
            deleteVisible: false,
        });
        setParams({
            ...params,
            limit: 92,
        });
        // count = 0;
        message.success('删除成功', 10);
    };

    // 导入相关方法
    const handleImportClick = () => {
        setStatus({
            ...status,
            importVisible: true,
            importKey: Math.random(),
        });
    };

    const handleImportCancel = () => {
        setStatus({
            ...status,
            importVisible: false,
        });
        // count = 0;
    };

    const coverageSelect = (v) => {
        queryCoverage = v;
    };

    const serviceSelect = (v) => {
        queryService = v;
    };

    const securitySelect = (v) => {
        querySecurity = v;
    };

    const queryBusiness = () => {
        setParams({
            ...params,
            param: {
                projectId: 551,
                coverageArea: queryCoverage,
                scopeOfServices: queryService,
                securityLevel: querySecurity,
            },
        });
        // count = 0;
    };
    const resetBusiness = () => {
        setParams({
            ...params,
            param: {
                projectId: 551,
            },
        });
    };
    return (
        <>
            <div style={{ background: '#FFF', padding: '24px 32px 0 32px' }}>
                <AddSystemPage
                    key={status.addKey}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    visible={status.addVisible}
                />
                <SystemDetail
                    key={status.detailKey}
                    onCancel={handleDetailCancel}
                    visible={status.detailVisible}
                    id={status.detailId}
                />
                <SystemRating
                    key={status.ratingKey}
                    onCancel={handleRatingCancel}
                    visible={status.ratingVisible}
                />
                <SystemDelete
                    key={status.deleteKey}
                    onOk={handleDeleteOk}
                    onCancel={handleDeleteCancel}
                    visible={status.deleteVisible}
                    id={status.deleteId}
                />
                <SystemImport
                    key={status.importKey}
                    onCancel={handleImportCancel}
                    visible={status.importVisible}
                />
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    onFinish={queryBusiness}
                >
                    <Row gutter={50}>
                        <Col span={8}>
                            <Form.Item label="业务系统名称" name="name">
                                <Select placeholder="请选择" style={{ width: '224px' }} allowClear>
                                    <Option value="OA系统">OA系统</Option>
                                    <Option value="CRM">CRM</Option>
                                    <Option value="BOSS">BOSS</Option>
                                    <Option value="4A">4A</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="覆盖范围" name="cover">
                                <Select
                                    placeholder="请选择"
                                    style={{ width: '224px' }}
                                    allowClear
                                    onSelect={coverageSelect}
                                >
                                    <Option value={1}>局域网</Option>
                                    <Option value={2}>城域网</Option>
                                    <Option value={3}>广域网</Option>
                                    <Option value={4}>其他</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        {expand ? (
                            <>
                                <Col span={8}>
                                    <Form.Item label="服务范围" name="service">
                                        <Select
                                            placeholder="请选择"
                                            style={{ width: '224px' }}
                                            allowClear
                                            onSelect={serviceSelect}
                                        >
                                            <Option value={1}>全国</Option>
                                            <Option value={2}>跨省</Option>
                                            <Option value={3}>全省</Option>
                                            <Option value={4}>跨地</Option>
                                            <Option value={5}>地（市、区）内</Option>
                                            <Option value={6}>其他</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="系统消息安全等级" name="security">
                                        <Select
                                            placeholder="请选择"
                                            style={{ width: '224px' }}
                                            allowClear
                                            onSelect={securitySelect}
                                        >
                                            <Select.Option value={1}>第一级</Select.Option>
                                            <Select.Option value={2}>第二级</Select.Option>
                                            <Select.Option value={3}>第三级</Select.Option>
                                            <Select.Option value={4}>第四级</Select.Option>
                                            <Select.Option value={5}>第五级</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </>
                        ) : (
                            <></>
                        )}
                        <Col span={expand ? 16 : 8}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginRight: '10px' }}
                            >
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    resetBusiness();
                                }}
                            >
                                重置
                            </Button>
                            <Button
                                type="link"
                                style={{ width: '46px' }}
                                onClick={() => setExpand(!expand)}
                            >
                                {expand ? (
                                    <>
                                        <UpOutlined />
                                        收起
                                    </>
                                ) : (
                                    <>
                                        <DownOutlined />
                                        展开
                                    </>
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Divider />
                <div style={{ marginTop: '15px' }}>
                    <Button key="1" onClick={outputSystem}>
                        导出全部业务系统
                    </Button>
                    <Button type="primary" key="2" style={{ float: 'right' }} onClick={handleClick}>
                        新增业务系统
                    </Button>
                    <Button
                        key="3"
                        style={{ float: 'right', marginRight: '9px' }}
                        onClick={handleImportClick}
                    >
                        导入业务系统
                    </Button>
                </div>
                <Table size="small" dataSource={data} style={{ marginTop: '26px' }} rowKey="id">
                    <Column title="序号" dataIndex="no" key="no" />
                    <Column title="业务系统名称" dataIndex="name" key="name" />
                    <Column title="业务描述" dataIndex="description" key="description" />
                    <Column
                        title="覆盖范围"
                        dataIndex="coverageArea"
                        key="coverageArea"
                        render={(text) => {
                            const num = text - 1;
                            return <div key={text}>{coverage[num]}</div>;
                        }}
                    />
                    <Column
                        title="服务范围"
                        dataIndex="scopeOfServices"
                        key="scopeOfServices"
                        render={(text) => {
                            const num = text - 1;
                            return <div key={text}>{scope[num]}</div>;
                        }}
                    />
                    <Column
                        title="系统消息安全等级"
                        dataIndex="securityLevel"
                        key="securityLevel"
                        render={(text, record, index) => {
                            const cl = colors[index % 5];
                            const num = text - 1;
                            return (
                                <Tag color={cl} key={text} style={{ borderRadius: '4px' }}>
                                    {rank[num]}
                                </Tag>
                            );
                        }}
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Space size="small">
                                <Button
                                    key="1"
                                    type="link"
                                    style={{ paddingLeft: '0' }}
                                    onClick={handleRatingClick}
                                >
                                    系统定级
                                </Button>
                                <Button
                                    key="2"
                                    type="link"
                                    onClick={() => handleDetailClick(record.id)}
                                >
                                    详情
                                </Button>
                                <Button
                                    type="link"
                                    key="3"
                                    onClick={() => handleDeleteClick(record.id)}
                                >
                                    删除
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(DescriptionSystemPage);
