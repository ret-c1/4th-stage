import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Drawer,
    Steps,
    Row,
    Col,
    Button,
    Space,
    Form,
    Input,
    Table,
    Alert,
    message,
    Checkbox,
} from 'antd';
import moment from 'moment';
import { MessageType } from '../styled';
// import { getPeinAssets, importPeinAssets } from '../api';
const { Step } = Steps;
// 佩恩资产导入模态框
const AssetsImport = (props) => {
    const [form] = Form.useForm();
    const { id, modalVisibleState } = props;
    // 原始数据
    const [originData] = useState([]);
    // 查询后的数据
    const [filterData, setFilterData] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    // 选中的项目
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 点击多选对应显示已选择的数字
    const [clearNumber, setClearNumber] = useState(0);
    // 选中的通知方式
    const [checkedType, setCheckedType] = useState([]);
    const [param, setParam] = useState({});

    useEffect(() => {
        if (modalVisibleState) {
            // getPeinAssets().then((res) => {
            //     if (res.code === 200) {
            //         setOriginData(res.data);
            //         setFilterData(res.data);
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        }
    }, [modalVisibleState]);

    // 手动查询
    useEffect(() => {
        const filter = originData.filter((item) => {
            const formateTime = moment(item.createTime).format('YYYY-MM-DD hh:mm:ss');
            if (
                (param.name.length > 0 ? item.name.includes(param.name) : true) &&
                (param.createUserRealName.length > 0
                    ? item.createUserRealName.includes(param.createUserRealName)
                    : true) &&
                (param.createTime.length > 0 ? formateTime.includes(param.createTime) : true)
            ) {
                return true;
            }
            return false;
        });
        console.log(filter);
        setFilterData(filter);
    }, [param]);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '项目负责人',
            dataIndex: 'createUserRealName',
            key: 'createUserRealName',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text) => moment(text).format('YYYY/MM/DD hh:mm:ss'),
        },
    ];
    const options = [
        { label: '邮件', value: 1 },
        { label: '短信', value: 2 },
    ];

    // 列表多选对应的对象
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            console.log(selectedKeys);
            if (selectedKeys && selectedKeys.length >= 0) {
                setSelectedRowKeys(selectedKeys);
                setClearNumber(selectedKeys.length);
            }
            setSelectedRowKeys(selectedKeys);
        },
        type: 'radio',
    };
    // 点击查询
    const onFinish = (value) => {
        setParam(value);
    };
    const onMessageTypeChange = (checkedValues) => {
        setCheckedType(checkedValues);
    };
    // 资产导入
    const submit = () => {
        const data = {
            uid: selectedRowKeys[0],
            projectId: id,
            messageTypes: checkedType,
        };
        console.log(data);
        // importPeinAssets(data).then((res) => {
        //     if (res.code === 200) {
        //         message.success(res.message);
        //         getAssetListFunc();
        //         handleCancel();
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    };
    const handleCancel = () => {
        // 重置状态
        setCurrentStep(0);
        setSelectedRowKeys([]);
        setClearNumber(0);
        setCheckedType([]);
        form.resetFields();
        props.setModalVisibleState(false);
    };
    return (
        <>
            <Drawer
                title="佩恩平台资产导入"
                width="1024px"
                visible={props.modalVisibleState}
                onClose={handleCancel}
                destroyOnClose
                footer={
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Space>
                                {currentStep === 0 && (
                                    <>
                                        <p>
                                            已选择：
                                            <span style={{ color: '#1890FF', margin: '0 5px' }}>
                                                {clearNumber}
                                            </span>
                                            个项目
                                        </p>
                                        <Button onClick={handleCancel}>取消</Button>
                                        <Button
                                            onClick={() => {
                                                if (clearNumber === 1) {
                                                    setCurrentStep(1);
                                                } else {
                                                    message.warning('请选择项目');
                                                }
                                            }}
                                            type="primary"
                                        >
                                            导入
                                        </Button>
                                    </>
                                )}
                                {currentStep === 1 && (
                                    <>
                                        <Button onClick={() => setCurrentStep(0)}> 取消</Button>
                                        <Button onClick={submit} type="primary">
                                            确定并返回列表
                                        </Button>
                                    </>
                                )}
                            </Space>
                        </Col>
                    </Row>
                }
            >
                <Row style={{ padding: '20px 5vw' }}>
                    <Steps current={currentStep}>
                        <Step title="选择需导入项目" />
                        <Step title="选择导入结果通知方式" />
                    </Steps>
                </Row>
                {currentStep === 0 && (
                    <>
                        <Form
                            initialValues={{ name: '', createUserRealName: '', createTime: '' }}
                            onFinish={onFinish}
                            form={form}
                        >
                            <Row gutter={40}>
                                <Col span={8}>
                                    <Form.Item label="项目名称" name="name">
                                        <Input placehoder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={5}>
                                    <Form.Item label="项目负责人" name="createUserRealName">
                                        <Input placehoder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="创建时间" name="createTime">
                                        <Input placehoder="请输入" type="date" />
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table
                            size="small"
                            rowKey="uid"
                            dataSource={filterData}
                            columns={columns}
                            rowSelection={rowSelection}
                        />
                    </>
                )}
                {currentStep === 1 && (
                    <>
                        <div style={{ padding: '40px 5vw' }}>
                            <Alert
                                message={
                                    <p>
                                        正在获取资产数据，请等待约10分钟～
                                        <br />
                                        选择通知方式后，您可先关闭此页面，我们会通过以下选择的通知方式给您发送导入结果。
                                    </p>
                                }
                                type="info"
                                showIcon
                            />
                        </div>
                        <div style={{ padding: '50px 8vw' }}>
                            <span>通知方式:</span>
                            <Checkbox defaultChecked disabled>
                                x-security-operation
                            </Checkbox>
                            <MessageType
                                options={options}
                                onChange={onMessageTypeChange}
                                value={checkedType}
                            />
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

AssetsImport.propTypes = {
    modalVisibleState: PropTypes.bool,
    setModalVisibleState: PropTypes.func,
    id: PropTypes.string,
    // getAssetListFunc: PropTypes.func,
};
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(AssetsImport);
