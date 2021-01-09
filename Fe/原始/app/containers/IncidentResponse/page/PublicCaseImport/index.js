import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { Divider, Form, Row, Col, Input, Button, Select, DatePicker, message, Modal } from 'antd';
import { ShrinkOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import debounce from 'lodash.debounce';
import { ScContent, ScBottom } from '../styled';
import { getAddCase, getCaseDetail, getDepartList } from './api';
import ImportReportComponent from './ImportReport';
import TroubleshootComponent from './Troubleshoot';
import { editCase } from '../api';

const { Option } = Select;
const { TextArea } = Input;

const cleanID = (res) => {
    const arr = [];
    res.forEach((list, idx) => {
        arr.push({
            ...list,
        });
        delete arr[idx].id;
        list.data.forEach((item, i) => {
            delete arr[idx].data[i].id;
        });
    });

    return arr;
};

const PublicCaseImportPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { location } = history;
    const [source] = useState(`${location.state.source}`);
    const [type] = useState(location.state.type);
    const [id] = useState(location.state.id);
    const [isOpen, setIsOpen] = useState({
        card1: true,
        card2: true,
        card3: true,
        card4: true,
        card5: true,
    });

    const [descriptionData, setDescriptionData] = useState({ reportUrl: '' });
    useEffect(() => {
        if ((type === 'edit' || type === 'mangerAssess') && id) {
            getCaseDetail({ id: parseInt(id, 10), sourceType: 0 }).then((res) => {
                setDescriptionData({ ...res.data });
                form.setFieldsValue({
                    ...res.data,
                    happenTime: res.data.happenTime ? moment(res.data.happenTime) : null, // 日期类型需要转换
                    discoverTime: res.data.discoverTime ? moment(res.data.discoverTime) : null, // 日期类型需要转换
                });
            });
        }
    }, []);
    const shrinkFunc = (val) => {
        setIsOpen({
            ...isOpen,
            [`card${val}`]: !isOpen[`card${val}`],
        });
    };
    const [departList, setDepartList] = useState([]);
    const handleInputChange = (e) => {
        getDepartList({
            parentId: 1201,
            name: e,
        }).then((res) => {
            if (res.code === 200) {
                setDepartList(res.data);
            }
        });
    };
    const [isShowConfirm, changeIsShowConfirm] = useState(false);
    const [modalValue, setModalValue] = useState({});
    const [pushDepart, setPushDepart] = useState([]);

    const onOk = debounce(() => {
        getAddCase({ ...modalValue, departIds: pushDepart }).then((res) => {
            if (res.code === 200) {
                message.success('提交成功');
                history.push({
                    pathname: '/incident/publiccase/import/done',
                    state: {
                        id: res.data.id,
                        source,
                    },
                });
            }
        });
    }, 1000);
    const handleFormFinish = debounce((value) => {
        const params = {
            ...value,
            happenTime: moment(value.happenTime).format('x'),
            discoverTime: moment(value.discoverTime).format('x'),
            checkLists: value.checkLists ? cleanID(value.checkLists) : null,
        };
        if (type === 'edit') {
            params.id = id;
            params.source = source;
            editCase(params).then((res) => {
                if (res.code === 200) {
                    message.success('编辑成功', () => {
                        history.push({
                            pathname: '/incident/publiccase/detail',
                            state: {
                                id,
                                source,
                            },
                        });
                    });
                }
            });
        } else {
            setModalValue(params);
            changeIsShowConfirm(true);
        }
    }, 1000);

    return (
        <>
            <Form
                name="basic"
                form={form}
                wrapperCol={{ span: 16 }}
                labelCol={{ span: 8 }}
                onFinish={handleFormFinish}
                // onValuesChange={(fields) => {
                //     handleFormChange(fields);
                // }}
            >
                <ScContent>
                    <Row>
                        <Col span={4}>
                            <h3 style={{ paddingLeft: '50px' }}>应急事件信息</h3>
                        </Col>
                        <Col span={20} style={{ textAlign: 'right', paddingRight: '40px' }}>
                            <ShrinkOutlined onClick={() => shrinkFunc(1)} />
                        </Col>
                    </Row>
                    <Divider />
                    {isOpen.card1 ? (
                        <>
                            <Row>
                                <Col span={10}>
                                    <Form.Item
                                        label="事件关键字"
                                        name="keyword"
                                        rules={[{ required: true, message: '请选择!' }]}
                                    >
                                        <Select placeholder="请选择">
                                            <Option value="暴力破解">暴力破解</Option>
                                            <Option value="蠕虫病毒">蠕虫病毒</Option>
                                            <Option value="挖矿病毒">挖矿病毒</Option>
                                            <Option value="网页篡改">网页篡改</Option>
                                            <Option value="勒索病毒">勒索病毒</Option>
                                            <Option value="远程控制">远程控制</Option>
                                            <Option value="钓鱼邮件">钓鱼邮件</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="事件类型" name="type">
                                        <Select placeholder="请选择">
                                            <Option value="有害程序事件">有害程序事件</Option>
                                            <Option value="网络攻击事件">网络攻击事件</Option>
                                            <Option value="信息破坏事件">信息破坏事件</Option>
                                            <Option value="信息内容安全事件">
                                                信息内容安全事件
                                            </Option>
                                            <Option value="设备设施故障">设备设施故障</Option>
                                            <Option value="灾害性事件">灾害性事件</Option>
                                            <Option value="其他事件">其他事件</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="事件名称" name="name">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="事件级别" name="level">
                                        <Select placeholder="请选择">
                                            <Option value="一级">一级</Option>
                                            <Option value="二级">二级</Option>
                                            <Option value="三级">三级</Option>
                                            <Option value="四级">四级</Option>
                                            <Option value="五级">五级</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="事件紧急程度" name="urgency">
                                        <Select placeholder="请选择">
                                            <Option value="高">高</Option>
                                            <Option value="中">中</Option>
                                            <Option value="低">低</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '30px' }}>
                                <Col span={10}>
                                    <Form.Item
                                        label="事件发生时间"
                                        name="happenTime"
                                        rules={[{ required: true, message: '请输入!' }]}
                                    >
                                        <DatePicker
                                            showTime
                                            style={{ width: '100%' }}
                                            placeholder="请输入时间"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="事件发现时间" name="discoverTime">
                                        <DatePicker
                                            showTime
                                            style={{ width: '100%' }}
                                            placeholder="请输入时间"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="来源IP" name="targetIp">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="目的IP" name="aimIp">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="攻击来源" name="attack">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="目的来源" name="aimSecurityDomain">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item label="来源所属业务系统" name="IntranetSystem">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item label="目的所属业务系统" name="InternetSystem">
                                        <Input placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={20}>
                                    <Form.Item
                                        label="事件描述"
                                        name="description"
                                        wrapperCol={{ span: 20 }}
                                        labelCol={{ span: 4 }}
                                    >
                                        <TextArea rows={4} placeholder="请输入" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : null}
                </ScContent>
                {source === '2' ? (
                    <ImportReportComponent form={form} reportUrl={descriptionData.reportUrl} />
                ) : null}
                {source !== '2' ? <TroubleshootComponent form={form} /> : null}
                <ScBottom>
                    {type === 'add' ? (
                        <>
                            <Button
                                htmlType="button"
                                onClick={() => {
                                    form.resetFields();
                                    history.go(-1);
                                }}
                            >
                                取消
                            </Button>
                            <Button type="primary" style={{ marginLeft: '10px' }} htmlType="submit">
                                导入
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                htmlType="button"
                                onClick={() => {
                                    history.go(-1);
                                }}
                            >
                                取消
                            </Button>
                            <Button type="primary" style={{ marginLeft: '10px' }} htmlType="submit">
                                提交
                            </Button>
                        </>
                    )}
                </ScBottom>
            </Form>
            {isShowConfirm && (
                <Modal
                    title={null}
                    visible={isShowConfirm}
                    onOk={onOk}
                    cancelText="取消"
                    okText="确定"
                    onCancel={() => changeIsShowConfirm(false)}
                >
                    <div style={{ padding: 30 }}>
                        <div style={{ marginLeft: '-38px' }}>
                            <ExclamationCircleOutlined
                                style={{ fontSize: 22, color: 'rgb(250, 173, 20)' }}
                            />
                            <span
                                style={{
                                    marginLeft: 17,
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 16,
                                }}
                            >
                                请确定短信通知范围！
                            </span>
                        </div>
                        请输入需要通知的部门，不输入则不会通知
                        <Select
                            mode="multiple"
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请选择部门"
                            onSearch={handleInputChange}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}
                            onChange={(e) => setPushDepart([...pushDepart, ...e])}
                        >
                            {departList &&
                                departList.length > 0 &&
                                departList.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </Modal>
            )}
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

export default compose(withConnect, memo)(PublicCaseImportPage);
