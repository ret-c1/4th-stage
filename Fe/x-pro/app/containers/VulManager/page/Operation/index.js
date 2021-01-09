import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Row, Col, Table, Form, Button, Typography, DatePicker, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import FormItem from '@components/FormItem';
import PubModal from '@components/PubModal';
import CmFuzzySearch from '@components/CmFuzzySearch';
// import { getWorkOrderList, postOrder } from '../../api';
import { columns, basicFormconfig } from './config';

const { Text } = Typography;
const { Option } = Select;

const basicParam = {
    limit: 10,
    offset: 0,
    param: {
        type: 1,
        clientName: '',
        ip: '',
        level: '',
        projectName: '',
        vulBugStatus: '',
        vulName: '',
    },
};

const OperationPage = () => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const history = useHistory();
    const { location } = history;
    const roleType = location.pathname === '/vulmanager/list/engineer' ? 2 : 1;
    console.log(roleType);

    // 列表数据
    const [dataSource, setDataSource] = useState();
    const [total, setTotal] = useState(0);
    // 单列表单数据
    const [cloumnData, setCloumnData] = useState({});
    const [loading, setLoading] = useState(false);
    // 查询表单
    const [formdata, setFormdata] = useState({
        ...basicParam,
        param: {
            type: roleType,
        },
    });

    useEffect(() => {
        fetch();
    }, [formdata.param, formdata.offset]);
    console.log(setDataSource, setTotal, setLoading);
    const fetch = () => {
        // getWorkOrderList(formdata).then((res) => {
        //     if (res.code === 200) {
        //         setDataSource(res.data.records);
        //         setTotal(res.data.total);
        //         setLoading(false);
        //     }
        // });
    };

    // 切换页码
    const pageChange = (page, pageSize) => {
        const form1 = {
            ...formdata,
            offset: (page - 1) * pageSize,
        };
        setFormdata(form1);
    };

    // 表单change
    const handleFormChange = (fields) => {
        const form1 = {
            ...formdata,
            param: {
                ...formdata.param,
                ...fields,
            },
        };
        setFormdata(form1);
    };

    const linkTo = (id, status) => {
        let state = null;
        switch (status) {
            case '待分配':
                state = 0;
                break;
            case '待处置':
                state = 1;
                break;
            case '待验证':
                state = 2;
                break;
            case '已修复':
                state = 3;
                break;
            default:
                state = 0;
        }
        history.push(`/vulmanager/detail?id=${id}&type=${roleType}&state=${state}`);
    };

    // text.vulBugStatus
    const action = {
        title: '操作',
        align: 'center',
        render: (text) => (
            <>
                {text.vulBugStatus === '待分配' && roleType === 1 ? (
                    <Button
                        type="link"
                        onClick={() => {
                            setIsplural(false);
                            setCloumnData({ ...text });
                            handleModelOk();
                        }}
                    >
                        分配处置人
                    </Button>
                ) : null}
                {text.vulBugStatus !== '待分配' && roleType === 1 ? (
                    <Button
                        type="link"
                        onClick={() => {
                            linkTo(text.id, text.vulBugStatus);
                        }}
                    >
                        查看
                    </Button>
                ) : null}
                {text.vulBugStatus !== '已修复' && roleType === 2 ? (
                    <Button
                        type="link"
                        onClick={() => {
                            linkTo(text.id, text.vulBugStatus);
                        }}
                    >
                        处置
                    </Button>
                ) : null}
                {text.vulBugStatus === '已修复' && roleType === 2 ? (
                    <Button
                        type="link"
                        onClick={() => {
                            linkTo(text.id, text.vulBugStatus);
                        }}
                    >
                        查看
                    </Button>
                ) : null}
            </>
        ),
    };

    // 设置状态
    const [visible, setVisible] = useState(false);
    const handleModelOk = () => {
        setVisible(!visible); // 显示model
    };
    const handleModelCancel = () => {
        setChecked([]); // 清空选中状态
        setVisible(!visible); // 关闭model
    };

    // 处置人 ids
    const [checked, setChecked] = useState([]);
    // 分配多人状态
    const [isplural, setIsplural] = useState(false);
    // 分配处置人
    const handleFinish = (fieldsValue) => {
        const id = cloumnData.id ? [cloumnData.id] : checked;
        const forms = {
            ...fieldsValue,
            ids: [...id],
            wishFinishTime: fieldsValue.wishFinishTime.format('YYYY-MM-DD'),
        };
        console.log(forms);
        // postOrder(forms).then((res) => {
        //     if (res.code === 200) {
        //         handleModelCancel();
        //         pubModalTips('success', '提示', '已成功分配', 3, () => {
        //             fetch();
        //         });
        //     }
        // });
    };

    return (
        <Card style={{ margin: 30 }}>
            <Form
                form={form}
                style={{ marginBottom: '16px' }}
                onValuesChange={(fields) => {
                    handleFormChange(fields);
                }}
            >
                <Row gutter={20}>
                    {basicFormconfig.map((item) => (
                        <Col span={6} key={item.label}>
                            <FormItem
                                key={item.label}
                                label={item.label}
                                name={item.name}
                                type={item.type}
                                options={item.options}
                                placeholder={item.placeholder}
                                rules={item.rules}
                                labelCol={item.labelCol}
                                wrapperCol={item.wrapperCol}
                            />
                        </Col>
                    ))}
                    <Col span={8}>
                        <Form.Item style={{ marginLeft: 'auto' }}>
                            <Button
                                style={{ marginLeft: '8px' }}
                                onClick={() => {
                                    form.resetFields();
                                    setFormdata({ ...basicParam });
                                }}
                            >
                                重置
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {roleType === 1 ? (
                <Row style={{ marginBottom: 20 }}>
                    <Button
                        onClick={() => {
                            setIsplural(true);
                            handleModelOk();
                        }}
                    >
                        分配处置人
                    </Button>
                </Row>
            ) : null}
            <Table
                size="small"
                loading={loading}
                dataSource={dataSource}
                columns={columns.concat(action)}
                rowKey={(record) => record.id}
                pagination={{
                    defaultCurrent: 1,
                    total,
                    onChange: pageChange,
                }}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: checked,
                    onChange: (selectedRowKeys) => {
                        setChecked(selectedRowKeys);
                    },
                    getCheckboxProps: (record) => ({
                        disabled: record.vulBugStatus !== '待分配',
                    }),
                }}
            />
            <PubModal
                title="分配处置人"
                visible={visible}
                onOk={handleModelOk}
                onCancel={handleModelCancel}
                footer={null}
            >
                <Form form={form2} onFinish={handleFinish}>
                    <Row gutter={20}>
                        {!isplural ? (
                            <>
                                <Col span={12}>
                                    <Form.Item label="漏洞名称">
                                        <Text>{cloumnData.vulName}</Text>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="客户名称">
                                        <Text>{cloumnData.clientName}</Text>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="项目名称">
                                        <Text>{cloumnData.projectName}</Text>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="漏洞处置状态">
                                        <Text>{cloumnData.vulBugStatus}</Text>
                                    </Form.Item>
                                </Col>
                            </>
                        ) : null}
                        <Col span={12}>
                            <Form.Item
                                label="期望修复日期"
                                name="wishFinishTime"
                                rules={[{ required: true, message: '请填写修复日期!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="漏洞处置人"
                                name="userId"
                                rules={[{ required: true, message: '请填写处置人!' }]}
                            >
                                <CmFuzzySearch name="userId" form={form2} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="通知方式"
                                name="notify"
                                rules={[{ required: true, message: '请填写通知方式!' }]}
                            >
                                <Select style={{ width: '100%' }}>
                                    <Option value="1">短信</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Form.Item>
                            <Button style={{ marginRight: 10 }} onClick={handleModelCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </PubModal>
        </Card>
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

export default compose(withConnect, memo)(OperationPage);
