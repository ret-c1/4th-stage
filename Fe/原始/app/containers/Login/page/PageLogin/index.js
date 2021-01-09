import React, { useRef, useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Form, Input, Row, Col, Button, Tabs } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import request from '@utils/request';
// import { gloabconfig } from '@containers/config';
import enCryptoJS from '@utils/enCryptoJS';
import PubMessage from '@components/PubMessage';
import loginbg001 from '@assets/images/login-bg-001.png';
import { searchParams } from '@utils/searchParams';
import { redirectAction } from '@utils/authority';
import PublicHeader from '@components/PublicHeader';
import PublicFooter from '@components/PublicFooter';
import { initScanLogin, getToken } from './util';
import { loginAction } from '../../action';

const { TabPane } = Tabs;

const ScLayout = styled(Layout)`
    width: 100%;
    min-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;
const ScContent = styled.div`
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 100px - 110px);
    background-image: linear-gradient(152deg, #040b59 0%, #0078e6 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ScBg001 = styled.div`
    position: absolute;
    z-index: 1;
    left: 8vw;
    top: 0;
    width: 890px;
    min-height: calc(100vh - 100px - 110px);
    background: url(${loginbg001});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cantain;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ScRegister = styled.div`
    position: relative;
    z-index: 2;
    max-width: 1400px;
    min-width: 1199px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid rgba(0, 0, 0, 0.09);
    box-shadow: 0 0 24px 0 #121759;
    border-radius: 16px;
    // margin: 55px 30px 55px 60px;
`;
const ScRegisterLeft = styled.div`
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 80px 80px 60px;
`;
const ScTitleTop = styled.div`
    flex: 1;
    font-size: 68px;
    color: #ffffff;
    letter-spacing: 29.14px;
    text-shadow: 0 2px 30px rgba(16, 29, 62, 0.6);
`;
const ScTitleBottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 100px;
    opacity: 0.85;
    font-size: 24px;
    color: #ffffff;
    line-height: 42px;
    text-shadow: 0 2px 30px rgba(16, 29, 62, 0.6);
`;
const ScRegisterRight = styled.div`
    width: 480px;
    float: right;
    background: #fff;
    border-radius: 0 16px 16px 0;
    padding: 20px 60px 0 60px;
`;
const ScSlogen = styled.div`
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    opacity: 0.65;
    font-family: PingFangSC-Regular;
    font-size: 21px;
    color: #fff;
    letter-spacing: 35px;
    text-shadow: 0 2px 30px rgba(16, 29, 62, 0.6);
`;

const getcode = () =>
    request('/api/sendVerifyCode/getVerifyCode', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        },
    });
const login = (formdata) =>
    request('/api/login', {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: {
            'content-type': 'application/json',
        },
    });

const redirectFrom = redirectAction.get();
const LoginPage = (props) => {
    const { requestLogin } = props;
    const [form] = Form.useForm();
    const history = useHistory();
    // const { state } = history.location;
    const onFinish = debounce((values) => {
        const formdata = {
            ...values,
            ...{
                password: enCryptoJS(values.password),
            },
        };

        // 登录接口
        login(formdata).then((res) => {
            if (res.code === 200) {
                PubMessage('right', '登录成功!');
                const { data } = res;
                requestLogin(data.token);
                renderCode();
                // console.log(history.location, state);
                if (redirectFrom) {
                    history.push(decodeURIComponent(redirectFrom));
                } else {
                    history.push('/dashboad');
                }
            } else {
                renderCode();
                PubMessage('error', res.message);
            }
        });
        // .catch(() => {
        //     PubMessage('error', '登录失败,请重新登录!');
        // });
    }, 1000);

    const scanloginEl = useRef(null);

    const [key, setKey] = useState('1');
    const handleTapChange = (val) => {
        setKey(`${val}`);
    };

    // 当key=1时创建二维码
    useEffect(() => {
        if (key === '1') {
            initScanLogin(scanloginEl.current.id);
            const params = searchParams();
            if (params && params.code) {
                getToken(params.code).then((res) => {
                    if (res.code === 200) {
                        const { data } = res;
                        if (!data.token) {
                            history.push({
                                pathname: '/register',
                                state: { openid: data.openid },
                            });
                        } else {
                            requestLogin(data.token);
                            // history.push('/dashboad');
                            if (redirectFrom) {
                                history.push(decodeURIComponent(redirectFrom));
                            } else {
                                history.push('/dashboad');
                            }
                        }
                    }
                });
            }
        }
    }, [key]);

    // 初次加载获取图片验证码
    const [imgsrc, setImgsrc] = useState(null);

    const renderCode = () => {
        getcode().then((res) => {
            if (res.code === 200) {
                setImgsrc(`data:image/png;base64,${res.message}`);
            }
        });
    };
    useEffect(() => {
        renderCode();
    }, []);

    return (
        <ScLayout>
            <PublicHeader />
            <ScContent>
                <ScBg001 />
                <ScRegister>
                    <ScRegisterLeft>
                        <ScTitleTop />
                        <ScTitleBottom />
                        <ScSlogen>开启全新工作形式和状态</ScSlogen>
                    </ScRegisterLeft>
                    <ScRegisterRight>
                        <Tabs
                            defaultActiveKey="1"
                            animated={false}
                            tabBarStyle={{ textAlign: 'center' }}
                            onChange={handleTapChange}
                        >
                            <TabPane forceRender tab="钉钉二维码登录" key="1">
                                <div id="js_qcode" ref={scanloginEl} />
                            </TabPane>
                            <TabPane tab="账号密码登录" key="2">
                                <Form
                                    style={{ margin: '30px 0 35px 0', paddingBottom: '16px' }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    name="register"
                                    autoComplete="off"
                                    form={form}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="account"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入手机号码!',
                                            },
                                        ]}
                                    >
                                        <Input size="large" placeholder="手机号/用户名" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入密码!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password size="large" placeholder="密码" />
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
                                                <img
                                                    src={imgsrc}
                                                    alt="验证码"
                                                    role="presentation"
                                                    onClick={renderCode}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item>
                                        <Row>
                                            <Col span={10}>
                                                <span>还没有账号？</span>
                                                <Link to="/register">立即注册</Link>
                                            </Col>
                                            <Col span={6} offset={8}>
                                                <Link to="/forget">忘记密码</Link>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button block type="primary" htmlType="submit">
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </ScRegisterRight>
                </ScRegister>
            </ScContent>
            <PublicFooter />
        </ScLayout>
    );
};

LoginPage.propTypes = {
    requestLogin: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    requestLogin: (playload) => {
        dispatch(loginAction(playload));
    },
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
