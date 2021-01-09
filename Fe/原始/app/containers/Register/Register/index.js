import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Row, Col, Button, message } from 'antd';
import request from '@utils/request';
import enCryptoJS from '@utils/enCryptoJS';
import PublicHeader from '../../../components/PublicHeader';
import PublicFooter from '../../../components/PublicFooter';
import {
    ScLayout,
    ScContent,
    ScFont,
    ScFontTop,
    ScFontBottom,
    ScInnerContent,
    ScRegister,
} from '../style';

export const register = (formData) =>
    request('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json',
        },
    });

const RegisterPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [formData, setFormData] = useState({
        account: '',
        password: '',
        code: '',
    });
    const [countData, setCountData] = useState({
        count: 60,
        isStart: false,
    });

    const onFinish = (values) => {
        const params = {
            account: values.account,
            code: values.code,
            openid: history.location.state ? history.location.state.openid : null,
            password: enCryptoJS(values.password),
        };
        setFormData(params);
        register(params).then((res) => {
            // 注册成功后跳转
            if (res && res.data) {
                localStorage.setItem('isRegister', true);
                history.push('/successInfo');
            } else {
                message.error(res.message);
            }
        });
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };

    const getPhoneCode = () => {
        const api = '/api/sendVerifyCode/1/';
        const changeApi = api + formData.account;
        request(changeApi, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        }).then((res) => {
            if (res.code === 200) {
                setCountData({ count: 60, isStart: true });
            } else {
                message.error(res.message);
            }
        });
    };

    const getPhone = (event) => {
        setFormData({ account: event.target.value });
    };
    useEffect(() => {
        let interval;
        if (countData.isStart) {
            interval = setInterval(() => {
                setCountData({ isStart: true, count: (countData.count -= 1) });
            }, 1000);
        }
        if (countData.count === 0) {
            setCountData({ isStart: false, count: 60 });
        }
        return () => clearInterval(interval);
    }, []);
    return (
        <ScLayout>
            <PublicHeader />
            <ScContent>
                <ScFont>
                    <ScFontTop>注册</ScFontTop>
                    <ScFontBottom>欢迎注册安全运营分析平台账号!</ScFontBottom>
                </ScFont>
                <ScInnerContent>
                    <ScRegister>
                        <Form
                            wrapperCol={{
                                span: 24,
                            }}
                            name="register"
                            autoComplete="off"
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入正确的手机号码!',
                                        pattern: /^1[3456789]\d{9}$/,
                                    },
                                ]}
                            >
                                <Input size="large" placeholder="手机号" onChange={getPhone} />
                            </Form.Item>
                            <Form.Item
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
                                            return Promise.reject(
                                                new Error('请确认2次输入密码一致!'),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password size="large" placeholder="请再次输入您的密码" />
                            </Form.Item>
                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <Form.Item
                                            name="code"
                                            noStyle
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入验证码!',
                                                },
                                            ]}
                                        >
                                            <Input size="large" placeholder="验证码" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            size="large"
                                            onClick={getPhoneCode}
                                            disabled={countData.isStart}
                                        >
                                            {!countData.isStart ? (
                                                '获取验证码'
                                            ) : (
                                                <span style={{ width: '80px' }}>
                                                    {countData.count}
                                                </span>
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Button block type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Row>
                                    <Col span={12} offset={9}>
                                        <span>已有账号？</span>
                                        <Link to="/login">去登录</Link>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </ScRegister>
                </ScInnerContent>
            </ScContent>
            <PublicFooter />
        </ScLayout>
    );
};
// RegisterPage.propTypes = {
//     // requestRegister: PropTypes.func,
//     // getVerification: PropTypes.func,
// };

export default RegisterPage;
