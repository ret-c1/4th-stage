import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Table, Button, Col, Modal, Form, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import { ScItWrapper } from '../styled';
// import useTableParam from '../../hooks/useTableParam';
// import { getEmergencyUsers, deleteMember, getEmployee, addEmergencyMember } from '../api';
// import useEmployeeRemoteSelect from '../../hooks/useEmployeeRemoteSelect';

const { confirm } = Modal;
const { Option } = Select;

const ItTitle = styled.span`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    font-weight: bold;
    width: 100%;
`;

const columns = [
    {
        title: '角色',
        dataIndex: 'type',
    },
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '电话',
        dataIndex: 'phone',
    },
];

const MemberList = () => {
    const { id } = searchParams();
    console.log(id);

    // 查询
    // const [searchFlag] = useState(false);
    // const fetchEmergencyUsers = useCallback((params) => getEmergencyUsers(params), [searchFlag]);
    // 获取列表数据
    // const tableParam = useTableParam(fetchEmergencyUsers, { param: { id } });
    // const { dataSource, loading, pagination } = tableParam;
    // const { onChange: onPageChange } = pagination;
    const dataSource = [];
    const loading = false;

    // 删除成员
    const handleDelete = () => {
        confirm({
            title: '删除成员',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要删除此成员吗？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // deleteMember(record.id).then((res) => {
                //     if (res.code === 200) {
                //         message.success('删除成功');
                //         // onPageChange(1, 10);
                //         setSearchFlag(!searchFlag);
                //     } else {
                //         message.error(res.message);
                //     }
                // });
            },
        });
    };

    // 添加成员
    const [addVisible, setAddvisible] = useState(false);
    const handleCancel = () => setAddvisible(false);

    // 点击添加
    const [form] = Form.useForm();
    const addMember = () => {
        form.validateFields().then((allValue) => {
            // const requestParam = {
            //     ...allValue,
            //     newEmergencyId: id,
            // };
            console.log(allValue);
            // addEmergencyMember(requestParam).then((res) => {
            //     if (res.code === 200) {
            //         message.success('添加成功');
            //         handleCancel();
            //         // onPageChange(1, 10);
            //         setSearchFlag(!searchFlag);
            //     } else {
            //         message.error(res.message);
            //     }
            // });
        });
    };

    // 远程搜索获取成员
    // const remoteSelectParam = useEmployeeRemoteSelect(getEmployee);
    // const { remoteData, handleSearch } = remoteSelectParam;
    const options = [].map((d) => <Option key={d.value}>{d.text}</Option>);

    // 表格操作项
    const action = {
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
            <div>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        handleDelete(record);
                    }}
                >
                    删除
                </Button>
            </div>
        ),
    };

    return (
        <ScItWrapper>
            <Row style={{ marginBottom: '16px' }}>
                <Col>
                    <ItTitle>成员列表</ItTitle>
                </Col>
                <Col style={{ marginLeft: 'auto' }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            setAddvisible(true);
                        }}
                    >
                        添加成员
                    </Button>
                </Col>
            </Row>
            <Table
                size="small"
                dataSource={dataSource}
                columns={columns.concat(action)}
                // pagination={pagination}
                loading={loading}
                rowKey={(record) => record.id}
            />
            <Modal
                visible={addVisible}
                onCancel={handleCancel}
                width={762}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={addMember}>
                        添加
                    </Button>,
                ]}
            >
                <Form
                    wrapperCol={{
                        span: 10,
                    }}
                    labelCol={{ span: 3, offset: 5 }}
                    form={form}
                >
                    <Form.Item
                        name="type"
                        label="角色"
                        rules={[
                            {
                                required: true,
                                message: '请选择添加角色',
                            },
                        ]}
                    >
                        <Select placeholder="请选择">
                            <Option value="驻场服务组长岗" key="驻场服务组长岗">
                                驻场服务组长岗
                            </Option>
                            <Option value="驻场服务执行岗" key="驻场服务执行岗">
                                驻场服务执行岗
                            </Option>
                            <Option
                                value="互联网站远程安全监控组长岗"
                                key="互联网站远程安全监控组长岗"
                            >
                                互联网站远程安全监控组长岗
                            </Option>
                            <Option
                                value="互联网站远程安全监控执行岗"
                                key="互联网站远程安全监控执行岗"
                            >
                                互联网站远程安全监控执行岗
                            </Option>
                            <Option value="网站监控接口人岗" key="网站监控接口人岗">
                                网站监控接口人岗
                            </Option>
                            <Option
                                value="应急响应高级技术支持服务组长岗"
                                key="应急响应高级技术支持服务组长岗"
                            >
                                应急响应高级技术支持服务组长岗
                            </Option>
                            <Option value="应急响应接口人" key="应急响应接口人">
                                应急响应接口人
                            </Option>
                            <Option value="应急响应工程师" key="应急响应工程师">
                                应急响应工程师
                            </Option>
                            <Option value="专家支持岗" key="专家支持岗">
                                专家支持岗
                            </Option>
                            <Option value="总局" key="总局">
                                总局
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="姓名"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: '请选择添加人姓名',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="请选择"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            // onSearch={handleSearch}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </ScItWrapper>
    );
};
export default MemberList;
