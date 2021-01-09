import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import request from '@utils/request';
import enCryptoJS from '@utils/enCryptoJS';
import PublicHeader from '../../../components/PublicHeader';
import PublicFooter from '../../../components/PublicFooter';
import {
    ScLayout,
    ScContent,
    ScFont,
    ScFontTop,
    ScInnerContent,
    ScPassword,
    ScFontInner,
} from '../style';

export const register = (formData) =>
    request('/api/forgetPassword', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json',
        },
    });

const ConfirmPasswordPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const onFinish = (values) => {
        const params = {
            password: enCryptoJS(values.password),
            code: localStorage.getItem('code'),
            phone: localStorage.getItem('phone'),
        };
        register(params).then((res) => {
            if (res && res.data) {
                history.push('/successInfo');
                localStorage.setItem('isRegister', false);
            } else {
                message.error(res.message);
            }
        });
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };

    return (
        <ScLayout>
            <PublicHeader />
            <ScContent>
                <ScFont>
                    <ScFontTop>忘记密码</ScFontTop>
                </ScFont>
                <ScInnerContent>
                    <ScFontInner>
                        您正在找回的账号是：{localStorage.getItem('phone')}，请设置您的登录密码
                    </ScFontInner>
                    <ScPassword>
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
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.*=_])([a-zA-Z0-9@.*=_]{8,16})$/,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password size="large" placeholder="请设置您的密码" />
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
                                <Button block type="primary" htmlType="submit">
                                    确定
                                </Button>
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Link to="/login">返回使用钉钉二维码登录</Link>
                            </Form.Item>
                        </Form>
                    </ScPassword>
                </ScInnerContent>
            </ScContent>
            <PublicFooter />
        </ScLayout>
    );
};

export default ConfirmPasswordPage;
