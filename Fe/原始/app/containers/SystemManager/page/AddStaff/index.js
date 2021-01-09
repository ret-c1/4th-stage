import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Card,
    Form,
    Button,
    Select,
    Descriptions,
    Row,
    Col,
    Input,
    Radio,
    Switch,
    Modal,
    Upload,
    Avatar,
    message,
} from 'antd';
import { useHistory } from 'react-router-dom';
import enCryptoJS from '@utils/enCryptoJS';
import NoLook from '@assets/images/nolook.png';
import LookPwd from '@assets/images/lookpwd.png';
import { ScModalSubmit } from '../../style';
import {
    saveDepartUser,
    updateDepartUser,
    getDepartParent,
    getDepartAllPeople,
    getRole,
    getUserDetail,
} from '../../api';
const { Option } = Select;

const AddStaff = (props) => {
    const [formPassword] = Form.useForm();
    const [form] = Form.useForm();
    const history = useHistory();
    const { query, state } = history.location;
    const [isShowModal, changeShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [departChain, setDepartChain] = useState({});
    const [peopleList, setPeopleList] = useState([]);
    const [isLook, changeIsLook] = useState(false);
    const [role, setRole] = useState([]);
    const [isEdit, setIsEdit] = useState(true);
    const [status, changeStatus] = useState(true);
    const [userDetail, setUserDetail] = useState({});

    // 去重
    const distinct = (arr) =>
        arr.sort().reduce((init, current) => {
            if (init.length === 0 || init[init.length - 1].name !== current.name) {
                init.push(current);
            }
            return init;
        }, []);

    useEffect(() => {
        getRole({
            limit: 1000,
            offset: 0,
            param: {},
        }).then((res) => {
            if (res.code === 200) {
                setRole(res.data.records);
            }
        });
        getDepartAllPeople({
            limit: 1000,
            offset: 0,
            param: { departId: state ? state.departId : 1000 },
        }).then((res) => {
            if (res.code === 200) {
                setPeopleList(distinct(res.data.records));
            }
        });
        if (query && query === 'add') {
            getDepartParent({ id: state.departId }).then((res) => {
                if (res.code === 200) {
                    setDepartChain(res.data);
                }
            });
        }
        if (query && query === 'edit') {
            setIsEdit(true);
            getUserDetail({ id: state.id }).then((res) => {
                if (res.code === 200) {
                    setUserDetail(res.data);
                    form.setFieldsValue(res.data);
                }
            });
        }
        return () => {
            form.resetFields();
        };
    }, [state]);

    const onFinish = (values) => {
        const forParams = values;
        if (password) {
            forParams.password = enCryptoJS(password);
        }
        forParams.departId = state && parseInt(state.departId, 10);
        forParams.status = status ? 0 : 1;
        forParams.roleIds = values.roleIds || [];
        delete forParams.departName;
        delete forParams.groupName;

        if (query) {
            if (query && query === 'edit') {
                updateDepartUser({ ...values, id: state && state.id })
                    .then((res) => {
                        if (res.code === 200) {
                            history.push(
                                `/system/staff?departId=${state &&
                                    state.departId}&pageTitle=${state && state.pageTitle}`,
                            );
                        }
                    })
                    .catch((error) => message.error(error.message));
            }
            if (query && query === 'add') {
                saveDepartUser(values)
                    .then((res) => {
                        if (res.code === 200) {
                            history.push(
                                `/system/staff?departId=${state &&
                                    state.departId}&pageTitle=${state && state.pageTitle}`,
                            );
                        }
                    })
                    .catch((error) => message.error(error.message));
            }
        }
    };
    const onFinishPwd = (values) => {
        setPassword(values.password);
        message.success('登录密码设置成功');
        handleCancel();
    };
    const showModal = () => {
        changeShowModal(true);
    };

    const handleCancel = () => {
        changeShowModal(false);
    };

    return (
        <Card style={{ margin: 30 }}>
            <Form
                form={form}
                name="addStaff"
                autoComplete="off"
                onFinish={onFinish}
                labelCol={{ span: 5, offset: 6 }}
                wrapperCol={{ span: 13 }}
            >
                <Descriptions title="账户信息" style={{ marginLeft: 60 }} />
                <Row>
                    <Col span={10}>
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入姓名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="sex" label="性别">
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                                <Radio value="">保密</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item
                            name="phone"
                            label="手机号"
                            rules={[
                                {
                                    required: query && query === 'add' && true,
                                    message: '请输入手机号!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="email" label="邮箱">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item name="roleIds" label="角色">
                            <Select mode="multiple">
                                {role.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="状态">
                            <Switch
                                onChange={(checked) => changeStatus(checked)}
                                checkedChildren="关闭"
                                unCheckedChildren="启用"
                                checked={status}
                                disabled={!isEdit}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="头像">
                            <Row>
                                <Col span={6}>
                                    <Avatar size={49} src={`http:${avatar || props.rxInfo.img}`} />
                                </Col>
                                {isEdit && (
                                    <Col span={18}>
                                        <Upload
                                            showUploadList={false}
                                            action="/api/img/upload"
                                            accept=".jpg,.png,.gif"
                                            method="post"
                                            name="attach"
                                            onChange={({ file }) => {
                                                if (file.status !== 'uploading') {
                                                    setAvatar(file.response && file.response.data);
                                                }
                                            }}
                                        >
                                            <Button size="small">上传头像</Button>
                                        </Upload>
                                        <div
                                            style={{
                                                fontFamily: 'PingFangSC-Regular',
                                                color: 'rgba(0,0,0,0.45)',
                                                fontSize: '12px',
                                            }}
                                        >
                                            支持jpg、png、gif格式，小于2M
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Item>
                    </Col>
                    {query && query === 'add' && (
                        <Col span={10}>
                            <Form.Item
                                label="登录密码"
                                name="password"
                                rules={[
                                    {
                                        required: query && query === 'add' && !password && true,
                                        message: '请输入登录密码!',
                                    },
                                ]}
                            >
                                <Row>
                                    {password && (
                                        <>
                                            <Form.Item name="password">
                                                {isLook
                                                    ? password
                                                    : new Array(password.length).fill('*').join('')}
                                            </Form.Item>
                                            <Button
                                                type="link"
                                                onClick={() => changeIsLook(!isLook)}
                                            >
                                                <img
                                                    style={{ width: '16px', height: '10px' }}
                                                    src={isLook ? NoLook : LookPwd}
                                                    alt="qwqeqwe"
                                                />
                                            </Button>
                                        </>
                                    )}
                                    <Button type="link" onClick={() => showModal()}>
                                        {password ? <span>修改</span> : <span>设置</span>}
                                    </Button>
                                </Row>
                            </Form.Item>
                        </Col>
                    )}
                </Row>
                <Descriptions title="岗位信息" style={{ marginLeft: 60 }} />
                {departChain && Object.keys(departChain).length > 0 ? (
                    <Row>
                        <Col span={10}>
                            <Form.Item name="departName" label="当前所在部门">
                                <span>
                                    {departChain.departType === '部门' && departChain.departName}
                                    {departChain.departType === '组织' &&
                                        departChain.parentDepartChain &&
                                        departChain.parentDepartChain.split('-')[
                                            departChain.parentDepartChain.split('-').length - 1
                                        ]}
                                </span>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item name="groupName" label="当前所在组">
                                <span>
                                    {departChain.departType === '组织' && departChain.departName}
                                </span>
                            </Form.Item>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col span={10}>
                            <Form.Item label="当前所在部门">{userDetail.departName}</Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="当前所在组">{userDetail.groupName}</Form.Item>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col span={10}>
                        <Form.Item name="position" label="岗位">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="workPlace" label="办公所在地">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item name="positionType" label="员工性质">
                            <Select>
                                <Option value="员工">员工</Option>
                                <Option value="项目">项目</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="leaderUid"
                            label="直属领导"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择直属领导!',
                                },
                            ]}
                        >
                            <Select showSearch>
                                {peopleList.map((item) => (
                                    <Option key={item.uid} value={item.uid}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 20 }}>
                    <Button type="link" onClick={() => history.push('/system/staff')}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {query && query === 'edit' ? '提交' : '创建'}
                    </Button>
                </Form.Item>
            </Form>
            <Modal title="设置密码" visible={isShowModal} onCancel={handleCancel} footer={null}>
                <Form
                    form={formPassword}
                    name="application"
                    autoComplete="off"
                    onFinish={onFinishPwd}
                    labelCol={{ span: 8 }}
                    style={{ paddingBottom: '30px' }}
                    wrapperCol={{ span: 10, offset: 2 }}
                >
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: `密码要求：8～16位、大写字母、小写字母、数字、符号@.*=_`,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.*=_])([a-zA-Z0-9@.*=_]{8,16})$/,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder="密码要求：8～16位、大写字母、小写字母、数字、符号@.*=_"
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认2次输入密码一致!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请确认2次输入密码一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="请再次输入您的密码" />
                    </Form.Item>
                    <ScModalSubmit>
                        <Form.Item wrapperCol={{ span: 12, offset: 15 }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </ScModalSubmit>
                </Form>
            </Modal>
        </Card>
    );
};

AddStaff.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddStaff);
