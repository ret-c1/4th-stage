import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Row, Col, Button, message } from 'antd';
import request from '@utils/request';
import PublicHeader from '../../../components/PublicHeader';
import PublicFooter from '../../../components/PublicFooter';
import {
    ScLayout,
    ScContent,
    ScFont,
    ScFontTop,
    ScInnerContent,
    ScFontInner,
    ScPassword,
} from '../style';

const ForgetPasswordPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    // 定义表单
    const [formData, setFormData] = useState({
        phone: '',
        code: '',
    });
    const [countData, setCountData] = useState({
        count: 60,
        isStart: false,
    });

    const onFinish = (values) => {
        if (values.phone && values.code) {
            localStorage.setItem('phone', values.phone);
            localStorage.setItem('code', values.code);
            history.push('/confirm');
        } else {
            message.info('请正确输入手机号和验证码');
        }
    };

    const onFinishFailed = ({ errorFields }) => {
        form.scrollToField(errorFields[0].name);
    };

    const getPhoneCode = () => {
        const phoneRegular = /^1[3456789]\d{9}$/;
        if (phoneRegular.test(formData.phone)) {
            const api = '/api/sendVerifyCode/3/';
            const changeApi = api + formData.phone;
            request(changeApi, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            }).then((res) => {
                if (res.code === 200) {
                    setCountData({ count: 60, isStart: true });
                    // State updates from the useState() and useReducer() Hooks don't support the second callback;所以原生react的写法在hook中放到useEffect操作
                    // let { count } = countData;
                    // const timer = setInterval(() => {
                    //     setCountData({ count: (count -= 1), isStart: false }, () => {
                    //         if (count === 0) {
                    //             clearInterval(timer);
                    //             setCountData({
                    //                 isStart: true,
                    //                 count: 60,
                    //             });
                    //         }
                    //     });
                    // }, 1000);
                } else {
                    message.error(res.message);
                }
            });
        }
    };
    const getPhone = (event) => {
        setFormData({ phone: event.target.value });
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
                    <ScFontTop>忘记密码</ScFontTop>
                </ScFont>
                <ScInnerContent>
                    <ScFontInner>请输入您需要找回的账号</ScFontInner>
                    <ScPassword>
                        <Form
                            wrapperCol={{
                                span: 24,
                            }}
                            name="forgetPassword"
                            autoComplete="off"
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号码!',
                                    },
                                ]}
                            >
                                <Input size="large" placeholder="手机号" onChange={getPhone} />
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
                                    下一步
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

export default ForgetPasswordPage;
