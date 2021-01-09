import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import PublicHeader from '../../../components/PublicHeader';
import PublicFooter from '../../../components/PublicFooter';
import {
    ScLayout,
    ScContent,
    ScFont,
    ScFontTop,
    ScInnerContent,
    ScRegister,
    ScFontBottom,
} from '../style';

const SuccessInfo = () => (
    <ScLayout>
        <PublicHeader />
        {localStorage.getItem('isRegister') === 'true' ? (
            <ScContent>
                <ScFont>
                    <ScFontTop>注册</ScFontTop>
                    <ScFontBottom>欢迎注册安全运营分析平台账号!</ScFontBottom>
                </ScFont>
                <ScInnerContent>
                    <ScRegister>
                        <Result
                            status="success"
                            title="注册成功"
                            subTitle="恭喜，安全运营分析平台账号xxxxx注册成功！"
                            extra={[
                                <Button type="primary" key="console">
                                    <Link to="/login">立即登录</Link>
                                </Button>,
                            ]}
                        />
                    </ScRegister>
                </ScInnerContent>
            </ScContent>
        ) : (
            <ScContent>
                <ScFont>
                    <ScFontTop>忘记密码</ScFontTop>
                </ScFont>
                <ScInnerContent>
                    <ScRegister>
                        <Result
                            status="success"
                            title="修改成功"
                            subTitle="恭喜，安全运营分析平台账号xxxxx重置密码成功！"
                            extra={[
                                <Button type="primary" key="console">
                                    <Link to="/login">立即登录</Link>
                                </Button>,
                            ]}
                        />
                    </ScRegister>
                </ScInnerContent>
            </ScContent>
        )}
        <PublicFooter />
    </ScLayout>
);

export default SuccessInfo;
